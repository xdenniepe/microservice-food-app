import React, { useEffect, useState } from "react";
import { CLASSES } from "../../../utility/classes";
import { IMAGES, POST } from "../../../utility/constants";
import api from "../../../service/api";
import { request } from "../../../service/request";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LinkExpired = (props) => {
  const { t } = useTranslation(["link-expired"]);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const navigate                        = useNavigate();
  const [ statusChecker, setStatusChecker ] = useState('');
  const [ statusResponse, setStatusResponse ] = useState('');

  useEffect(() => {
    request({ 
    url: api.PUBLIC_USERS_BY_VERIFICATION_CODE,
        method: POST,
        data: {
            code: searchParams.get("code"),
        }
  }).then((response) => {
      request({ 
      url: api.PUBLIC_USERS_BY_ID,
          method: POST,
          data: {
              userId:response.data.userId,
          }
      }).then((response) => {
        setStatusChecker(response.data.status);
      })

  });
  },[])

  const handleSubmit = () => {
  request({ 
    url: api.PUBLIC_USERS_BY_VERIFICATION_CODE,
        method: POST,
        data: {
            code: searchParams.get("code"),
        }
  }).then((response) => {
      request({ 
      url: api.PUBLIC_USERS_BY_ID,
          method: POST,
          data: {
              userId:response.data.userId,
          }
      }).then((response) => {
          request({
          url: api.REGISTER_VERIFY,
          method: POST,
          data: {
              email: response.data.email,
              baseUrl: window.location.origin,
              }
          }).then(() => {
              setStatusResponse(response);
              navigate("/success/?message=verifyemail");
          }).catch(error => {
              console.log(error);
          });
      })
  })
  console.log(statusResponse);
  }
  return (
    <div className="flex flex-col items-center justify-center py-10 xss:py-0">
        {statusChecker === "ACT" ?
        <>
        <h1 className="text-md my-2 text-center font-bold xss:text-mds">{t('Account is Already Active')}</h1>
        <img className="h-6/12 w-6/12 mt-2 mb-8 mx-auto" src={IMAGES.RESETCONFIRMATION} role="img" alt="VERIFICATION LINK EXPIRED IMAGE" />
        <p className="w-10/12 font-light text-mds text-center xss:text-mdss" >{t('Looks like the verification link has expired and the account is already active.')}</p>
        <Link to={'/login'} className={`${CLASSES.buttonDefault} font-semibold text-white text-lg mt-8 py-2 w-11/12 text-center mx-auto xss:text-xxs`} role="link" aria-label="Back to Sign In" >
               {t('Back to Sign-In')}
        </Link>
        </>
        :
        <>
         <h1 className="text-md my-2 text-center font-bold xss:text-mds">{t('The link has expired')}</h1>
        <img className="h-6/12 w-6/12 mt-2 mb-8 mx-auto" src={IMAGES.RESETCONFIRMATION} role="img" alt="VERIFICATION LINK EXPIRED IMAGE" />
        <p className="w-10/12 font-light text-mds text-center xss:text-mdss" >{t('Looks like the verification link has expired. We can send the link again.')}</p>
        <button onClick={handleSubmit} type="button" className={`cursor-pointer w-3/4 text-white font-semibold py-2 px-4 mt-8 border border-transparent rounded-full shadow-sm text-base text-center bg-secondary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50`}>Reset Verification Link</button>
        </>
        }
       
    </div>
  );
};

export default LinkExpired;
