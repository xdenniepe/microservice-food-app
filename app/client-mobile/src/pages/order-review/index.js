import React, { useState, useEffect, useContext } from "react";
import { CLASSES } from "../../utility/classes";
import { GET, IMAGES,PUT } from "../../utility/constants";
import { getLocalStorageItem, getSumOfArray } from "../../service/helper";
import { OrderContext } from "../../context/orderContext";
import { request } from "../../service/request";
import { useLocation, useSearchParams } from "react-router-dom";
import api from "../../service/api";
import BraintreeDropIn from "../../components/form/payment";
import clsx from "clsx";
import OrderDetail from "../../components/order-detail";
import PaymentContextProvider from "../../context/paymentContext";
import PaymentMethod from "../../components/payment-method";
import PaymentMethodPaypal from "../../components/payment-method/paypal";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import { LocationContext } from "../../context/locationContext";



const dummyPaymentMethods = [
    {
        id      : 1,
        selected: true,
        last4   : '0000',
    },
    {
        id      : 2,
        selected: false,
        last4   : '1234',
    },
];

const OrderReview = (props) => {
    const { setHasLoaded, renderSr, toast }         = props;
    const [ searchParams, setSearchParams ] = useSearchParams();
    const  location  = useLocation();
    const { state }                         = useContext(OrderContext);

    const [orders, setOrders]                 = useState([]);
    const [paymentMethods, setPaymentMethods] = useState(dummyPaymentMethods);
    const [coupon, setCoupon]                 = useState(null);
    const [total, setTotal]                   = useState(0);
    const [discountVisibility, setDiscountVisibility] = useState('');


    const subtotal     = getSumOfArray(state?.invoices?.map(invoice => invoice.subtotal), 2);
    const partialTotal  = getSumOfArray(state?.invoices?.map(invoice => invoice.total), 2);
    const tax           = (partialTotal - subtotal).toFixed(2);
    const [discountTax, setDiscountTax] = useState(tax)
    const credentials   = getLocalStorageItem('payment');
    const paypalBoolean = getLocalStorageItem('paypal');
    const locationContext   = useContext(LocationContext);
    const vmAddress     = locationContext.state.vmAddress;
    const { user }                             = useContext(AuthContext)?.state;
    const userId = user.userId;


    //discount computationS
    const [ userReward, setUserReward ]   = useState([]);
    const [ userDiscount, setUserDiscount ]   = useState(0);
    
    

    const { t } = useTranslation('order_review');

    //loyalty program
    const [loyaltyPoints, setLoyaltyPoints]       = useState([]);
    const [calculate, setCalculate]               = useState(0);
    const [totalSpending, setTotalSpending]               = useState([]);
    const [tier1,   setTier1]               = useState(0);
    const [tier2, setTier2]               = useState(0);
    const [tier3, setTier3]               = useState(0);
    const [tier4, setTier4]               = useState(0);

    
    useEffect(() => {
        window.scrollTo(0, 0);
        getInvoices();

        //get user discount
        getUserReward();

        //if discount is 0% the dicount word will not be visible
        discountVisible();

        //get loyalty points from database
        getLoyaltyPoints();

        //get the list of Loyalty tier to know how much points to be added
        getLoyaltyTierList();

        //calculate the points to be added if the user checkout
        calculatePoints(total);

        //get total money spent in database
        getTotalSpending();
        
        
        
        if(searchParams.get("coupon")) {
            getCouponInfo(); 
        } else {
            setTotal(partialTotal);
        }
        setHasLoaded(true);

    }, [loyaltyPoints, calculate, totalSpending, total, discountTax])


    useEffect(() => {
        computeDiscountFromRewards();
        discountVisible();

    }, [userReward]);


    const computeDiscountFromRewards = () =>{
        if(userReward.percentage > 0 && userReward.percentage !== null){
            setDiscountTax(((subtotal - (subtotal * (userReward.percentage/100)))*.1).toFixed(2));
            setUserDiscount((subtotal * (userReward.percentage/100)).toFixed(2));

            //because total is predetermined with 10% tax first we get the initial subtotal which is total - tax then
                //add the discounted tax which is total - computed percentage multiply by 0.1 then 
                //we will subtract the computed discount
                setTotal(((partialTotal - (tax) + ((subtotal - (subtotal * (userReward.percentage/100)))*.1)) - (subtotal * (userReward.percentage/100))).toFixed(2));
        }
    }


    



    //get loyalty points from the database
    const getLoyaltyPoints = () =>{
        request({
            url: api.LOYALTY+userId,
            method: GET,
        }).then(response => {
          setLoyaltyPoints(response.data.points);
        })
    }

    //get loyalty tier list from db to determined the points to be added
    const getLoyaltyTierList = () =>{
        request({
            url: api.LOYALTYTIERLIST+1,
            method: GET,
        }).then(response => {
          setTier1(response.data);
        }).then(
            request({
                url: api.LOYALTYTIERLIST+2,
                method: GET,
            }).then(response => {
              setTier2(response.data);
            })
        ).then(
            request({
                url: api.LOYALTYTIERLIST+3,
                method: GET,
            }).then(response => {
              setTier3(response.data);
            })
        ).then(
            request({
                url: api.LOYALTYTIERLIST+4,
                method: GET,
            }).then(response => {
              setTier4(response.data);
            })
        )
    }


    const calculatePoints = (total)=>{

        //run if user is in tier 1
        if(totalSpending >= tier1.tierLowestMoneySpent && totalSpending <= tier1.tierHighestMoneySpent){
            setCalculate(parseInt(loyaltyPoints) + parseInt(total - discountTax));
        }

        //run if user is in tier 2 that will give 1.1x more points
        else if(totalSpending >= tier2.tierLowestMoneySpent && totalSpending <= tier2.tierHighestMoneySpent){
            setCalculate(parseInt(loyaltyPoints) + parseInt((total - discountTax)*1.1));
        }

        //run if user is in tier 3 that will give 1.2x more points
        else if(totalSpending >= tier3.tierLowestMoneySpent && totalSpending <= tier3.tierHighestMoneySpent){
            setCalculate(parseInt(loyaltyPoints) + parseInt((total - discountTax)*1.2));
        }

        //run if user is in tier 4 that will give 1.3x more points
        else if(totalSpending >= tier4.tierLowestMoneySpent && totalSpending <= tier4.tierHighestMoneySpent){
            setCalculate(parseInt(loyaltyPoints) + parseInt((total - discountTax)*1.3));
        }
        

        
    }
    const resetDiscount = () =>{
        request({
            url: api.USERSUPDATEREWARDS + 0 + '/' + userId,
                method: PUT,
        
            }).then(response => {        
            })
    }

    
    const updateLoyaltyPoints = () =>{
        request({
            url: api.UPDATELOYALTYPOINTS + calculate + '/' + userId,
                method: PUT,
        }).then(response => {
            updateTotalSpending();
            resetDiscount();
            toast('Success', `${t('Loyalty point has been added successfully')}`)
           console.log(calculate);        
        })
    
    }  
 
    const getUserReward = () => {
        request({
            url: api.USERSREWARDS+userId,
            method: GET,
        }).then(response => {
            setUserReward(response.data);
        })
    }

    const getTotalSpending = () => {
        request({
            url: api.TOTALMONEYSPENT+userId,
            method: GET,
        }).then(response => {
          const totalSpending = response.data.totalSpending;
          setTotalSpending(totalSpending);
    
        })
    }


    const updateTotalSpending = () =>{
            const updatedTotalSpent = (parseInt(totalSpending) + parseInt(total));
        
            request({
            url: api.TOTALMONEYSPENT + updatedTotalSpent + '/' + userId,
                method: PUT,
        }).then(response => {
            toast('Success', `${t('Loyalty point has been added successfully')}`)
           console.log(updatedTotalSpent);
        
        })
    
    }  
 

    const renderOrderDetails = () => {
        return orders.map(order => {
            return (
                <OrderDetail
                    key={order.productOrderId}
                    name={order.name}
                    description={order.description}
                    price={order.subtotal}
                    qty={`${t('Quantity')}: ${order.quantity}`}
                    imageSrc={IMAGES.MENU[order.name]}
                />
            )
        });
    }

    /** For Multiple Payment Methods */
    const onPaymentMethodClick = (paymentMethodId) => {
        const updatedPaymentMethods = paymentMethods.map(pm => ({
            ...pm,
            selected: paymentMethodId === pm.id
        }));

        setPaymentMethods(updatedPaymentMethods);
    }

    const renderPaymentMethods = () => {
        // return paymentMethods.map((pm, index) => (
            return (
                <PaymentMethod
                    // key={index}
                    isSelected={true}
                    last4={credentials.ccNumber.toString().slice(-4)}
                    // onClick={() => onPaymentMethodClick(pm.id)}
                />
            )
        // ));
    }

    const renderPaymentMethodsForPaypal = () => {
            return (
                <PaymentMethodPaypal/>
            )
    }

    const getCouponInfo = () => {
        
        request({
            url   : `${api.COUPONS}/findByCouponCode?`,
            method: GET,
            params: {
                couponCode: searchParams.get("coupon")
            }
        }).then(response => {      
            if (response.data.amount) {
                setCoupon(`-${response.data.amount.toFixed(2)} USD`);
                if (partialTotal - response.data.amount > 0) {
                    
                    setDiscountTax(((subtotal - response.data.amount)*.1).toFixed(2))
                    setTotal(((partialTotal - (tax) + ((subtotal - response.data.amount)*.1)) - response.data.amount).toFixed(2))

                } else {
                    setTotal("FREE")
                }
            } else {
                setDiscountTax((((subtotal - (subtotal * (response.data.percentage/100))) * .1)).toFixed(2))
                const computedPercentage = partialTotal * (response.data.percentage/100)
                setCoupon(`${response.data.percentage}%`);
                setTotal((partialTotal - computedPercentage).toFixed(2));           
            }
        })
    }

    const getInvoices = () => {
        request({
            url   : api.CART_ITEMS,
            method: GET,
            params: {
                userId: state.order.userId
            }
        }).then(response => {
            setOrders(response.data);
        }).catch(error => {
            console.log(error);
        });
    }   

    const discountVisible = () => {
        if(userReward.percentage == 0){
            setDiscountVisibility('hidden');
        }
        else{
            setDiscountVisibility('');
        }
    }

    // useEffect(() => {
    //     if(location.pathname === '/receipt') {
    //         console.log("Location: ", location.pathname);
    //         updateLoyaltyPoints();
    //     }        
    //   }, [location]);

    return (
        <PaymentContextProvider>
            <div className={CLASSES.container}>
                <div className={CLASSES.main}>
                    { renderSr() }
                    <h1 className="font-bold text-secondary text-sm mb-1 ml-2">{t('Order Details')}</h1>
                    <div className="space-y-3">
                        <div className="flex flex-row border border-gray-500 border-opacity-5 bg-white drop-shadow-container mx-2 rounded-md px-4 pt-4 mb-5">
                            <div className=" pb-2">
                                <div className="flex-col flex-grow w-full xss:space-y-2">
                                
                                    <p className="text-sm font-semibold text-gray-500 " aria-label="Pick Up Order At">Location</p>
                                    <p className="text-gray-500 text-sm">{`${vmAddress}`}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {renderOrderDetails()}
                    </div>
                    <div className={`${CLASSES.roundedCard} my-4 border border-gray-500 border-opacity-5`}>
                        <div className="flex justify-between">
                            <p className="text-secondary text-sm font-bold" aria-label="Subtotal">{t('Subtotal')}</p>
                            <p className="text-xs" aria-label={`${subtotal} USD`}>{subtotal} USD</p>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-secondary text-sm font-bold inline-flex" aria-label="Taxes">{t('Taxes')}</p>
                            </div>
                            <p className="text-xs" aria-label={`${tax} USD`}>{discountTax} USD</p>
                        </div>
                        <div className={`flex justify-between ${clsx({ 'hidden': !coupon })}`}>
                            <p className="text-secondary text-sm font-bold">Gift Coupon</p>
                            <p className="text-xs">{coupon}</p>
                        </div>
                        <div className={`flex flex-row w-full justify-between ${discountVisibility}`}>
                                <div className="flex flex-row">
                                    <p className="text-secondary font-semibold text-sm" aria-label="Discount">{t('Discount')}</p>
                                </div>
                                <p className="text-xs text-black" aria-label={`10% off`}>{`(${userReward.percentage}% off) -${userDiscount} USD`}</p>
                            </div>
                        <div className="flex justify-between mt-2">
                            <p className="text-secondary text-sm font-bold" aria-label="Total">{t('Total')}</p>
                            <p className="text-xs font-bold" aria-label={`${total} USD`}>{total} USD</p>
                        </div>
                    </div>
                    <h1 className="font-bold text-secondary text-sm mb-1 ml-2 mt-4">{t('Payment Method')}</h1>
                    <div className={`${CLASSES.roundedCard} pb-8 border border-gray-500 border-opacity-5`}>
                        {paypalBoolean === false ? renderPaymentMethods() : renderPaymentMethodsForPaypal()}
                    </div>
                    <div className="mt-10 flex items-center justify-center">
                    
                        {/* <button onClick={updateLoyaltyPoints} className='w-full'> */}
                            <BraintreeDropIn show={false} updateLoyaltyPoints={updateLoyaltyPoints} coupon={searchParams.get("coupon")} toast={toast}/>
                        {/* </button> */}
                    </div>
                </div>  
            </div>
        </PaymentContextProvider>
    );
};

export default OrderReview;