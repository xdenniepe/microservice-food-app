import React, { useEffect, useRef } from 'react'
import { CLASSES } from "../../utility/classes";
import { Link, useNavigate,  } from "react-router-dom";
import { useTranslation } from "react-i18next";




const navigation = [
    
    {
        current: false,
        name   : 'Account Deletion Feedback',
        path   : '/accountdeletion/accountdeletionfeedback',
        
    }
]


const accountdeletionfeedback = (props) => {
  const { setHasLoaded, renderSr } = props;
  const navigate = useNavigate();
  const termsRef = useRef(null);
  const { t } = useTranslation(['delete_retention_message']);

	useEffect(() => {
    setHasLoaded(true);
    window.scrollTo(0, 0)
	}, [])

    return (
     
        <div className={CLASSES.container}>
        <div className={CLASSES.main}>


        <div className="px-5">
            <h1 className="font-bold text-black text-sm xss:text-mdss" aria-label={`Rewards`}> {t(`Delete An Account`)} </h1>
            <p className="xss:text-xs text-gray-500 text-sm mt-2 mb-5" role="dialog" aria-label={`Enjoy`}>
                {t(`Please be sure that the request you submit here is `)}
                <strong>{t(`specifically for the purpose of deleting your Yo-Kai Express Account.`)} </strong>
                {t(`The information you'll be submitting will be used to delete the account you'll be providing.`)}
            </p>
            <p className="xss:text-xs text-gray-500 text-sm mt-2 mb-5" role="dialog" aria-label={`Enjoy`}>
                {t(`Our mission has always been to better serve you, and we're sorry to see you go. We're here to help, and we'd want the chance to fix any problems you're having with your account.`)}
            </p>
            <h1 className="font-bold text-black text-sm xss:text-mdss" aria-label={`Rewards`}> {t(`How to delete my account permanently?`)} </h1>
            <p className="xss:text-xs text-gray-500 text-sm mt-2 mb-5" role="dialog" aria-label={`Enjoy`}>
                {t(`If you definitely want to delete your account, take note of the following and complete the form below:`)}
            </p>
            
            <div className="xss:text-xs text-gray-500 text-sm mt-2 mb-5 flex flex-row" role="dialog" aria-label={`Enjoy`}>
                ⚪
                <div className='px-3'>
                {t(`Your Yo-Kai Express account  will become invisible, and permanently closed after it has been deleted. If you changed your mind, you will not be able to recover it.`)}
                </div>
            </div>

            <div className="xss:text-xs text-gray-500 text-sm mt-2 mb-5 flex flex-row" role="dialog" aria-label={`Enjoy`}>
                ⚪
                <div className='px-3'>
                {t(`Favorite properties will no longer be visible`)}
                </div>
            </div>
            <h1 className="font-bold text-black text-sm xss:text-mdss" aria-label={`Rewards`}> {t(`How to delete my account permanently?`)} </h1>
            <p className="xss:text-xs text-gray-500 text-sm mt-2 mb-5" role="dialog" aria-label={`Enjoy`}>
                {t(`If it's been less than 30 days since you initiated the deletion, you can cancel your account deletion. After 30 days, your account and all information will be permanently deleted, and won't be able to retrieve your information.`)}
            </p>
            <h1 className="font-bold text-black text-sm xss:text-mdss" aria-label={`Rewards`}> {t(`To cancel your deletion`)} </h1>
            <p className="xss:text-xs text-gray-500 text-sm mt-2 mb-5" role="dialog" aria-label={`Enjoy`}>
                {t(`Log in to your Yo-Kai Express account within 30 days of deleting account.`)}
            </p>
            
            <p className="xss:text-xs text-gray-500 text-sm mt-2 mb-5" role="dialog" aria-label={`Enjoy`}>
                <strong>
                {t(`By completing this form below, you agree to have your account deleted.`)}
                </strong>
            </p>
         </div>

         { renderSr() }
                
            <div className="mt-27 flex">
                    {
                    navigation.map((item) => (

                            <h1 className={`${CLASSES.buttonDefault} flex items-end px-6 text-white font-semibold justify-center xss:h-16 xss:w-full xss:text-mdss xss:rounded-xl xss:p-1`} aria-label="EMAIL US" role="button" key={item.name} onClick={() => {navigate(item.path)}}>
                                {t('Email Us')}
                            </h1>
                      
                    ))
                    }
                
            </div>
        </div>
    </div>
 
    )
}

export default accountdeletionfeedback