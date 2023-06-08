/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import QRCode from "react-qr-code";
import { Dialog, Transition} from '@headlessui/react';
import { classNames } from '../../utility/string';
import { IMAGES, PAYMENTS } from '../../utility/constants';

/* 
 *  Pass order details/receipt details through props
 *  or
 *  Pass order id only and call api to get receipt details through useEffect
 **/

const OrderReceipt  = ({ orderDetails, show, close, title, scrollable = true, children }) => {
    const renderOrderItems = () => {
        return orderDetails.map((item, index) => (
            <div key={index} className="flex mt-1">
                <p className="text-sm font-bold pr-2">{item.quantity}x</p>
                <div className="flex-grow">
                    <p className="text-sm">{item.name}</p>
                    <p className="text-sm">{item.description}</p>
                </div>
                <p>${item.price}</p>
            </div>
        ));
    }
    
    const renderCardType = (cardType) => {
        let src = '';
        let label = '';
        
        if (cardType === PAYMENTS.DEBIT) {
            src = IMAGES.PAYMENT.DEBITCARD;
            label = 'Debit Card';
        }
        
        if (cardType === PAYMENTS.CREDIT) {
            src = IMAGES.PAYMENT.CREDITCARD;
            label = 'Credit Card';
        }
        
        // ... List other types here
        
        if (src === '') return null;
        
        return (
            <React.Fragment>
                <img src={src} alt="Debit Card" className="w-6 h-6 mr-2" />
                <p className="text-sm">{label}</p>
            </React.Fragment>
        );
    }
    
    return (
    <Transition.Root show={show} as={Fragment}>
        <Dialog
            as="div"
            className={classNames('fixed inset-0 overflow-hidden z-30')}
            onClose={close}
        >
        <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className={classNames('fixed inset-y-0 max-w-full flex')}>
            <Transition.Child
                as={Fragment}
                enter="transition ease-out"
                enterFrom="transform opacity-0"
                enterTo="transform opacity-100"
                leave="transition ease-in"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
            >
                <div className="w-screen max-w-md 2xl:max-w-lg">
                <div className={classNames(
                    scrollable ? 'overflow-y-scroll' : '',
                    'h-full flex flex-col bg-white shadow-xl'
                )}>
                    <div className="relative">
                        <div className="m-auto">
                            <div className="border p-3 border-black mt-0 max-w-min m-auto">
                                <QRCode value="hello" size={200} />
                            </div>
                            <p className="px-2 text-xs mt-6">
                                Scan this QR code on your selected Yo-Kai machine to claim your order.
                            </p>
                        </div>
                        <div className="px-12 pb-24">
                            <h1 className="text-lg text-secondary text-center font-bold mt-6">RECEIPT</h1>
                            <p className="text-sm mt-8">Order #: 2034</p>
                            <p className="text-sm mt-3">Order Details</p>
                            {renderOrderItems()}
                            <div className="flex justify-between mt-4">
                                <p className="text-sm">Subtotal</p>
                                <p className="text-sm">$102.99</p>
                            </div>
                            <div className="flex justify-between mt-1">
                                <p className="text-sm">Taxes & Fees</p>
                                <p className="text-sm">$0.40</p>
                            </div>
                            <div className="flex justify-between mt-1">
                                <p className="text-lg font-bold">Total</p>
                                <p className="text-lg font-bold">$103.39</p>
                            </div>
                            <p className="text-sm mt-4">Paid with</p>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-row items-center">
                                    {renderCardType(PAYMENTS.DEBIT)}
                                </div>
                                <p className="text-sm">$103.39</p>
                            </div>
                            <hr className="mt-10"/>
                            <p className="text-sm text-secondary font-bold mt-3">Download as PDF</p>
                            <p className="text-sm text-secondary font-bold mt-1">Send to email</p>
                        </div>
                        {children}
                    </div>
                </div>
                </div>
            </Transition.Child>
            </div>
        </div>
        </Dialog>
    </Transition.Root>
    );
};

export default OrderReceipt;
