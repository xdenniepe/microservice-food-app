import React, { useState } from "react";
import { displayError, getInputClasses } from "../../../service/helper";
import clsx from 'clsx';

const Textarea = (props) => {
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
            <div className={`relative text-base border-gray-500 tracking-tight ${formik ? getInputClasses(formik, id) : ' '} ${containerclass}`}>
                <span id="input-label" className="w-30 h-5 absolute" aria-label={label}/>
                <textarea 
                    type={type}
                    aria-describedby="input-label"
                    name={name}
                    placeholder={" "}
                    className={`border border-solid border-gray-400 w-full rounded-md p-2 ${inputclass} xss:text-xxs`}
                    rows="6" 
                    aria-live="polite"
                    maxLength={250}
                    aria-label= { props.props?.inputlabel ? props.props?.inputlabel : '' }                   
                    {...formik ? formik.getFieldProps(id) : null}
                    {...props}
                />
               

                <label htmlFor={name} aria-hidden="true" className={`absolute top-0 duration-300 origin-0 xss:text-xxs ${labelclass ? labelclass : 'text-black text-sm'} 
                    ${formik ? getLabel() : null}`}
                >
                    {newlabel}                
                </label>

                <div className={`absolute bottom-10 pt-4 p-2 text-error mt-1 font-normal tracking-tight ${errorclass ? errorclass : 'text-sm'} xss:text-xxs`} aria-live="polite">
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

export default Textarea;