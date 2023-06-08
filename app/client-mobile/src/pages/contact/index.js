import React, { useEffect, useRef } from 'react'
import { useTranslation } from "react-i18next";


const Contact = (props) => {
  const { setHasLoaded, renderSr, sidebarOpen, setSidebarOpen } = props;
  const contactRef = useRef(null);
  const { t } = useTranslation(['contact_us']);
  
	useEffect(() => {
		setHasLoaded(true);
		window.scrollTo(0, 0)
	}, [])

  return (
		<div>
      { renderSr() }
			<div className="text-md sm:text-md md:text-md lg:text-lg text-gray-500 m-2 p-4 mt-24 xss:mt-12 xss:text-mdss" aria-label="Contact">
				<h4 className="mb-12 xss:mb-6"><span role="text">{t('At')} <strong>{t('Yo-Kai')}</strong> {t('we love to hear from our guests! See below for where to contact us')}</span></h4>
				<a className="font-bold mb-1" aria-label="cs@yokaiexpress.com, Link, Double Tap to Redirect to cs@yokaiexpress.com email" href="mailto:cs@yokaiexpress.com">cs@yokaiexpress.com</a><br/>
				<a className="font-bold" aria-label="+ 1 855 965 2439, Link, Double Tap to Dial the Yo-Kai Express Number" href="Tel:+1-855-965-2439">+ 1 855 965 2439</a>
			</div>
		</div>
  )
}

export default Contact