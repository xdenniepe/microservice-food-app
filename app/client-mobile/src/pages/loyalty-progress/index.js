import React, { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES,GET } from "../../utility/constants";
import { CLASSES } from "../../utility/classes";
import { BsGift } from "react-icons/bs";
import RewardCard from "./rewardCard";
import { request } from '../../service/request';
import api from "../../service/api";
import { AuthContext } from "../../context/authContext";
import ProgressBar from "@ramonak/react-progress-bar";
import { SlowBuffer } from "buffer";



const LoyaltyProgress = (props) => {
  const { setHasLoaded, renderSr} = props;
  const navigate = useNavigate();
  const [ loyalty, setloyalty ]   = useState(0);
  const [loyaltyReward, setLoyaltyReward] = useState([]);
  const [totalSpend, setTotalSpend] = useState([]);

  const [tierColor, setTierColor] = useState([]);
  const [tierText, setTierText] = useState([]);
  const [tierBorderColor, setTierBorderColor] = useState([]);
  const [maxCompleted, setMaxCompleted] = useState(100);
  const [progressBarColor, setProgressBarColor] = useState([]);
  const [tierNumber, setTierNumber] = useState(0);

  const { user }                             = useContext(AuthContext)?.state;
  const userId = user.userId;
  const loyaltyPoints = loyalty;
  const [tier1,   setTier1]               = useState(0);
  const [tier2, setTier2]               = useState(0);
  const [tier3, setTier3]               = useState(0);
  const [tier4, setTier4]               = useState(0);


  useEffect(() => {
    setHasLoaded(true);
    window.scrollTo(0, 0);
    getTotalSpent();
    getLoyalty();
    getLoyaltyTierList();
    
    
    
}, [totalSpend])


useEffect(() => {
  
  getLoyaltyReward();
  getTier();
  
  
}, [tierNumber, tier1])


  //get loyalty points from db
    const getLoyalty = () =>{
      request({
        url: api.LOYALTY+userId,
        method: GET,
    }).then(response => {
      setloyalty(response.data.points);
      localStorage.setItem('loyalty', (response.data.points));

    })
    }
 

    //retrieve rewards based on tier number
    const getLoyaltyReward = () =>{
      if(tierNumber != 0){
          request({
            url: api.LOYALTYREWARD + tierNumber,
            method: GET,
        }).then(response => {
          
          setLoyaltyReward(response.data);
        
    
        }) 
    }
    }

    //get loyalty tier list from db 
    const getLoyaltyTierList = () =>{
      request({
          url: api.LOYALTYTIERLIST+1,
          method: GET,
      }).then(response => {
        setTier1(response.data);
      }).then(
          request({
              url: api.LOYALTYTIERLIST+2,
              method: GET,
          }).then(response => {
            setTier2(response.data);
          })
      ).then(
          request({
              url: api.LOYALTYTIERLIST+3,
              method: GET,
          }).then(response => {
            setTier3(response.data);
          })
      ).then(
          request({
              url: api.LOYALTYTIERLIST+4,
              method: GET,
          }).then(response => {
            setTier4(response.data);
          })
      )
  }

  //retrieve total money spend of the user from database
    const getTotalSpent = () =>{
      request({
        url: api.TOTALMONEYSPENT+userId,
        method: GET,
    }).then(response => {
      const totalSpending = response.data.totalSpending;
      setTotalSpend(totalSpending);


    })
    }

    //will determined what tier is user based on his/her total money spend
    const getTier = () => {

            //run if user is in tier 1
            if(totalSpend >= tier1.tierLowestMoneySpent && totalSpend <= tier1.tierHighestMoneySpent){
              setTierText(tier1.tierName);
              setTierColor(tier1.tierColor);
            setMaxCompleted(tier1.tierHighestMoneySpent);
            setProgressBarColor(tier1.tierColor);
            setTierNumber(1);
            setTierBorderColor(tier1.tierColor);

          }

          //run if user is in tier 2 
          else if(totalSpend >= tier2.tierLowestMoneySpent && totalSpend <= tier2.tierHighestMoneySpent){
            setTierText(tier2.tierName);
            setTierColor(tier2.tierColor);
            setMaxCompleted(tier2.tierHighestMoneySpent);
            setProgressBarColor(tier2.tierColor);
            setTierNumber(2);
            setTierBorderColor(tier2.tierColor);



          }

          //run if user is in tier 3
          else if(totalSpend >= tier3.tierLowestMoneySpent && totalSpend <= tier3.tierHighestMoneySpent){
            setTierText(tier3.tierName);
            setTierColor(tier3.tierColor);
            setMaxCompleted(tier3.tierHighestMoneySpent);
            setProgressBarColor(tier3.tierColor);
            setTierNumber(3);
            setTierBorderColor(tier3.tierColor);


          }

          //run if user is in tier 4
          else if(totalSpend >= tier4.tierLowestMoneySpent && totalSpend <= tier4.tierHighestMoneySpent){
            setTierText(tier4.tierName);
            setTierColor(tier4.tierColor);
            setMaxCompleted(total);
            setProgressBarColor(tier4.tierColor);
            setTierNumber(4);
            setTierBorderColor(tier4.tierColor);


          }
          } 


  // this is settings for progress bar
  const progressBarSettings = {
      completed: `${totalSpend}`,
      bgColor:`${progressBarColor}`,
      baseBgColor:"white",
      height:"15px",
      maxCompleted: maxCompleted,
      animateOnRender: true,
      transitionDuration: '2.5s',
  };


   //map all of the rewards based on tier number
    loyaltyReward.map(({percent, loyaltyRewardPoints, uniqueKey}) => (
 
    {
      percent: {percent},
      loyaltyRewardPoints: {loyaltyRewardPoints},
      uniqueKey: {uniqueKey}
    }
    
    ));

    const navToTierList = () =>{
      navigate('/loyaltyprogress/seeAllTiers')
    }

  return (
    <div className={`${CLASSES.main}`}>
      <div className="flex flex-row justify-center mb-3">
                    <div className='border-b-4 w-full flex justify-center'>
                        <div className='ml-5'>
                            <h1 className="font-bold text-gray-500  text-lg xss:text-mdss" aria-label={'Rewards'} onClick={() => {navigate(`/rewards`)}}>REWARDS</h1>
                        </div>
                    </div>  
                    <div className='border-b-4 border-secondary w-full flex justify-center'> 
                        <div className='mr-5'>
                            <h1 className="font-bold text-secondary mr-2 text-lg xss:text-mdss" aria-label={'Loyalty'}>LOYALTY</h1>
                        </div>
                    </div>
                </div>

      <div className={`${CLASSES.container} mt-2`}>
        <div className="mt-2 flex flex-row space-x-1">
          
          <h1 className={`px-3 font-bold my-auto text-2xl`} style={{ color: `${tierColor}`}} aria-label="" >
          {tierText}
          </h1> 
          <h1 className="text-gray-500 px-3  w-full flex justify-end  my-auto " aria-label="SILVER" >
           <span className="align-baseline inline-block text-xs pt-1"> Points Earned:  </span> 
           <span className="pt-1 ml-1">
           <svg xmlns="http://www.w3.org/2000/svg" fill="full" viewBox="0 0 24 24" stroke-width="1.5" st className="rounded-lg w-4 h-4 border-2 border-secondary flex flex-row stroke-secondary fill-secondary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>

           </span>
           
           <span className="font-bold text-secondary text-md ml-1">
          
             {loyaltyPoints} Points</span>
             
          </h1> 
        </div>
      </div>

      <div className={`${CLASSES.roundedCard} mt-3 bg-giftboxcard bg-no-repeat bg-cover  border-black border-opacity-20 py-3 cursor-pointer h-48`} >
        
      <div className=" space-y-8 mt-2">
        <div className="flex flex-row space-x-12">
                <h1 className="text-base text-white font-normal mr-2 opacity-80">
                  To unlock the next tier:
                </h1>
                <h1 className="text-base text-white font-normal flex justify-end opacity-80 " role='button' onClick={navToTierList}>
                  See all Tiers {'>'}
                </h1>
        </div>
      </div>
      <div className=" space-y-8 mt-8">
        <div className="flex flex-row space-x-5">
                <h1 className="text-base text-white font-normal ">
                  <span className="text-white font-bold text-lg">${progressBarSettings.completed}/</span>${progressBarSettings.maxCompleted} 
                </h1>
                <h1 className="text-sm mt-1 text-white font-normal flex justify-end opacity-60">
                  Spend ${progressBarSettings.maxCompleted-progressBarSettings.completed} more 
                </h1>
        </div>
      </div>

      <ProgressBar {...progressBarSettings} /> 

      {/* <div className=" space-y-8 mt-6">
        <div className="flex flex-row space-x-5">
                <h1 className="text-sm text-white font-normal opacity-80">
                  Progress will be refresh on 12/08/2022
                </h1>
                <h1 className="text-sm  text-white font-normal flex justify-end opacity-80">
                  Details {'>'}
                </h1>
        </div>
      </div> */}
      
      </div>

      <div className={`${CLASSES.container} mt-2 p-3 `}>
        <div className="mt-2 flex flex-row space-x-1">
          <BsGift className="h-6 w-6 text-secondary" />
          <h1
            className="text-secondary font-bold my-auto"
            aria-label="Available Rewards"
          >
            Available Rewards
          </h1>
        </div>
      </div>

      <div className="flex flex-col space-y-5">
    
        {loyaltyReward
          
          .map((item, index) => (
            <RewardCard key={index} {...item} tierText = {tierText} tierColor = {tierColor} />
          ))}
      </div>
    </div>
  );
};

export default LoyaltyProgress;
