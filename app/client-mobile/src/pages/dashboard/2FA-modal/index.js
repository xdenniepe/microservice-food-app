import React, { useEffect, useState, useRef } from "react"
import { setLocalStorageItem, getLocalStorageItem } from "../../../service/helper";
import { useTranslation } from "react-i18next";

const TrustThisBrowser = (props) => {
  const { t } = useTranslation(["2FA-modal"]);
  const [ isOpen, setIsOpen ] = useState(false);
  const headerRefMenu         = useRef(null);
  const isGuest               = getLocalStorageItem("guestLogin")
  const isOpen2               = getLocalStorageItem('open');

  const handleDecline = () => {
    setLocalStorageItem("trusted", false)
    setLocalStorageItem("loaded", true)
    setLocalStorageItem("open", false)
    setIsOpen(true)
    window.location.reload(true);
  }

  const handleApprove = () => {
    setLocalStorageItem("trusted", true)
    setLocalStorageItem("open", false)
    setIsOpen(true)
    window.location.reload(true);
  }

  useEffect(() => {
    if (headerRefMenu && headerRefMenu.current){
      headerRefMenu.current.focus();
    }
  },[])

    return (
      isGuest ? 
      null 
      :
  <div aria-hidden={isOpen2 === false ? true : false} className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={isOpen}>
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  <div  className="fixed z-10 inset-0  overflow-y-auto">
    <div className="flex sm:items-center justify-center items-center h-full p-4 text-center sm:p-0 ">
      <div className="relative bg-white rounded-lg text-left mb-36 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 ref={headerRefMenu} tabIndex={0} className="text-lg leading-6 font-extrabold text-secondary" id="modal-title">{t('TRUST THIS BROWSER?')}</h3>
              <div className="mt-6">
                <p className="text-sm text-gray-500"> {t('If you choose to trust this browser, you will not be asked for a verification code on your next sign in.')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-8 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" className="mt-5 w-full inline-flex justify-center rounded-full border border-gray-500 shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleApprove}>{t('Trust')}</button>
          <button type="button" className="mt-5 w-full inline-flex justify-center rounded-full border border-gray-500 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleDecline}>{t('Do not Trust')}</button>
          <button type="button" className="mt-5 w-full inline-flex justify-center rounded-full border border-gray-500 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleDecline}>{t('Skip')}</button>
        </div>
      </div>
    </div>
  </div>
</div>
)
}

export default TrustThisBrowser;