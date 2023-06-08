import React from "react";
import { autoCapitalize } from "../../../service/helper";
import { CLASSES } from "../../../utility/classes";

const Button = (props) => {
    /**
     * type     = String
     * label    = String
     * classes  = String (className)
     */
  const { type, label, classes } = props;

  return (   
    <button 
      type={type}
      className={`${CLASSES.buttonDefault} ${classes ? classes : 'font-semibold text-white'} xss:h-8 xss:text-xxs xss:items-center xss:flex xss:justify-center`}
      aria-label= { props.props?.buttonlabel ? props.props.buttonlabel : '' }
      {...props}
    >
      { label ? autoCapitalize(label) : '' }
    </button>    
  )
}

export default Button;
