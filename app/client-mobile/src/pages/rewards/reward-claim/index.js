import React, { useEffect, useRef, useState, useContext } from 'react'
import { CLASSES } from "../../../utility/classes";
import { useNavigate } from "react-router-dom";
import { IMAGES, GET, PUT } from "../../../utility/constants";
import { Link, useParams } from "react-router-dom";
import { request } from "../../../service/request";
import api from "../../../service/api";
import { AuthContext } from "../../../context/authContext";
import { useTranslation } from "react-i18next";

const RewardsClaim = (props) => {
  const params = useParams();
  const { setHasLoaded, toast } = props;
  const navigate = useNavigate();
  const uniqueKeyObj               = params;
  const uniqueKey = uniqueKeyObj.uniqueKey;
  const [ rewardDetails, setRewardDetails ]   = useState([]);
  const [ userDetails, setUserReward ]   = useState([]);
  const status = 'Claimed';
  const { user }                             = useContext(AuthContext)?.state;
  const userId = user.userId;
  const rawPercentage = userDetails.percentage;
  const sumPercentage = rawPercentage + rewardDetails.percentage;
  const { t } = useTranslation(["reward-claim"]);

    useEffect(() => {
        setHasLoaded(true);
        window.scrollTo(0, 0);
        getRewardDetails();
        getUserInfo();
        }, [])

    const claim = ()=>{

    if(rawPercentage > 0 ){
        toast('Error', `Unable to claim reward due to existing active reward`)
        navigate(-1);
    }
    else{
        request({
            url: api.REWARDSCLAIM_UPDATE + status + '/' + uniqueKey,
            method: PUT,
       
                
        }).then(response => {
            request({
                url: api.USERSUPDATEREWARDS + sumPercentage + '/' + userId,
                method: PUT,
            })
                
        })
           
            toast('Success', `${t('Voucher has been claimed successfully.')}`)
            navigate("/rewards");
        
            
    }
        
            
        }
    
       const getUserInfo = () => {
            request({
                url: api.USERSREWARDS+userId,
                method: GET,
            }).then(response => {
                setUserReward(response.data);
            })
        }
    

        const getRewardDetails = () => {
            request({
                url: api.REWARDSCLAIM + uniqueKey,
                method: GET,
            }).then(response => {
                setRewardDetails(response.data);
            })
        }


    return (
     
        <div className={CLASSES.container}>
        <div className={CLASSES.main}>
        <div className="flex flex-row justify-center">
                    <h1 className="font-bold text-secondary text-lg xss:text-mdss" aria-label={`Rewards`}> {`${t('CLAIM YOUR REWARDS')}`} </h1>
                </div>
                <div className="mt-10 flex justify-center">
                        <img className="w-55 h-40" src={IMAGES.REWARDSCLAIM} alt={`Ramen`} aria-label={`${t('CLAIM BOX')}`} />
                </div>
              
                <div className="flex-col flex-grow w-full mt-10 text-center" key={rewardDetails.percentage}>
                    <p className="xss:text-xs text-gray-500 text-sm" role="dialog" aria-label={`Enjoy`}>{`${t(`Here's a gift from us`)}`}</p>
                    <p className="xss:text-xs text-gray-500 text-sm" role="dialog" aria-label={`Enjoy`}>{`${t('Enjoy your')} `+ rewardDetails.percentage +`% ${t('off reward')}`}</p>
                </div>
                

                <div className="mt-34">
                        <h1 className={`${CLASSES.buttonDefault} flex items-end py-2 px-6 text-white font-semibold justify-center xss:h-16 xss:w-full xss:text-mdss xss:rounded-xl xss:p-1`} role="button" onClick={claim} >
                            {`${t('CLAIM')}`}
                        </h1>
                </div>
            </div>
        </div>
    )
}

export default RewardsClaim;
