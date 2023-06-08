import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { BEARER, GET, LOGIN, POST, IMAGES } from "../../utility/constants";
import { CLASSES } from "../../utility/classes";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../service/request";
import { setLocalStorageItem } from "../../service/helper";
import api from "../../service/api";
import { v4 as uuidv4 } from "uuid";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";


const setUserCachedData = async (url, cacheName, guestToken) => {
  const data = new Response(JSON.stringify(guestToken));
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);
  

  if (!cachedResponse || !cachedResponse.ok) {
    if ("caches" in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
      });
    }
  }
};

const userAuth = (data, dispatch, navigate) => {
  setLocalStorageItem("token", data);

  request({
    url: api.USERS_BY_TOKEN,
    method: GET,
    headers: {
      Authorization: BEARER + data,
    },
  })
    .then((response) => {
      console.log("response", response);

      const { email, firstName, lastName, status, userId } = response.data;

      const payload = {
        token: data,
        user: { email, firstName, lastName, status, userId },
      };

      dispatch({
        type: LOGIN,
        payload,
      });

      navigate("/");
      setLocalStorageItem("firstloadchecker","FirstLoad");
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLocalStorageItem("guestLogin", "guest");
    });
};

const ExploreMenu = (props) => {
  const { dispatch } = useContext(AuthContext);
  const { navigate } = props;

  const loginGuest = async () => {
    const cacheStorage = await caches.open("guestId");
    const cachedResponse = await cacheStorage.match("https://localhost:300");

    var gID = await cachedResponse.json();
    request({
      url: api.REGISTER,
      method: POST,
      data: {
        email: gID,
        password: gID,
      },
    })
      .then((response) => {
        console.log("response", response);
        const { data } = response;
        request({
          url: api.REGISTER_VERIFY_GUEST,
          method: POST,
          data: {
            userId: data.userId,
            firstName: "Guest",
            lastName: gID.substring(gID.length - 4),
          },
        }).then((response) => {
          request({
            url: api.LOGIN,
            method: POST,
            data: {
              username: gID,
              password: gID,
            },
          }).then((response) => {
            const { data } = response;

            console.log(response);

            // Account is not verified
            if (response.data !== "") {
              userAuth(data, dispatch, navigate);
            }
          });
        });
      })
      .catch((error) => {
        request({
          url: api.LOGIN,
          method: POST,
          data: {
            username: gID,
            password: gID,
          },
        }).then((response) => {
          const { data } = response;

          console.log(response);

          // Account is not verified
          if (response.data !== "") {
            userAuth(data, dispatch, navigate);
          }
        });
      });
  };

  const { t } = useTranslation(["home"]);
  return (
    <button onClick={loginGuest} className={`${CLASSES.buttonTransparent}`}>
      {t('Guest Login')}
    </button>
  );
};

const Home = () => {
  useEffect(() => {
    setUserCachedData("https://localhost:300", "guestId", uuidv4());
  });


  const { t } = useTranslation(["home"]);
  const navigate = useNavigate();

  return (
    <>
      <div className={`w-full  flex flex-col font-body bg-[url('/src/assets/images/bg_color_only.png')] h-[100vh]`}>
        <div className={`${CLASSES.main} mt-26 sm:justify-center -translate-y-[6rem] space-y-9 content-center overflow-hidden`}>

          <div className="ml-auto">
            <Link to={"/changeLanguage"} className=" mt-3 mr-2 flex p-1 bg-gray-100 rounded-full z-40" role="button" >

              <img src={IMAGES.GLOBEICON} className=' w-4 h-4 '/>
              <ChevronDownIcon className='h-4 w-4'/>
            </Link>
          </div>
          

          <div className ={`items-center flex justify-center`} >
            <img className="object-contain w-60 xss:w-24 " src={IMAGES.YE_LOGO} alt="Yo-Kai Express Logo" aria-label="Yo-Kai Express Logo" />
          </div> 
        
     
          <div className={`${CLASSES.buttonContainer} pt-4 font-semibold text-center space-y-9`}>
          
            <Link to={"/login"} className={`${CLASSES.buttonDefault} py-3 px-4 text-gray-50 w-[82%]`}>{" "}{t('Sign In')}{" "}</Link>
            <Link to={"/signup"} className={`${CLASSES.buttonTransparent}`}>{" "}{t('Sign Up')}{" "}</Link>
            <ExploreMenu navigate={navigate} />

          </div>
          <div className="flex justify-center items-center object-contain">
            <div className="absolute mt-40 w-72 ">
              <img className="mx-auto max-h-[23rem] " src={IMAGES.LOGO_HOME} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
