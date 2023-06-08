import React, { useEffect, useRef } from 'react'
import { useTranslation } from "react-i18next";

const AccessibilityStatement = (props) => {
	const { t } = useTranslation(["accessibility"]);
	const { setHasLoaded, renderSr, sidebarOpen, setSidebarOpen } = props;
	const accessbilityRef = useRef(null)

	useEffect(() => {
		setHasLoaded(true);
		window.scrollTo(0, 0)
	}, [])

	return (
		<div>
			{ renderSr() }
			<div className="text-sm sm:text-sm md:text-md lg:text-lg text-gray-500 m-2 p-6 my-3 mt-12 xss:text-mdss xss:mt-6" aria-label="Accessibility Statement">
				<h3 className="font-bold text-base" tabIndex={0} ref={accessbilityRef} aria-label="Our Commitment to Accessibility">{t('Our Commitment to Accessibility')}</h3>
				<br />
				
				<h4>{t(`Yo-Kai Express is committed to making our website and/or mobile app content accessible and user friendly to everyone. If you are having difficulty viewing or navigating the content on this website or mobile application, or notice any content, feature, or functionality that you believe is not fully accessible to individuals challenged with impairments or disabilities, please email our team at`)} <span><a className="font-bold mb-1" aria-label="cs@yokaiexpress.com, Link, Double Tap to Redirect to cs@yokaiexpress.com email" href="mailto:cs@yokaiexpress.com">cs@yokaiexpress.com</a></span> {t(`with “Accessibility Request” in the subject line and provide a description of the specific feature you feel is not fully accessible or a suggestion for improvement.`)}</h4>
				<br />
				<h4>{t(`We take your feedback seriously and will consider it as we evaluate ways to accommodate all our customers and our overall accessibility policies.`)}</h4>
				<br />
			</div>
		</div>
	)
}

export default AccessibilityStatement