import React, { useEffect, useState} from 'react'
import { CLASSES } from "../../utility/classes";
import { GET, IMAGES } from "../../utility/constants";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getLocalStorageItem, setLocalStorageItem } from "../../service/helper";
import { useTranslation } from 'react-i18next';

const Privacy = (props) => {
    const { setHasLoaded, renderSr} = props;
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { t } = useTranslation(["payment_method"]);

    useEffect(() => {
        setHasLoaded(true);
        window.scrollTo(0, 0)
    }, [])

    const paypalToOrderReview = () => {
        if (searchParams.get("coupon") === null) {
            navigate(`/orderreview`);
            setLocalStorageItem('paypal',true);
        } else {
            navigate(`/orderreview?coupon=${searchParams.get("coupon")}`);
            setLocalStorageItem('paypal',true);
        }
    }

    const paymentToCreditOrDebit = () => {
        if (searchParams.get("coupon") === null) {
            navigate(`/payment`);
            setLocalStorageItem('paypal',false);
        } else {
            navigate(`/payment?coupon=${searchParams.get("coupon")}`)
            setLocalStorageItem('paypal',false);
        }
        
    }

    return (
        
        <div className='mt-2'>
            
                
            { renderSr() }
          
            <div className={CLASSES.container}>
                <div className={`${CLASSES.main}`}>
                <h2 className="font-bold text-base text-secondary mb-5 ml-3" aria-label="Payment Method">{t('Payment Method')}</h2>
                    
                    <div className="flex flex-col space-y-8">
                   
                        <div className={`${CLASSES.roundedCard} flex flex-row ml-1 border border-gray-500 border-opacity-25 py-5 cursor-pointer`} role="button" key={`Credit Card`} onClick={paymentToCreditOrDebit}>
             
                                    <img className="object-cover w-10 h-7 rounded-md float-right " src={IMAGES.CREDITCARDLOGO} alt={`Ramen`} aria-label="Credit Card Logo" />
                         
                            <div className="w-full m-auto text-left ml-4">
                                <div className=" flex">
                                    <h1 className="font-bold mr-2 flex-1 text-sm text-gray-500 align-middle xss:text-mdss" role="dialog" aria-label={`CREDIT CARD`}>{t(`Credit or Debit Card`)}</h1>
                                </div>
                            </div>
                        </div>    
                        <div className={`${CLASSES.roundedCard} flex flex-row ml-1 border border-gray-500 border-opacity-25 py-5 cursor-pointer`} role="button" key={`Paypal`} onClick={paypalToOrderReview}>
             
                                    <img className="object-cover w-7 h-7 rounded-md float-right " src={IMAGES.PAYPALLOGO} alt={`Ramen`} aria-label="Paypal" />
                         
                            <div className="w-full m-auto text-left ml-4">
                                <div className=" flex">
                                    <h1 className="font-bold mr-2 flex-1 text-sm text-gray-500 align-middle xss:text-mdss" role="dialog" aria-label={`Paypal`}>{t(`Paypal`)}</h1>
                                </div>
                            </div>
                        </div>    
                        
                    </div>
                </div>
                
            </div>
            

           
              

        </div>
    )
}


export default Privacy
