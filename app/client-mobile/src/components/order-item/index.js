import React, { useEffect, useState } from "react";
import { ChevronRight } from "../../utility/icons";
import { CLASSES } from "../../utility/classes";
import { formatToPst } from "../../service/helper";
import { GET } from "../../utility/constants";
import { request } from "../../service/request";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { useTranslation } from "react-i18next";


const OrderItem = (props) => {
    const { order } = props;
    const navigate  = useNavigate();
    const {t} = useTranslation(['purchase-history']);

    const [ isRendered, setIsRendered ]        = useState(false);
    const [MAX_DISPLAY_ITEMS, setDisplayItems] = useState(1);
    const [invoice, setInvoice]                = useState([]);
    const [transaction, setTransaction]        = useState({});

    useEffect(() => {
        setTransaction(order)
        getOrderDetails();
        setIsRendered(true);
    }, [])

    const getOrderDetails = () => {
        request({
            url   : `${api.CART_ITEMS}/findByOrderId`,
            method: GET,
            params: {
                orderId: order.orderId,
            }
        }).then(response => {
            setInvoice(response.data);
            if (response.data.length > 1) {
                setDisplayItems(2);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const displayName = () => {
        const content = 
            [...Array(MAX_DISPLAY_ITEMS)].map((_, index) => {
                const split = (index < (MAX_DISPLAY_ITEMS - 1) && invoice.length > 0) ? ', ' : '';
                const desc  = invoice[index]?.quantity ? `${invoice[index]?.quantity} ${t(invoice[index]?.name)}` : ``;

                return desc + split
            })

       return isRendered && content        
    }

    const handleClick = () => {
        navigate(`/receipt/view/${order.orderId}`);
    }

    return (

        <div className={`${CLASSES.roundedCard} border px-4 py-5 mt-2`} onClick={handleClick} {...props} role="button">
            <div className="flex flex-row">
                <div className="flex-col flex-grow truncate">
                    <p className="text-base font-bold">{`${t('Order')} #: ${order?.orderId}`}</p>
                    <p className="text-xs text-gray-600 truncate overflow-ellipsis" tabIndex={0}> {displayName()}</p>
                    <p className="text-xs text-gray-600">{formatToPst(transaction.whenAdded)}</p>
                    <p className="text-sm text-gray-600">{t('Your order has been received')}</p>
                </div>
                <div className="ml-2">
                    <ChevronRight
                        className="h-9 w-9 cursor-pointer text-secondary"
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderItem;