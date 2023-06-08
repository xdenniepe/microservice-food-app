import React, { useContext, useEffect } from "react";
import { SHOW_MODAL } from "../../reducer/productReducer";
import { CLASSES } from "../../utility/classes";
import { IMAGES } from "../../utility/constants";
import { getLocalStorageItem } from "../../service/helper";
import { ProductContext } from "../../context/productContext";
import { LocationContext } from "../../context/locationContext";
import { useNavigate } from "react-router-dom";
import LocationDropdown from "../../components/location-dropdown";
import { SET_NEAREST_VM_ID } from "../../reducer/locationReducer";


const Menu = (props) => {
    const { setHasLoaded, renderSr, setSidebarOpen} = props;
    const navigate                                  = useNavigate();


    const locationContext = useContext(LocationContext);
    const locationDispatch = locationContext.dispatch;
    const getNearestVm = locationContext.getNearestVm;
    const nearestVmId = locationContext.state.vmId;
  
    const productContext = useContext(ProductContext);
    const productStates = productContext.state;
    const productDispatch = productContext.dispatch;
    const products = productStates.products;


    useEffect(() => {
        if (getLocalStorageItem('firstload')) {
            setSidebarOpen(false)
            localStorage.removeItem('firstload')
        }
        window.scroll(0,0)
        setHasLoaded(true);
        
    }, []);

    useEffect(() => {
      if (getLocalStorageItem("guestLogin")) {
        setSidebarOpen(false);
      }
    }, []);

    useEffect(() => {
        if (!nearestVmId) {
          productDispatch({
            type: SHOW_MODAL,
            payload: true,
          });
    
            getNearestVm();
          
        }
      }, []);

    const selectProduct = (product) => {
        const productId  = product.productId;
        navigate(`/menu/product/${productId}`);
    }
    
      const selectMenu = (vmId) => {
        locationDispatch({
          type: SET_NEAREST_VM_ID,
          payload: vmId,
        });
      };

    return (
        <div className={CLASSES.container}>
        { 
        <>
         {renderSr()}
         </>
        }
        <div className={`${CLASSES.main}`}>
          <div className="absolute block z-20 w-full">
            <LocationDropdown selectMenu={selectMenu} />
          </div>
            { renderSr() }
        <div className={`${CLASSES.main}`}>
            <div className="flex flex-col space-y-8">
                {
                    products?.map((product, index) => {

                        return (
                            <div className={`${CLASSES.roundedCard} flex flex-row border border-gray-500 border-opacity-5 py-3 cursor-pointer`} role="button" key={`menu_item_${index}`} onClick={() => selectProduct(product)}>
                                <div className="pb-1">
                                    <img className="object-cover w-28 h-24 rounded-xl" src={IMAGES.MENU[product.name]} alt={product.name} aria-label="Ramen in a bowl" />
                                </div>
                                <div className="w-3/4 m-auto pl-2 pb-2 mb-2">
                                    <div className="flex-col flex-grow w-full">
                                        <p className="font-bold text-base text-secondary mr-2 w-10/12 xss:text-mdss" role="dialog" aria-label={product.name}>{product.name}</p>
                                        <p className="font-light text-sm tracking-tight xss:text-mdss" role="dialog" aria-label={product.description}>{'('}{product.description}{')'}</p>
                                        <p className="font-bold text-base text-secondary object-right xss:text-mdss" role="dialog" aria-label={`${Number(product.price).toFixed(2)} USD`}>{`${Number(product.price).toFixed(2)} USD`}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
    </div>
    )
};

export default Menu;