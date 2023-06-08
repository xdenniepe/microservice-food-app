import React from "react";

const OrderDetails = (props) => {
    
    const { invoice } = props;

    if (invoice) {
        return invoice.map((item, index) => (
            <div key={`invoiceitem_${index}`} className="flex flex-row w-full justify-between mt-1 xss:text-xxs">
                
                <div className="flex flex-row">
                    <p aria-hidden="true" className="text-sm font-bold pr-1">{item.quantity}</p> 
                    <p aria-hidden="true" className="sr-only">pieces</p>
                    <div className="pr-2">
                        <p aria-hidden="true" className="text-smline-clamp-2">{item.name}</p>
                        <p aria-hidden="true" className="text-sm line-clamp-2 xss:text-xxs mb-3">({item.description})</p>
                    </div>
                </div>
                <p aria-hidden="true" className="w-1/3 text-right" >{item.price.toFixed(2)} USD</p>
                <p tabIndex={0} role="dialog" className="sr-only" aria-label={`${item.quantity} ${item.quantity > 1 ? 'pieces' : 'piece'} ${item.name} ${item.description} ${item.price.toFixed(2)} USD`}></p>
            </div>
            
        ))
    } else {
        return <></>
    }
}

export default OrderDetails;