import React, { useEffect, useRef, useState, useContext } from "react";
import api from "../../service/api";
import { request } from "../../service/request";
import { CLASSES } from "../../utility/classes";
import { DELETE, IMAGES, PATCH, GET } from "../../utility/constants";
import { AddOrder, MinusOrder } from "../../utility/icons";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/authContext";


const OrderCard = (props) => {
    const { orderId, productId, productOrderId, quantity, name, description, subtotal, getInvoices, vendingMachineId, getComputation, toast, setHasLoaded, renderCouponTotal, deleteCoupon } = props;
    const orderRef = useRef(null);
    const { user } = useContext(AuthContext)?.state;
    const [ cartHolder, setCartHolder] = useState(0);
	const { t } = useTranslation(["order"]);
    const [ product, setProduct ]   = useState({});
    const [ disabled, setDisabled ]   = useState(true);
    const [ maxStock, setMaxStock ]   = useState(false);

    useEffect(() => {
        
        getProductDetails();
        buttonState();
        
    }, [getComputation]);

    useEffect(() => {
        
        buttonState();
        
    }, [product,cartHolder]);

    useEffect(() => {
        request({
            url     : api.CART_ITEMS,
            method  : GET,
            params  : {
				userId: user.userId,
            }
		}).then(response => {
            let cartDataHolder     = response.data;
            let cartCounter        = null;
            let cartQuantityHolder = null;
            cartDataHolder.forEach(index => {
                 cartCounter = index.quantity;
                 cartQuantityHolder += cartCounter; 
            });    
            setCartHolder(cartQuantityHolder);
		});
    })

    const getProductDetails = () => {
        request({
            url: `${api.PRODUCTS}/findById`,
            method: GET,
            params: {
                productId : productId
            }
        }).then(response => {
            const data = response.data
            setProduct(data);

        }).catch(error => {
            const { response } = error;
            console.log(response);
        })
    }
    const updateProductOrder = (config) => {
        request({
            ...config
        }).then(() => {
            getInvoices();
        }).catch(error => {
            const { response } = error;
            console.log(`${response.config.method.toUpperCase()} ${response.config.url}`, response);
        });
    }
    const handleIncrement = () => {
        getComputation();
       setDisabled(true)
        try {
            let updatedQuantity = quantity + 1;
        
            if(updatedQuantity < 5) {
                quantity + 1;
                getComputation();
                renderCouponTotal();
                }
                else {
                quantity = 4;   
                }
                
            updateProductOrder({
                url   : `${api.PRODUCT_ORDERS}/${productOrderId}`,
                method: PATCH,
                data  : {
                    productid       : productId,
                    order           : `${api.ORDERS}/${orderId}`,
                    quantity        : updatedQuantity,
                    vendingMachineId: vendingMachineId,
                }
            })
            toast('Success', 'Order has been added.');;
          } catch (err) {   
           
                buttonState();
           
          }
    }

    const restartFocusOnRemoval = (qty) => {
        if(!qty) {
        let delayDebounce;
            delayDebounce = setTimeout(() => {
                if(orderRef && orderRef.current){
                    orderRef.current.focus();
                }
            }, 4000);
            return () => {
                delayDebounce && clearTimeout(delayDebounce)
            }
        }
    }


    const handleDecrement = () => {
        getComputation();
        setDisabled(true)
        const updatedQuantity = quantity - 1;
        let config          = {
            url: `${api.PRODUCT_ORDERS}/${productOrderId}`
        }

        if (updatedQuantity > 0) {
            getComputation();
            renderCouponTotal();
            config.method = PATCH;
            config.data   = {
                productId       : productId,
                order           : `${api.ORDERS}/${orderId}`,
                quantity        : updatedQuantity,
                vendingMachineId: vendingMachineId,
            };
        } else {
            config.method = DELETE;
            localStorage.removeItem("vmIdHolder");
        }
       
        updateProductOrder(config);
        restartFocusOnRemoval(updatedQuantity)
        if(!updatedQuantity) {
            let delayDebounce;
            delayDebounce = setTimeout(() => {
                toast('Success', 'Order has been removed from cart.');
            }, 1500);
            return () => {
                delayDebounce && clearTimeout(delayDebounce)
            }
            }
            buttonState();
    }

    const buttonState = () => {
        // setTimeout(() => {
            
            
            
        if(cartHolder >= 4){
            setDisabled(true);
            setMaxStock(true)
        }
        else if (quantity >= product.quantity){
            setDisabled(true)
            setMaxStock(true)
        }
        else {
            setDisabled(false)
            setMaxStock(false)
        }
        // }, 2000);
    }
    
    return (
        <>
            <div className={`${CLASSES.roundedCard} flex flex-row border border-gray-500 border-opacity-5 py-2 xss:flex-col`}>
                <div className="pb-1">
                    <img className="object-cover w-26 h-24 rounded-xl xss:w-full" src={IMAGES.MENU[name]} alt={name} aria-label={name + "image"} />
                </div>
                <div className="w-3/4 m-auto pl-2 pb-1">
                    <div className="flex-col flex-grow w-full xss:space-y-2">
                        
                        <p className="w-9/12 font-bold text-sm text-secondary mr-2 xss:text-mdss xss:w-full" aria-label={name} ref={orderRef} tabIndex={0}>{t(name)}</p>
                        <p className="font-light text-xs tracking-tight xss:text-mdss xss:w-full" aria-label={description}>{'('}{t(description)}{')'}</p>
                        <div className="relative">
                            <p className="absolute -top-8 right-0 text-xs text-secondary object-right xss:text-mdss xss:w-full xss:static" aria-label={`${subtotal.toFixed(2)} USD`}>{`${subtotal.toFixed(2)} USD`}</p>
                        </div>
                    </div>
                   
                    <div className="flex flex-row space-x-1 mt-2 items-center">
                        <button
                            className="rounded-full mt-1 cursor-pointer"
                            onClick={handleDecrement}
                            aria-label={`Minus Icon - Remove One ${name}. ${quantity <= 1 ? "Remove Order" : ""}`}
                        >
                            <MinusOrder className="w-8 h-8" />
                        </button>
                        <input
                            className={`drop-shadow-primary border border-gray-50 border-opacity-40 mt-1 px-1 w-9 h-9 rounded-md text-base text-secondary font-semibold text-center`}
                            name="orderQuantity"
                            type="number"
                            min={1}
                            max={4}
                            readOnly={true}
                            value={quantity}
                            onChange={() => { console.log("test") }}
                            aria-readonly={true}
                            aria-label="Quantity"
                            aria-hidden={true}
                        />
                        <p id="quantity-label" className="sr-only">{`Quantity: ${quantity}`}</p>
                        <button
                            className={`rounded-full mt-1 cursor-pointer`}
                            onClick={handleIncrement}
                            aria-label={cartHolder >= 4 ? "Maximum quantity reached." : `Add Icon - Add One ${name}`}
                            disabled={cartHolder >= 4 ?true : disabled }
                        >
                            <AddOrder className={`${cartHolder >= 4 ? 'opacity-40' : 'opacity-100'} w-8 h-8`} />
                        </button>
                        {maxStock ?
                        <div className="relative w-30">
                            <p className="absolute -top-3 left-3 text-xs px-1 text-secondary object-right xss:text-mdss xss:w-full xss:static" aria-label='max stock reached'>Max stock reached</p>
                        </div>
                        :
                        <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default OrderCard;