
import { useState } from "react";
import QRCode from "react-qr-code";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { CLASSES } from "../../utility/classes";
import Transition from "../common/transition";

const ActiveOrder = ({ order, onQrClick }) => {
    const [collapse, setCollapse] = useState(false);

    const renderCollapsibleContent = () => {
        if (collapse) return null;

        return (
            <Transition show={!collapse}>
                <div className="flex flex-row items-center mt-4 pb-6">
                    <div className="ml-2 border p-1 border-black" onClick={onQrClick}>
                        <QRCode value={order.qrValue} size={95} />
                    </div>
                    <div className="pl-2">
                        <p className="text-secondary" onClick={onQrClick}>View QR Code & Receipt</p>
                    </div>
                </div>
            </Transition>
        );
    };

    return (
        <div className={`${CLASSES.roundedCard} border py-5 mt-2 px-4`}>
            <div className="flex flex-row">
                <div className="flex-col flex-grow">
                    <p className="text-sm font-bold">{order.name}</p>
                    <p className="text-sm">{order.description}</p>
                </div>
                <div className="flex pl-2 w-8">
                    {!collapse && (
                        <ChevronUpIcon
                            className="h-6 w-6 cursor-pointer"
                            onClick={() => setCollapse(!collapse)}
                        />
                    )}
                    {collapse && (
                        <ChevronDownIcon
                            className="h-6 w-6  cursor-pointer"
                            onClick={() => setCollapse(!collapse)}
                        />
                    )}
                </div>
            </div>
            {renderCollapsibleContent()}
        </div>
    );
}

export default ActiveOrder;