
import { CheckIcon } from "@heroicons/react/outline";
import { IMAGES } from "../../utility/constants";

const PaymentMethod = ({ isSelected, last4, type, onClick }) => {
    /**
     * 
     *  Add condition here for different payment method types and icons
     * 
     */
    
    return (
        <div className={`rounded-xl p-2 border mt-2`} onClick={onClick}>
            <div className="flex flex-row items-center">
                <img 
                    src={IMAGES.PAYMENT.DEBITCARD} 
                    alt="Card Icon" 
                    className="h-8 w-8 mr-4 border rounded-md p-1" 
                />
                <div className="flex-grow">
                    <p className="text-xs font-bold" aria-label="Personal Account">Personal Account</p>
                    <p className="text-xs text-gray-500" aria-label="Account number">**** **** **** {last4}</p>
                </div>
                {isSelected && <CheckIcon className="p-1 h-7 w-7 bg-secondary text-white rounded-full" role="button" aria-hidden="false" aria-label="Check Icon - Personal Account is Selected"/>}
            </div>
        </div>
    );
}

export default PaymentMethod;