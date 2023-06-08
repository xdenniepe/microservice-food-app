import React, { useEffect, useContext, useRef, useState } from "react";
import { Button } from "../../components/common";
import { CLASSES } from "../../utility/classes";
import { CloseCircle } from "../../utility/icons";
import { GET, POST } from "../../utility/constants";
import { getSumOfArray } from "../../service/helper";
import { Link } from "react-router-dom";
import { OrderContext } from "../../context/orderContext";
import { request } from "../../service/request";
import { UPDATE_INVOICES } from "../../reducer/orderReducer";
import api from "../../service/api";
import EmptyCart from "../../components/emptystate/empty-cart";
import OrderCard from "../../components/order-card";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import { LocationContext } from "../../context/locationContext";
import RemoveAllProduct from "../../components/modal/remove-all-product";
import { IMAGES } from "../../utility/constants";



const Order = (props) => {
    const { toast, setHasLoaded, renderSr }    = props;
    const { state, dispatch }                  = useContext(OrderContext);
    const { user }                             = useContext(AuthContext)?.state;

    const locationContext   = useContext(LocationContext);
    const vmAddress         = locationContext.state.vmAddress;

    const couponCode          = useRef(null);
    const couponRef           = useRef(null);
    const deleteCoupon        = useRef(null);

    const totalraw    = getSumOfArray(state?.invoices?.map(invoice => invoice.total), 2);
    const subtotal = getSumOfArray(state?.invoices?.map(invoice => invoice.subtotal), 2);
    const tax      = (totalraw - subtotal).toFixed(2);

    const [enteredCoupon, setEnteredCoupon] = useState('');
    const [apply, setApply]                 = useState(false);
    const [couponInvalid, setCouponInvalid] = useState('');
    const [tempCoupon, setTempCoupon]       = useState('$0.00');
    const [tempTotal, setTempTotal]      = useState(parseFloat(totalraw));
    const [coupon, setCoupon]               = useState(null);
    const [code, setCode]                   = useState(null);
    const [isCouponInputHidden, setIsCouponInputHidden] = useState(false);
    const [discountVisibility, setDiscountVisibility]   = useState('');
    const [isDialogHidden, setIsDialogHidden]           = useState(true);
    const [isOrderPage, setIsOrderPage]                 = useState(true)
    const [discountTax, setDiscountTax]     = useState(tax);

    const [ userReward, setUserReward ]   = useState(0);
    const [ userDiscount, setUserDiscount ]   = useState(0);
    

    const userId = user.userId;
	const { t } = useTranslation(["order"]);



    useEffect(() => {
        setHasLoaded(true);
    }, [])
    
    useEffect(() => {
        window.scrollTo(0, 0)
        getCouponMessage();
        getComputation();
        getUserReward();
        checkLoyaltyTier();
        checkDiscount();
        checkLoyaltyPoints();
    }, [coupon, totalraw, tempTotal])

    useEffect(() => {
        computeDiscountFromRewards();
        discountVisible();

    }, [userReward]);
    
    const labelProp = {
        buttonlabel: "Redeem Button - Activate Coupon Code"
    }

    const getUserReward = () => {
        request({
            url: api.USERSREWARDS+userId,
            method: GET,
        }).then(response => {
            if(response.data == null){
                setUserReward(0)
            }
            else{
            setUserReward(response.data);
            }
        })
    }


    const computeDiscountFromRewards = () =>{
        if(userReward.percentage > 0 && userReward.percentage !== null){
            setDiscountTax(((subtotal - (subtotal * (userReward.percentage/100)))*.1).toFixed(2));
            setUserDiscount((subtotal * (userReward.percentage/100)).toFixed(2));

            //because total is predetermined with 10% tax first we get the initial subtotal which is total - tax then
                //add the discounted tax which is total - computed percentage multiply by 0.1 then 
                //we will subtract the computed discount
                setTempTotal(((totalraw - (tax) + ((subtotal - (subtotal * (userReward.percentage/100)))*.1)) - (subtotal * (userReward.percentage/100))).toFixed(2));
        }
    }

        //check if discount is existing
            const checkDiscount = () =>{
                request({
                    url: api.USERSREWARDS+userId,
                    method: GET,
                }).then(response => {
                    if(response.data == null){
                        request({
                            url: api.CREATEUSERDISCOUNT,
                            method: POST,
                            data:
                            {
                                userId: userId,
                                percentage : 0
                                
                            }
                        
                    })
                    }

                    else{
                        console.log('existing')
                    }
                })
        }

        //check if loyaltyPoints is existing
        const checkLoyaltyPoints = () =>{
            request({
                url: api.LOYALTY+userId,
                method: GET,
            }).then(response => {
                if(response.data == null){
                    request({
                        url: api.CREATELOYALTYPOINTS,
                        method: POST,
                        data:
                        {
                            userId: userId,
                            points : 0
                            
                        }
                    
                })
                }

                else{
                    console.log('existing')
                }
            })
        }

    //check if Order Count is existing
    const checkLoyaltyTier = () =>{
        request({
            url: api.TOTALMONEYSPENT+userId,
            method: GET,
        }).then(response => {
            if(response.data == null){
                request({
                    url: api.CREATETOTALMONEYSPENT,
                    method: POST,
                    data:
                    {
                        userId: userId,
                        totalSpending : 0
                        
                    }
                
            })
            }

            else{
                console.log('existing')
            }
        })
}


	const getInvoices = () => {
		request({
            url     : api.CART_ITEMS,
            method  : GET,
            params  : {
                userId: state?.order?.userId
            }
		}).then(response => {
            console.log(`${response.config.method.toUpperCase()} ${response.config.url}`, response);   
            
            dispatch({
                type   : UPDATE_INVOICES,
                payload: response.data
            });
		}).catch(error => {
            const { response } = error;
            console.log(`${response.config.method.toUpperCase()} ${response.config.url}`, response);
		});
	}

    const handleChange = (event) => {
        const result = event.target.value.replace(/[^a-z0-9]/gi, '');
        setEnteredCoupon(result);

        if (couponCode.current.value.length === 8) {
            setApply(true)
            setCode(couponCode.current.value)
        } else {
            setApply(false)
            setCouponInvalid('')
        }
    }
    const getComputation = () => {
        if (coupon) {
            if (coupon.amount) {
                if (subtotal - coupon.amount > 0) {
                    setDiscountTax(((subtotal - coupon.amount)*.1).toFixed(2))
                    setTempTotal(((totalraw - (tax) + ((subtotal - coupon.amount)*.1)) - coupon.amount).toFixed(2));

                } else {
                    setTempTotal(0)
                }
                
                setTempCoupon("- $" + coupon.amount.toFixed(2));
            } else if (coupon.percentage) {
                const computedPercentage = subtotal * (coupon.percentage/100)
                setDiscountTax((((subtotal - computedPercentage) * .1)).toFixed(2))
                //because total is predetermined with 10% tax first we get the initial subtotal which is total - tax then
                //add the discounted tax which is total - computed percentage multiply by 0.1 then 
                //we will subtract the computed discount
                setTempTotal(((totalraw - (tax) + ((subtotal - computedPercentage)*.1)) - computedPercentage).toFixed(2));

                setTempCoupon(coupon.percentage + "%");
            } 
        }
        else{
            setDiscountTax(tax)
        }
    }

    const couponUseRef = () => {
        if(couponRef && couponRef.current){
            couponRef.current.focus();
        }
    }

    const handleApplyCoupon = () => {
         if(user.percentage === 0){
            setCouponInvalid('')
            request({
                url: `${api.COUPONS}/findByCouponCode?`,
                method: GET,
                params: {
                    couponCode: couponCode.current.value
                }
            }).then(response => {
                const currentTime = Math.floor(new Date().getTime()/1000);
                if (currentTime <= response.data.expirationDate) {
                    // check number of times coupon has been used
                    request({
                        url: `${api.COUPONS_SEARCH}/countByCouponCode?`,
                        method: GET,
                        params: {
                            couponCode: couponCode.current.value,
                        }
                    }).then(couponCount => {
                        if (response.data.amount > subtotal){
                            setCouponInvalid('Coupon has exceeded your subtotal. Please try again.')
                        }
                       else if (couponCount.data <= response.data.timesUsed) {
                            setCoupon(response.data);
                            couponUseRef();

                        } else {
                            setCouponInvalid('Coupon has reached its max number of redemptions.')
                            couponUseRef()
                        }
    
                    }).catch(error => {
                        console.log(error)
    
                    })
    
                } else {
                    setCouponInvalid('Coupon is already expired.')
                    couponUseRef()
                }
    
            }).catch(error => {
                setCouponInvalid('Coupon code does not exist. Please check if the code is correct.')
                console.log(error);
                couponUseRef()
            });
        }
       
        else{
            toast('Error', `Unable to apply Coupon due to existing active reward.`)
        }
    }
    const getPaymentLink = () => {
        if (code && coupon) {
            return `/paymentmethod?coupon=${code}`
        } else {
            return `/paymentmethod`
        }
    }

    const getCouponMessage = () => {

        if (coupon) {
            return (
                <>
                <div className="relative absolute bg-white drop-shadow-container mx-2 rounded-md px-4 py-4 my-5 space-y-5">
                <div className="space-y-1">
                    <div className="flex flex-row w-full justify-between">
                        <p className="text-secondary font-semibold text-sm whitespace-nowrap xss:text-xxs xss:w-32 xss:truncate" ref={couponRef} tabIndex={0}>{t('Gift Coupon Discount')}</p>
                        <p className={`text-gray-500 font-semibold text-sm ml-8 whitespace-nowrap absolute right-12 xxs:static xxs:ml-5 xss:text-xxs xss:static`} > 
                            <span>{coupon.amount ? ` -${coupon.amount.toFixed()} USD ` : ''}</span>
                            <span>{coupon.percentage ? ` -${tempCoupon} ` : ''}</span>      
                        </p>
                        <button onClick={removeCoupon}><CloseCircle className="h-5 w-5" aria-label="Delete button" role="button"/></button>
                    </div>
                </div>                   
            </div>
            </>
            )
        } else {
            return (
                <>
                 <p className={`text-error text-md mx-5 mt-5 text-center`} ref={couponRef} aria-live="assertive" aria-hidden={couponInvalid == '' ? true : false}>{couponInvalid}</p>
                </>
            )
        }
    }

    const renderCouponTotal = () => (

        coupon ? `${tempTotal} USD`: `${tempTotal} USD`
    )

    const renderCouponCodeInput = () => (
        coupon ? 
            null
        :
            <div className="flex flex-row w-full justify-between mt-10 mb-8 xss:flex-col xss:space-y-3">
                <div className={
                    !couponInvalid ? 
                        `relative border-b text-base border-gray-500 focus-within:border-gray-500`
                    :
                        `relative border-b text-base border-error focus-within:border-error`
                }>
                    
                    <input
                        ref={couponCode}
                        className={`block appearance-none placeholder-gray-500 focus:outline-none bg-transparent w-42 h-8 rounded-md text-sm font-semibold text-gray-500 text-center border-none xxs:w-36 xss:text-mdss`}
                        name="couponCode"
                        placeholder={t('Enter Coupon Code')}
                        type="text"
                        maxLength={8}
                        onChange={handleChange}
                        value={enteredCoupon} 
                        aria-hidden="false"
                        tabIndex={0}
                    />
                </div>
                <Button
                    type="submit"
                    label={t("Redeem")}
                    aria-describedby="coupon-redeem"
                    className={`relative cursor-pointer text-secondary -mr-2 p-2 px-4 border 
                        shadow-xs text-sm text-center focus:outline-none disabled:opacity-50 rounded-lg
                        border-secondary font-light`}
                    onClick={handleApplyCoupon}
                    disabled={!apply}
                    aria-hidden="false"
                    props = { labelProp }
                />
            </div>
    )

    const removeCoupon = () => {
        setDiscountTax((totalraw - subtotal).toFixed(2));
        let delayDebounce;
        setCoupon(null);
        setTempTotal((totalraw - 0).toFixed(2))
        if(deleteCoupon && deleteCoupon.current){
            deleteCoupon.current.focus();
        }
        renderCouponCodeInput()
 
		setIsCouponInputHidden(true)
		delayDebounce = setTimeout(() => {
            setIsCouponInputHidden(false);
        }, 0);

        return () => {
            delayDebounce && clearTimeout(delayDebounce)
        }
    
    }

    const discountVisible = () => {
        if(userReward.percentage == 0 || userReward.percentage == null){
            setDiscountVisibility('hidden');
        }
        else{
            setDiscountVisibility('');
        }
    }

    const showModal = () => {
        setIsDialogHidden(false)
    }
    
      

    return (
        totalraw <= 0 ?
            <>
                { renderSr() }
                <EmptyCart setHasLoaded={setHasLoaded} />
            </>
        :
            <div className={CLASSES.container}>
                <RemoveAllProduct setIsDialogHidden={setIsDialogHidden} isDialogHidden={isDialogHidden}  isOrderPage={isOrderPage}/>
                <div className={CLASSES.main}>
                    { renderSr() }
                    <div className="space-y-3">
                        <div className="flex flex-row border border-gray-500 border-opacity-5 bg-white drop-shadow-container mx-2 rounded-md px-4 pt-4 mb-5">
                            <div className="pb-1">
                                <img className="object-cover w-10 h-10 xss:w-full" src={IMAGES.MAPICON}/>
                            </div>
                            <div className="w-3/4 m-auto pl-2 pb-1">
                                <div className="flex-col flex-grow w-full xss:space-y-2">
                                
                                    <p className="text-sm font-semibold text-gray-500 " aria-label="Pick Up Order At">Pick Up Order At</p>
                                    <div className="relative">
                                        <p className="absolute text-secondary -top-7 -right-4 text-sm object-right" onClick={showModal}><u><strong>Edit</strong></u></p>
                                    </div>
                                    <p className="text-gray-500 text-md">{`${vmAddress}`}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {
                            state.invoices.map((invoice, index) => {
                                return (
                                    <OrderCard key={index} {...invoice} getInvoices={getInvoices} getComputation={getComputation} toast={toast} setHasLoaded={setHasLoaded} renderCouponTotal={renderCouponTotal}/>
                                )
                            })
                        }
                    </div>
                    <div className="bg-white drop-shadow-container mx-2 mt-10 rounded-md px-4 pt-4 space-y-5" hidden={isCouponInputHidden}>
                        <div className="space-y-1">
                            <div className="flex flex-row w-full justify-between">
                                <p className="text-secondary font-semibold text-sm" aria-label="Subtotal" ref={deleteCoupon} tabIndex={0}>{t('Subtotal')}</p>
                                <p className="text-xs text-black" aria-label={`${subtotal} USD`}>{`${subtotal} USD`}</p>
                            </div>
                            <div className="flex flex-row w-full justify-between">
                                <div className="flex flex-row">
                                    <p className="text-secondary font-semibold text-sm" aria-label="Taxes">{t('Taxes')}</p>
                                </div>
                                <p className="text-xs text-black" aria-label={`${discountTax} USD`}>{`${discountTax} USD`}</p>
                            </div>
                            <div className={`flex flex-row w-full justify-between ${discountVisibility}`}>
                                <div className="flex flex-row">
                                    <p className="text-secondary font-semibold text-sm" aria-label="Discount">{t('Discount')}</p>
                                </div>
                                <p className="text-xs text-black" aria-label={`10% off`}>{`(${userReward.percentage}% off) -${userDiscount} USD`}</p>
                            </div>
                            <div className="flex flex-row w-full justify-between">
                                <p className="text-secondary font-semibold text-sm" aria-label="Total">{t('Total')}</p>
                                <p className="text-xs text-black font-semibold" aria-label={`${renderCouponTotal()} USD`}>
                                    { renderCouponTotal() }
                                </p>
                            </div>
                        </div> 
                        <div className="">
                            { renderCouponCodeInput() }
                        </div>
                    </div> 
                        { getCouponMessage() }
                    <div className="relative mt-4">
                        <div className="sticky bottom-0">
                            <Link to={getPaymentLink()} className={`${CLASSES.buttonDefault} flex items-center py-3 px-4 text-white font-semibold justify-center xss:h-8 xss:text-xxs xss:items-center xss:flex xss:justify-center`} role="button" aria-label="Begin Checkout Button">
                                {t('Begin Checkout')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Order;

