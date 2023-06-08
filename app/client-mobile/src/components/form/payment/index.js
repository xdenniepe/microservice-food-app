import React, { useContext, useEffect, useState } from 'react'
import { CLASSES } from "../../../utility/classes";
import { getLocalStorageItem } from '../../../service/helper';
import { PaymentContext } from "../../../context/paymentContext";
import { Spinner } from "../../../utility/icons"
import client from 'braintree-web/client';
import clsx from "clsx";
import hostedFields from 'braintree-web/hosted-fields';
import braintree from 'braintree-web/paypal-checkout';
import { useTranslation } from 'react-i18next';

const BraintreeDropIn = (props) => {
    const { show, coupon, toast, updateLoyaltyPoints } = props;
    const { paymentTransaction, isPaymentMade, setIsPaymentMade, isPaymentSuccess } = useContext(PaymentContext);
    const [braintreeInstance, setBraintreeInstance] = useState(undefined);
    const credentials   = getLocalStorageItem('payment');
    const paypalBoolean = getLocalStorageItem('paypal');
    const { t }= useTranslation(['order_review'])

    const hostedStylesProp = {
        'input': {
            'font-size'  : '14px',
            "color"      : "#751132",
            "font-weight": "Bold"
        },

        'input.invalid': {
            'color': 'red'
        },
        'input.valid': {
            'color': '#751132'
        },
        ':focus': {
            color   : '#751132',
            "border": "none"
        }
    };

    const hostedFieldsProp = {
        cardholderName: {
            container  : '#cc-name',
            placeholder: 'Name on Card*',
            prefill    : paypalBoolean === true ? null : credentials.ccName,
        },
        number: {
            selector   : '#cc-number',
            placeholder: 'Credit Card Number',
            prefill    : paypalBoolean === true ? null : credentials.ccNumber,
        },
        cvv: {
            selector   : '#cc-cvv',
            placeholder: 'CVV*',
            prefill    : paypalBoolean === true ? null : credentials.ccCVV,
        },
        expirationDate: {
            selector   : '#cc-expiration-date',
            placeholder: 'MM/YY*',
            prefill    : paypalBoolean === true ? null : credentials.ccExpirationDate,
        },
    }

    const validateError = (token) => {
        switch (token.code) {
            case 'HOSTED_FIELDS_FIELDS_EMPTY': {
                console.log("all fields error");
                break;
            }
            case 'HOSTED_FIELDS_FIELDS_INVALID': {
                var invalidFields = token.details.invalidFieldKeys;
                invalidFields.forEach((field) => {
                    console.log("error: ", field)
                });
                break;
            }
            default: {
                console.log("handling other error: ", token.code);
            }
        }
    }

    const initializeBraintree = () => {
    {paypalBoolean === false ?

        client.create({
                authorization: window.BT_AUTHORIZATION
            },
                (clientErr, clientInstance) => {
                    if (clientErr) {
                        console.error(clientErr);
                    }
    
                    var form   = document.querySelector('#cc-hosted-fields-form');
                    var submit = document.querySelector('#cc-submit');
    
                    hostedFields.create({
                        client: clientInstance,
                        styles: hostedStylesProp,
                        fields: hostedFieldsProp,
                    }, (hostedFieldsErr, instance) => {
                        if (hostedFieldsErr) {
                            console.error(hostedFieldsErr);
                        }
    
                        submit.removeAttribute('disabled');
                        form.addEventListener('submit', (event) => {
                            event.preventDefault();
                            instance.tokenize((tokenizeErr, payload) => {
                            if (tokenizeErr) {
                                setBraintreeInstance(false);
                                console.error(tokenizeErr);
                                alert('Something went wrong. Check your card details and try again.')
                                validateError(tokenizeErr);
                            }

                            setBraintreeInstance(true);
                            const paymentMethodNonce = payload.nonce;
                
                            // with authorize payment-nonces
                            paymentTransaction({ nonce: payload.nonce, coupon: coupon });
                            setIsPaymentMade(true);
    
                            });
                        }, false);
                    });
                })

                : 

        client.create({
                authorization: window.BT_AUTHORIZATION
            }, (clientErr, clientInstance) => {

            if (clientErr) {
                console.log('Error creating client:', clientErr);
                return;
            }

        // Create a PayPal Checkout component.
        braintree.create({
                client: clientInstance
            }, (paypalCheckoutErr, paypalCheckoutInstance) => {
            paypalCheckoutInstance.loadPayPalSDK({
                    currency: 'USD',
                    intent: 'capture'
            }, () => {
            paypal.Buttons({
                style: {
                    layout:  'vertical',
                    shape:   'pill',
                },
                fundingSource: paypal.FUNDING.PAYPAL,

                createOrder: () => {
                    return paypalCheckoutInstance.createPayment({
                    flow: 'checkout', // Required
                    amount: 10.00, // Required
                    currency: 'USD', // Required, must match the currency passed in with loadPayPalSDK
                    intent: 'capture', // Must match the intent passed in with loadPayPalSDK
                    });
                },
        
                onApprove: (data, actions) => {
                    return paypalCheckoutInstance.tokenizePayment(data, function (tokenizeErr, payload) {
                    if (tokenizeErr) {
                    setBraintreeInstance(false);
                    console.error(tokenizeErr);
                    alert('Something went wrong.')
                    validateError(tokenizeErr);
                }

                    setBraintreeInstance(true);
                    const paymentMethodNonce = payload.nonce;

                    // with authorize payment-nonces
                    paymentTransaction({ nonce: payload.nonce, coupon: coupon });
                    setIsPaymentMade(true);

                    });
                },

                onCancel: (data) => {
                    console.log('PayPal payment cancelled', JSON.stringify(data, 0, 2));
                },

                onError: (err) => {
                    console.error('PayPal error', err);
                }
        }).render('#paypal-button').then(function () {
        // The PayPal button will be rendered in an html element with the ID
        // `paypal-button`. This function will be called when the PayPal button
        // is set up and ready to be used
        });
                    });
                });
            }); 
        } 
                    
    }

    const loyalty =()=>{
        if(isPaymentSuccess){
            updateLoyaltyPoints();
        }
    }

    useEffect(() => {
        loyalty();
    },[isPaymentSuccess])
    
    useEffect(() => {
        initializeBraintree();
        

    }, [])

    return (
        <>
            {
                isPaymentMade ?
                <div aria-live="assertive" className="flex flex-col items-center">
                <p className="mb-5">Payment is processing</p>    
                <Spinner></Spinner>
                </div>
                :                  
                    <form id="cc-hosted-fields-form" className="w-full">
                        <div className={`bg-white drop-shadow-container m-1 rounded-md p-8 pb-28 ${clsx({ 'hidden': !show })}`}>
                            <div className="-mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <div
                                        id="cc-name"
                                        className={`h-10 appearance-none block w-full text-gray-600 border-0 border-b-2 border-stone-400 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                                        aria-label="Card Holder Name"
                                        maxLength={50}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <div
                                        id="cc-number"
                                        className={`h-10 appearance-none block w-full text-gray-600 border-0 border-b-2 border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                        aria-label="Card Number"
                                    />
                                </div>
                            </div>
                            <div className="flex -mx-3 mb-2">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <div
                                        id="cc-expiration-date"
                                        className={`h-10 appearance-none block w-full text-gray-600 border-0 border-b-2 border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                        aria-label="Expiration Date"
   
                                    />
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <div
                                        id="cc-cvv"
                                        className={`h-10 appearance-none block w-full text-gray-600 border-0 border-b-2 border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                        aria-label="CVV"
                                    />
                                </div>
                            </div>
                        </div>

                        {paypalBoolean === false ?

                        <button
                            id="cc-submit"
                            className={`braintreePayButton ${CLASSES.buttonDefault} text-white w-full xss:h-8 xss:items-center xss:flex xss:justify-center xss:text-xxs`}
                            type="primary"
                            disabled={!braintreeInstance}
                            role="button"
                            aria-label="Place Order - Button"
                        >
                            {t("Place Order")}
                        </button>
                        :
                        <div className="relative z-0">
                        <div
                            id="paypal-button"
                            aria-label="Place Order - Button"
                        >
                        </div>
                        </div>
                        }
                    </form>
            }
        </>
    )
}

export default BraintreeDropIn;