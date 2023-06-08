import React, { useState, useEffect, useRef,useContext } from 'react';
import Webcam from 'react-webcam';
import RamenImages from '../../../assets/ar-games/ufo';
import CreateRamen from '../../../components/ar-games/ufo/ramen';
import CreateUFO from '../../../components/ar-games/ufo/ufo'
import { UFOHowToPlayTheGame, UFOCongratulations, ExitGameModal} from '../../../components/modal/';
import { request } from "../../../service/request";
import { POST } from "../../../utility/constants";
import api from "../../../service/api";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from '../../../utility/icons';
import { ClockIcon,StarIcon } from '@heroicons/react/outline';

const UFOGame  = (props) => {

    const { toast} = props;

    const navigate = useNavigate();

    const minLeft = 5;
    const MAX_TIME = 60;
    const refWidth = useRef();
    const refCamera = useRef(null);
    const [maxWidth, setMaxWidth] = useState(0);

    const [preCountDown,setPreCountDown] = useState(3);
    const [countDown, setCountDown] = useState(MAX_TIME);
    const [isGameStart,setIsGameStart] = useState(false);
    const [isRamenVisible,setIsRamenVisible] = useState(false);
    const [isPreStart,setIsPreStart] = useState(false);
    const [isUfoVisible,setIsUfoVisible] = useState(false);
    const [elements,setElements] = useState([]);
    const [score,setScore] = useState(0);
    const myScore = useRef(0);
    
    const [isDialogHidden, setIsDialogHidden] = useState(false);
    const [isExitDialogHidden, setIsExitDialogHidden] = useState(true);
    const [isCongratulationHidden, setIsCongratulationHidden] = useState(true);
    const { user }                         = useContext(AuthContext)?.state;
    const userId = user.userId;
    const [reward, setReward] = useState(0);
    const [uniqueKey, setUniqueKey] = useState(0);

    let intervalRef = useRef(0);
    let intervalPreCountRef = useRef(0);

    //get maximum width of screen
    useEffect(() => {
        setMaxWidth(window.innerWidth);
    },[]);

    //generate random number for reward code
    useEffect(() => {
        getRandomInt();
      }, []);
      

    //create random objects
    useEffect(() => {

        if(maxWidth > 0) {
            let ramens = [];
            for(let i = 1; i <= MAX_TIME; i++)
            {
            const intSelectedImage = Math.floor(Math.random() * (RamenImages.length-1));
            const newLeft = Math.abs(randomLeft());
            let ramenImage, points, speed;
            
            if(i == 10 || i == 20 || i == 30 || i == 40 || i == 50 || i == 55){
                ramenImage = RamenImages[13].img;
                points = RamenImages[13].points;
                speed = RamenImages[13].speed;
            } else {
                ramenImage = RamenImages[intSelectedImage].img;
                points = RamenImages[intSelectedImage].points;
                speed = RamenImages[intSelectedImage].speed;
            }
            
            
            ramens = ([...ramens,{img: ramenImage, points:points, left:newLeft, speed:speed}]);
            }
            setElements(ramens);
        }
        
    
    },[maxWidth]);
    
    //3seconds prestart
    useEffect(() => {
    
        if(isPreStart){
          if(preCountDown === 0){
            setInterval(() => {
              setIsGameStart(true); //start the game
              setIsRamenVisible(true);
              setIsPreStart(false); //stop precountdown
            },1000)
            
          }
          intervalPreCountRef.current = parseInt(setInterval(startPreCount, 1000)) ;
        } else {
          clearInterval(intervalPreCountRef.current);
        }
        return () => clearInterval(intervalPreCountRef.current);
    },[isPreStart,preCountDown]);

    //game official timer
    useEffect(() => {
        if(isGameStart){
          intervalRef.current = parseInt(setInterval(startGameCount, 1000)) ;
          if(countDown === 0){
            setIsGameStart(false);
            setIsRamenVisible(false);
            setIsCongratulationHidden(false);
            calculateReward();
          }
        } else {
          clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    },[isGameStart,countDown]);

    useEffect(() => {
        setScore(myScore.current);
    },[myScore.current]);

    const startGameCount = () => {
        setCountDown(countDown - 1);
    }

    const startPreCount = () => {
        setPreCountDown(preCountDown - 1);
    }

    const handleClickStart = () => {
        setIsPreStart(true);
        setIsUfoVisible(true);
    }

    const randomLeft = () => {
        const left = Math.floor(Math.random() * ((maxWidth - 100) - minLeft + 1) + minLeft);
        return left;
    }

    const handleRamenTouch = (e,points,index) => {
        setScore((prev) => parseInt(prev) + points < 0 ? 0  : parseInt(prev) + points)
        e.target.style.display = 'none';
    }

    const hideConfirmationDialog = () => {
        setIsDialogHidden(true);
    }

    const hideExitDialog = () => {
        setIsExitDialogHidden(true);
    }

    const handleNav = () =>{
        setIsExitDialogHidden(false)
    }

    const PlayAgain = ()=>{
        if( reward > 0)
        {
            request({
                url: api.CREATEREWARD,
                method: POST,
                data:
                {
                    userId: userId,
                    percentage: reward,
                    status: 'notClaimed',
                    uniqueKey: uniqueKey,
                    source: 'ufo'
                    
                }
            
            }).then({
                    
            })
        }

        window.location.reload(false);
    }

    const Continue = ()=>{
        if( reward > 0)
        {
            request({
                url: api.CREATEREWARD,
                method: POST,
                data:
                {
                    userId: userId,
                    percentage: reward,
                    status: 'notClaimed',
                    uniqueKey: uniqueKey,
                    source: 'ufo'
                    
                }
            
            }).then({
                    
            })
        }

        navigate('/ar-games')
    }

    const getRandomInt = () => {
        setUniqueKey(Math.floor(Math.random() * 9999999999));
   }

   const calculateReward = () => {
    if(score < 25){
        setReward(0)
    }
    else if (score >= 25 && score < 50){
        setReward(10)
    }
    else if (score >= 50){
        setReward(25)
    }
    else
    {
        setReward(0)
    }
}
    
    const videoConstraints = {
        facingMode: "environment"
      };

    return (
        <>  
            <ExitGameModal hideExitDialog={hideExitDialog} isExitDialogHidden={isExitDialogHidden}/>
            <div>
                <Webcam id='divCamera' ref={refCamera} className="min-w-[150vh] -z-1 fixed" videoConstraints={videoConstraints}/>
            </div>
            
            <ClockIcon className='stroke-secondary w-7 h-7 absolute top-7 left-0 mt-[26px] ml-7 bg-white rounded-full z-20' />
            <div class="absolute top-7 left-0 mt-[30px] h-13 w-20 ml-10 ">
                <div className='px-5 bg-white rounded-lg '>
                    <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                        {countDown}
                    </div>
                </div>
            </div>
      
         
            <StarIcon className='stroke-white stroke-1 border-2 w-7 h-7 absolute top-7 right-0 mt-[26px] mr-24 bg-white rounded-full border-secondary flex flex-row  fill-secondary z-20' />
            <div class="absolute top-7 right-0 mt-[30px] h-13 w-20 mr-7 ">
                <div className='px-4 bg-white rounded-lg '>
                    <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                        {score}
                    </div>
                </div>
            </div>
     
            <UFOHowToPlayTheGame hideConfirmationDialog={hideConfirmationDialog}  isDialogHidden={isDialogHidden}/>

            <div>
                {
                    !isPreStart && !isGameStart && countDown > 0 &&
                        <button 
                            className='fixed white text-2xl font-bold text-white w-full h-full z-10'
                            style={{
                                top:'50%',
                                left:'50%', 
                                transform:'translate(-50%,-50%)'
                            }}
                            onClick={handleClickStart}
                        >
                                Tap Screen To Start
                        </button> 
                }

                {
                    isPreStart && !isGameStart &&
                    <>
                        <div className="grid h-screen w-screen place-items-center absolute ">
                            <h1 className='text-bold text-xl text-white '>Game will start in...
                                <span className='flex justify-center font-bold text-4xl text-white'>{preCountDown}</span>
                            </h1>
                        </div>
                    </>
                }
            </div>

            {
                isUfoVisible && <CreateUFO />
            }

            { 
                elements.length > 0 && isRamenVisible &&
                elements.map((el,i) => {
                    return  <CreateRamen key={i} ramenImage={el.img} left={el.left} time={(i * 1000)} onClick={(e) => handleRamenTouch(e,el.points,i)} speed={el.speed} />
                })
            }

            {
                !isRamenVisible &&
                <UFOCongratulations isCongratulationHidden={isCongratulationHidden} points={score} Continue={Continue} PlayAgain={PlayAgain} /> 
            }
            <ChevronLeft className='stroke-white absolute w-10 h-10 mt-3 ml-2 z-10' role='button' onClick={handleNav} />

        </>
    )
}

export default UFOGame;