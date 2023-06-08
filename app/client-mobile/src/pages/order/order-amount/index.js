import React from "react";

const OrderAmount = (props) => {

    const { deleteCoupon, subtotal, tax, renderCouponTotal } = props;
    
    return (
        <div className="space-y-1">
            <div className="flex flex-row w-full justify-between">
                <p className="text-secondary font-semibold text-sm" aria-label="Subtotal" ref={deleteCoupon} tabIndex={0}>Subtotal</p>
                <p className="text-xs text-black" aria-label={`${subtotal} USD`}>{`${subtotal} USD`}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row">
                    <p className="text-secondary font-semibold text-sm" aria-label="Taxes">Taxes</p>
                </div>
                    <p className="text-xs text-black" aria-label={`${tax} USD`}>{`${tax} USD`}</p>
            </div>
            <div className="flex flex-row w-full justify-between">
                <p className="text-secondary font-semibold text-sm" aria-label="Total">Total</p>
                <p className="text-xs text-black font-semibold" aria-label={`${renderCouponTotal()} USD`}>
                    { renderCouponTotal() }
                </p>
            </div>
        </div>
    )
}

export default OrderAmount;
