import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { Button } from "../../components/common";
import { CLASSES } from "../../utility/classes";
import { editProfileSchema } from "../../validation/schema";
import { getLocalStorageItem } from "../../service/helper";
import { Input, Password } from "../../components/form";
import { POST } from "../../utility/constants";
import { Person } from "../../utility/icons"
import { request } from "../../service/request";
import { useFormik } from "formik";
import api from "../../service/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs'

import SelectGender from "../../components/form/dropdownForGender";
import InputDOB from "../../components/form/input-date";

const Settings = (props) => {
    const { setSidebarOpen, setHasLoaded, renderSr }    = props;
    const { user }                             = useContext(AuthContext)?.state;
    const gender = user.gender;
    const [ showCriteria, setShowCriteria ]    = useState(false);
    const [errorPassword, setErrorPassword]    = useState("");
    const navigate                             = useNavigate();
    const { t }                                = useTranslation(['settings']);
   const lang = localStorage.getItem('i18nextLng');

    const usePrevLocation = (location) => {
    const prevLocRef      = useRef(location);
    useEffect(()=>{
    prevLocRef.current = location
    },[location])

    return prevLocRef.current
    }

    const location     = useLocation();
    const prevLocation = usePrevLocation(location) 

    const birthdate = dayjs.unix(user.birthday).format('YYYY-MM-DD')

    const initialValues = {
        firstName      : user.firstName,
        lastName       : user.lastName,
        email          : user.email,
        phone          : user.phoneNumber,
        gender         : user.gender,
        dob            : user.birthday !== '-27000' && user.birthday !== null ? birthdate : '',
        password       : '',
        confirmPassword: '',
    }

    const labelProp = {
        eyeofficon   : "Crossed Eye Icon - Hide Profile Password",
        eyeicon      : "Eye Icon - Show Profile Password",
        passwordlabel: "Textbox for password",
        buttonlabel  : "Save Button"
    }
    const formsProp = [
        {
            inputlabel: "Input First Name"
        },
        {
            inputlabel: "Input Last Name"
        },
        {
            inputlabel: "Input Email Address"
        },
        {
            inputlabel: "Input Phone Number"
        },
        {
            inputlabel: "Input Gender"
        },
        {
            inputlabel: "Input Date of Birth"
        },
        {
            passwordlabel: "Input New Password"
        },
        {
            passwordlabel: "Confirm Input Password"
        }
    ]
	
    const componentDidMount = () => {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 1 && getLocalStorageItem('openpath') !== '/settings') {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
      localStorage.removeItem('openpath')
    } 
    else { 
      sessionStorage.removeItem('reloadCount'); 
    }
    }
        const handleSubmit = (values) => {
        console.log(`${api.USERS}/${user.userId}` );
        navigate('/verification',{state:{email2:user?.email,firstName2:values.firstName,lastName2:values.lastName,password2:values.password, birthday2:dayjs(values.dob).unix(), gender2: values.gender, phoneNumber2: values.phone, prevPath:prevLocation}});
        request({
            url: api.LOGIN_SECURITY_VERIFICATION,
            method: POST,
            data: {
                email: user.email,
               
                
            }
        }).then(response => {

            if(lang == "jp"){
            request({
                url: api.LOGIN_OTP_EMAIL_JP,
                method: POST,
                data: {
                    email: user.email,
                    

                }
            })
        }
            else{
                request({
                    url: api.LOGIN_OTP_EMAIL,
                    method: POST,
                    data: {
                        email: user.email,
                        
                    }
                })
            }
        })      
    }

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
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: editProfileSchema,
        onSubmit        : handleSubmit,
    });

    const handlePasswordChange = (event) => {
        const {name, value} = event.target;
        formik.setFieldValue(name,value);
        if(value === user.email) {
            setErrorPassword(`${t('Password must not match your email.')}`)
            setShowCriteria(false)
        }
        else {
            setErrorPassword("")
            setShowCriteria(true)
        }
    }

    useEffect(() => {  
        componentDidMount();
        if (getLocalStorageItem('openpath') !== '/settings') {
            setSidebarOpen(false);
        }
        setHasLoaded(true);       
        window.scrollTo(0, 0) 

        console.log('initialValues', initialValues);
        console.log('user:', user);
    }, [])

return (
    <>
    { user.checkPass === "No" ? 
        <>
        { renderSr() }
        {/* <p ref={refs} tabIndex={0} className="sr-only" aria-label="Edit Profile">Edit Profile</p> */}
        <div className="text-md sm:text-md md:text-md lg:text-lg text-gray-500 m-2 p-4 flex flex-col content-center items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex flex-col content-center items-center justify-center">
                <span className="w-11 h-11 text-center absolute" aria-label="Avatar Icon - Image for Avatar"/>
                <Person className="w-11 h-11 text-center"/>
            </div>
            <div className={CLASSES.formContainer}>
                <form onSubmit={formik.handleSubmit} className={`${CLASSES.form}`} >
                    <div className={`${CLASSES.formSpace} mt-8`}>
                        <Password id="password" name="password" label="Create New Password" errorclass="text-sm" onChange={handlePasswordChange} error={ formik.touched.password ? errorPassword : "" } formik={formik} showcriteria={showCriteria.toString()} onFocus={handleShowCriteria} props = {formsProp[2]}/>
                        <Password id="confirmPassword" name="confirmPassword" label="Confirm New Password" formik={formik} onFocus={handleHideCriteria}  props = {formsProp[3]}/>
                    </div>
                    <div className={`${CLASSES.buttonContainer} mt-12 xss:mt-6`}>
                        <Button type="submit" label="SAVE" disabled={
                            (formik.values.password.length <= 0 && formik.values.confirmPassword.length <= 0)
                            || !formik.isValid 
                            || formik.isSubmitting 
                            || formik.values.password !== formik.values.confirmPassword} props = { labelProp }/>
                    </div>
                </form>
            </div>
        </div>
        </> 
        : 
        <>
        { renderSr() }
        {/* <p ref={refs} tabIndex={0} className="sr-only" aria-label="Edit Profile">Edit Profile</p> */}
        <div className="text-md sm:text-md md:text-md lg:text-lg text-gray-500 m-2 p-4 flex flex-col content-center items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex flex-col content-center items-center justify-center">
                <span className="w-11 h-11 text-center absolute" aria-label="Avatar Icon - Image for Avatar"/>
                <Person className="w-11 h-11 text-center"/>
            </div>
            <div className={CLASSES.formContainer}>
                <form onSubmit={formik.handleSubmit} className={`${CLASSES.form}`} >
                    <div className={`${CLASSES.formSpace}`}>
                        <Input id="firstName" name="firstName" label={t("First Name")} type="text" formik={formik} props = {formsProp[0]}/>
                        <Input id="lastName" name="lastName" label={t("Last Name")} type="text" formik={formik}  props = {formsProp[1]}/>
                        <Input disabled id="email" name="email" label={t("Account Email Address")} type="email" formik={formik}  props = {formsProp[2]}/>
                        <Input id="phone" name="phone" label="Phone Number (Optional)" type="number"   formik={formik} props = {formsProp[3]} />                     
                        
                        <InputDOB type='date' id='dob' name="dob" label={"Date of Birth"} formik={formik} props = {formsProp[5]}/>
                        <label className="text-xs">Gender
                            <SelectGender id="gender" name="gender" label="Gender (Optional)" type="text" formik={formik} props = {formsProp[4]} gender={gender} />
                        </label> 
                        <Password id="password" name="password" label={t("New Password")} errorclass="text-sm" onChange={handlePasswordChange} error={ formik.touched.password ? errorPassword : "" } formik={formik} showcriteria={showCriteria.toString()} onFocus={handleShowCriteria} props = {formsProp[6]}/>
                        <Password id="confirmPassword" name="confirmPassword" label={t('Confirm Password')} formik={formik} onFocus={handleHideCriteria}  props = {formsProp[7]}/>
                    </div>
                    <div className={`${CLASSES.buttonContainer} mt-16 xss:mt-6`}>
                        <Button type="submit" label="SAVE" disabled={(initialValues.firstName === formik.values.firstName && initialValues.lastName === formik.values.lastName && formik.values.password.length <= 0 && initialValues.dob === formik.values.dob && initialValues.phone === formik.values.phone && initialValues.gender === formik.values.gender) 
                            || !formik.isValid 
                            || formik.isSubmitting 
                            || formik.values.password !== formik.values.confirmPassword} props = { labelProp }/>
                    </div>
                </form>
            </div>
        </div>
        </> 
    }
    </>
    )
};

export default Settings;
