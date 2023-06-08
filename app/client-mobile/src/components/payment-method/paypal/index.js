import { CheckIcon } from "@heroicons/react/outline";
import { IMAGES } from "../../../utility/constants";

const PaymentMethodPaypal = () => {
  return (
        <div className={`rounded-xl p-2 mt-2`}>
            <div className="flex flex-row items-center h-8">
                <img 
                    src={IMAGES.PAYMENT.PAYPAL_IMAGE} 
                    alt="Card Icon" 
                    className="mr-4 rounded-md p-1 h-18 w-full" 
                />
            </div>
        </div>
    );
}

export default PaymentMethodPaypal