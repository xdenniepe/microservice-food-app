
import React, { useEffect } from 'react';
import { IMAGES } from '../../../utility/constants';
import { CLASSES } from '../../../utility/classes';
import { useTranslation } from "react-i18next";


const EmptyCart = (props) => {
    const { setHasLoaded } = props;
	const { t } = useTranslation(["order"]);


    useEffect(() => {
        setHasLoaded(true);
    }, [])
    

    return (
        <div className={CLASSES.container}>
            <div className={CLASSES.main}>
                <img src={IMAGES.EMPTY_CART} className="my-16 h-full xss:my-2" alt={"Cart is Empty"} role="img" aria-label="Ramen Icon - Illustration Of A Ramen Bowl"/>
                <p className="text-secondary text-center text-xl font-bold my-5 xss:text-mds xss:my-3" aria-label="Whoops">{t('Whoops!')}</p>
                <p className="text-center my-5 px-2 text-gray-600 xss:text-mdss xss:my-3 xss:px-3" aria-label="Looks like you haven't added anything to your shopping cart yet. Please go back and place your order.">{t(`Looks like you haven't added anything to your shopping cart yet. Please go back and place your order.`)}</p>
            </div>
        </div>
    );
};

export default EmptyCart;