import React from "react";
import { CLASSES } from "../../../utility/classes";
import { BackButton } from "../../../components/common";

const NotFound = () => {
  return (
    <div className={CLASSES.container}>
    <div className={CLASSES.main}>
        <BackButton to="/" />
        <p className="text-secondary text-center text-xl font-bold mt-48 xss:text-mds xss:my-3" aria-label="Whoops">This page is not available.</p>
        <p className="text-center my-5 px-2 text-gray-600 xss:text-mdss xss:my-3 xss:px-3" aria-label="Check to see if the link you're trying to open is correct.">Check to see if the link you're trying to open is correct.</p>
    </div>
</div>
  )
}

export default NotFound; 