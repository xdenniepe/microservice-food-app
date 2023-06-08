import React, { useState } from "react";
import { displayError, getInputClasses } from "../../../service/helper";
import clsx from 'clsx';

import './dob.css';

const InputDOB = (props) => {
    /**
     * id = String
     * name = String
     * label = String
     * type = String
     * formik = Formik function
     * labelclass = String (classname)
     * containerclass = String (classname)
     * inputclass = String (classname)
     * error = String
     * errorclass = String
     * optional = Boolean
     */
    const { id, name, label, labelclass, type, containerclass, inputclass, formik, error, errorclass, optional } = props;
    const [ newlabel, setNewlabel ] = useState(optional === 'true' ? label + ' (Optional)' : label);

    const getLabel = () => {

        if (!formik.errors[id] && formik.touched[id]) {
            return 'valid-label';
        }

        return '';
    }

    const handleFocus = () => {
        setNewlabel(label)
    }

    const handleBlur = () => {
        setNewlabel((optional === 'true' && formik.values[id] === '') ? label + ' (Optional)' : label)
    }

    return (
        <div>
            <div className={`relative border-b text-base border-gray-500 tracking-tight ${formik ? getInputClasses(formik, id) : ' '} ${containerclass}`}>
                <span id="input-label" className="w-100 h-20 static" aria-label={label}/>
                <input 
                    type={type}
                    aria-describedby="input-label"
                    name={name}
                    placeholder={" "}
                    className={`block w-full appearance-none focus:outline-none bg-transparent ${inputclass} xss:text-xxs`}
                    aria-live="polite"
                    maxLength={50}
                    aria-label= { props.props?.inputlabel ? props.props?.inputlabel : '' }                   
                    {...formik ? formik.getFieldProps(id) : null}
                    {...props}
                />

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                </div>

                <label htmlFor={name} aria-hidden="true" className={`absolute top-0 duration-300 origin-0 xss:text-xxs ${labelclass ? labelclass : 'text-black text-sm'} 
                    ${formik ? getLabel() : null}`}
                >
                    {newlabel}                
                </label>

                <div className={`absolute top-2 pt-4 text-error mt-1 font-normal tracking-tight ${errorclass ? errorclass : 'text-sm'} xss:text-xxs`} aria-live="polite">
                    <p tabIndex={displayError(formik, id) !== ' ' ? 0 : 1}>{ formik ? displayError(formik, id) : ' '}</p>
                </div>

                {/* Special Errors  */}
                <div className={`absolute top-2 pt-4 text-error mt-1 font-normal tracking-tight xss:text-xxs ${errorclass ? errorclass : 'text-sm'}
                    ${clsx({ 'hidden': (formik && error ? false : true) })}`}>
                    {error} 
                </div>
            </div>
        </div>
    )
}

export default InputDOB;