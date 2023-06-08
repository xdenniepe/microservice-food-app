import React, { Fragment, useEffect, useState } from "react";
import { CLASSES } from "../../../utility/classes";
import { Toaster } from "../../common";
import { CheckCircle, Exclamation, Clipboard } from "../../../utility/icons"
import { useLocation } from "react-router-dom";

const Base = (props) => {
    const { main: Component, layout, title, refs, setHasLoaded, sidebarOpen, setSidebarOpen } = props;

    // LS-COMMENT: Add isLoading useState at the base of the component so it can be access globally
    const [ isLoading, setIsLoading ]         = useState(true);
    const [ isToasterOpen, setIsToasterOpen ] = useState(false);
    const [ toasterProp, setToasterProp ]     = useState({});
    const location = useLocation();

    /**
     * 
     * @param {string}    toastType  // Copy, Error, Success
     * @param {string}    toastTitle 
     * @param {string}    toastContent 
     * @param {component} toastIcon 
     * @param {boolean}   dismiss 
     * @param {string}    confirmLabel 
     * @param {function}  handleConfirm 
     */
         const showToast = (toastType, toastTitle, toastContent, toastIcon, dismiss, confirmLabel, handleConfirm) => {
        
            let tIcon = null;
    
            switch(toastType) {
                case 'Copy'    : tIcon = <Clipboard    className = {CLASSES.alertIconSuccess} aria-hidden = "true" />; break;
                case 'Error'   : tIcon = <Exclamation  className = {CLASSES.alertIconError}   aria-hidden = "true" />; break;
                case 'Success' : tIcon = <CheckCircle  className = {CLASSES.alertIconSuccess} aria-hidden = "true" />; break;
                default        : tIcon = toastIcon ? toastIcon : <></>; break;
            }
    
            setIsToasterOpen(true);
            setToasterProp({
                title  : toastTitle,
                content: toastContent,
                icon   : tIcon,
                dismiss,
                confirmLabel,
                handleConfirm
            })
        }

    const renderSr = () => (
        <span className="sr-only" ref={refs} tabIndex={0} aria-label={`${title} Header`}>{title}</span>
    )
        
    return (
        <Fragment>
            {/* LS-COMMENT: Make sure to apply it in the component */}
            <Component setIsLoading={setIsLoading} isLoading={isLoading} toast={showToast} setHasLoaded={setHasLoaded} renderSr={renderSr} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Toaster
                show={ isToasterOpen }
                setShow={ setIsToasterOpen }
                classes={ layout === 'ML' ? 'mb-10' : 'mb-20' }
                {...toasterProp}
                locationClasses={ location.pathname === '/verification' ? '-mx-4' : 'mx-0'}
            />
        </Fragment>
    )
}

export default Base;