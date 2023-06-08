import React, { useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";

const TermsConditions = (props) => {
  const { setHasLoaded, renderSr, sidebarOpen, setSidebarOpen } = props;
  const termsRef = useRef(null);
  const { t } = useTranslation(['terms-condition']);

	useEffect(() => {
    setHasLoaded(true);
    window.scrollTo(0, 0)
	}, [])
    

  return (
    <div className="flex flex-col">
      { renderSr() }
      <div className="text-sm sm:text-sm md:text-md lg:text-lg text-gray-500 m-2 p-4 my-3 mt-12 xss:text-mdss xss:mt-6" aria-label="Terms and Conditions">
        <h3 className="font-bold text-base" tabIndex={0} ref={termsRef} aria-label="Terms Of Service">{t(`Terms of Service`)}</h3>
        <br />
        <h4 aria-label="August 28, 2020">{t(`August 28, 2020`)}</h4>
        <br />
        <div className='relative'>
        <p  className='absolute opacity-5'>These terms of Service (the "Terms") governs your access to, and the use of, the websites, the mobile text program, third party messaging platforms, and online services collectively referred to as "the Services" operated by or on behalf of Yo-Kai Express Incorporated with headquarters at thirty five zero one, Breakwater Court, Hayward, CA 94545.</p>
        <h4 aria-hidden="true">{t(`These terms of Service (the \"Terms\") governs your access to, and the use of, the websites, the mobile text program, third party messaging platforms, and online services collectively referred to as \"the Services\" operated by or on behalf of Yo-Kai Express Inc with headquarters at thirty five zero one, Breakwater Court, Hayward, CA 94545.`)}</h4>
        </div>
        <br />
        <h3 className="font-bold text-base" aria-label="Binding Agreement">{t(`Binding Agreement`)}</h3>
        <br />
        <div className='relative'>
          {/* <p className='absolute opacity-5'>
            The terms are a binding legal document between you and Yo-Kai Express Incorporated. Please read the terms carefully prior to suing the Services. Children under the age of fourteen (14) is prohibited from usage of our mobile app, online platform and our machines. If you are between the age of fourteen and eighteen, parent consent is a must. In the event parent consent is unavailable, you must immediately delete our app, website and notify Yo-Kai Express Incorporated at cs@yokaiexpress.com
          </p> */}
          <h4>
            <span aria-hidden="true">
              {t(`The terms are a binding legal document between you and Yo-Kai Express Inc. Please read the terms carefully prior to suing the Services. Children under the age of fourteen (14) is prohibited from usage of our mobile app, online platform and our machines. If you are between the age of fourteen and eighteen, parent consent is a must. In the event parent consent is unavailable, you must immediately delete our app, website and notify Yo-Kai Express Inc at `)} 
            </span> 
            <a className="font-bold" aria-label="cs@yokaiexpress.com, Link, Double Tap to Redirect to cs@yokaiexpress.com email" href="mailto:cs@yokaiexpress.com">
                {t(`cs@yokaiexpress.com`)}
            </a>
            <span aria-hidden={true}>
              .
            </span>
          </h4>
        </div>
        <br />
        <h3 className="font-bold text-base" aria-label="Privacy">{t(`Privacy`)}</h3>
        <br />
        <h4>{t(`By using the Services, you have acknowledged that you have reviewed and understand our Privacy Policy, and have consent to the practices as described in our policy.`)}</h4>
        <br />
        <div className='relative'>
        <p className='absolute opacity-5'>Yo-Kai Express Incorporated makes no representation about the reliability of the features of the Services and any reliance on such material and/or shrives is at your own risk. Yo-Kai Express Incorporated does not endorse or control over submitted content on our online platform, mobile, and in person.</p>
        <h4 aria-hidden="true">{t(`Yo-Kai Express Inc makes no representation about the reliability of the features of the Services and any reliance on such material and/or shrives is at your own risk. Yo-Kai Express Inc does not endorse or control over submitted content on our online platform, mobile, and in person.`)}</h4>
        </div>
        <br />
        <div className='relative'>
        <p className='absolute opacity-5'>The Services are provided on a "as is" without any representation or warranty, express or implied, of any kind. To the fullest extent permitted by applicable law, Yo-Kai Express Incorporated hereby disclaims all warranties of any kind or nature, including, but not limited to, the implied warranties of merchantability, accuracy, non-infringement, and for any other purpose. Yo-Kai Express Incorporated will not be held liable to any person for dames of any kind, any direct, indirect, special consequential, punitive, or other dames resulting from your use or inability to use the Services.</p>
        <h4 aria-hidden="true">{t(`The Services are provided on a \"as is\" without any representation or warranty, express or implied, of any kind. To the fullest extent permitted by applicable law, Yo-Kai Express Inc hereby disclaims all warranties of any kind or nature, including, but not limited to, the implied warranties of merchantability, accuracy, non-infringement, and for any other purpose. Yo-Kai Express Inc will not be held liable to any person for dames of any kind, any direct, indirect, special consequential, punitive, or other dames resulting from your use or inability to use the Services.`)}</h4>
        </div>
        <br />
        <h3 className="font-bold text-base" aria-label="Indemnification">{t(`Indemnification`)}</h3>
        <br />
        <div className='relative'>
        <p className='absolute opacity-5'>You agree to indemnify, defend, and hold harmless Yo-Kai Express Incorporated, its affliates, its providers, its cobranding partners, project partners, and its officers, directors, employees, attorneys, and agents from and against any and all claims, damages, losses, costs (including reasonable attorney's fees), and expense that arise directly or indirectly out of or from your breach of these Terms and/or your activities in connection with the Services made available therein.</p>
        <h4 aria-hidden="true">{t(`You agree to indemnify, defend, and hold harmless Yo-Kai Express Inc, its affliates, its providers, its cobranding partners, project partners, and its officers, directors, employees, attorneys, and agents from and against any and all claims, damages, losses, costs (including reasonable attorney's fees), and expense that arise directly or indirectly out of or from your breach of these Terms and/or your activities in connection with the Services made available therein.`)}</h4>
        </div>
        <br />
        <h3 className="font-bold text-base" aria-label="Online Purchases">{t(`Online Purchases`)}</h3>
        <br />
        <div className='relative'>
        <p className='absolute opacity-5'>In order to purchase food products, merchandise, and other products through the Services, you must provide a valid payment card and billing information. Such information will be collected by Yo-Kai Express Incorporated and used in accordance with our Privacy Policy. Final price will be made clear during order process. You agree to pay the price that is stated at the time of your order, as well as any applicable taxes. Furthermore, you agree to have your payment card billed for the total amount displayed at check out. By purchasing items through the Services, you represent and warrant to Yo-Kai Express Incorporated that you are capable of entering into a contract under applicable law. Yo-Kai Express Incorporated reserve the right to revoke your access to our Services at any time without explanation. In order for you to access some features of the Services, you will have to create an account. Under no circumstances should you allow others to use your account, and you are an account. Under no circumstances should you allow others to use your account, and you are responsible for safe keeping of your password secure. While Yo-Kai Express Incorporated will not be liable for your losses caused by any unauthorized use of your account, you may be liable for the losses of Yo-Kai Express Incorporated or others due to such unauthorized use.</p>
        <h4 aria-hidden="true">{t(`In order to purchase food products, merchandise, and other products through the Services, you must provide a valid payment card and billing information. Such information will be collected by Yo-Kai Express Inc and used in accordance with our Privacy Policy. Final price will be made clear during order process. You agree to pay the price that is stated at the time of your order, as well as any applicable taxes. Furthermore, you agree to have your payment card billed for the total amount displayed at check out. By purchasing items through the Services, you represent and warrant to Yo-Kai Express Inc that you are capable of entering into a contract under applicable law. Yo-Kai Express Inc reserve the right to revoke your access to our Services at any time without explanation. In order for you to access some features of the Services, you will have to create an account. Under no circumstances should you allow others to use your account, and you are an account. Under no circumstances should you allow others to use your account, and you are responsible for safe keeping of your password secure. While Yo-Kai Express Inc will not be liable for your losses caused by any unauthorized use of your account, you may be liable for the losses of Yo-Kai Express Inc or others due to such unauthorized use.`)}</h4>
        </div>
        <br />
        <h3 className="font-bold text-base" aria-label="Text Messaging Notice">{t(`Text Messaging Notice`)}</h3>
        <br />
        <div className='relative'>
        <h4>{t(`Text messaging may be necessary for the use of the Services, promotions, and notifications that may involve sending or receiving messages. Yo-Kai Express Inc will not charge you for the text messaging, however, standard text messaging rates will apply to each text message sent or received as provided in your wireless rate plan. Consult your phone carrier for pricing plans and details.`)}</h4>
        </div>
        <br />
        <h3 className="font-bold text-base" aria-label="Governing Law And Jurisdiction">{t(`Governing Law and Jurisdiction`)}</h3>
        <br />
        <h4>{t(`These Terms are governed by United States law and are subject to all applicable federal, sate, and low laws and regulations.`)}</h4>
        <br />
        <h3 className="font-bold text-base" aria-label="Dispute Resolution">{t(`Dispute Resolution`)}</h3>
        <br/>
        <div className='relative'>
        <h4>{t(`You agree that any claim or dispute with Yo-Kai Express Inc arises connected to these Terms, you will send a written notice to Yo-Kai Express Inc. You agree that the requirements of this Dispute Resolution will apply even to disagreements that may have arisen before you accepted these Terms. You agree you will not take any legal action, including filing a lawsuit or demanding arbitration until 30 business days after you have sent the written notice. You agree for each dispute that is brought into a jury trial, arbitration, and/or mediation, the outcome is in Yo-Kai Express Inc favor, you must pay all fees and costs incurred by Yo-Kai Express Inc in court, including reasonable attorney's fees. You agree that you will not file a class action or collective action against Yo-Kai Express Inc, and you will not participate in a class action or collective action against them. You agree that you will not join your claims to those of any other person.`)}</h4>
        </div>
        <br />
      </div>
    </div>
  )
}

export default TermsConditions