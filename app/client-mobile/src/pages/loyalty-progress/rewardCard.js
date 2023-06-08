import React, { useState,useEffect,useContext } from "react";
import { IMAGES } from "../../utility/constants";
import { CLASSES } from "../../utility/classes";
import { BsGift } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const rewardCard = (props) => {
  const [ color, setColor ]   = useState('');
  const [ disabled, setDisabled ]   = useState(false);
  const { loyaltyRewardPoints, percent, uniqueKey, tierText, tierColor } = props;
  const loyalty = localStorage.getItem('loyalty');
  const navigate = useNavigate();

  useEffect(() => {
    getActive();
}, [])



  const getActive = ()=>{
    if(loyalty < loyaltyRewardPoints){
      setColor('grayscale bg-gray-200');
      setDisabled(true);
    }
    else{
      setColor('');
      setDisabled(false);
    }
  }

  return (
    <div
      className={`flex flex-col space-y-8 mt-2`} 
      
      aria-label={`reward for ${loyaltyRewardPoints} points`} 
      
    >
      {
        <button
          className={`${CLASSES.roundedCard} p-3 flex flex-row border border-black border-opacity-20 py cursor-pointer disabled ${color}`}
          onClick={() => {navigate(`/loyaltyprogress/rewardClaim/${uniqueKey}`)}}
          type='button'
          disabled={disabled}
        >
          
          <div className="w-3/4 pl-1 mb-2 m-1">
            <div className="flex-col flex-grow w-full">
              <div className="flex flex-row space-x-1">
                <BsGift className="h-4 w-4 text-black opacity-50" />
                <h1 className="text-sm text-black font-normal opacity-90">
                  {loyaltyRewardPoints} PTS  <span className={`text-xs border-2 ml-1`} style={{ color: `${tierColor}`, borderColor: `${tierColor}`}}> <span> {tierText} </span></span>
                  
                </h1>
              </div>
              <p className="font-bold text-secondary text-left ml-1 w-10/12 xss:text-mdss text-2xl my-2" role="dialog" aria-label={`Enjoy`}> Enjoy {percent}% off </p>
              <p
                className="font-normal text-sm tracking-tight xss:text-mdss text-left ml-1"
                role="dialog"
                aria-label={`Limited`}
              >
                On your next purchase
              </p>
            </div>
          </div>
          <div className="">
            <img
              className=" h-[90px] w-[110px] rounded-xl float-right"
              src={IMAGES.DOGGORAMEN}
              alt={`ramen`}
              aria-label="Ramen in a bowl"
            />
          </div>
        </button>
      }
    </div>
  );
    

};

export default rewardCard;
