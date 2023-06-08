import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { authSchema } from "../../validation/schema";
import { BEARER, GET, LOGIN, POST, IMAGES } from "../../utility/constants";
import { BackButton, Button } from "../../components/common";
import { CLASSES } from "../../utility/classes";
import { Input, Password } from "../../components/form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { request } from "../../service/request";
import { setLocalStorageItem } from "../../service/helper";
import { useFormik } from "formik";
import api from "../../service/api";
import { getDifferenceInDays, getLocalStorageItem, autoCapitalize } from "../../service/helper";
import jwt_decode from 'jwt-decode';
import jwt from 'jwt-simple';
import LinkModal from "./Link-Modal";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { date } from "yup";
import { useTranslation } from "react-i18next";

const SigninForm = (props) => {
    const { t }               = useTranslation(["sign-in"]);
    const { dispatch }        = useContext(AuthContext);
    const { navigate, toast } = props;
    const isTrusted           = getLocalStorageItem("trusted");
    const [show, setShow]     = useState(true);
    const [creds,setCreds]    = useState('');
    const [subs, setSubs]     = useState('');
    const [type, setType]     = useState('');
    const location            = useLocation();
    const token_key           = 'SECRET_KEY'; // process.env.REACT_APP_JWT_SECRET;
    const initialValues = {
        email   : '',
        password: '',
    }
   const lang = localStorage.getItem('i18nextLng');

    console.log(token_key);

    const labelProp = {
        eyeofficon   : "Eye icon - Reveal Sign In Password",
        eyeicon      : "Crossed Eye Icon - Hide Sign In Password",
        inputlabel   : "Input Email.",
        passwordlabel: "Input Password.",
        buttonlabel  : "Login Button."
    }   
    
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "12595483278-r22df7j9dbc4rrqqo56svk8jqntqglbc.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("googleID"),
            { type: "icon", shape: "pill" }
        )
    },[]);

    const usePrevLocation = (location) => {
    const prevLocRef      = useRef(location)

    useEffect(()=>{
    prevLocRef.current = location
    }, [location])

    return prevLocRef.current
    }


    const prevLocation  = usePrevLocation(location)

    //Facebook Login
   const responseFacebook = (facebookInfo) => {
    setType(autoCapitalize(facebookInfo.graphDomain));
    setCreds(facebookInfo.email);
    setSubs(facebookInfo.userID);
    request({
        url   : api.PUBLIC_USERS_BY_EMAIL,
        method: POST,
        data  : {
            email: facebookInfo.email
        }
    }).then(response => {
        const responseEmailHolder = response.data;
        request({
        url   : api.PUBLIC_USERS_BY_SUB,
        method: POST,
        data:{
            sub:facebookInfo.userID,
        }
        }).then(response => { 
        const responseSubHolder = response.data;
        if(responseEmailHolder !== null && responseSubHolder === null){
            setShow(false);
        }else{       
        if(responseSubHolder === null){
            request({
                url   : api.REGISTER,
                method: POST,
                data  : {
                    firstName: autoCapitalize(facebookInfo.first_name),
                    lastName : autoCapitalize(facebookInfo.last_name),
                    email    : facebookInfo.email,
                    password : facebookInfo.userID,
                }
            }).then(response => { 
                let data = response.data;
                request({
                url: api.REGISTER_VERIFY_EXTERNAL,
                method: POST,
                data: {
                    userId:data.userId,
                    email: facebookInfo.email,
                    type: "Facebook",
                    sub: facebookInfo.userID,
                },
                }).then(response =>{
                    console.log(response.status);
                    let data = response.data;
                    request({
                    url: api.REGISTER_VERIFY_GUEST,
                    method: POST,
                    data:{
                        userId: data.userId,
                        firstName: autoCapitalize(facebookInfo.first_name),
                        lastName : autoCapitalize(facebookInfo.last_name),
                        checkPass: "No"
                    }
                    }).then(response =>{
                        console.log(response.status);
                        //START - Login by Token
                            request({
                            url   : api.PUBLIC_USERS_BY_EMAIL,
                            method: POST,
                            data  : {
                                email: response.data.email
                            }
                            }).then(response => {
                            let myCurrentDate =  new Date();
                            let myFutureDate  =  new Date(myCurrentDate);
                                myFutureDate.setDate(myFutureDate.getDate()+ 30);

                            let myCurrentDate_Holder = Math.floor(myCurrentDate/1000);
                            let myFutureDate_Holder  = Math.floor(myFutureDate/1000);

                            let payload = {
                                "sub": response.data.email,
                                "nbf": myCurrentDate_Holder,
                                "id" : response.data.userId,
                                "exp": myFutureDate_Holder,
                                "iat": myCurrentDate_Holder
                            }

                            const data = jwt.encode(payload, token_key , 'HS512');
                            setLocalStorageItem('token', data);
                            
                            request({
                                url: api.USERS_BY_TOKEN,
                                method: GET,
                                headers: {
                                    Authorization: BEARER + data
                                }
                            }).then(response => {
                                const { email, firstName, lastName, status, userId, checkPass, gender, phoneNumber } = response.data;
                                const birthday = response.data || response.data.birthday !== '27000' ? response.data.birthday : null;
                                
                                const payload = {
                                    token: data,
                                    user : { email, firstName, lastName, status, userId, checkPass, birthday, gender, phoneNumber }
                                    }

                                    dispatch({
                                        type: LOGIN,
                                        payload,
                                    })

                                    localStorage.removeItem('openpath')
                                    setLocalStorageItem('firstload', true);
                                    setLocalStorageItem('usestatus','applogin');
                                    setLocalStorageItem("firstloadchecker","FirstLoad");
                                    navigate('/');
                                

                            }).catch(error => {
                                console.log(error);
                            })        
                            }) 
                            //END
                    })
                })
                })
        }else{

            if(response.data.status === "ACT"){
            request({
            url   : api.PUBLIC_USERS_BY_EMAIL,
            method: POST,
            data  : {
                email: response.data.email
            }
            }).then(response => {
            let myCurrentDate =  new Date();
            let myFutureDate  =  new Date(myCurrentDate);
                myFutureDate.setDate(myFutureDate.getDate()+ 30);

            let myCurrentDate_Holder = Math.floor(myCurrentDate/1000);
            let myFutureDate_Holder  = Math.floor(myFutureDate/1000);

            let payload = {
                "sub": response.data.email,
                "nbf": myCurrentDate_Holder,
                "id" : response.data.userId,
                "exp": myFutureDate_Holder,
                "iat": myCurrentDate_Holder
            }

            const data = jwt.encode(payload, token_key , 'HS512');
                setLocalStorageItem('token', data);
                
                request({
                    url: api.USERS_BY_TOKEN,
                    method: GET,
                    headers: {
                        Authorization: BEARER + data
                    }
                }).then(response => {
                    const { email, firstName, lastName, status, userId, checkPass, gender, phoneNumber } = response.data;
                    const birthday = response.data || response.data.birthday !== '27000' ? response.data.birthday : null;

                    const payload = {
                        token: data,
                        user : { email, firstName, lastName, status, userId, checkPass, birthday, gender, phoneNumber }
                        }
                        dispatch({
                            type: LOGIN,
                            payload,
                        })
                        localStorage.removeItem('openpath')
                        setLocalStorageItem('firstload', true);
                        setLocalStorageItem('usestatus','applogin');
                        setLocalStorageItem("firstloadchecker","FirstLoad");
                        navigate('/');
                    
                }).catch(error => {
                    console.log(error);
                })        
            }) 
            }else if(response.data.status === "DEL"){
                 toast('Error', t("Sorry, this email is associated with an account scheduled for deletion."));
            }
            else{
                //Only PlaceHolder for the meantime while waiting for the actual process.
                  console.log("Users Account is Inactive")  
            }
        }

            }
        })
    })
    }

    //Google Login
    const handleCallbackResponse = (response) => {
    let credentialHolder = jwt_decode(response.credential);
    setType("Google");
    setCreds(credentialHolder.email);  
    setSubs(credentialHolder.sub); 
    request({
        url   : api.PUBLIC_USERS_BY_EMAIL,
        method: POST,
        data  : {
            email: credentialHolder.email
        }
    }).then(response => {
        const responseEmailHolder = response.data;
        request({
        url   : api.PUBLIC_USERS_BY_SUB,
        method: POST,
        data:{
            sub:credentialHolder.sub,
        }
        }).then(response => { 
        const responseSubHolder = response.data;
        if(responseEmailHolder !== null && responseSubHolder === null){
            setShow(false);
        }else{       
        if(responseSubHolder === null){
            request({
                url   : api.REGISTER,
                method: POST,
                data  : {
                    firstName: autoCapitalize(credentialHolder.given_name),
                    lastName : autoCapitalize(credentialHolder.family_name),
                    email    : credentialHolder.email,
                    password : credentialHolder.sub,
                }
            }).then(response => { 
                let data = response.data;
                request({
                url: api.REGISTER_VERIFY_EXTERNAL,
                method: POST,
                data: {
                    userId:data.userId,
                    email: credentialHolder.email,
                    type: "Google",
                    sub: credentialHolder.sub,
                },
                }).then(response =>{
                    console.log(response.status);
                    let data = response.data;
                    request({
                    url: api.REGISTER_VERIFY_GUEST,
                    method: POST,
                    data:{
                        userId: data.userId,
                        firstName: autoCapitalize(credentialHolder.given_name),
                        lastName : autoCapitalize(credentialHolder.family_name),
                        checkPass: "No"
                    }
                    }).then(response =>{
                        console.log(response.status);
                        //START - Login by Token
                            request({
                            url   : api.PUBLIC_USERS_BY_EMAIL,
                            method: POST,
                            data  : {
                                email: response.data.email
                            }
                            }).then(response => {
                            let myCurrentDate =  new Date();
                            let myFutureDate  =  new Date(myCurrentDate);
                                myFutureDate.setDate(myFutureDate.getDate()+ 30);

                            let myCurrentDate_Holder = Math.floor(myCurrentDate/1000);
                            let myFutureDate_Holder  = Math.floor(myFutureDate/1000);

                            let payload = {
                                "sub": response.data.email,
                                "nbf": myCurrentDate_Holder,
                                "id" : response.data.userId,
                                "exp": myFutureDate_Holder,
                                "iat": myCurrentDate_Holder
                            }

                            const data = jwt.encode(payload, token_key , 'HS512');
                            setLocalStorageItem('token', data);
                            
                            request({
                                url: api.USERS_BY_TOKEN,
                                method: GET,
                                headers: {
                                    Authorization: BEARER + data
                                }
                            }).then(response => {
                                const { email, firstName, lastName, status, userId, checkPass, gender, phoneNumber } = response.data;
                                const birthday = response.data || response.data.birthday !== '27000' ? response.data.birthday : null;
                                console.log('google login: ', response.data);
                                const payload = {
                                    token: data,
                                    user : { email, firstName, lastName, status, userId, checkPass, birthday, gender, phoneNumber }
                                    }

                                    dispatch({
                                        type: LOGIN,
                                        payload,
                                    })

                                    localStorage.removeItem('openpath')
                                    setLocalStorageItem('firstload', true);
                                    setLocalStorageItem('usestatus','applogin');
                                    setLocalStorageItem("firstloadchecker","FirstLoad");
                                    navigate('/');
                                

                            }).catch(error => {
                                console.log(error);
                            })        
                            }) 
                            //END
                    })
                })
                })
        }else{

            if(response.data.status === "ACT"){
            request({
            url   : api.PUBLIC_USERS_BY_EMAIL,
            method: POST,
            data  : {
                email: response.data.email
            }
            }).then(response => {
            let myCurrentDate =  new Date();
            let myFutureDate  =  new Date(myCurrentDate);
                myFutureDate.setDate(myFutureDate.getDate()+ 30);

            let myCurrentDate_Holder = Math.floor(myCurrentDate/1000);
            let myFutureDate_Holder  = Math.floor(myFutureDate/1000);

            let payload = {
                "sub": response.data.email,
                "nbf": myCurrentDate_Holder,
                "id" : response.data.userId,
                "exp": myFutureDate_Holder,
                "iat": myCurrentDate_Holder
            }

            const data = jwt.encode(payload, token_key , 'HS512');
                setLocalStorageItem('token', data);
                
                request({
                    url: api.USERS_BY_TOKEN,
                    method: GET,
                    headers: {
                        Authorization: BEARER + data
                    }
                }).then(response => {
                    const { email, firstName, lastName, status, userId, checkPass,  gender, phoneNumber } = response.data;
                    const birthday = response.data || response.data.birthday !== '27000' ? response.data.birthday : null;

                    const payload = {
                        token: data,
                        user : { email, firstName, lastName, status, userId, checkPass, birthday, gender, phoneNumber }
                        }
                        dispatch({
                            type: LOGIN,
                            payload,
                        })
                        localStorage.removeItem('openpath')
                        setLocalStorageItem('firstload', true);
                        setLocalStorageItem('usestatus','applogin');
                        setLocalStorageItem("firstloadchecker","FirstLoad");
                        navigate('/');
                    
                }).catch(error => {
                    console.log(error);
                })        
            }) 
            }else if(response.data.status === "DEL"){
                toast('Error', t("Sorry, this email is associated with an account scheduled for deletion."));
            }
            else{
                //Only PlaceHolder for the meantime while waiting for the actual process.
                  console.log("Users Account is Inactive")  
            }
        }

            }
        })
    })

    }

    //Normal Login
    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        request({
        url   : api.PUBLIC_USERS_BY_EMAIL,
        method: POST,
        data  : {
            email: values.email
        }
        }).then(response => { 
            let userStatusHolder = response.data.status;
            const { data } = response;
            console.log("RESPONSE: ", response.data.status)
            if(userStatusHolder == "DEL"){
                setErrors({
                    password: t("Sorry, this email is associated with an account scheduled for deletion.")
                })
                toast('Error', t("Sorry, this email is associated with an account scheduled for deletion."));
                return;
           }
            
            request({
            url: api.LOGIN,
            method: POST,
            data: {
                username: values.email,
                password: values.password,
            },
        }).then(response => {
            let userStatusHolder = response.data.status;
            const { data } = response;

            
            // Account is not verified
            if (userStatusHolder === "INA") {
                setErrors({
                    password: t("The email and/or password you entered is incorrect.")
                })
            } else {
                setLocalStorageItem('token', data);
                // console.log(getLocalStorageItem('token'))
                
                request({
                    url: api.USERS_BY_TOKEN,
                    method: GET,
                    headers: {
                        Authorization: BEARER + data
                    }
                }).then(response => {
                    console.log('userInfo:', response.data);
                    const { email, firstName, lastName, status, userId, gender, phoneNumber } = response.data;
                    const birthday = response.data || response.data.birthday !== '27000' ? response.data.birthday : null;
                    
                    const dateStamp = response.data.timestamp;
                    const dateStampAdd70 = response.data.timestamp + (86400 * 70);     
                         
                    if(dateStamp >= dateStampAdd70){
                        toast('Error', t("Password change is required every 70 days. Redirecting to reset password."));
                        setTimeout(() => {  navigate('/forgotpassword'); }, 3000);                  
                    }else{
                        if(isTrusted) {
                            const payload = {
                                token: data,
                                user : { email, firstName, lastName, status, userId, birthday, gender, phoneNumber }
                                }
            
                                dispatch({
                                    type: LOGIN,
                                    payload,
                                })

                                localStorage.removeItem('openpath')
                                setLocalStorageItem('firstload', true);
                                setLocalStorageItem('usestatus','applogin');
                                setLocalStorageItem("firstloadchecker","FirstLoad");
                                navigate('/');
                        }
                        else {
                            localStorage.removeItem('openpath')
                            setLocalStorageItem('firstload', true);
                            navigate('/verification',{state:{prevPath:prevLocation}});
                            request({
                                url: api.LOGIN_SECURITY_VERIFICATION,
                                method: POST,
                                data: {
                                    email: email
                                }
                            }).then(response => {
                                if(lang== "jp"){
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
                     
                        }
                    }

                }).catch(error => {
                
                    setErrors({
                    password: t("The email and/or password you entered is incorrect.")
                    
                })
            
                }).finally(() => {
                    setSubmitting(false);
                })
            }

            }).catch(error => {
                console.log('error :', error);
            }).finally(() => {
                setSubmitting(false);
            })

        }).catch(error => {
            console.log("Last Error: " ,error);
            setErrors({password: t("The email and/or password you entered is incorrect.")})            
        }).finally(() => {
            setSubmitting(false);
        })
    }

    const formik = useFormik({
        initialValues,
        validationSchema: authSchema,
        onSubmit: handleSubmit,
    });

    const handleClose = () => {
        setShow(true);
    }

    //Link Account
    const handleLink = () => {
    request({
    url   : api.PUBLIC_USERS_BY_EMAIL,
    method: POST,
    data  : {
        email: creds
    }
    }).then(response => {
        let data = response.data;
        let firstNameHolder = response.data.firstName;
        let lastNameHolder  = response.data.lastName;
        let checkPassHolder = response.data.checkPass;
        if(response.data.status === "DEL"){
            toast('Error', t("Sorry, this email is associated with an account scheduled for deletion."));
            setShow(true);
        }else{
        request({
        url: api.REGISTER_VERIFY_EXTERNAL,
        method: POST,
        data: {
            userId:data.userId,
            email: data.email,
            type : type,
            sub: subs,
        },
        }).then(response =>{
            console.log(response.status);
            request({
            url: api.REGISTER_VERIFY_GUEST,
            method: POST,
            data:{
                userId: data.userId,
                firstName: firstNameHolder,
                checkPass: checkPassHolder,
                lastName : lastNameHolder,
            }
            }).then(response =>{
                console.log(response.status);
                //START
                    request({
                    url   : api.PUBLIC_USERS_BY_EMAIL,
                    method: POST,
                    data  : {
                        email: response.data.email
                    }
                    }).then(response => {
                    let myCurrentDate =  new Date();
                    let myFutureDate  =  new Date(myCurrentDate);
                        myFutureDate.setDate(myFutureDate.getDate()+ 30);

                    let myCurrentDate_Holder = Math.floor(myCurrentDate/1000);
                    let myFutureDate_Holder  = Math.floor(myFutureDate/1000);

                    let payload = {
                        "sub": response.data.email,
                        "nbf": myCurrentDate_Holder,
                        "id" : response.data.userId,
                        "exp": myFutureDate_Holder,
                        "iat": myCurrentDate_Holder
                    }

                    const data = jwt.encode(payload, token_key, 'HS512');
                    setLocalStorageItem('token', data);
                    // console.log(getLocalStorageItem('token'))
                    
                    request({
                        url: api.USERS_BY_TOKEN,
                        method: GET,
                        headers: {
                            Authorization: BEARER + data
                        }
                    }).then(response => {
                        const { email, firstName, lastName, status, userId, checkPass, gender, phoneNumber } = response.data;
                        const birthday = response.data || response.data.birthday !== '27000' ? response.data.birthday : null;

                        const payload = {
                            token: data,
                            user : { email, firstName, lastName, status, userId , checkPass, birthday, gender, phoneNumber}
                            }

                            dispatch({
                                type: LOGIN,
                                payload,
                            })

                            localStorage.removeItem('openpath')
                            setLocalStorageItem('firstload', true);
                            setLocalStorageItem('usestatus','applogin');
                            setLocalStorageItem("firstloadchecker","FirstLoad");
                            navigate('/');
                            setShow(true);

                    }).catch(error => {
                        console.log(error);
                    })        
                    }) 
                //END
            })
        })

        }
    })
    }
    

    return (
        <div className={`${CLASSES.formContainer} mt-14 xss:mt-1`}>
            <LinkModal handleLink={handleLink} handleClose={handleClose} show={show}/>
            <form onSubmit={formik.handleSubmit} className={`${CLASSES.form} xss:mt-0`} >
                <div className={`${CLASSES.formSpace} xss:space-y-8 xss:text-xss xss:mt-3`}>
                    <Input id="email" name="email" label={t("Email")} type="email" formik={formik} props = { labelProp } aria-required={true} />

                    <Password id="password" name="password" label={t("Password")} formik={formik} props = { labelProp } />

                    <p className="flex italic text-gray-500 text-sm font-normal xss:text-xxs">
                        <span aria-hidden={true}>{t("Forgot Password?")}</span> <Link to={"/forgotpassword"} className="text-secondary ml-1" role="link" aria-label="Forgot Password? Click Here - Forgot Password Link">{t("Click Here.")}</Link>
                    </p>
                </div>
                <div className={`${CLASSES.buttonContainer} xss:pt-0`}>
                    <Button type="submit" label={t("SIGN IN")} disabled={ !formik.isValid || formik.isSubmitting } props = { labelProp } />
                </div>
               
                <div className={` mt-2 xss:space-y-8 xss:text-xss`}>
                <p className="flex text-black text-xs justify-center font-normal xss:text-xxs mb-2">
                        <span className='font-bold'>{t("Don't have an Account?")}</span> <Link to={'/signup'} className='font-bold text-secondary ml-1'> {t('Sign up')} </Link>
                    </p>
                    <p className="flex text-black text-sm justify-center font-normal xss:text-xxs">
                        <span>{t('Or Sign in with')}</span>
                    </p>
                        <div className ={`flex justify-center items-center text-center`} >
                            <span className="p-1 pr-3">
                            <FacebookLogin
                                appId="678202063752141"
                                autoload={false}
                                fields="name,email,picture,first_name,last_name"
                                callback={responseFacebook}
                                disableMobileRedirect={true}
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} type="button"><img src={IMAGES.FACEBOOK_LOGO} className="h-8 w-8 mt-2" alt="facebook" /></button>
                                )}
                            />
                            </span>
                            <span className="relative flex justify-center items-center p-1 pl-2 pr-3">
                                <img src={IMAGES.GOOGLE_LOGO} className="h-8 w-8 mt-1" alt="google" />
                                <Link to={""} id="googleID" className="absolute opacity-0" role="link" aria-label="google sign in"></Link>
                            </span>
                            <span className="p-1 pl-2">
                            <Link to={""} role="link"><img src={IMAGES.APPLE_LOGO} className="h-9 w-9" alt="apple" /></Link>
                            </span>
                        </div> 
                </div>
            </form>
        </div>
    )
}

const Signin = (props) => {
    const navigate = useNavigate();
    const { setHasLoaded, renderSr, toast } = props

    useEffect(() => {
      setHasLoaded(true);
      setLocalStorageItem("fromSignIn","yes");
      
    }, [])
    
    return (
        <div className={`${CLASSES.containerImage} font-body flex`} >
            { renderSr() }
            <div className="w-full h-full fixed inset-0 -z-10" >
                <picture className="w-full h-full bottom-0 " alt="" aria-label="Ramen in a bowl.">
                    <source media="(min-width: 450px) and (max-width: 1024px) and (min-height: 950px) and (max-height: 1366px)" srcSet={IMAGES.BGCOLORONLY} aria-hidden={true} />
                    <source media="(min-width: 800px) and (max-width: 1720px) and (max-height:750px)" srcSet={IMAGES.BGCOLORONLY} aria-hidden={true} />
                    <source media="(min-width: 800px) and (max-width: 1920px) and (min-height: 751px)" srcSet={IMAGES.BGCOLORONLY} aria-hidden={true} />
                    <source media="(min-width: 241px) and (max-width: 320px) and (max-height: 570px)" srcSet={IMAGES.BGCOLORONLY} aria-hidden={true} />
                    <source media="(min-width: 241px) and (max-width: 800px) and (min-height: 620px) and (max-height: 690px)" srcSet={IMAGES.BGCOLORONLY} aria-hidden={true} />
                    <source media="(max-width: 240px) and (max-height: 320px)" srcSet={IMAGES.BGCOLORONLY} aria-hidden={true} />
                    <source media="(max-height:620px)" srcSet={IMAGES.BGCOLORONLY} aria-hidden={true} />
                    <img src={IMAGES.BACKGROUND1} className="w-full h-full" role="img" alt="Ramen in a bowl." />
                </picture>
        </div>
        <div className="w-full h-full fixed inset-0 -z-10" >
                <picture className="w-full h-full bottom-0 " alt="" aria-label="Ramen in a bowl.">
                    <source media="(min-width: 450px) and (max-width: 1024px) and (min-height: 950px) and (max-height: 1366px)" srcSet={IMAGES.RAMEN800X1240} aria-hidden={true} />
                    <source media="(min-width: 800px) and (max-width: 1720px) and (max-height:750px)" srcSet={IMAGES.RAMEN1920X1200} aria-hidden={true} />
                    <source media="(min-width: 800px) and (max-width: 1920px) and (min-height: 751px)" srcSet={IMAGES.RAMEN1760X1080} aria-hidden={true} />
                    <source media="(min-width: 241px) and (max-width: 320px) and (max-height: 570px)" srcSet={IMAGES.RAMEN320X568} aria-hidden={true} />
                    <source media="(min-width: 241px) and (max-width: 800px) and (min-height: 620px) and (max-height: 690px)" srcSet={IMAGES.RAMEN320X568} aria-hidden={true} />
                    <source media="(max-width: 240px) and (max-height: 320px)" srcSet={IMAGES.RAMEN240X320} aria-hidden={true} />
                    <source media="(max-height:620px)" srcSet={IMAGES.BGCOLORONLY} aria-hidden={true} />
                    <img src={IMAGES.BACKGROUND1} className="w-full h-full" role="img" alt="Ramen in a bowl." />
                </picture>
                
             </div>
            <div className={`${CLASSES.main}`}>     
                 <div className ={`items-center flex justify-center`} > 
                    <div className="absolute left-4 top-6">
                        <BackButton to="/home"/>
                    </div>              
                    <img className="object-contain w-52 xss:w-20" src={IMAGES.YE_LOGO} alt="Yo-Kai Express Logo" aria-label="Yo-Kai Express Logo" />
                 </div>       
                <SigninForm navigate={navigate} toast={toast} />
            </div>
        </div>
    )
}

export default Signin;