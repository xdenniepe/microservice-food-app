import React, { useEffect, useState, useContext } from "react";
import { AddOrder, MinusOrder } from "../../utility/icons";
import { CLASSES } from "../../utility/classes";
import { GET, IMAGES, PATCH, POST, INGREDIENTS, NF_LABELS, ALLERGENS } from "../../utility/constants";
import { OrderContext } from "../../context/orderContext";
import { request } from "../../service/request";
import { UPDATE_INVOICES } from "../../reducer/orderReducer";
import { useParams, Link } from "react-router-dom";
import api from "../../service/api";
import { getLocalStorageItem, setLocalStorageItem  } from "../../service/helper";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";


const Product = (props) => {
    const params = useParams();
    const { toast, setHasLoaded, renderSr }   = props;
    const [ product, setProduct ]   = useState({});
    const [ quantity, setQuantity ] = useState(1);
    const [ disabled, setDisabled ] = useState(false);
    const { state, dispatch }       = useContext(OrderContext);
    const invoices = getLocalStorageItem('invoices');
    const [ selectedIndex, setSelectedIndex ] = useState(null);
    const { user } = useContext(AuthContext)?.state;
    const locStore = getLocalStorageItem("vmIdHolder");
    const [ cartHolder, setCartHolder] = useState(0);
	const { t } = useTranslation(["product"]);
    const [cartProductQuantity, setCartProductQuantity] = useState(0);
    let quantityHolder = '';

    useEffect(() => {
        setHasLoaded(true);
        window.scrollTo(0, 0)
        getProductDetails();
        if(invoices) {
            const getCurrentIndex = invoices.findIndex((res) => res.productId == params.id);
            setSelectedIndex(getCurrentIndex)
        }
    }, []);

    useEffect(() => {
        
        getCartProductQuantity();
        
    }, [product]);
    
    const getProductDetails = () => {
        request({
            url: `${api.PRODUCTS}/findById`,
            method: GET,
            params: {
                productId : params.id
            }
        }).then(response => {
            const data = response.data
            setProduct(data);

        }).catch(error => {
            const { response } = error;
            console.log(response);
        })
    }

    useEffect(() => {
		request({
            url     : api.CART_ITEMS,
            method  : GET,
            params  : {
				userId: user.userId,
            }
		}).then(response => {
			if(response.data.length === 0){
				localStorage.removeItem("vmIdHolder");
			}
            let cartDataHolder     = response.data;
            let cartCounter        = null;
            let cartQuantityHolder = null;
            cartDataHolder.forEach(index => {
                 cartCounter = index.quantity;
                 cartQuantityHolder += cartCounter; 
            });    
            setCartHolder(cartQuantityHolder);  
		});
	});
    const getCartProductQuantity = () =>{

        const orderId           = state?.order.orderId;
        const productId         = product?.productId;
        request({
            url   : `${api.PRODUCT_ORDERS}/search/findProductOrder?`,
            method: GET,
            params: {
                productId : productId,
                orderId   : orderId,
            }

        }).then(response => {
            setCartProductQuantity(response.data.quantity);
        })
    }

   
    const getOrder = (product) => {
        
        const orderId           = state?.order.orderId;
        const orderUrl          = state?.order._links.self.href;
        const productId         = product?.productId;
        const productVMachineId = product?.vendingMachineId;

        request({
            url   : `${api.PRODUCT_ORDERS}/search/findProductOrder?`,
            method: GET,
            params: {
                productId : productId,
                orderId   : orderId,
            }

        }).then(response => {
            quantityHolder = response.data.quantity + cartHolder;
            if(quantity > product.quantity - cartProductQuantity){
                toast('Error', 'Sorry not enough stock');
            }
            else if(quantityHolder > 4){
                toast('Error', t('Maximum order has been reached.'));
            }else{
            const url = response.data?._links?.self?.href.split("/", 6)
            console.log(url, url[5]);
            if(response.data.quantity < 4 ) {
            request({
                url   : `${api.PRODUCT_ORDERS}/${url[5]}`,
                method: PATCH,
                data  : {
                    productId       : response.data.productId,
                    order           : `${api.ORDERS}/${orderId}`,
                    quantity        : response.data.quantity + quantity,
                    vendingMachineId: response.data.vendingMachineId,
                }
            }).then(() => {
                getInvoices();
                toast('Success', t('Order has been added to your cart.') );
            }).catch(error => {
                const { response } = error;
                console.log(response);
                toast('Error', t('Network error, try again later.'));
            });
        }
        else {
            toast('Error', t('Maximum order has been reached.'));
        }}
        }).catch(error => {
            quantityHolder = quantity + cartHolder;
            if(quantityHolder > 4){
                toast('Error', t('Maximum order has been reached.'));
            }else{

            console.log(error);
            console.log("error from findProductOrder -> ", error);
            const ourl = orderUrl.split("/", 6)
            console.log(orderUrl, ourl[5]);
            if(locStore !== productVMachineId && locStore !== undefined){
                    toast('Error', t('You need to empty your cart first.'));
            }else{
                 request({
                    url   : api.PRODUCT_ORDERS,
                    method: POST,
                    data  : {
                    productId       : productId,
                    order           : `${api.ORDERS}/${ourl[5]}`,
                    quantity        : quantity,
                    vendingMachineId: productVMachineId,
                    }
                }).then((response) => {

                    setLocalStorageItem("vmIdHolder",response.data.vendingMachineId);
                    getInvoices();
                    toast('Success', t('Order has been added to your cart.'));
                    
                }).catch(error => {
                    console.log(error);
                    toast('Error', t('Network error, try again later.'));
                });
                }

            }        
            })
        }
    

    const getInvoices = () => {
		request({
            url     : api.CART_ITEMS,
            method  : GET,
            params  : {
                userId : state.order.userId,
            }
		}).then(response => {
            dispatch({
                type    : UPDATE_INVOICES,
                payload : response.data
            });
		}).catch(error => {
            const { response } = error;
            console.log(response);
		});
	}


    const handleIncrement = () => {
        if(quantity >= product.quantity - cartProductQuantity){
            toast('Error', 'Sorry not enough stock');
            setDisabled(true)
        }
      else if(cartHolder + quantity < 4) {
        const qty = quantity + 1;
        if(quantity < 4) {
        setQuantity(qty);
        }
        else {
        setQuantity(4)   
        
        }
        
    }
    
    else {
        toast('Error', t('Maximum order has been reached.'));
        setDisabled(true)
    }
    
    }
    
    const handleDecrement = () => {
        setDisabled(false)
        const qty = quantity - 1;
        if(quantity <= 1) {
            setQuantity(1)  
        }
        else {
            setQuantity(qty);  
        } 
    }

    return (
        <div className={CLASSES.container}>
            { renderSr() }
            <div className="flex flex-row justify-center">
                <div className="pb-1">
                    <img className="object-cover h-80 w-screen xss:h-auto" src={IMAGES.MENU[product.name]} alt={product.name} role="img" aria-label="Ramen in a bowl" />
                </div>
            </div>
            <div className={CLASSES.main}>
                <div className="flex flex-row justify-center">
                    <h1 className="font-bold text-secondary text-lg xss:text-mdss" aria-label={product.name}> {t(product.name)} </h1>
                </div>
                <div className="flex flex-row justify-center">
                    <h1 className={`font-bold text-secondary text-lg xss:text-mdss ${product.price > 0 ? 'block' : 'hidden'}`} aria-label={`${Number(product.price).toFixed(2)} USD`}>{`${Number(product.price).toFixed(2)} USD`}</h1>
                </div>
                <div className="flex flex-row mt-5 px-3">
                    <div className="mx-auto ">
                        <p className="text-sm xss:text-mdss" aria-label="">{t(INGREDIENTS[product.name])}
                        </p>
                        <p className="text-sm mt-5 italic xss:text-mdss" aria-label={ALLERGENS[product.name] ? `*May contain ${ALLERGENS[product.name]} that may cause severe allergic reaction to some.` : ''}>
                        {ALLERGENS[product.name] ? `${t('*May contain')} ${t(ALLERGENS[product.name])} ${t('that may cause severe allergic reaction to some.')}`
                        : ''}
                        </p>
                    </div>
                </div>
                <div className="pb-1 mt-20 xss:mb-10" aria-label="Nutrition Facts">
                    <img className="object-contain w-auto mx-auto" src={IMAGES.NUTRITION_FACTS[product.name]} alt={product.name} aria-label={NF_LABELS[product.name]} />              
                </div>
                <div className="flex flex-row fixed bottom-0 bg-white mt-5 py-3 justify-center my-auto w-full xss:h-24 xss:left-0">
                    <div className="flex flex-row space-x-1 items-center justify-center mr-8 xss:ml-3">
                        <button
                            className="rounded-full mt-1 cursor-default"
                            onClick={handleDecrement}
                            aria-label="Minus Icon - Remove One Item"
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
                            className="rounded-full mt-1 cursor-default"
                            onClick={handleIncrement}
                            aria-label={quantity >= 4 ? "Maximum quantity reached." : "Add Icon - Add One Item"}
                            disabled={disabled}
                        >
                            <AddOrder className="w-8 h-8" />
                        </button>
                    </div>
                    <div className="mr-5">
                        <Link to={'/locationmenu'} className={`${CLASSES.buttonDefault} flex items-center py-2 px-6 text-white font-semibold justify-center xss:h-16 xss:w-full xss:text-mdss xss:rounded-xl xss:p-1`} onClick={() => getOrder(product)} role="button" aria-label="Add to Cart">
                            {t('Add to Cart')}
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Product;

