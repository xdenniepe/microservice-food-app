import React from "react";
import { CLASSES } from "../../utility/classes";
import { useTranslation } from "react-i18next";


const OrderDetail = (props) => {
    const { name, price, description, imageSrc, qty } = props;
    const {t} = useTranslation(['product']);

    return (
        <div className={`${CLASSES.roundedCard} flex flex-row border border-gray-600 border-opacity-5`}>
            <div className='flex-grow mt-1 pl-1'>
                <p className='text-sm text-secondary font-bold' role="dialog" aria-label={name}> {t(name)} </p>
                <p className='text-xs' role="dialog" aria-label={description}>&#40;{t(description)}&#41;</p>
                <p className='text-xs font-bold mt-1' role="dialog" aria-label={`Quantity: ${qty}`}>{qty}</p>
            </div>
            <div className="mt-1">
                <h4 className='text-sm text-secondary ml-2 mb-10 whitespace-nowrap' role="dialog" aria-label={`${Number(price).toFixed(2) || 0.00} USD`}>{Number(price).toFixed(2) || 0.00} USD</h4>
            </div>
        </div>
    )
};

export default OrderDetail;