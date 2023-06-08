import React from "react";
import { CLASSES } from "../../../utility/classes";
import clsx from "clsx";

const OrderAmount = (props) => {

    const { subtotal, tax, coupon, total } = props;

    return (
        <div className={`${CLASSES.roundedCard} my-4 border border-gray-500 border-opacity-5`}>
            <div className="flex justify-between">
                <p className="text-secondary text-sm font-bold" aria-label="Subtotal">Subtotal</p>
                <p className="text-xs" aria-label={`${subtotal} USD`}>{subtotal} USD</p>
            </div>
            <div className="flex justify-between">
                <div>
                    <p className="text-secondary text-sm font-bold inline-flex" aria-label="Taxes">Taxes</p>
                </div>
                <p className="text-xs" aria-label={`${tax} USD`}>{tax} USD</p>
            </div>
            <div className={`flex justify-between ${clsx({ 'hidden': !coupon })}`}>
                <p className="text-secondary text-sm font-bold">Gift Coupon</p>
                <p className="text-xs">{coupon}</p>
            </div>
            <div className="flex justify-between mt-2">
                <p className="text-secondary text-sm font-bold" aria-label="Total">Total</p>
                <p className="text-xs font-bold" aria-label={`${total} USD`}>{total} USD</p>
            </div>
        </div>
    )
}

export default OrderAmount;