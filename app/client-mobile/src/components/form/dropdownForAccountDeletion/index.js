import React, { useState } from "react";
import { displayError, getInputClasses } from "../../../service/helper";
import clsx from 'clsx';
import Select from 'react-select'
import { MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const SelectDropdown = (props) => {
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



    const { id, name, label, labelclass, type, containerclass, inputclass, formik, error, errorclass, optional} = props;

    
    const { t }= useTranslation(['deletion_feedback']);
    
    return (
        <div>
            <div className={`relative text-base border-gray-500 tracking-tight ${formik ? getInputClasses(formik, id) : ' '} ${containerclass}`}>
                
            <select id="countries" className="bg-gray-50 border appearance-none
            border-gray-300 
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
                <option value='' disabled>-{t('Select Reason')}-</option>
                <option value='unsatisfiedWithFeatures'>{t('Unsatisfied with Yo-Kai Express features')}</option>
                <option value='unsatisfiedWithServices'>{t('Unsatisfied with Yo-Kai Express services')}</option>
                <option value='unsatisfiedWithProducts'>{t("Unsatisfied with Yo-Kai Express products")}</option>
                <option value='didNotMeetExpectations'>{t('Did not meet my expectations')}</option>
            </select>                
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="gray" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </div>
            </div>
            
        </div>
    )
}

export default SelectDropdown;