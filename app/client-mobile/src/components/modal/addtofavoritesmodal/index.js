import React, { useState, useEffect } from "react";
import { GET, IMAGES} from "../../../utility/constants";
import {  Button } from "../../../components/common";
import { useTranslation } from "react-i18next";



const AddToFavoritesModal = (props) => {
        
    const { isDialogHidden, addToFavorites ,hideConfirmationDialog, modalText1, modalText2,toast } = props;
    const { t } = useTranslation(['']);

    return (
        <>
        <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={isDialogHidden}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75  transition-opacity"></div>
        <div  className="fixed z-10 inset-0  overflow-y-auto">
            <div className="flex sm:items-center justify-center items-center h-full p-4 text-center sm:p-0 ">
                <div className="relative bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-3 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="pb-1 flex justify-center">
                                    <img className="object-cover w-28 h-32 rounded-xl" src={IMAGES.ADDTOFAVORITES} aria-label="Ramen in a bowl" />
                                </div>
                                <div className=" mx-4 text-center">
                                    <p className="text-md text-black">{modalText1}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-4  sm:px-6 sm:flex sm:flex-row-reverse mb-8">
                        <Button type="submit" className="items-center h-14 mt-5 w-full inline-flex justify-center rounded-3xl border border-gray-500 shadow-sm px-4 py-2  bg-secondary text-lg font-bold text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" label={`${modalText2}`} onClick={addToFavorites} />
                        <button type="button" className="mb-3 items-center h-14 mt-5 w-full inline-flex justify-center rounded-3xl border border-gray-500 shadow-sm px-4 py-2 bg-white text-gray-500 text-xl font-bold  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={hideConfirmationDialog}>Not Now</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </>
      )
}

export default AddToFavoritesModal;