import React, { useState, useEffect } from "react";
import { Button } from "../../components/common";
import { CLASSES } from "../../utility/classes";
import { GET, POST } from "../../utility/constants";
import { Password } from "../../components/form";
import { request } from "../../service/request";
import { resetSchema } from "../../validation/schema";
import { useFormik } from "formik";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import api from "../../service/api";
import { getLocalStorageItem } from "../../service/helper";
import { useTranslation } from "react-i18next";

const ResetPassword = (props) => {
    const { t } = useTranslation(["reset-password"])
    const { setHasLoaded, renderSr }                = props;
    const params                          = useParams();
    const navigate                        = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showCriteria, setShowCriteria] = useState(false);
    const email = getLocalStorageItem('email');
    const [errorPassword, setErrorPassword] = useState("");

    useEffect(() => {
        setHasLoaded(true);
        handleResetRequest();
    }, []);

    const labelProp = {
        EyeOffIcon: t("Eye icon - Reveal New Password"),
        EyeIcon: t("Crossed Eye Icon - Hide New Password"),
        buttonlabel: t("Update Password"),
        inputlabel: t("New Password Textbox")
    }

    const formProp = [
        {
            passwordlabel: t("Input New Password")
        },
        {
            passwordlabel: t("Confirm Input New Password")
        }
    ]

    const handleResetRequest = () => {
        
        request({
            url   : `${api.USERS_NEW_PASSWORD}/${params.code}`,
            method: GET,
            params: {
                resendRequest: searchParams.get("resendRequest")
            }
        }).then((response) => {
            console.log("response status: ", response.status);
        }).catch((error) => {
            console.log(error);
            navigate(`/error-reset?message=linkexpired&code=${params.code}`);
        })
    }

    const handleHideCriteria = () => {
        setShowCriteria(false)
    }

    const handlePasswordCriteria = () => {
        if(errorPassword) {
            setShowCriteria(false);
            }
            else {
            setShowCriteria(true);
            }
    }

    const initialValues = {
        password       : '',
        confirmPassword: ''
    }

    const handleSubmit = (values, { setSubmitting }) => {
        
        request({
            url   : `${api.USERS_NEW_PASSWORD}`,
            method: POST,
            data: {
                code: params.code,
                newPassword: values.password
            }
        }).then((response) => {
            navigate('/success?message=resetpassword');
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setSubmitting(false);
        })
        localStorage.removeItem('email')
    }

    const formik = useFormik({
        initialValues,
        validationSchema: resetSchema,
        onSubmit        : handleSubmit,
        validateOnBlur  : false,
    });

    const handlePasswordChange = (event) => {
        const {name, value} = event.target;
        formik.setFieldValue(name,value);
        if(value === email) {
            setErrorPassword(t("Password should not match your email."))
            setShowCriteria(false)
        }
        else {
            setErrorPassword("")
            setShowCriteria(true)
        }
    }

    return (
            <div className={`${CLASSES.container}`}>
                <div className={`${CLASSES.main}`}>        
                    <div className="flex flex-row items-center justify-center mb-5 xss:mb-0">
                        <span className={`${CLASSES.title} xss:text-mdss`} aria-hidden={true}>{t('RESET PASSWORD')}</span>
                        { renderSr() }
                    </div>
                    <div className={`${CLASSES.formContainer}`}>
                        <form onSubmit={formik.handleSubmit} className={`${CLASSES.form} absolute`}>
                            <div className={`${CLASSES.formSpace} ml-4 mr-4`}>
                                <Password label={t("New Password")} id="password" onChange={handlePasswordChange} error={ formik.touched.password ? errorPassword : "" } name="password" formik={formik} onFocus={handlePasswordCriteria} showcriteria={showCriteria.toString()} props = {formProp[0]} aria-required={true} />
                                <Password label={t("Confirm New Password")} id="confirmPassword" name="confirmPassword" onFocus={handleHideCriteria} formik={formik} props = {formProp[1]} aria-required={true} />
                            </div>
    
                            <div className={`${CLASSES.buttonContainer} mt-20 xss:mt-5 xss:mb-5`}>
                                <Button type="submit" label={t("Confirm")} disabled={!formik.isValid || formik.isSubmitting} props={labelProp}  />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default ResetPassword;


