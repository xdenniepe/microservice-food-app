import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Close } from "../../../utility/icons"
import { Button } from "../../common";


const Toaster = (props) => { 
    /**
     * show          = Boolean
     * setShow       = Function
     * icon          = Component
     * content       = String
     * title         = String
     * dismiss       = Boolean
     * confirmLabel  = String
     * handleConfirm = Function
     */
	const { show, setShow, icon, content, title, dismiss, confirmLabel, handleConfirm, classes, locationClasses } = props;
    const [ trigger, setTrigger ] = useState(false)
    let delayDebounce;

    useEffect(() => {
        delayDebounce = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            delayDebounce && clearTimeout(delayDebounce)
        }
    }, [show])

	const handleClick = () => {
        setShow(false);
		setTrigger(!trigger);
	}

    const handleClickConfirm = () => {
        setShow(false);
        setTrigger(!trigger);
        handleConfirm();
    }

	return (
        <div className={`z-40 fixed flex justify-center top-0 w-full ${classes} ${locationClasses}`}>
            <div className="w-11/12 flex mt-3 items-end pointer-events-none sm:p-5 sm:items-end">
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-xl border border-black rounded-md pointer-events-auto overflow-hidden mx-3">
                            <div className="py-4 px-1">
                                <div className="flex items-start" role="alert">
                                    <div className="flex-shrink-0 mt-0.5 ml-10">
                                        { icon }
                                    </div>
                                    <div className="w-0 flex-1 pt-0.5 mr-10">
                                        <p className="text-base text-menuprimary text-center">{title}</p>
                                        <p className="mt-1 text-sm text-menuprimary text-center">{content}</p>

                                        {
                                            confirmLabel || dismiss ?
                                            
                                                <div className="mt-2 flex space-x-7">
                                                    <Button
                                                        type="button"
                                                        hidden={!confirmLabel}
                                                        onClick={handleClickConfirm}
                                                        className="bg-white rounded-md text-sm font-bold text-emphasis"
                                                        label= {confirmLabel}
                                                    />
                                                    <Button
                                                        type="button"
                                                        hidden={!dismiss}
                                                        onClick={handleClick}
                                                        className="bg-white rounded-md text-sm font-bold text-menuprimary"
                                                        label="Dismiss"
                                                    />
                                                </div>
                                            :
                                                null
                                        }
                                    </div>
                                 
                                </div>
                                
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
	)
};

export default Toaster;