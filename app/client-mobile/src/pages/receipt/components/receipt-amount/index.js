import React from "react";
import clsx from "clsx";

const ReceiptAmount = (props) => {

    const { subtotal, tax, discount, coupon, total } = props;

    return (
        <>
        <p tabIndex={0} role="dialog" className="sr-only" aria-label={`Subtotal ${subtotal} USD Taxes ${(tax).toFixed(2)} USD Coupon ${discount} USD Total ${total} USD`}></p>
        <div className="flex flex-row w-full justify-between">
            <p aria-hidden="true" aria-label="Subtotal" className="mt-3">Subtotal</p>
            <p aria-hidden="true" aria-label={`${subtotal} USD`} className="mt-3">{subtotal} USD</p>
        </div>
        <div className="flex flex-row w-full justify-between">
            <p aria-hidden="true" aria-label="Taxes">Taxes</p>
            <p aria-hidden="true" aria-label={`${(tax).toFixed(2)} USD`}>{(tax).toFixed(2)} USD</p>
        </div>

        <div className={`flex flex-row w-full justify-between ${clsx({ 'hidden': !discount })}`}>
            <p aria-hidden="true" aria-label="Coupon">{coupon}</p>
            <p aria-hidden="true" aria-label={discount}>-{discount} USD</p>
        </div>
        <div className="flex flex-row w-full justify-between">
            <p aria-hidden="true" className="font-bold text-black text-lg  xss:text-mdss">Total</p>
            <p aria-hidden="true" className="font-bold text-black text-lg  xss:text-mdss" aria-label={`${total} USD`}>{total} USD</p>
        </div>
        </>
    )
}

export default ReceiptAmount;