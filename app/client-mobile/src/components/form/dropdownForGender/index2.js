import React, { useState } from "react";
import { displayError, getInputClasses } from "../../../service/helper";
import clsx from 'clsx';

const SelectGenderv2 = (props) => {
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
               
                <select id="countries" className="bg-gray-50 appearance-none
            text-black
            text-sm rounded-lg
          focus:ring-blue-500
            focus:border-blue-500 
             block w-full p-2.5
              dark:bg-white 
             dark:border-gray-600 
             dark:placeholder-gray-400 dark:focus:ring-blue-500              
             dark:focus:border-blue-500"
            aria-label= { props.props?.inputlabel ? props.props?.inputlabel : '' }                   
            {...formik ? formik.getFieldProps(id) : null}
            {...props}
            >
                <option value='' disabled></option>
                <option value='MALE'>{'MALE'}</option>
                <option value='FEMALE'>{'FEMALE'}</option>
                <option value='OTHERS'>{"OTHERS"}</option>
            </select>  

            <label htmlFor={name} aria-hidden="true" className={`absolute -top-3 duration-300 origin-0 xss:text-xxs ${labelclass ? labelclass : 'text-black text-sm'} 
                    ${formik ? getLabel() : null}`}
                >
                    {newlabel}                
                </label>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="gray" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </div>
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

export default SelectGenderv2;