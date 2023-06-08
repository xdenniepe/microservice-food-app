import React, { useState } from "react";
import { displayError, getInputClasses } from "../../../service/helper";
import clsx from "clsx";
import PhoneInput from "react-phone-number-input/input";

const PhoneNumber = (props) => {
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
  } = props;
  const [newlabel, setNewlabel] = useState(
    optional === "true" ? label + " (Optional)" : label
  );
  const [value, setValue] = useState();

  const getLabel = () => {
    if (!formik.errors[id] && formik.touched[id]) {
      return "valid-label";
    }

    return "";
  };

  const handleFocus = () => {
    setNewlabel(label);
  };

  const handleBlur = () => {
    setNewlabel(
      optional === "true" && formik.values[id] === ""
        ? label + " (Optional)"
        : label
    );
  };
  return (
    <div>
      <div
        className={`relative text-base border-b border-gray-500 tracking-tight ${
          formik ? getInputClasses(formik, id) : " "
        } ${containerclass}`}
      >
        <span
          id="input-label"
          className="w-100 h-20 static"
          aria-label={label}
        />

        <PhoneInput
          defaultCountry="US"
          value={value}
          onChange={setValue}
          type={type}
          aria-describedby="input-label"
          name={name}
          placeholder={" "}
          className={`block w-full appearance-none focus:outline-none bg-transparent ${inputclass} xss:text-xxs`}
          aria-live="polite"
          maxLength={50}
          aria-label={props.props?.inputlabel ? props.props?.inputlabel : ""}
          {...(formik ? formik.getFieldProps(id) : null)}
          {...props}
        />

        <label
          htmlFor={name}
          aria-hidden="true"
          className={`absolute top-0 duration-300 origin-0 xss:text-xxs ${
            labelclass ? labelclass : "text-black text-sm"
          } 
            ${formik ? getLabel() : null}`}
        >
          {newlabel}
        </label>

        <div
          className={`absolute text-error mt-1 font-normal tracking-tight ${
            errorclass ? errorclass : "text-sm"
          } xss:text-xxs`}
          aria-live="polite"
        >
          <p tabIndex={displayError(formik, id) !== " " ? 0 : 1}>
            {formik ? displayError(formik, id) : " "}
          </p>
        </div>

        {/* Special Errors  */}
        <div
          className={`absolute text-error mt-1 font-normal tracking-tight xss:text-xxs ${
            errorclass ? errorclass : "text-sm"
          }
            ${clsx({ hidden: formik && error ? false : true })}`}
        >
          {error}
        </div>
      </div>
    </div>
  );
};

export default PhoneNumber;
