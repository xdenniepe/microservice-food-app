import React, { useState, useEffect } from "react";
import { autoCapitalize } from "../../service/helper";
import { Link, useNavigate } from "react-router-dom";
import { BackButton, Button } from "../../components/common";
import { CLASSES } from "../../utility/classes";
import { Input, Password } from "../../components/form";
import { passwordRegex, POST } from "../../utility/constants";
import { request } from "../../service/request";
import { signupSchema } from "../../validation/schema";
import { useFormik } from "formik";
import api from "../../service/api";
import { useTranslation } from "react-i18next";
import SelectGender from "../../components/form/dropdownForGender";

const SignupForm = (props) => {
    const { t } = useTranslation(["sign-up"]); 
    const { setSidebarOpen } = props;
    const [showCriteria, setShowCriteria] = useState(false);
    const [errorEmail, setErrorEmail]     = useState("");
    const [errorPassword, setErrorPassword]     = useState("");
    const navigate = useNavigate();
    const lang = localStorage.getItem('i18nextLng');
    const initialValues = {
        firstName      : '',
        lastName       : '',
        email          : '',
        dob            : '',
        gender         : '',
        password       : '',
        confirmPassword: '',
    }

    const labelProp = {
        eyeofficon : "Crossed Eye Icon - Hide Created Password",
        eyeicon    : "Eye icon - Reveal Created Password",
        inputlabel : "Textbox for password",
        buttonlabel: "Sign Up Button"
    }

    const formsProp = [ 
        {
            inputlabel: "Input First Name"
        },
        {
            inputlabel: "Input Last Name"
        },
        {
            inputlabel: "Input Email"
        },
        {
            inputlabel: "Input Date of Birth"
        },
        {
            inputlabel: "Input Gender"
        },
        {
            passwordlabel: "Input Password"
        },
        {
            passwordlabel: "Confirm Input Password"
        },
    ]
    const handleSubmit = (values, { setSubmitting }) => {
        request({
            url   : api.REGISTER,
            method: POST,
            data  : {
                firstName: autoCapitalize(values.firstName),
                lastName : autoCapitalize(values.lastName),
                phoneNumber: "",
                birthday: parseInt((new Date(values.dob).getTime() / 1000).toFixed(0)),
                gender: values.gender,
                email    : values.email,
                password : values.password
            }
        }).then(response => {
            console.log("response status: ", response.status);
            if (response.status === 200) {

                if(lang == "jp"){
                request({
                    url: api.REGISTER_VERIFY_JP,
                    method: POST,
                    data: {
                        email: values.email,
                        baseUrl: window.location.origin,
                    }
                }).then(() => {
                    navigate("/success/?message=verifyemail");
                }).catch(error => {
                    console.log(error);
                });
            }
            else{
                request({
                    url: api.REGISTER_VERIFY,
                    method: POST,
                    data: {
                        email: values.email,
                        baseUrl: window.location.origin,
                    }
                }).then(() => {
                    navigate("/success/?message=verifyemail");
                }).catch(error => {
                    console.log(error);
                });
            }
            }
        }).catch(error => {
            console.log("error : ", error);
        }).finally(() => {
            setSubmitting(false);
        })
    }

    const formik = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit: handleSubmit,
    })

    const regex = passwordRegex.map((data) => {

        return (
            formik.values.password.match(data.regex) ?
                true
            :
                false
        )
    })

    const passwordValidation = regex.every(e => {
        return e === true;
    })

    const handleShowCriteria = () => {
        if(errorPassword) {
        setShowCriteria(false);
        }
        else {
        setShowCriteria(true);
        }
    }

    const handleHideCriteria = () => {
        setShowCriteria(false)
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        formik.setFieldValue(name,value);

        request({
            url   : api.PUBLIC_USERS_BY_EMAIL,
            method: POST,
            data  : {
                email: value
            }
        }).then(response => {

            if(response.data && response.data.status === "ACT"){
                setErrorEmail(t("Email address already exists."));
            }else if(response.data.status === "DEL"){
                setErrorEmail(t("Sorry, this email is associated with an account scheduled for deletion."));  
            }else{
                setErrorEmail("")
            }
        
        }).catch(error => {
            console.log('error :', error); 
            setErrorEmail("");
        })
         
    }
    const handlePasswordChange = (event) => {
        const {name, value} = event.target;
        formik.setFieldValue(name,value);
        if(value === formik.values.email) {
            setErrorPassword(t("Password should not match your email."))
            setShowCriteria(false)
        }
        else {
            setErrorPassword("")
            setShowCriteria(true)
            
        }
    }
   
    return (
        <div className={`${CLASSES.formContainer} xss:mt-2`}>
            <form onSubmit={formik.handleSubmit} className={`${CLASSES.form} absolute`}>
                <div className={`${CLASSES.formSpace} xss:space-y-14 xss:text-xss`}>
                    <Input id="firstName" name="firstName" label={t('First Name')} type="text" onFocus={handleHideCriteria} formik={formik} props = { formsProp[0] } aria-required={true} />

                    <Input id="lastName" name="lastName" label={t('Last Name')} type="text" onFocus={handleHideCriteria} formik={formik} props = { formsProp[1] } aria-required={true}  />

                    <Input id="email" name="email" label={t('Email Address')} type="email" onChange={handleChange} error={formik.touched.email ? errorEmail : "" } formik={formik} onFocus={handleHideCriteria} props = { formsProp[2] } aria-required={true}  />
                    <div className={`${errorEmail === t("Sorry, this email is associated with an account scheduled for deletion.") ? 'pt-6' : 'pt-0'} ${CLASSES.formSpace}`} >
                    
       
                    {/* <InputDate id="dob" name="dob" label={"Date of Birth"}  type="text" formik={formik}  aria-required={true} /> */}
                    
                            <label className="text-xs">{t('Gender')}
                            <SelectGender id="gender" name="gender" label={t('Gender')} type="text" formik={formik} aria-required={true}/>
                            </label>

                            <Input type="date" id="dob" name="dob" label={t("Date of Birth")} formik={formik} aria-required={true}/>

            
                    <Password id="password" name="password" label={t('Password')} onFocus={handleShowCriteria} onChange={handlePasswordChange} error={ formik.touched.password ? errorPassword : "" } showcriteria={showCriteria.toString()} formik={formik} props = { formsProp[3] } aria-required={true}  />

                    <Password id="confirmPassword" name="confirmPassword" label={t('Confirm Password')} onFocus={handleHideCriteria} formik={formik} props = { formsProp[4] } aria-required={true}  />
                    </div>
                </div>

                <div className={`${CLASSES.buttonContainer} mt-16 xss:mt-6`}>
                <Button type="submit" label={t("SIGN UP")} disabled={!formik.isValid || formik.isSubmitting || !passwordValidation || errorEmail !== '' } props = { labelProp }/>
                    <p className="text-gray-800 opacity-80 text-xs italic text-center mt-2 pb-6" role="dialog" aria-label="Privacy Policy &#38; Terms Of Service.">
                        {t('By continuing, you agree to accept our')} 
                            <span className="text-secondary"><Link to="/privacypolicy" onClick={() => setSidebarOpen(false)}> {t('Privacy Policy')} </Link></span>{t('and')}  
                            <span className="text-secondary"><Link to="/termsandconditions" onClick={() => setSidebarOpen(false)}> {t('Terms Of Service')}</Link></span>.
                    </p>
                </div>
               

            </form>
        </div>
    )
}

const Signup = (props) => {
    const { setHasLoaded, renderSr, setSidebarOpen } = props;
    const { t } = useTranslation(["sign-up"]) 

    useEffect(() => {
        setHasLoaded(true);
    }, []);

    return (
        <div className={CLASSES.container}>
            <div className={CLASSES.main}>
                <div className="flex flex-row items-center justify-center">
                    
                     { renderSr() }
                     <BackButton onClick={() => navigate(-1)} />
                    <h1 className={`${CLASSES.title} xxs:text-mds xss:text-mdss xss:px-4`} aria-label="Create an account">{t('CREATE AN ACCOUNT')}</h1>
                </div>
               
                
                <SignupForm setSidebarOpen={setSidebarOpen} />
            </div>
        </div>
    )
}

export default Signup