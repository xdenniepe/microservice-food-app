import React, { useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";

const PrivacyPolicy = (props) => {
	const { setHasLoaded, renderSr, sidebarOpen, setSidebarOpen } = props;
	const privacyRef = useRef(null);
	const { t } = useTranslation(['privacy-policy']);

	useEffect(() => {
		setHasLoaded(true);
		window.scrollTo(0, 0)
	}, [])

	return (
		<div>
			{ renderSr() }
			<div className="text-sm md:text-sm sm:text-sm lg:text-sm text-gray-500 m-2 p-4 my-3 mt-12 xss:text-mdss xss:mt-6" aria-label="privacy policy">
				<h3 className="font-bold text-base" aria-label="Privacy Policy" tabIndex={0} ref={privacyRef} >{t(`Privacy Policy`)}</h3>
				<br />
				<h4>{t(`This Privacy Policy describes how Yo-Kai Express and its subsidiaries and affiliates globally (\"Yo-Kai\") may collect, use and disclose personal information of site visitors who access or uses our mobile app or our websites that links to this Privacy Policy for the services offered from various Yo-Kai platforms.`)}</h4>
				<br />
				<br />
				<h3 className="font-bold text-base" aria-label="Collection Of Information">{t(`Collection Of Information`)}</h3>
				<br />
				<h4>{t(`When you visit or use Yo-Kai services, Yo-Kai may obtain certain personal information from you, such as:`)}</h4>
				<br />
				<h4>{t(`Name, addresses, contact numbers, and email addresses. Information may also include Date of birth for age verification and gender; records of your orders and other transactions with Yo-Kai, Credit/Debit card number(s) and account information in association with billing address(es), even code(s) and expiration date(s). Exact location and previously visited locations will be stored.`)}</h4>
				<br />
				<h4>{t(`Yo-Kai may periodically conduct voluntary surveys, should you choose to participate, Yo-Kai will also collect and store the information you have provided. You must have consent of the person's information of which you are inputting into any of Yo-Kai services platform. By completing the required information, you are consenting that you have approval from the person if not you.`)}</h4>
				<br />
				<h4>{t(`Yo-Kai may collect certain information about you automatically when you visit or use our online services. This information may include your IP address, device, browser, language preference, URLs, length of visits, and pages viewed. Yo-Kai automatically collect information using various technologies and third parties. Cookies and web server logs may be stored on your computer. Please be aware that disabling cookies may affect our services to you.`)}</h4>
				<br />
				<h4>{t(`Depending on your devices and app permission settings, when using Yo-Kai app, we ma collect or have access to your precise geolocation, camera, and wifi connection information. You may opt out of granting permission, but the services Yo-Kai provide will depend on you granting access.`)}</h4>
				<br />
				<h4>{t(`You have the right to request that we disclose certain information to you about our collection and use of your personal information within 6 months. You also have the right to request for Yo-Kai to delete the personal information about you that we collected and retained.`)}</h4>
				<br />
				<h4>{t(`For more information or questions on Yo-Kai Privacy Policy, please contact us at`)} <a className="font-bold" aria-label="cs@yokaiexpress.com, Link, Double Tap to Redirect to cs@yokaiexpress.com email" href="mailto:cs@yokaiexpress.com">{t(`cs@yokaiexpress.com`)}</a></h4>
				
			</div>
		</div>
	)
}

export default PrivacyPolicy