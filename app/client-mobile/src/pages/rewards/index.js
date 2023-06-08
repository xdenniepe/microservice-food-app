import React, { useEffect, useRef, useState, useContext} from 'react'
import { CLASSES } from "../../utility/classes";
import { useNavigate } from "react-router-dom";
import { GET, IMAGES, POST } from "../../utility/constants";
import api from "../../service/api";
import { request } from "../../service/request";
import { AuthContext } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import EmptyRewards from '../../components/emptystate/empty-rewards';

const Privacy = (props) => {
    const { setHasLoaded, renderSr} = props;
    const { user }                             = useContext(AuthContext)?.state;
    const privacyRef = useRef(null);
    const navigate = useNavigate();
    const [ rewards, setRewards ]   = useState([]);
    const userId = user.userId;
    const status = "notClaimed"
    const { t } = useTranslation(["rewards"]);

    useEffect(() => {
        setHasLoaded(true);
        window.scrollTo(0, 0);
        getRewards();
        checkLoyaltyPoints();
        checkDiscount();
        checkLoyaltyTier();
    }, [user])
    
    const getRewards = () => {
        request({
            url: api.REWARDS+userId+'/'+status,
            method: GET,
        }).then(response => {
            setRewards(response.data);
        })
    }

    //check if discount is existing
    const checkDiscount = () =>{
            request({
                url: api.USERSREWARDS+userId,
                method: GET,
            }).then(response => {
                if(response.data == null){
                    request({
                        url: api.CREATEUSERDISCOUNT,
                        method: POST,
                        data:
                        {
                            userId: userId,
                            percentage : 0
                            
                        }
                    
                })
                }

                else{
                    console.log('existing')
                }
            })
    }


    //check if discount is existing
    const checkLoyaltyPoints = () =>{
        request({
            url: api.LOYALTY+userId,
            method: GET,
        }).then(response => {
            if(response.data == null){
                request({
                    url: api.CREATELOYALTYPOINTS,
                    method: POST,
                    data:
                    {
                        userId: userId,
                        points : 0
                        
                    }
                
            })
            }

            else{
                console.log('existing')
            }
        })
    }

        //check if Order Count is existing
    const checkLoyaltyTier = () =>{
        request({
            url: api.TOTALMONEYSPENT+userId,
            method: GET,
        }).then(response => {
            if(response.data == null){
                request({
                    url: api.CREATETOTALMONEYSPENT,
                    method: POST,
                    data:
                    {
                        userId: userId,
                        totalSpending : 0
                        
                    }
                
            })
            }

            else{
                console.log('existing')
            }
        })
}




    return (
      
        <div>
            { renderSr() }
          
            <div className={`${CLASSES.main}`}>
            <div className="flex flex-row justify-center mb-3">
                    <div className='border-b-4 w-full border-secondary flex justify-center'>
                        <div className='ml-5'>
                            <h1 className="font-bold  text-secondary text-lg xss:text-mdss" aria-label={'Rewards'} >REWARDS</h1>
                        </div>
                    </div>  
                    <div className='border-b-4  w-full flex justify-center'> 
                        <div className='mr-5'>
                            <h1 className="font-bold text-gray-500 mr-2 text-lg xss:text-mdss" aria-label={'Loyalty'} onClick={() => {navigate(`/loyaltyprogress`)}}>LOYALTY</h1>
                        </div>
                    </div>
                </div>
                
                <div className={CLASSES.container}>
                    
                    <div className="flex flex-col space-y-8 mt-5">
                    
                    {
                    (rewards.length === 0) ?
                    <div>
                            <EmptyRewards />
                    </div>
                    :
                    rewards.map(({percentage, uniqueKey, source}) => (
                        // <div className={`${CLASSES.roundedCard} flex flex-row border border-black border-opacity-20 py-3 cursor-pointer h-48`} role="button" key={item.name} onClick={() => {navigate(item.path)}}>
                        <div className={`${CLASSES.roundedCard} flex flex-row border border-black border-opacity-20 py-3 cursor-pointer max-w-none`} key={uniqueKey}  onClick={() => {navigate(`/rewards/reward-claim/${uniqueKey}`)}}>
                            <div className="w-3/4 m-auto pl-2 mb-2">
                                <div className="flex-col flex-grow w-full">
                                    <p className="font-bold text-secondary mr-2 w-10/12 xss:text-mdss text-4xl mb-5" role="dialog"aria-label={`${t('Enjoy')}`}>{`${t('Enjoy')}`} {percentage}% {`${t('Off')}`}</p>
                                    <p className="font-light text-md tracking-tight xss:text-mdss mb-3" role="dialog" aria-label={`Receive from: ${source}`}>Received from: <br/> <span className='font-semibold ml-1 capitalize'> {source === "ufo" ? "UFO" : source }</span> </p>
                                </div>
                            </div>
                            <div className="pb-1">
                                <img className="object-cover w-55 h-40 rounded-xl float-right" src={IMAGES.RAMEN_REWARDS} alt={`Ramen`} aria-label={`${t('Ramen in a bowl')}`} />
                            </div>
                        </div>
                    ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Privacy;
