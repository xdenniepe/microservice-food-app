import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { CLASSES } from "../../utility/classes";
import { GET } from "../../utility/constants";
import { request } from "../../service/request";
import api from "../../service/api";
import EmptyHistory from '../../components/emptystate/empty-purchasehistory'
import OrderItem from "../../components/order-item";
import { useTranslation } from "react-i18next";


const PurchaseHistory = (props) => 
{
    const { setHasLoaded, renderSr } = props;
    const { user }  = useContext(AuthContext)?.state;
    const [ transactions, setTransactions ]   = useState([]);
    const { t } = useTranslation(['purchase-history']); 

    useEffect(() => {
        setHasLoaded(true);
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        renderOrders();
    }, [])
    
    const renderOrders = () => 
    {
        request({
            url   : `${api.TRANSACTIONS_SEARCH}/findByUserIdOrderByTimestampDesc?`,
            method: GET,
            params: {
                userId: user.userId,
            }
        }).then(response => {
            setTransactions(response.data?._embedded?.transactions);
        }).catch(error => {
            console.log(error);
        })
    };

    return (
            (transactions.length === 0) ?
            <div>
                { renderSr() }
                <EmptyHistory />
            </div>
            :
            <div className={`${CLASSES.container}`}>
                <div className={`${CLASSES.main}`}>
                   { renderSr() }
                    <h1 className="font-bold text-secondary text-sm mt-4 mb-1 ml-2">{t('Past Orders')}</h1>
                    <div>
                       {
                            transactions.map((transaction, index) => (
                                <OrderItem key={index} order={transaction} />
                            ))
                       }
                    </div>
                </div>
            </div>
        );
}

export default PurchaseHistory;