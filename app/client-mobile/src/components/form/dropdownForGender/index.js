import React, { useState } from "react";
import { displayError, getInputClasses } from "../../../service/helper";
import clsx from "clsx";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const SelectGender = (props) => {
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

  const {
    id,
    name,
    label,
    labelclass,
    type,
    containerclass,
    inputclass,
    formik,
    error,
    errorclass,
    optional,
    gender
  } = props;
  const { t } = useTranslation(["sign-up"]);
  return (
    <div>
      <div
        className={`relative text-base border-gray-500 border-b tracking-tight ${
          formik ? getInputClasses(formik, id) : " "
        } ${containerclass}`}
      >
        <span
          id="input-label"
          className="w-100 h-20 static"
          aria-label={label}
        />
        <select
          id="gender"
          className="appearance-none text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-white dark:border-white dark:placeholder-gray-400 dark:focus:ring-blue-500
             dark:focus:border-blue-500"
          aria-label={props.props?.inputlabel ? props.props?.inputlabel : ""}
          {...(formik ? formik.getFieldProps(id) : null)}
          {...props}
        >
          <option value="" disabled>({t('Optional')})</option>
          <option selected hidden={true}>{gender}</option>
          <option value="MALE">{t("MALE")}</option>
          <option value="FEMALE">{t("FEMALE")}</option>
          <option value="OTHERS">{t("OTHERS")}</option>
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            fill="gray"
            className="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectGender;
