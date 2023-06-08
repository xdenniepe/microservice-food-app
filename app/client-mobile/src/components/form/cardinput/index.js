import React, { useState } from "react";
import { displayError, getMaskedInputClasses } from "../../../service/helper";
import clsx from 'clsx';
import { useTranslation } from "react-i18next";

const CardInput = (props) => {
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

    const { t } = useTranslation(['payment_card_detail']);
    const getLabel = () => {
        if (!formik.errors[id] && formik.touched[id]) {
            return 'valid-label';
        }

        return '';
    }

    return (
        <div>
            <p id="cardinput-label" className="sr-only">{label}</p>
            <div className={`relative border-b text-base tracking-tight ${formik ? getMaskedInputClasses(formik, id) : ' '} ${containerclass}`}>
                <input 
                    type={type}
                    aria-describedby="cardinput-label"
                    name={name}
                    placeholder={" "}
                    className={`block w-full appearance-none focus:outline-none bg-transparent ${inputclass} xss:text-mdss`}
                    aria-live="polite"
                    maxLength={50}
                    aria-label= { props.props?.inputlabel ? props.props?.inputlabel : '' }                   
                    {...formik ? formik.getFieldProps(id) : null}
                    {...props}
                />
                <label htmlFor={name} aria-hidden="true" className={`absolute top-0 duration-300 origin-0 xss:text-xxs ${labelclass ? labelclass : 'text-black text-sm'} 
                    ${formik ? getLabel() : null}`}
                >
                    {t('Name On Card*')}
                </label>

                <div className={`absolute top-2 pt-4 text-error mt-1 font-normal tracking-tight ${errorclass ? errorclass : 'text-sm'} xss:text-xxs`} aria-live="polite">
                    { formik ? displayError(formik, id) : ' '}
                </div>

                {/* Special Errors  */}
                <div className={`absolute top-2 pt-4 text-error mt-1 font-normal tracking-tight xss:text-xxs ${errorclass ? errorclass : 'text-sm'}
                    ${clsx({ 'hidden': (formik ? error && formik : error) })}`}>
                    {error} 
                </div>
            </div>
        </div>
    )
}

export default CardInput;
