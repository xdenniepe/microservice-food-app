import { IMAGES } from '../../../utility/constants';
import { CLASSES } from '../../../utility/classes';
import { useTranslation } from "react-i18next";


const EmptyHistory = () => {
    
    const {t} = useTranslation(['purchase-history']);
    
    return (
            <div className={CLASSES.container}>
                <div className={CLASSES.main}>
                    <div className={`flex flex-col h-full justify-center text-center content-center items-center my-16 xss:my-2`}>
                        <img src={IMAGES.EMPTY_PURCHASEHISTORY} className="h-full xss:w-3/5" alt="No receipts yet." role="img" aria-label="Magnifying Glass Icon - Searching For Receipts " />
                        <p className="text-center my-8 text-gray-600 xss:text-mds" aria-label="No Recipts Yet">{t('No receipts yet.')}</p> 
                    </div>
                </div>
            </div>
    );
};

export default EmptyHistory;