import React from "react";
import { forgotPasswordSchema } from "../../validation/schema";
import { BackButton, Button } from "../../components/common";
import { CLASSES } from "../../utility/classes";
import { Input } from "../../components/form";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { request } from "../../service/request";
import { POST, NOT_EXISTS_EMAIL } from "../../utility/constants";
import api from "../../service/api";
import { setLocalStorageItem } from "../../service/helper";
import { useTranslation } from "react-i18next";


const ForgotPassword = (props) => {
    const { t } = useTranslation(["forgot-password"]);
    const navigate = useNavigate();
    const { toast } = props;


    const initialValues = {
        email: '',
        phone: '',
    }

    const lang = localStorage.getItem('i18nextLng');
    const labelProp = {
        inputlabel: "Input Email Address",
        buttonlabel: "Send Button"
    }

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        request({
        url   : api.PUBLIC_USERS_BY_EMAIL,
        method: POST,
        data  : {
            email: values.email
        }
        }).then(response => {
            if(response.data) {
                if(response.data.status === "DEL"){
                    setErrors({
                                email: t("Sorry, this email is associated with an account scheduled for deletion."),
                            })
                    setSubmitting(false);
                }else if(response.data.status === "INA"){ 
                    setErrors({
                                email: t("Sorry, this email is still inactive."),
                            })
                    setSubmitting(false);
    
                }else if(lang == "jp"){
                    if (values.email) {
                        request({
                            url: api.USERS_FORGOT_PASSWORD_JP,
                            method: POST,
                            data: {
                                baseUrl: window.location.origin,
                                email: values.email,
                                phone: values.phone,
                            }
                        }).then(response => {
                                    navigate("/success?message=resetemail");
                                    setLocalStorageItem('email', values.email)
                        }).catch(error => {
                                    console.log("ERROR: ", error)
                                    setSubmitting(false);
                                    setErrors({
                                            email: NOT_EXISTS_EMAIL,
                                            })
                                        console.log(error);
                                    });
                    } else if (values.phone) {
                        console.log("Phone number submitted in the form")
                    }
    
                } else {
                    if (values.email) {
                        request({
                            url: api.USERS_FORGOT_PASSWORD,
                            method: POST,
                            data: {
                                baseUrl: window.location.origin,
                                email: values.email,
                                phone: values.phone,
                            }
                        }).then(response => {
                            navigate("/success?message=resetemail");
                            setLocalStorageItem('email', values.email)
                
                
                        }).catch(error => {
                            setSubmitting(false);
                            setErrors({
                                email: NOT_EXISTS_EMAIL,
                            })
                        });
                    } else if (values.phone) {
                        console.log("Phone number submitted in the form")
                    }
                }
            } else {
                //this triggers when the response is null
                setSubmitting(false);
                            setErrors({
                                email: NOT_EXISTS_EMAIL,
                            })
            } 
        })
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: forgotPasswordSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className={CLASSES.container}>
            <div className={CLASSES.main}>
                <div className="flex flex-row items-center justify-center -ml-10 xss:-ml-5">
                    <BackButton onClick={() => navigate(-1)} />
                    <span className={`${CLASSES.title} xss:text-mdss`} tabIndex={0} aria-label={t('RESET PASSWORD')}>{t('RESET PASSWORD')}</span>
                </div>
                <div className="mt-10 px-3 mb-10 xss:mt-5 xss:mb-0">
                    <p className="text-gray-500 text-base text-center xss:text-mdss" aria-label={t('Please provide the email you are using in signing in. We will send you a secured link where you can set up your new password.')}>
                        {t('Please provide the email you are using in signing in. We will send you a secured link where you can set up your new password.')}
                    </p>
                </div>
                <div className={CLASSES.formContainer}>
                    <form className={CLASSES.form} onSubmit={formik.handleSubmit}>
                        <div className={`${CLASSES.formSpace} mb-20 xss:mb-10`}>
                            <Input id="email" name="email" label={t('Email Address')} type="email" formik={formik} props={labelProp} aria-required={true} />
                        </div>

                        <div className={CLASSES.buttonContainer}>
                            <Button type="submit" label={t('SEND')} disabled={ !formik.isValid || formik.isSubmitting} props={labelProp} />
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default ForgotPassword;