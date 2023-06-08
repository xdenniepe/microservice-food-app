import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./authContext";
import { DELETE_INVOICES, DELETE_ORDER } from "../reducer/orderReducer";
import { OrderContext } from "./orderContext";
import { POST, GET } from '../utility/constants';
import { request } from "../service/request"
import { getSumOfArray, setLocalStorageItem } from "../service/helper";
import { useNavigate } from "react-router-dom";
import api from '../service/api';

export const PaymentContext = createContext();

const PaymentContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext)?.state;
    const { dispatch } = useContext(OrderContext);
    const navigate = useNavigate();

    const [isPaymentMade, setIsPaymentMade] = useState(false);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const paymentTransaction = (payload) => {

        request({
            url: `${api.ORDERS_SEARCH}/findByUserId`,
            method: GET,
            params: {
                userId: user.userId,
                projection: "withId",
            }
        }).then(response => {
            const { data } = response;
            setLocalStorageItem('lastOrder', data.orderId);

            request({
                url: api.CHECKOUT,
                method: POST,
                data: {
                    orderId: data.orderId,
                    paymentMethod: payload.nonce,
                    couponCode: payload.coupon,
                }
            }).then(response => {
                setIsPaymentMade(true);
                setIsPaymentSuccess(true);
                setLocalStorageItem('order', []);
                setLocalStorageItem('invoices', []);
                setLocalStorageItem("invoiceSent", false);
                localStorage.removeItem("vmIdHolder");
                navigate('/receipt');
                

                dispatch({ type: DELETE_INVOICES });
                dispatch({ type: DELETE_ORDER });
            }).catch(error => {
                console.log(error);
                alert(`Payment Error with nonce=${payload.nonce}`);
                navigate(-1);
            });

        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <PaymentContext.Provider value={{ paymentTransaction, isPaymentMade, setIsPaymentMade, isPaymentSuccess }}>
            {
                children
            }
        </PaymentContext.Provider>
    )
}


export default PaymentContextProvider;