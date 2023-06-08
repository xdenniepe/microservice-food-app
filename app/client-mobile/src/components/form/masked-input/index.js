import React, {useState, useEffect }from "react";
import { displayError, getMaskedInputClasses } from "../../../service/helper";
import { EXPIRED_CARD } from "../../../utility/constants"
import MaskedInput from "react-text-mask";
import clsx from 'clsx';

const InputMasked = (props) => {
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
     */
    const { id, name, label, labelclass, type, containerclass, inputclass, formik, error, errorclass, mask } = props;

    const getLabel = () => {
        if (!formik.errors[id] && formik.touched[id]) {
            return 'valid-label';
        }
        return '';
    }

    return (
        <div>
            <p id="maskedinput-label" className="sr-only">{label}</p>
            <div className={`relative border-b text-base tracking-tight ${formik ? getMaskedInputClasses(formik, id) : ' '} ${containerclass}}`}>
                <MaskedInput 
                    id={id}
                    type={type}
                    aria-describedby="maskedinput-label"
                    name={name}
                    mask={mask}
                    placeholder={" "}
                    className={`text-black block w-full appearance-none focus:outline-none bg-transparent xss:text-mdss ${inputclass}`}
                    aria-label= { props.props?.inputlabel ? props.props?.inputlabel : '' }    
                    {...formik ? formik.getFieldProps(id) : null}
                    {...props}
                    
                />
                <label htmlFor={name} aria-hidden="true" className={`absolute top-0 duration-300 origin-0 xss:text-xxs ${labelclass ? labelclass : 'text-black text-sm'} 
                    ${formik ? getLabel() : null}`}
                >
                    {label}
                </label>

                <div className={`${formik.errors[id] === EXPIRED_CARD ? 'absolute w-72 flex items-center justify-items-center whitespace-pre-line  text-center pt-11 pr-8 xss:pt-24 ' : 'absolute top-2 pt-4'} text-error mt-1 font-normal tracking-tight ${errorclass ? errorclass : 'text-sm'} xss:text-xxs`} aria-live="polite">
                    { formik ? displayError(formik, id) : ' '}
                </div>

                {/* Special Errors  */}
                <div className={`absolute top-2 pt-4 text-error mt-1 font-normal tracking-tight xss:text-xxs ${errorclass ? errorclass : 'text-sm'}
                    ${clsx({ 'hidden': (formik ? error && formik : error) })}`} >
                    {error}
                </div>
            </div>
        </div>
    )
}

export default InputMasked;
