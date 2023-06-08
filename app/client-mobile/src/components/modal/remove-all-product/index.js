import React, { useContext } from "react";
import { IMAGES } from "../../../utility/constants";
import api from "../../../service/api";
import { request } from "../../../service/request";
import { DELETE_INVOICES, DELETE_ORDER, UPDATE_INVOICES } from "../../../reducer/orderReducer";
import { OrderContext } from "../../../context/orderContext";
import { setLocalStorageItem  } from "../../../service/helper";
import {  Button } from "../../../components/common";
import { DELETE, GET } from "../../../utility/constants";
import { LocationContext } from "../../../context/locationContext";
import { useNavigate } from "react-router";

const RemoveAllProduct = (props) => {
    const navigate              = useNavigate();
    const { state, dispatch }   = useContext(OrderContext);
    const { isDialogHidden , setIsDialogHidden, changedVmId, setCurrentAddress, changedVmAddress, isOrderPage} = props;
    const locationContext       = useContext(LocationContext);
    const getNearestVmProducts  = locationContext.getNearestVmProducts;
    const locationMenu          = locationContext.state.locationMenu;
    
    
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

    const currentProductDelete = () => {
        if(isOrderPage){
            navigate("/locationbased")
        }
        let i = 0;
        while(i < state.invoices.length){
        let config          = {
            url: `${api.PRODUCT_ORDERS}/${state.invoices[i].productOrderId}`
        }
        config.method = DELETE;
        updateProductOrder(config);  
        i++;
        dispatch({ type: DELETE_INVOICES });
        dispatch({ type: DELETE_ORDER });
        setLocalStorageItem('invoices', []);
        setLocalStorageItem('order', []);
        localStorage.removeItem("vmIdHolder");
        setCurrentAddress({
            label: changedVmAddress,
            value: changedVmId,
        });
        getNearestVmProducts(changedVmId)
        hideConfirmationDialog();
        locationContext.state.vmAddress = changedVmAddress;
        locationContext.state.vmId = changedVmId;
    }
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
		})
	}

    const hideConfirmationDialog = () => {
        setIsDialogHidden(true);
        
    }

    return (
         <>
        <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={isDialogHidden}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div  className="fixed z-10 inset-0  overflow-y-auto">
            <div className="flex sm:items-center justify-center items-center h-full p-4 text-center sm:p-0 ">
                <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="pb-1 flex justify-center">
                                    <img className="object-cover w-28 h-32 rounded-xl" src={IMAGES.LOGOUTCOFFEECUP} aria-label="Ramen in a bowl" />
                                </div>
                                <div className="mt-3 flex justify-center items-center">
                                    <h4 className="text-xl font-bold opacity-70">Warning!</h4>
                                </div>
                                <div className="flex justify-center items-center mt-3 mx-4 text-center">
                                    <p className="w-10/12 font-normal text-sm text-gray-500">You have already selected items from a chosen location. If you continue, your cart and selection will be removed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                        <Button type="submit" className="opacity-90 items-center h-14 mt-5 w-full inline-flex justify-center rounded-2xl border border-gray-500 shadow-sm px-4 py-2 bg-secondary text-lg font-bold text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" label='Switch Location' onClick={currentProductDelete} />
                        <button type="button" className="opacity-90 mb-3 items-center h-14 mt-5 w-full inline-flex justify-center rounded-2xl border border-gray-500 shadow-sm px-4 py-2 bg-white text-lg font-semibold text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={hideConfirmationDialog}>No</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </>
      )
}

export default RemoveAllProduct;