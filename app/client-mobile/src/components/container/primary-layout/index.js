import React, { Fragment, useContext, useEffect, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IMAGES, LOGOUT, GET } from "../../../utility/constants";
import { AuthContext } from "../../../context/authContext";
import { BottomNavigation } from "../../dashboard";
import { BackButton } from "../../common";
import Checkbox from '@material-ui/core/Checkbox';
import { Setting, Contact, Terms, Privacy, LogOut, Person, Close, Accessibility, Bell } from "../../../utility/icons";
import { getLocalStorageItem, setLocalStorageItem } from "../../../service/helper";
import { request } from "../../../service/request";
import api from "../../../service/api";
import { useTranslation } from "react-i18next";
import { ChevronUpIcon, ChevronDownIcon, StarIcon } from "@heroicons/react/outline";


const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}


const PrimaryLayout = (props) => {
    const { t } = useTranslation(["sidebar"])
    const { children, hideNavigation, title, to, access, setHasLoaded, sidebarOpen, setSidebarOpen } = props;
    const { state, dispatch }     = useContext(AuthContext);
    const [isHidden, setIsHidden] = useState(false);
    const [isDialogHidden, setIsDialogHidden] = useState(true);

    const { user } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const sideBarRef = useRef(null)
    const isGuest = getLocalStorageItem("guestLogin")
    const isOpen2 = getLocalStorageItem('open');
    const isAppLogin = getLocalStorageItem('usestatus');
    const [notificationHolder, setNotificationHolder] = useState([]);

    //Place Holder for Notification Count
    const notifCounter           = notificationHolder.filter(item => item.seen === 0);
    const notifCount             = notifCounter.length;
    const firstLoadCheckerHolder = getLocalStorageItem("firstloadchecker");
    let userId = '';

    if(user === undefined){
        userId = null;
    }else{
        userId = user.userId;
    }
    
    useEffect(() => {
        if (sidebarOpen) {
            setHasLoaded(false);
        } 

        if(isGuest){
            setSidebarOpen(false);
            setLocalStorageItem("firstloadchecker","NotFirstLoad");
        }
        if(isAppLogin){
            // setSidebarOpen(false);
            setLocalStorageItem("firstloadchecker","NotFirstLoad");
        }  
        if(!isDialogHidden) {
            // setHasLoaded(false)
        }
    }, [isDialogHidden])

    useEffect(() => {
        if (location.pathname !== '/settings') {
            redirectSC();
            setHasLoaded(true);
        } else {
            setHasLoaded(true);
        }

    }, [location])

    useEffect(() => {
        getNotification();
        }, [])
    
    const navigation = [

        {
            current: false,
            name   : t('Notifications'),
            path   : '/notification',
            badgeCount:notifCount,
            icon   : Bell,
            isPrivate: true
        },
        {
            current: false,
            name   : t('Favorites'),
            path   : '/favorites',
            badgeCount: 0,
            icon   : StarIcon,
            isPrivate: false
        },
        {
            current: false,
            name   : t('Contact Us'),
            path   : '/contact',
            badgeCount: 0,
            icon   : Contact,
            isPrivate: true
        },
        {
            current: false,
            name   : t('Terms & Conditions'),
            path   : '/termsandconditions',
            badgeCount: 0,
            icon   : Terms,
            isPrivate: true
        },
        {
            current: false,
            name   : t('Privacy'),
            path   : '/privacyAndManagement',
            path   : '/privacy',
            badgeCount: 0,
            icon   : Privacy,
            isPrivate: true
        },
        {
            current: false,
            name   : t('Accessibility'),
            path   : '/accessibility',
            badgeCount: 0,
            icon   : Accessibility,
            isPrivate: true
        },
    ]
    

    const getNotification = () => {
        if(user !== undefined){
            request({
                url: api.NOTIFICATION+userId,
                method: GET,
            }).then(response => {
                setNotificationHolder(response.data);
            })
        }
    }
    const handleLogout = () => {

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
        localStorage.removeItem("locationMenu");
        localStorage.removeItem("vmId");
        localStorage.removeItem("paypal");
        localStorage.removeItem("usestatus");
        localStorage.removeItem("firstloadchecker");
        dispatch({
            type: LOGOUT
        });
        return navigate('/');
    }

    const showConfirmationDialog = () => {
        setIsDialogHidden(false);
    }

    const hideConfirmationDialog = () => {
        setIsDialogHidden(true);
        setSidebarOpen(true);
    }

	const redirectSC = () => {
		let delayDebounce;
		setIsHidden(true)
		delayDebounce = setTimeout(() => {
            setIsHidden(false);
        }, 50);

        return () => {
            delayDebounce && clearTimeout(delayDebounce)
        }
	}

    const sideBarOnLoad = () => {
        if(sideBarRef && sideBarRef.current){
            sideBarRef.current.focus();
        }
    }

    const Lang = localStorage.getItem("i18nextLng");
   
    const renderHeaderContent = () => {
        if(title !== "NONE" && title)
            return (
                <React.Fragment>
                    <BackButton classes={`absolute left-4 ${to ? '' : 'hidden'} `} to={to} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} title={title} />
                    
                    
                    <div className="py-2">
                        <h1 className={`text-secondary font-bold text-md ${title.length >= 20 ? 'xss:text-xxs' : 'xss:text-mdss'}`} aria-hidden={true}>{title.toUpperCase()}</h1>
                    </div>
                    

                                     
                    <div className="absolute right-4">
                        <Link to={"/changeLanguage"} className=" mt-3 mr-2 flex p-1 items-center bg-gray-100 rounded-full z-40" role="button" >
                            <span className="ml-2 font-bold text-secondary">{Lang === "en" ? "EN" : Lang === "jp" ? "JPN" : "CHN"}</span>
                            <ChevronDownIcon className='h-4 w-4'/>
                        </Link>
                    </div>
                    {/* <div classes="absolute right-4"> */}
                        {/* <Link to={"/changeLanguage"} className=" absolute  flex right-4  mr-2 flex p-1 bg-gray-100 rounded-full z-40" role="button" >
                            {/* <img src={IMAGES.GLOBEICON} className=' w-4 h-4 '/> }
                            {}
                            <ChevronDownIcon className='h-4 w-4'/>
                        </Link> */}
                    {/* </div> */}
                
                    
                      
                </React.Fragment>
            );
        if(!title)    
            return (
                <React.Fragment>
                                       
                        <BackButton aria-hidden={isOpen2 === true ? true : false} classes={`absolute left-4 ${to ? '' : 'hidden'}`} to={to}/>
                    
                        
                        <div className="absolute">
                            <Link to={"/"} aria-hidden={isOpen2 === true ? true : false}>
                                <img src={IMAGES.LOGO} alt="Yo-Kai Express Logo" className="w-28 pt-2"/>
                            </Link> 
                        </div>
                    <div className="ml-auto mr-2">
                        <Link to={"/changeLanguage"} className=" mt-3 mr-2 flex p-1 items-center bg-gray-100 rounded-full z-40" role="button" >
                            <span className="ml-2 font-bold text-secondary">{Lang === "en" ? "EN" : Lang === "jp" ? "JPN" : "CHN"}</span>
                            <ChevronDownIcon className='h-4 w-4'/>
                        </Link>
                    </div>     
                    
                    

                </React.Fragment>
            );
    }
    
    return (
        <>
            <DisplayConfirmationDialog isDialogHidden={isDialogHidden} handleLogout={handleLogout} hideConfirmationDialog={hideConfirmationDialog} setIsDialogHidden={setIsDialogHidden}/>       
            <Transition.Root aria-hidden={isDialogHidden === false ? true : false} show={firstLoadCheckerHolder === "FirstLoad" ? false : sidebarOpen} as={Fragment}>
                <Dialog aria-hidden={isDialogHidden === false ? true : false} as="div" className="fixed inset-0 overflow-hidden z-20" onClose={() => {setSidebarOpen(false)}}>
                    <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="pointer-events-none fixed inset-y-0 right-0 flex w-full pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                        <div className="pointer-events-auto relative w-screen pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                            <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4" />
                            </Transition.Child>
                            <div  className="flex h-full flex-col overflow-y-scroll bg-white py-6 px-2 shadow-xl">
                                <div className="my-4 ml-2">
                                    <button  onClick={() => {setSidebarOpen(false); redirectSC(); setHasLoaded(true)}} onLoad={sideBarOnLoad} ref={sideBarRef} role="button" aria-label="Close Icon - Close Sidebar">
                                        <Close  className="w-6 h-6"/>
                                    </button>
                                </div>
                                {/* <div  className="flex flex-row ml-8 mt-6 xss:mt-0 xss:ml-5">
                                        <Person  className="w-9 h-9 mt-3 xss:w-6 xss:h-6" aria-label="Avatar Icon - User Profile Information"/>
                                    <div className="py-4 ml-3">
                                        <h1 className="font-bold font-medium text-xl text-black xss:truncate xss:text-mdss" aria-label= {`User name - ${user?.firstName}`}>
                                            {`${user?.firstName.toUpperCase()}`}
                                        </h1>
                                    </div>
                                </div> */}
                                <div className="relative mt-6 flex-1 px-4 xss:px-2">
                                    <nav  className="px-2 space-y-5">
                                                <div> 
                                                    {
                                                        getLocalStorageItem('guestLogin') || getLocalStorageItem('googleLogin') ?
                                                        <></>
                                                        :
                                                        <>
                                                            <button 
                                                                to         = "/settings"
                                                                className={`
                                                                font-sans text-base w-full group flex items-center py-2 font-normal rounded-md
                                                                ${classNames(
                                                                        'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                                )}
                                                                `}
                                                                role="link"
                                                                aria-label = "Edit Profile"
                                                                onClick={() => {navigate("/settings")}}
                                                                >
                                                                 <Setting
                                                                        className={`group-hover:text-black hover:bg-gray-500 bg-gray-50 mr-2 flex-shrink-0 h-12 w-12 p-3.5 rounded-lg text-black`}
                                                                        aria-hidden="false" 
                                                                 />
                                                                <div className="text-lg text-nav xss:text-mdss">                              
                                                                            {t('Account Settings')}
                                                                </div>
                                                            </button>
                                                        </>
                                                    }
                                                </div>
                                        {
                                            navigation.map((item) => (
                                                isGuest === 'guest' && !item.isPrivate ?
                                                <>
                                                </>
                                                :                                        
                                                <button
                                                    key={item.name}
                                                    className={`
                                                    font-sans text-base w-full group flex items-center py-2 font-normal rounded-md
                                                    ${classNames(
                                                        item.current ?
                                                            'bg-gray-100 text-gray-900'
                                                        :
                                                            'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                      )}
                                                    `}
                                                    role="link"
                                                    aria-label={item.name === 'Account Settings' ? item.name + itemNameHolder : item.name}
                                                    onClick={() => {
                                                        if (item.path === '/settings') {
                                                            navigate(item.path)
                                                        } else {
                                                            setSidebarOpen(false);
                                                            navigate(item.path);
                                                            redirectSC();
                                                        }
                                                    }}
                                                    disabled={location.pathname === '/settings' && item.name === 'Account Settings'  ? [true,itemNameHolder=" Disabled"] : false}
                                                >
                                                    <div className="inline-flex relative items-center text-sm font-medium text-center">
                                                    <item.icon
                                                        className={`group-hover:text-black hover:bg-gray-500 bg-gray-50 mr-2 flex-shrink-0 h-12 w-12 p-3.5 rounded-lg text-black`}
                                                        aria-hidden="false" 
                                                    />
                                                    {
                                                        item.badgeCount > 0 &&
                                                        <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">{item.badgeCount}</div>
                                                    }
                                                               
                                                    </div>
                                                    <div className="text-lg text-nav xss:text-mdss">
                                                        {
                                                            item.name
                                                        }
                                                    </div>
                                                    
                                                </button>
                                               
                                            ))
                                        }
                                    </nav>
                                </div>

                                {
                                    isDialogHidden === false ? 
                                    <>
                                        <p aria-hidden="true" className={`bottom-0 cursor-pointer
                                        font-light py-2 text-base hover:text-nav w-full group flex items-center p-2 font-normal mt-4`}
                                        >
                                            <LogOut  className={`ml-4 group-hover:text-nav hover:bg-gray-50 bg-gray-50 mr-3 flex-shrink-0 h-10 w-10 p-2 rounded-lg text-nav`}      
                                            />
                                            <span  className="mr-auto text-nav text-lg  xss:text-mdss">Log Out</span>
                                        </p>
                                    </>
                                     : 
                                    <>
                                        <button aria-hidden="false"  onClick={isGuest ? handleLogout : showConfirmationDialog} className={`bottom-0 cursor-pointer
                                        font-light text-base hover:text-nav w-full group flex items-center py-2 p-2 font-normal mt-4`}
                                        role="button" aria-label="Sign out Icon - Sign out Account"
                                        >
                                        <LogOut  className={`ml-4 group-hover:text-nav hover:bg-gray-50 bg-gray-50 mr-3 flex-shrink-0 h-10 w-10 p-2 rounded-lg text-nav`}
                                        
                                        />
                                        <span  className="mr-auto text-nav text-lg xss:text-mdss">{t('Log Out')}</span>
                                        </button>
                                    </>
                                }
                                
                       </div>
                        </div>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="h-screen flex flex-col flex-1 flex-end font-body">
                {
                    title !== "PRODUCT DETAILS" ?
                        <React.Fragment>
                            <div aria-hidden={isDialogHidden === false ? true : false} className={title === "NONE" ? null : classNames(
                                'sticky bg-white top-0 right-0 flex-shrink-0 flex border-b drop-shadow-primary ',
                                'flex flex-row items-center justify-center border-b py-4 z-10 relative'
                            )}>
                                {renderHeaderContent()}
                            </div>
                            <MainContent children={children} isDialogHidden={isDialogHidden} />
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <div aria-hidden={isDialogHidden === false ? true : false}
                                 className={classNames(
                                    'sticky bg-white top-0 right-0 flex-shrink-0 flex',
                                    'flex flex-row items-center justify-center relative'
                                )}
                            >
                                <p className="sr-only"/>
                                <BackButton classes={`absolute p-2 text-slate-800 left-4 rounded-full drop-shadow-xl bg-white mt-20 ${to ? '' : 'hidden'}`} access={access} to={to}/>
                            </div>
                            <MainContent children={children} isDialogHidden={isDialogHidden}/>
                        </React.Fragment>
                }
                {
                    access === 'PUBLIC' ?
                        <></>
                    :
                        <BottomNavigation
                            hidden={hideNavigation}
                            setHasLoaded={setHasLoaded}
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                            redirectSC={redirectSC}
                            isHidden={isHidden}
                            isDialogHidden={isDialogHidden}
                        />
                }
            </div>
        </>
    )
}

const DisplayConfirmationDialog = (props) => {
        
    const { isDialogHidden, handleLogout, hideConfirmationDialog, setIsDialogHidden } = props;
    const isTrusted = getLocalStorageItem("trusted")
    const [ checked, setChecked ] = useState({isTrusted})
    const { t } = useTranslation(["primary-layout"]);


    const hancleClick = event => {
  
        if (event.target.checked) {
            setLocalStorageItem("trusted", true)
          } else {
            setLocalStorageItem("trusted", false)
          }
       
    };

    const handleChange = event => {
        
        setChecked(event.target.checked);
    }

    return (
        <>
            <Transition.Root show={!isDialogHidden} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-hidden z-20" onClose={() => {setIsDialogHidden(true)}}>
                    <div className="absolute inset-0 overflow-hidden">
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                        <div className="flex sm:items-center justify-center items-center h-full p-4 text-center sm:p-0 ">
                            <div className="relative justify-center items-center bg-white p-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full rounded-2xl">
                                <div className="bg-white px-3 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-2 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                                            <h3 className="uppercase leading-6 font-2xl text-secondary text-2xl mb-6 font-bold" id="modal-title">{`${t('Log Out')}?`}</h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-550 mb-5">{`${t('If you choose to trust this browser')}, ${t('you will not be asked for a verification code on your next sign in')}`}</p>
                                            </div>
                                            <div className="px-3 py-3 sm:px-6 flex flex-col">
                                                <button type="button" className=" mt-4 mx-auto w-11/12 justify-center rounded-[.95rem] border-secondary shadow-sm px-2 py-2 bg-secondary text-base font-medium text-white sm:mt-0 sm:ml-4 sm:w-auto sm:text-sm border-[1px]" /* onClick={handleApprove} */  onClick={handleLogout}>{`${t('Log Out')}`}</button>
                                                <button type="button" className="mt-4 mx-auto w-11/12 justify-center rounded-[.95rem] border-gray-500 shadow-sm px-2 py-2 bg-white text-base font-medium text-gray-500 sm:mt-0 sm:ml-4 sm:w-auto sm:text-sm border-[1px]" onClick={hideConfirmationDialog}>{`${t('Cancel')}`}</button>
                                            </div>
                                            <div className="my-5">
                                                <Checkbox style ={{color: "#751132"}} size="small" label="" id="default-checkbox" type="checkbox"  className="mr-2 w-1 h-1 -translate-y-[1px]" onChange={handleChange} onClick={hancleClick} checked={isTrusted}/>
                                                <label className="ml-1 text-sm font-medium p-0 text-secondary" htmlFor="default-checkbox">{`${t('I trust this browser')}`}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </Dialog>
            </Transition.Root>
        </>
  
      )
}

const MainContent = (props) => {
    const { children, isDialogHidden } = props;

    return (

        <main aria-hidden={isDialogHidden === false ? true : false} className="flex-1">
            <div>
                <div className="max-w-7xl mx-auto pb-16">
                    {
                        children
                    }
                </div>
            </div>
        </main>
    )
}

export default PrimaryLayout;
