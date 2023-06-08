import React, { useEffect, useState } from "react";
import { CLASSES } from "../../utility/classes";
import { GET, POST, IMAGES } from "../../utility/constants";
import { formatToPstPDF, getLocalStorageItem, getSumOfArray, setLocalStorageItem } from "../../service/helper";
import { request } from "../../service/request";
import { useParams } from "react-router-dom";
import api from "../../service/api";
import clsx from "clsx";
import QRCode from "react-qr-code";
import CardDisplay from 'react-credit-card-display';
import { LetterScharRemover, FirstLetterToUpper } from "../../service/helper";
import { useTranslation } from "react-i18next";


const OrderDetails = (props) => {
    const { invoice } = props;
    const {t} = useTranslation(['receipt']);
   


    if (invoice) {
        return invoice.map((item, index) => (
            <div key={`invoiceitem_${index}`} className="flex flex-row w-full justify-between mt-1 xss:text-xxs">
                
                <div className="flex flex-row">
                    <p aria-hidden="true" className="text-sm font-bold pr-1">{item.quantity}</p> 
                    <p aria-hidden="true" className="sr-only">{t('pieces')}</p>
                    <div className="pr-2">
                        <p aria-hidden="true" className="text-smline-clamp-2">{t(item.name)}</p>
                        <p aria-hidden="true" className="text-sm line-clamp-2 xss:text-xxs mb-3">({t(item.description)})</p>
                    </div>
                </div>
                <p aria-hidden="true" className="w-1/3 text-right" >{item.price.toFixed(2)} USD</p>
                <p tabIndex={0} role="dialog" className="sr-only" aria-label={`${item.quantity} ${item.quantity > 1 ? 'pieces' : 'piece'} ${item.name} ${item.description} ${item.price.toFixed(2)} USD`}></p>
            </div>
            
        ))
    } else {
        return <></>
    }
}

const Receipt = (props) => {
    const { toast, setHasLoaded, renderSr } = props;
    const params                                  = useParams();
    const [subtotal, setSubTotal]                 = useState(0);
    const [total, setTotal]                       = useState(0);
    const [tax, setTax]                           = useState(0);
    const [transaction, setTransaction]           = useState({});
    const [paymentInfo, setPaymentInfo]           = useState({});
    const [invoice, setInvoice]                   = useState([]);
    const [coupon, setCoupon]                     = useState('');
    const [discount, setDiscount]                 = useState(0);
    const [isRendered, setIsRendered]             = useState(false);
    const [qrCode, setQrCode]                     = useState('');
    const [cardHolderNumber, setCardHolderNumber] = useState('');
    const [cardAccountType, setCardAccountType]   = useState('');
    const orderNo                                 = params.id ? params.id : getLocalStorageItem('lastOrder');
    const {t} = useTranslation(['receipt']);
    const lang = localStorage.getItem('i18nextLng');


    useEffect(() => {
        setHasLoaded(true);
        window.scrollTo(0, 0)
        getInvoices();

    }, []);

    useEffect(() => {
        getTransaction();
        setIsRendered(true);

    }, [invoice])

    useEffect(() => {
        if (isRendered && !params.id && getLocalStorageItem("lastOrder") && getLocalStorageItem("invoiceSent") === false) {
            handleSendToEmail();
            setLocalStorageItem("invoiceSent", true);
        }
    }, [transaction])

    let cardNumber              = cardHolderNumber?.substring(0,5);
    let accountTypeScharRemover = LetterScharRemover(cardAccountType);
    let accountTypeToUpper      = FirstLetterToUpper(accountTypeScharRemover)
   
    const getInvoices = () => {
        setInvoice(null);
        request({
            url   : `${api.CART_ITEMS}/findByOrderId`,
            method: GET,
            params: {
                orderId: orderNo,
            }
        }).then(response => {
            const data = response.data;
            setInvoice(data);
            getTransaction(data);

        }).catch(error => {
            console.log(error);
        })
    }
    
    const getPaymentInfo = (paymentUrl) => {
        const purl = paymentUrl.split("/", 7)
        request({
            url   : `${api.TRANSACTIONS}/${purl[5]}/${purl[6]}`,
            method: GET,
        }).then(response => {
            setPaymentInfo(response.data);
            setCardHolderNumber(response.data.piCreditCardNumber);
            setCardAccountType(response.data.piAccountType)  
        }).catch(error => {
            console.log(error);
        })
    }

    const getTransaction = (invoice) => {
        if (invoice)  {
            const tempTotal    = getSumOfArray(invoice?.map(invoice => invoice.total), 2)
            const tempSubtotal = getSumOfArray(invoice?.map(invoice => invoice.subtotal), 2)

            request({
                url   : `${api.TRANSACTIONS_SEARCH}/findByOrderId?`,
                method: GET,
                params: {
                    orderId: orderNo,
                }
            }).then(response => {
                setTotal(tempTotal);
                setSubTotal(tempSubtotal);
                setTax(tempTotal-tempSubtotal);
                if (response.data.couponId) {
                    request({
                        url   : `${api.COUPONS}/findByCouponId?`,
                        method: GET,
                        params: {
                            couponId: response.data.couponId
                        }
                    }).then(response => {
                        if (response.data.amount) {
                            setCoupon('Discount')
                            setTotal((tempTotal - response.data.amount).toFixed(2))
                            setDiscount(response.data.amount.toFixed(2))
                        } else {
                            const computedPercentage = tempTotal * (response.data.percentage/100)
                            setTotal((tempTotal - computedPercentage).toFixed(2))
                            setCoupon(`${response.data.percentage}% Discount`)
                            setDiscount(computedPercentage.toFixed(2))
                        } 
                    })
                }
                setTransaction(response.data);
                setQrCode(response.data.code);
                getPaymentInfo(response.data?._links?.payment?.href);
            }).catch(error => {
                console.log(error);
            })
        }
    }
       //To be applied after Microsoft Testing
    /* const getPDFInvoice = async () => {
        let delayDebounce;
        const doc = <Invoice paymentInfo={paymentInfo} transaction={transaction} orderNo={orderNo} items={invoice} coupon={coupon} discount={discount} />;
            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            delayDebounce = setTimeout(() => {
                saveAs(blob, `Receipt_Order_${orderNo}`);
            }, 3500);
            return () => {
                delayDebounce && clearTimeout(delayDebounce)
            }
    }

    const showPDFToast = () => {
        toast('Success', 'The receipt is ready to view')
    } */

    const sendToEmail = () => {
        return (
            params.id ?                  
               <button className="font-bold text-secondary text-lg mt-5  xss:text-mds" aria-label="Send to Email" onClick={handleSendToEmail}>Send to Email</button>
            :
                <></>
        )
    }

    const handleSendToEmail = () => {

        if(lang == "jp"){
        request({

            
            url: api.RECEIPT_JP,
            method: POST,
            data : {
                orderId: orderNo,
                invoicePdf: {
                    paymentInfo: paymentInfo,
                    transaction: transaction,
                    items      : invoice,
                    discount   : discount,
                    coupon     : coupon === '' ? 'Discount' : coupon,
                    transactionDate: formatToPstPDF(transaction.timestamp)
                },
            }
        }).then(() => {
            console.log("receipt email sent...");
            toast('Success', 'Receipt has been sent to your email.');
        }).catch(error => {
            console.log(error);
        })
    }
        else{
            request({

            
                url: api.RECEIPT,
                method: POST,
                data : {
                    orderId: orderNo,
                    invoicePdf: {
                        paymentInfo: paymentInfo,
                        transaction: transaction,
                        items      : invoice,
                        discount   : discount,
                        coupon     : coupon === '' ? 'Discount' : coupon,
                        transactionDate: formatToPstPDF(transaction.timestamp)
                    },
                }
            }).then(() => {
                console.log("receipt email sent...");
                toast('Success', 'Receipt has been sent to your email.');
            }).catch(error => {
                console.log(error);
            })
        }
    }
    
    return (
        <div className={CLASSES.container}>
            <div className={CLASSES.main}>
                { renderSr() }
                <h1 className="font-bold text-secondary text-lg text-center xss:text-mdss" aria-label="Thank you for your order"> {t('THANK YOU FOR YOUR ORDER!')} </h1>
                <div className="flex flex-col m-2 mt-4 rounded-md p-4 space-y-5">
                        <div className="border p-3 border-black mt-0 max-w-min m-auto">
                            <QRCode value={qrCode} size={170} role="img" aria-label={!params.id ? 'QR Code - QR Code Generated' : 'QR Code - Receipt’s QR Code'}/>
                        </div>
                    <p className="text-center w-10/12 text-xs text-gray-600 px-6 m-auto flex items-center justify-center" aria-label="Scan the QR code above at your selected Yo-Kai machine to cliam your order.">{t('Scan the QR code above at your selected Yo-Kai machine to claim your order.')}</p>
                    <h1 className="font-bold text-secondary text-lg text-center xss:text-mdss" aria-label="RECEIPT"> {t('RECEIPT')} </h1>
                    <div className="space-y-1 text-sm xss:text-xxs">
                        <p className="my-2" aria-label={`Order number ${orderNo}`}>{t('Order')} #: {orderNo}</p>
                        <p aria-label="Order Details">{t('Order Details')}</p>
                        <OrderDetails invoice={invoice}/>
                        <p tabIndex={0} role="dialog" className="sr-only" aria-label={`Subtotal ${subtotal} USD Taxes ${(tax).toFixed(2)} USD Coupon ${discount} USD Total ${total} USD`}></p>
                        <div className="flex flex-row w-full justify-between">
                            <p aria-hidden="true" aria-label="Subtotal" className="mt-3">{t('Subtotal')}</p>
                            <p aria-hidden="true" aria-label={`${subtotal} USD`} className="mt-3">{subtotal} USD</p>
                        </div>
                        <div className="flex flex-row w-full justify-between">
                            <p aria-hidden="true" aria-label="Taxes">{t('Taxes')}</p>
                            <p aria-hidden="true" aria-label={`${(tax).toFixed(2)} USD`}>{(tax).toFixed(2)} USD</p>
                        </div>

                        <div className={`flex flex-row w-full justify-between ${clsx({ 'hidden': !discount })}`}>
                            <p aria-hidden="true" aria-label="Coupon">{coupon}</p>
                            <p aria-hidden="true" aria-label={discount}>-{discount} USD</p>
                        </div>
                        <div className="flex flex-row w-full justify-between">
                            <p aria-hidden="true" className="font-bold text-black text-lg  xss:text-mdss">{t('Total')}</p>
                            <p aria-hidden="true" className="font-bold text-black text-lg  xss:text-mdss" aria-label={`${total} USD`}>{total} USD</p>
                        </div>
                        </div>
                        <p >{t('Paid with')}</p>
                        <div className="flex flex-row w-full justify-between">
                            <span className="flex" aria-label={accountTypeToUpper}> {accountTypeToUpper === "Credit Card" ? <CardDisplay square={false} expand={true} number={cardNumber}/> : <img className="w-9 h-6" src={IMAGES.PAYMENT.PAYPAL_ICON}/> } <span className="ml-2">{accountTypeToUpper}</span> </span>
                            <p aria-label={`${total} USD`}>{total} USD</p>
                        </div>
                        
                        <div className="pt-2">
                            <hr />
                            <p className="text-xs text-center mt-6" aria-label="The receipt has been sent to your email.">{t('The receipt has been sent to your email.')}</p>
                        </div>
                        {/*  To be applied after Microsoft Testing
                            <button className="font-bold text-secondary text-lg mt-5" aria-label="Download as PDF Button" onClick={getPDFInvoice} onMouseUp={showPDFToast}>Download as PDF</button>
                        */}
                        <div className="pt-2">
                           {sendToEmail()}
                       </div> 
                    
                </div>
            </div>
        </div>
    )
};

export default Receipt;
