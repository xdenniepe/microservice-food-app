import React from "react";
import { useNavigate, useLocation } from "react-router";
import { getLocalStorageItem } from "../../../service/helper";
import { ChevronLeft } from "../../../utility/icons";

const BackButton = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    /**
     * to          = String (path)
     * classes     = String (className)
     * iconClasses = String (className)
     */
    const { to, classes, iconclasses, setSidebarOpen, sidebarOpen, title, notificationId } = props;

    const handleClick = () => {
        if(title == "PURCHASE HISTORY"){
           navigate(to ? to : -1)
        }
        else{

        navigate(to ? to : -1);
        switch(title) {
            case "PURCHASE HISTORY"       :
            case "EDIT PROFILE"           :
            case "NOTIFICATIONS"          :
            case "FAVORITES"              :
            case "CONTACT US"             :
            case "PRIVACY"                :
            case "TERMS AND CONDITIONS"   :
            case "ACCESSIBILITY STATEMENT": {
                if (getLocalStorageItem('openpath') === '/signup' || sidebarOpen) {
                    setSidebarOpen(false);
                    localStorage.removeItem('openpath');
                } else {
                    setSidebarOpen(true);
                }
                break;
            }
            default: break;
        }
        }
    }
    
    return (
        <button onClick={handleClick} className={location.pathname === `/notification/directory/${notificationId}` ? `absolute left-4 top-6`  : `cursor-pointer ${classes}`} role="button" title={title} aria-label="Back button">
            <ChevronLeft className={`${location.pathname === `/notification/directory/${notificationId}` ? "text-white" : "text-black" } group-hover:text-black-500 flex-shrink-0 h-8 xss:h-6 ${iconclasses}`} />
        </button>    
    )
}

export default BackButton;