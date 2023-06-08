import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES, LOGOUT } from "../../../utility/constants";
import { AuthContext } from "../../../context/authContext";
import { useTranslation } from "react-i18next";


const SuccessDeletionModal = (props) => {
    const navigate         = useNavigate();
    const { dispatch }     = useContext(AuthContext);
    const { t }            = useTranslation(['success_deletion_modal']);

    const handleNavigate = () => {
        localStorage.removeItem("order");
        localStorage.removeItem("payment");
        localStorage.removeItem("order");
        localStorage.removeItem("invoices");
        localStorage.removeItem("lastOrder");
        localStorage.removeItem("products");
        localStorage.removeItem("invoiceSent");
        localStorage.removeItem("openpath");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("vendingMachineId");
        localStorage.removeItem("guestLogin");
        localStorage.removeItem("googleLogin");
        localStorage.removeItem("vmAddress");
        localStorage.removeItem("locationMenu");
        localStorage.removeItem("vmId");
        localStorage.removeItem("paypal");
        dispatch({
            type: LOGOUT
        });
        return navigate('/');
    }

    return (
        <>
        <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={false}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div  className="fixed z-10 inset-0  overflow-y-auto">
            <div className="flex sm:items-center justify-center items-center h-full p-4 text-center sm:p-0 ">
                <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="mt-12 flex justify-center">
                                    <img className="object-cover w-16 h-22 rounded-xl" src={IMAGES.TRASNBINS} aria-label="Trash Bin Icon" />
                                </div>
                                <div className="mt-6 flex justify-center items-center">
                                    <h4 className="text-secondary font-bold">{t('Account Deleted')}</h4>
                                </div>
                                <div className="mt-6 mx-4 text-center">
                                    <p className="text-mdss leading-7 font-light text-gray-500">{t("We're sorry to see you leave. Your account was deleted successfully. All your data was removed from our services. Thank you for using Yo-Kai Express App.")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-4 sm:px-6 sm:flex sm:flex-row-reverse mb-8">
                     <button onClick={handleNavigate} className="mb-3 items-center h-12 mt-5 w-full inline-flex justify-center rounded-2xl border shadow-sm px-4 py-2 bg-secondary text-lg font-semibold text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">{t('Okay')}</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </>
      )
}

export default SuccessDeletionModal;