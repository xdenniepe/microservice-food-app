import React, { useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";

const UnlinkSocialMedia = (props) => {
  const { setHasLoaded, renderSr, sidebarOpen, setSidebarOpen } = props;
  const termsRef = useRef(null);

	useEffect(() => {
    setHasLoaded(true);
    window.scrollTo(0, 0)
	}, [])
    

  return (
    <div className="flex flex-col">
      { renderSr() }
      <div className="text-sm sm:text-sm md:text-md lg:text-lg text-gray-500 m-2 p-4 my-3 mt-12 xss:text-mdss xss:mt-6" aria-label="Terms and Conditions">
        <h3 className="font-bold text-base" tabIndex={0} ref={termsRef} aria-label="Unlink Social Media">Unlink Social Media</h3>
        <br />
        
      </div>
    </div>
  )
}

export default UnlinkSocialMedia