import React, { useEffect } from "react";
import { Button } from "../../components/common";
import { CLASSES } from "../../utility/classes";
import { creditCardSchema } from "../../validation/schema";
import { CVV, EXPIRATION_DATE, OTHERCARDS } from "../../utility/constants";
import { CardInput } from "../../components/form";
import { getLocalStorageItem, setLocalStorageItem } from "../../service/helper";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputMasked from "../../components/form/masked-input";
import { useTranslation } from "react-i18next";


const Payment = (props) => {
    const { setHasLoaded, renderSr } = props;
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const paymentInfo = getLocalStorageItem('payment');
    const { t } = useTranslation(["payment_card_detail"]);

    useEffect(() => {
        setHasLoaded(true);
        
    }, []);

    const initialValues = {
        ccName          : paymentInfo ? paymentInfo.ccName          : '',
        ccNumber        : paymentInfo ? paymentInfo.ccNumber        : '',
        ccExpirationDate: paymentInfo ? paymentInfo.ccExpirationDate: '',
        ccCVV           : paymentInfo ? paymentInfo.ccCVV           : '',
    }

    const labelProps = 
        [
            {
              inputlabel: "Input Card Holder Name"
            },
            {
              inputlabel: "Input Card Number"
            },
            {
              inputlabel: "Input Expiration Date MM YY"
            },
            {
              inputlabel: "Input CVV"
            },
        ]

    
    const handleReviewOrder = (values, { setSubmitting }) => {
            setLocalStorageItem('payment', values);
            if (searchParams.get("coupon") === null) {
                navigate(`/orderreview`);
            } else {
                navigate(`/orderreview?coupon=${searchParams.get("coupon")}`);
            }
            setSubmitting(false);
    }
    
    const formik = useFormik({
        initialValues,
        validationSchema: creditCardSchema,
        onSubmit: handleReviewOrder,
    });

    
    const labelNameOnCard = `${t('Name On Card*')}`;

    return (
        <div className={CLASSES.container}>
            <div className={CLASSES.main}>
                { renderSr() }
                <p className='font-semibold text-sm text-secondary ml-3'>{t('Card Details')}</p>
                <form className={`${CLASSES.container}`} onSubmit={formik.handleSubmit} >
                    <div className="h-96 bg-white drop-shadow-container m-1 rounded-md p-10 pb-12 mb-10 xss:mb-5 xss:h-96">
                        <div className="flex flex-col -mx-3 mb-6 space-y-6">
                            
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <CardInput 
                                    id="ccName"
                                    name="ccName"
                                    label={labelNameOnCard}
                                    type="text"
                                    formik={formik}
                                    labelclass="text-gray-500 text-xs"
                                    errorclass="text-xs"
                                    props = { labelProps[0] }
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <InputMasked
                                    mask={OTHERCARDS}
                                    id="ccNumber"
                                    name="ccNumber"
                                    label={t("Credit Card Number*")}
                                    type="text"
                                    formik={formik}
                                    labelclass="text-gray-500 text-xs"
                                    errorclass="text-xs"
                                    props = { labelProps[1] }

                                />
                            </div>
                            <div className="flex flex-row pt-5 xss:flex-col xss:space-y-3">
                                <div className="w-w-full px-3 mb-6">
                                    <InputMasked
                                        mask={EXPIRATION_DATE}
                                        id="ccExpirationDate"
                                        name="ccExpirationDate"
                                        label={t("MM/YY*")}
                                        type="text"
                                        formik={formik}
                                        labelclass="text-gray-500 text-xs"
                                        errorclass="text-xs whitespace-nowrap"
                                        props = { labelProps[2] }                               
                                    />
                                </div>
                                <div className="w-full px-3 mb-6">
                                    <InputMasked
                                        mask={CVV}
                                        id="ccCVV"
                                        name="ccCVV"
                                        label="CVV*"
                                        type="text"
                                        formik={formik}
                                        labelclass="text-gray-500 text-xs"
                                        errorclass="text-xs whitespace-nowrap"
                                        props = { labelProps[3] }
                                    />
                                </div>
                            </div>
                        </div>
                        <span className="h-12"></span>
                    </div>
                    <Button type="submit" label={t("Review Order")} disabled={!formik.isValid || formik.isSubmitting} />
                </form>
            </div>
        </div>
    );
}

export default Payment;

