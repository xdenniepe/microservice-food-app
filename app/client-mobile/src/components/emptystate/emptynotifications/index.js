import { IMAGES } from '../../../utility/constants';
import { CLASSES } from '../../../utility/classes';
import { useTranslation } from "react-i18next";


const EmptyNotifications = () => {
    
    const {t} = useTranslation(['notifications']);
    
    return (
            <div className={CLASSES.container}>
                <div className={CLASSES.main}>
                    <div className={`flex flex-col h-full justify-center text-center content-center items-center my-16 xss:my-2`}>
                        <p className="text-secondary text-center text-xl font-bold my-5 xss:text-mds xss:my-3" aria-label="Uh-Oh!">{t('Uh-Oh!')}</p>
                        <img src={IMAGES.OCTOEMPTY} className="h-full xss:w-3/5" alt="" role="img" aria-label="" />
                        <p className="text-center my-8 text-gray-600 xss:text-mds" aria-label="You don't have Notifications yet.">{t(`You don't have Notifications yet.`)}</p> 
                    </div>
                </div>
            </div>
    );
};

export default EmptyNotifications;