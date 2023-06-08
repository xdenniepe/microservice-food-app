import { BEARER, GET, LOGIN, POST, } from "../../utility/constants";
import React, { useContext, useEffect, useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../../service/helper';
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import { CLASSES } from "../../utility/classes";
import api from "../../service/api";
import { request } from "../../service/request";
import { useTranslation } from "react-i18next";

const TwoFactor = (props) => {
   const { t }                         = useTranslation(["otp"]);
   const { toast, renderSr }           = props;
   const { dispatch }                  = useContext(AuthContext);
   const [ counter, setCounter ]       = useState(120);
   const [ expiration, setExpiration ] = useState(300);
   const token                         = getLocalStorageItem("token")
   const [ otp, setOtp ]               = useState(null);
   const [ email, setEmail ]           = useState("");
   const [ otpError, setOtpError ]     = useState('');
   const { user }                      = useContext(AuthContext)?.state;
   const navigate                      = useNavigate();
   const location                      = useLocation();
   const [ disabled, setDisabled ] = useState(false);

   const lang = localStorage.getItem('i18nextLng');

    useEffect(() => { 
        
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000); 
        
    }, [counter]);

    useEffect(() => { 
        expiration > 0 && setTimeout(() => setExpiration(expiration - 1), 1000); 
        if(expiration === 0) {
            request({
                url: api.USERS_BY_TOKEN,
                method: GET,
                headers: {
                    Authorization: BEARER + token
                }
            }).then(response => {
                setEmail(response.data.email);
                request({
                    url: api.LOGIN_SECURITY_VERIFICATION_CLEAR,
                    method: POST,
                    data: {
                        email: response.data.email
                    }
                }).then(response => {
                    setOtpError(t('The code has expired, Please see the option to resend code below.'))
                    setDisabled(true);
                })
                
            })
        }
        
    }, [expiration]);

   const handleChange = (e) => {
        let numPattern = /^[0-9\-]+$/;
        let textHandler = e.target.value.split("-").join(""); // remove hyphens
        if(numPattern.test(textHandler)) {
            
            if (textHandler.length > 0) {
                textHandler = textHandler.match(new RegExp('.{1,2}', 'g')).join("-");
                setDisabled(false);
                
            }
            e.target.value = textHandler ;
            setOtp(e.target.value)
        }
        else {
            e.target.value = e.target.value.slice(0, -1)
            setOtp(e.target.value)

        }
    }

    const handleSubmit = (values) => {
        const otp_unformatted = otp?.replace(/[-]/g, '');
        request({
            url: api.USERS_BY_TOKEN,
            method: GET,
            headers: {
                Authorization: BEARER + token
            }
        }).then(response => {
            const { email, firstName, lastName, status, userId, } = response.data;
            if(otp_unformatted === response.data.oneTimePassword) {
                const payload = {
                    token: token,
                    user : { email, firstName, lastName, status, userId }
                    }

                    dispatch({
                        type: LOGIN,
                        payload,
                    })
                    
                    setLocalStorageItem("trusted", false)
                    setLocalStorageItem("loaded", false)
                    setLocalStorageItem("open", true)
                    navigate('/');
            }
            else {
                setOtpError(t('Invalid code. Please try again.'))
                setDisabled(true);

            }
        }).catch(error => {
            console.log('error :', error);
        })
    }

    const handleSubmit2 = () => {
        const otp_unformatted = otp?.replace(/[-]/g, '');

        request({
            url: api.USERS_BY_TOKEN,
            method: GET,
            headers: {
                Authorization: BEARER + token
            }
        }).then(response => {
            if(otp_unformatted === response.data.oneTimePassword) {
                request({
                    url   : `${api.USERS}/update`,
                    method: POST,
                    data  : {
                             email    : location.state.email2,
                             firstName: location.state.firstName2,
                             lastName : location.state.lastName2,
                             password : location.state.password2,
                             phoneNumber : location.state.phoneNumber2,
                             gender : location.state.gender2,
                             birthday : location.state.birthday2,
                            },
                }).then(response => {
                    console.log(response.data);

                    request({
                    url: api.REGISTER_VERIFY_GUEST,
                    method: POST,
                    data:{
                        userId: response.data.userId,
                        firstName: response.data.firstName,
                        lastName : response.data.lastName,
                        checkPass: "Yes"
                    }
                    }).then(response =>{
                        console.log(response.status);

                        const userData = { 
                        email    : location.state.email2,
                        firstName: location.state.firstName2,
                        lastName : location.state.lastName2,
                        birthday : location.state.birthday2,
                        phoneNumber : location.state.phoneNumber2,
                        gender : location.state.gender2,
                        status   : response.data.status,
                        userId   : user?.userId
                    }

                    setLocalStorageItem("user", userData)
                    const payload = {
                        token: getLocalStorageItem("token"),
                        user : userData
                    }

                    dispatch({
                        type: LOGIN,
                        payload,
                    });

                    toast('Success', t('Profile updated Successfully!'));
                    setTimeout(() => { navigate('/settings'); }, 1000);
                    }).catch(error => {
                    console.log(error);
                    })
 
                }).catch(error => {
                    console.log(error);
                })
            }
            else {
                setOtpError(t('Invalid code. Please try again.'))
                setDisabled(true);

            }
        })
    }

    const resendOtp = () => {
        request({
            url: api.USERS_BY_TOKEN,
            method: GET,
            headers: {
                Authorization: BEARER + token
            }
        }).then(response => {
            const { email } = response.data;
            request({
                url: api.LOGIN_SECURITY_VERIFICATION,
                method: POST,
                data: {
                    email: email
                }
            }).then(response => {
                toast('Success', t('The code has been resent to your email.'));
                if(lang == "jp"){
                    request({
                        url: api.LOGIN_OTP_EMAIL_JP,
                        method: POST,
                        data: {
                            email: email
                        }
                    })
                }
                else{
                request({
                    url: api.LOGIN_OTP_EMAIL,
                    method: POST,
                    data: {
                        email: email
                    }
                })
            }
            })
        }).catch(error => {
            console.log('error :', error);
        })
        
        setCounter(120)
        setExpiration(300)
    }

  return (
    
    <div className={CLASSES.container}>
            <div className={CLASSES.main}>
                <div className="flex justify-center xxs:-ml-4 xss:-ml-0 ">
                    { renderSr() }
                    <span className={`font-bold text-md xxs:text-mdss xss:text-xxss`} tabIndex={0} aria-label="Two Factor Authentication">{t('TWO-FACTOR AUTHENTICATION')}</span>
                </div>
                <div className="mt-5 px-1 mb-10 xss:mt-5 xss:mb-0">
                    <p className="text-gray-500 text-base text-center xss:text-mdss" aria-label="For added security, we sent a verification code to your email. Please enter the code to continue.">
                        {t('For added security, we sent a verification code to your email. Please enter the code to continue.')}
                    </p>
                </div>
                <div className={CLASSES.formContainer}>
                    <div className={CLASSES.form}>
                        <div className={`${CLASSES.formSpace} mb-20 xxs:-mt-12 xss:mb-10`}>
                            <label htmlFor="otp">
                            <span className="sr-only">{t('Input Verification Code')}</span>
                            </label>
                           <input arial-label="Input Verification Code" id="otp" name="otp" type="text" maxLength={8} onKeyUp={handleChange} placeholder="00-00-00" className={`block w-full opacity-70 focus:outline-none bg-transparent text-center xss:text-xxs`}/>
                           <span><div className="h-0.5 w-full mt-2 bg-grayline"/></span>
                        </div>
                        <div>
                        <p className={`text-error text-md mb-10 text-center`} hidden={otpError ? false : true} aria-label={otpError}>{otpError}</p>
                        </div>
                        <div className={CLASSES.buttonContainer}>
                           <button disabled={disabled} className={`${CLASSES.buttonDefault} py-2.5 -mt-8 xxs:-mt-12 text-white`} onClick={location.state.prevPath.pathname === '/login' ? handleSubmit : handleSubmit2}>{t('Confirm')}</button>
                           <p className="mt-3 text-xxss">{t("Didn't Get The Verification Code?")}<button className="text-redlink ml-1 -mt-2 xss:text-xxs" disabled={counter === 0 ? false : true} onClick={resendOtp}>{t('Resend Code')}</button><span hidden={counter === 0 ? true : false}> ({counter}s)</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TwoFactor;