import React, { useEffect } from "react";
import { CLASSES } from "../../utility/classes";
import Offers from "../../assets/images/Offers.svg";
import { useNavigate } from "react-router-dom";
import Location from "../../assets/images/Location.svg";
import { Link } from "react-router-dom";
import TrustThisBrowser from '../dashboard/2FA-modal';
import { getLocalStorageItem } from "../../service/helper";
import { useTranslation } from "react-i18next";
import { setLocalStorageItem } from "../../service/helper";
const Dashboard = (props) => {
  const { setHasLoaded, renderSr, setSidebarOpen, sidebarOpen } = props;
  const navigate                                   = useNavigate();
  const isTrusted                                  = getLocalStorageItem("trusted");
  const isLoaded                                   = getLocalStorageItem('loaded');
  const isOpen2                                    = getLocalStorageItem('open');
  const fromSignIn                                 = getLocalStorageItem('fromSignIn');
  const guest                                      = getLocalStorageItem('guestLogin');
  const { t } = useTranslation(["dashboard"]);

  useEffect(() => {
    setHasLoaded(true);
    checkIfFromSignIn();
  }, [sidebarOpen])


  const checkIfFromSignIn = () =>{
    if(fromSignIn === 'yes'){
    setSidebarOpen(false)
    setLocalStorageItem("fromSignIn","no");

    }
    else{

      setLocalStorageItem("fromSignIn","no");

    }
  }

  return (
    <div className={`${CLASSES.container}`}>
      { isOpen2 === false ? renderSr() : null}
        { isTrusted === false && !isLoaded === true ? <TrustThisBrowser/>
        : renderSr()
      }
      <div aria-hidden={isOpen2 === true ? true : false} className="m-5 p-2">
        <h1
          className="font-bold text-secondary text-2xl"
          aria-label={`${t('Greetings')}`}
        >
          {`${t('Greetings')}`}
        </h1>
        <p
          className="text-md font-medium pt-1"
          aria-label={`${t('Welcome to Yo-Kai Express')}`}
        >
          {`${t('Welcome to Yo-Kai Express')}`}
        </p>
      </div>
      <div aria-hidden={isOpen2 === true ? true : false} className={`${CLASSES.container} space-y-10`}>
        <div className="relative h-[11rem] w-11/12 border-2 border-gray rounded-xl shadow-md mx-auto flex flex-col">
          <div className={`flex flex-row mt-3`}>
            <img className="mx-2 mt-6 h-[7rem]" src={Location} alt="Location Page Logo"/>
            <div className="mx-2 mt-2 flex flex-col justify-center">
              <h1 aria-label={`${t('Order Pick Up')}`} className={`text-secondary font-bold`}>{`${t('Order Pick Up')}`}</h1>
              <p className="text-xxd font-medium w-36" aria-label={`${t('Find a Yo-Kai machine near me')}`}>
                {`${t('Find a Yo-Kai machine near me')}`}
              </p>
            </div>
          </div>
          <div className="absolute flex justify-end bottom-0 right-0 w-full">
            <Link aria-label={`${t('Search Button')}`} className={`${CLASSES.buttonSmallLink} text-sm font-semibold`} to="/locationbased">
              {`${t('Search')}`}
            </Link>
          </div>
        </div>
        { guest !== "guest" ?
        <div className="relative h-[11rem] w-11/12 border-2 border-gray rounded-xl shadow-md mx-auto flex flex-col">
          <div className={`flex flex-row mt-3`}>
            <img className="mx-2 mt-6 h-[6rem]" src={Offers} />
            <div className="mx-2 mt-2 flex flex-col justify-center">
              <h1 aria-label={`${t('Offers and Deals')}`} className={`text-secondary font-bold` }>{`${t('Offers and Deals')}`}</h1>
              <p aria-label={`${t('Check rewards today')}`} className="text-xxd font-medium">{`${t('Check rewards today')}`}</p>
            </div>
          </div>
          <div className="absolute flex justify-end bottom-0 right-0 w-full">
            <Link aria-label={`${t('Proceed Button')}`} Button className={`${CLASSES.buttonSmallLink} text-sm font-semibold`} to="/rewards">
            {`${t('Proceed')}`}
            </Link>
          </div>
        </div>
        : "" }
      </div>
    </div>
  );
};

export default Dashboard;
