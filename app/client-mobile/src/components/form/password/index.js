import React, { useState, useEffect } from "react";
import { displayError, getInputClasses } from "../../../service/helper";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { passwordRegex } from "../../../utility/constants";
import clsx from 'clsx';
import { useLocation } from "react-router-dom";

const Password = (props) => {
    /**
     * id = String
     * name = String
     * label = String
     * error = String
     * showcriteria = Boolean
     * formik = Formik function
     * labelclass = String (classname)
     * containerclass = String (classname)
     * inputclass = String (classname)
     */
    const { id, name, label, containerclass, inputclass, labelclass, formik, errorclass, showcriteria, error } = props;
    const [showPassword, setshowPassword] = useState(false);
    const [srError, setSrError] = useState([]);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const passwordHints = "Must be at least 8 characters. Must have at least 1 lowercase letter. Must have at least 1 uppercase letter. Must have at least 1 number. Must have at least 1 special character.";
    let eyeon = "";
    let eyeoff = "";

    let srErrorHolder =  srError.sort(() => Math.random() - 0.5)
   
    if(location.pathname === "/login"){
        eyeon = "Eye icon - Reveal Sign In Password",
        eyeoff = "Crossed Eye Icon - Hide Sign In Password"
    }
    else if(location.pathname === "/signup"){
        eyeon = "Eye icon - Reveal Created Password",
        eyeoff = "Crossed Eye Icon - Hide Created Password"
    }
    else if(location.pathname === "/settings"){
        eyeon = "Eye icon - Reveal Profile Password",
        eyeoff = "Crossed Eye Icon - Hide Profile Password"
    }
    else{
        eyeon = "Eye icon - Reveal New Password",
        eyeoff = "Crossed Eye Icon - Hide New Password"
    }

    const handleshowPassword = () => {
        setshowPassword(!showPassword);
    }

    useEffect(() => {
        setSrError([]);
        passwordRegex.map((data) => {
            if (!formik.values.password.match(data.regex)) {
                setSrError( prev => [...new Set([...prev,'', data.accessibility])])
            } else if (formik.values.password.length < 8) {
                setSrError( prev => [...new Set(['You need to input at least 8 characters.','', ...prev])])
            }
        })
    }, [formik.values.password, formik.touched.password])

    const handleChange = event => {
    setMessage(event.target.value);
    };
    
    return (
        <>
            <div>
                <p id="password-hints" className="sr-only">{label} {showcriteria ? passwordHints : ''} </p>
                <div className={`text-black relative border-b text-base border-gray-500 focus-within:border-gray-500 tracking-tight ${formik ? getInputClasses(formik, id) : ' '} ${containerclass}`}>
                   {/*  <div>
                        <p id="passhints" className="hidden" aria-hidden="true">{label}, {showcriteria ? passwordHints : ''} </p>
                        <p id="passhints2" className="hidden" aria-hidden="true">Confirm Password</p>
                        <span id="password-hints" className="w-30 h-5 absolute" aria-labelledby={name === "password" ? "passhints" : 'passhints2'}/>
                    </div> */}
                    <input
                        aria-required="true"
                        aria-describedby="password-hints"
                        aria-label= { props.props?.passwordlabel ? props.props.passwordlabel : ''}
                        autoComplete="new-password"
                        type={showPassword ? "text" : "password"}
                        name={name}
                        placeholder={" "}
                        maxLength={50}
                        className={`block w-full appearance-none focus:outline-none bg-transparent ${inputclass} `}
                        {...formik ? formik.getFieldProps(id) : null}
                        {...props}
                        onKeyUp={handleChange}
                    />

                    <button id="show-password" type="button" role="switch" aria-pressed="false" className="float-right h-6 w-6 mr-2.5 -mt-8 cursor-pointer xss:h-5 xss:w-5 xss:-mt-6" onClick={handleshowPassword} >
                        <p aria-live="polite" className="sr-only">{showPassword ? eyeon : eyeoff}</p>
                        <EyeOffIcon /* hidden={showPassword} */ className={`${showPassword ? 'hidden' : 'visible'} text-gray-500 group-hover:text-gray-500`}  />
                        <EyeIcon    /* hidden={!showPassword} */ className={`${!showPassword ? 'hidden' : 'visible'} flex-shrink-0 text-secondary group-hover:text-secondary`} />
                    </button>
                    
                    <label htmlFor={name} aria-hidden={true} className={`absolute top-0 duration-300 origin-0 xss:text-xxs ${labelclass ? labelclass : 'text-black text-sm'}
                        ${location.pathname === '/login' || location.pathname === '/signup' || '/resetpassword/:code' ? (!formik.errors[id] && formik.touched[id] && message.length > 0) ? 'valid-label' : (formik.errors[id] && formik.touched[id] && message.length > 0) ? 'valid-label' : '' : (formik.errors[id] || formik.touched[id] && message.length > 0) ? 'valid-label' : ''}`}
                    >
                        {label}
                    </label>

                    <div className={`absolute top-2 pt-4 -mr-2 text-error mt-1 font-normal tracking-tight xss:text-xxs ${errorclass ? errorclass : 'text-sm'}`} aria-live="assertive" aria-describedby="password-errors">
                        { formik && !error && showcriteria !== "true" ? displayError(formik, id) : ' '}
                        <p id="password-errors" className="sr-only" role="alert" aria-atomic="true">{ showcriteria && formik.values.password ? srErrorHolder : ''} </p>
                    </div>

                    {/* Special Errors  */}
                    <div className={`absolute top-2 pt-4 text-error mt-1 font-normal tracking-tight xss:text-xxs ${errorclass ? errorclass : 'text-sm'}
                        ${clsx({ 'hidden': (!(error || showcriteria) && formik) })}`} >
                        {error}
                    </div>
                </div>
                <PasswordCriteria hidden={showcriteria === "true" ? false : true} values={formik.values}/>
                
            </div>
        </>
    )
}

const PasswordCriteria = (props) => {
    const { hidden, values } = props;

    return (
        <div hidden={hidden} aria-hidden={true} className="text-gray-500 mt-2 text-sm">
            <h3 className="font-bold"> Your password must have: </h3>
            <ul className="space-y-3 mt-3" aria-live="assertive">
                <div className="flex items-center">
                    <div className="w-6">
                        <CheckCircleIcon className={`${values.password.length < 8 ? 'hidden' : 'visible'} h-5 w-5 mr-2 text-green-700`} />
                        <XCircleIcon className={`${values.password.length >= 8 ? 'hidden' : 'visible'} h-5 w-5 mr-2 text-secondary`} />
                    </div>
                    <li aria-hidden={true}> Minimum of 8 characters </li>
                </div>

                {
                    passwordRegex.map((data, index) => {

                        return (
                            <div key={`_${index}`} className="flex items-center">
                                <div className="w-6">
                                    <CheckCircleIcon hidden={!values.password.match(data.regex)} className={`${!values.password.match(data.regex) ? 'hidden' : 'visible'} h-5 w-5 mr-2 text-green-700`} />
                                    <XCircleIcon hidden={values.password.match(data.regex)} className={`${values.password.match(data.regex) ? 'hidden' : 'visible'} h-5 w-5 mr-2 text-secondary`}/>
                                </div>
                                <li aria-hidden={true}>{data.description}</li>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Password;