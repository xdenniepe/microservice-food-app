import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas} from '@react-three/fiber'
import React, { Suspense, useRef, useState, useEffect,useContext  } from 'react'
import { Scene } from '../../../components/ar-games/bowling/Scene'
import Webcam from "react-webcam";
import { BowlingHowToPlayTheGame,BowlingCongratulations, ExitGameModal } from "../../../components/modal";
import { AuthContext } from "../../../context/authContext";
import { GET, PUT, POST,IMAGES  } from "../../../utility/constants";
import { request } from "../../../service/request";
import api from "../../../service/api";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from '../../../utility/icons';
import { ClockIcon,StarIcon } from '@heroicons/react/outline';

const BowlingGame= (props) => {
 
    const { toast} = props;

    const navigate = useNavigate();
    const [points, setPoints] = useState(0);

    // const [points, setPoints] = useState(0);
    const [isDialogHidden, setIsDialogHidden] = useState(false);
    const [isCongratulationHidden, setIsCongratulationHidden] = useState(true);
    const [isExitDialogHidden, setIsExitDialogHidden] = useState(true);
    const [counter, setCounter] = useState(3);
    const [gameSet, setGameSet] = useState(0);
    const [counterOn, setCounterOn] = useState(false);
    const [reward, setReward] = useState(0);
    const [uniqueKey, setUniqueKey] = useState(0);
    const [tapScreenOn, setTapScreenOn] = useState(false);

    const { user }                         = useContext(AuthContext)?.state;
    const userId = user.userId;

   

    useEffect(() => {
        calculateReward();
        startGame();

        if(counterOn == true){
            gameStartCounter();
        }

        
        
    
      }, [counter, points]);

      useEffect(() => {
        
        getRandomInt();

        
        
    
      }, []);

    const calculateReward = () => {
        if(points < 25){
            setReward(0)
        }
        else if (points >= 25 && points < 50){
            setReward(10)
        }
        else if (points >= 50){
            setReward(25)
        }
        else
        {
            setReward(0)
        }
    }

    const getRandomInt = () => {
         setUniqueKey(Math.floor(Math.random() * 9999999999));
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
                    source: 'Bowling'
                    
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
                    source: 'Bowling'
                    
                }
            
            }).then({
                    
            })
        }

        navigate('/ar-games')
    }

      //camera settings
    const refCamera = useRef(null);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "environment"
        }


    //the countdown before game start
    const gameStartCounter = () =>{

        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        
    }

    
    const startGame = () =>{
        //will start the game after counter hit zero
        if(counter == 0 && gameSet == 0){
           setGameSet(1);
           setCounter(12)
           setCounterOn(true);

           

        }
        else if(counter == 0 && gameSet == 1){
            setGameSet(1.5);
            setCounter(3);
            setCounterOn(true)
 
         }
         
        else if (counter == 0 && gameSet == 1.5){
            setGameSet(2)
            setCounterOn(true)
            setCounter(12)
        }
        else if(counter == 0 && gameSet == 2){
            setCounter(3);
            setCounterOn(true)
            setGameSet(2.5);
    
         }
        else if (counter == 0 && gameSet == 2.5){
            setGameSet(3)
            setCounterOn(true)
            setCounter(12)
        }
        else if(counter == 0 && gameSet == 3){
            setCounter(3);
            setCounterOn(true)
            setGameSet(3.5);
    
         }
        else if (counter == 0 && gameSet == 3.5){
            setGameSet(4)
            setCounterOn(true)
            setCounter(12)
        }
        else if(counter == 0 && gameSet == 4){
            setCounter(3);
            setCounterOn(true)
            setGameSet(4.5);
    
         }
        else if (counter == 0 && gameSet == 4.5){
            setGameSet(5)
            setCounterOn(true)
            setCounter(12)

        }
        else if (counter == 0 && gameSet == 5){
            openCongratsModal();
        }
        
    }

    //will close the modal
    const hideConfirmationDialog = () => {
            setIsDialogHidden(true);
            setTapScreenOn(true)
    }

    const startSet2 = () =>{
        setCounter(3);
        setCounterOn(true)
        setGameSet(1.5);
    }

    const startSet3 = () =>{
        setCounter(3);
        setCounterOn(true)
        setGameSet(2.5);
    }
    const startSet4 = () =>{
        setCounter(3);
        setCounterOn(true)
        setGameSet(3.5);
    }
    const startSet5 = () =>{
        setCounter(3);
        setCounterOn(true)
        setGameSet(4.5);
    }

    //will open congrats modal
    const openCongratsModal = () => {
        setIsCongratulationHidden(false);
        
    }

    const handleNav = () =>{
        setIsExitDialogHidden(false)
    }

    const hideExitDialog = () => {
        setIsExitDialogHidden(true);
    }
    
    const tapScreen = () =>{
        setCounterOn(true)
        gameStartCounter();
        setTapScreenOn(false);
    }
    
  return (
    <div>


   
    {/* CAMERA */}
    <Webcam  ref={refCamera} videoConstraints = {videoConstraints} className="min-w-[200vh] -z-1 fixed"/>
     
    <BowlingHowToPlayTheGame hideConfirmationDialog={hideConfirmationDialog}  isDialogHidden={isDialogHidden}/>

    {tapScreenOn ? 
    <button className='fixed white text-2xl font-bold text-white w-full h-full z-10' style={{top:'50%',left:'50%', transform:'translate(-50%,-50%)' }} onClick={tapScreen}>
                                Tap Screen To Start
    </button> 
                 :
    <></>    
    }
    <ChevronLeft className='stroke-white absolute w-10 h-10 mt-3 ml-2 z-10' role='button' onClick={handleNav} />
    {/* The button at the top  */}
    
    {gameSet == 1 ?
        <div className='flex flex-col'>
          
                <ClockIcon className='stroke-secondary w-7 h-7 absolute top-5 right-0 mt-[34px] mr-20 bg-white rounded-full z-10' />
                <div class="absolute top-5 right-0 mt-[38px] h-13 w-20 mr-5 ">
                    <div className='px-5 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                {counter}
                            </div>
                    </div>
                
            
                </div>
                <img className='stroke-secondary w-7 h-7 absolute top-14 right-0 mt-[44px] mr-20 bg-white rounded-full z-10'src={IMAGES.PINICON} alt={`bowling pin icon`} aria-label='bowling pin icon' />
                <div class="absolute top-14 right-0 mt-[48px] h-13 w-20 mr-5 ">
                    <div className='px-4 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                Set 1
                            </div>
                    </div>
                
            
                </div>
                <StarIcon className=' stroke-white stroke-1 border-2 w-7 h-7 absolute top-14 right-0 mt-[89px] mr-20 bg-white rounded-full border-secondary flex flex-row  fill-secondary z-10' />
                <div class="absolute top-14 right-0 mt-[94px] h-13 w-20 mr-5 ">
                    <div className='px-4 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                {points}
                            </div>
                    </div>
                
            
                </div>
        
        </div>

    : <></>}


    {gameSet == 2 ?
        <div className='flex flex-col'>
          
                <ClockIcon className='stroke-secondary w-7 h-7 absolute top-5 right-0 mt-[34px] mr-20 bg-white rounded-full z-10' />
                <div class="absolute top-5 right-0 mt-[38px] h-13 w-20 mr-5 ">
                    <div className='px-5 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                {counter}
                            </div>
                    </div>
                
            
                </div>
               
                <img className='stroke-secondary w-7 h-7 absolute top-14 right-0 mt-[44px] mr-20 bg-white rounded-full z-10'src={IMAGES.PINICON} alt={`bowling pin icon`} aria-label='bowling pin icon' />

                <div class="absolute top-14 right-0 mt-[48px] h-13 w-20 mr-5 ">
                    <div className='px-4 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                Set 2
                            </div>
                    </div>
                
            
                </div>
                <StarIcon className=' stroke-white stroke-1 border-2 w-7 h-7 absolute top-14 right-0 mt-[89px] mr-20 bg-white rounded-full border-secondary flex flex-row  fill-secondary z-10' />
                <div class="absolute top-14 right-0 mt-[94px] h-13 w-20 mr-5 ">
                    <div className='px-4 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                {points}
                            </div>
                    </div>
                
            
                </div>
        
        </div>

    : <></>}

    {gameSet == 3 ?
        <div className='flex flex-col'>
          
                <ClockIcon className='stroke-secondary w-7 h-7 absolute top-5 right-0 mt-[34px] mr-20 bg-white rounded-full z-10' />
                <div class="absolute top-5 right-0 mt-[38px] h-13 w-20 mr-5 ">
                    <div className='px-5 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                {counter}
                            </div>
                    </div>
                
            
                </div>
                <img className='stroke-secondary w-7 h-7 absolute top-14 right-0 mt-[44px] mr-20 bg-white rounded-full z-10'src={IMAGES.PINICON} alt={`bowling pin icon`} aria-label='bowling pin icon' />

                <div class="absolute top-14 right-0 mt-[48px] h-13 w-20 mr-5 ">
                    <div className='px-4 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                Set 3
                            </div>
                    </div>
                
            
                </div>
                <StarIcon className=' stroke-white stroke-1 border-2 w-7 h-7 absolute top-14 right-0 mt-[89px] mr-20 bg-white rounded-full border-secondary flex flex-row  fill-secondary z-10' />
                <div class="absolute top-14 right-0 mt-[94px] h-13 w-20 mr-5 ">
                    <div className='px-4 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                {points}
                            </div>
                    </div>
                
            
                </div>
        
        </div>

    : <></>}

    {gameSet == 4 ?
        <div className='flex flex-col'>
          
                <ClockIcon className='stroke-secondary w-7 h-7 absolute top-5 right-0 mt-[34px] mr-20 bg-white rounded-full z-10' />
                <div class="absolute top-5 right-0 mt-[38px] h-13 w-20 mr-5 ">
                    <div className='px-5 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                {counter}
                            </div>
                    </div>
                
            
                </div>
                <img className='stroke-secondary w-7 h-7 absolute top-14 right-0 mt-[44px] mr-20 bg-white rounded-full z-10'src={IMAGES.PINICON} alt={`bowling pin icon`} aria-label='bowling pin icon' />

                <div class="absolute top-14 right-0 mt-[48px] h-13 w-20 mr-5 ">
                    <div className='px-4 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                Set 4
                            </div>
                    </div>
                
            
                </div>
                <StarIcon className=' stroke-white stroke-1 border-2 w-7 h-7 absolute top-14 right-0 mt-[89px] mr-20 bg-white rounded-full border-secondary flex flex-row  fill-secondary z-10' />
                <div class="absolute top-14 right-0 mt-[94px] h-13 w-20 mr-5 ">
                    <div className='px-4 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                {points}
                            </div>
                    </div>
                
            
                </div>
        
        </div>

    : <></>}

    {gameSet == 5 ?
        <div className='flex flex-col'>
          
                <ClockIcon className='stroke-secondary w-7 h-7 absolute top-5 right-0 mt-[34px] mr-20 bg-white rounded-full z-10' />
                <div class="absolute top-5 right-0 mt-[38px] h-13 w-20 mr-5 ">
                    <div className='px-5 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                {counter}
                            </div>
                    </div>
                
            
                </div>
                <img className='stroke-secondary w-7 h-7 absolute top-14 right-0 mt-[44px] mr-20 bg-white rounded-full z-10'src={IMAGES.PINICON} alt={`bowling pin icon`} aria-label='bowling pin icon' />

                <div class="absolute top-14 right-0 mt-[48px] h-13 w-20 mr-5 ">
                    <div className='px-4 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                Set 5
                            </div>
                    </div>
                
            
                </div>
                <StarIcon className=' stroke-white stroke-1 border-2 w-7 h-7 absolute top-14 right-0 mt-[89px] mr-20 bg-white rounded-full border-secondary flex flex-row  fill-secondary z-10' />
                <div class="absolute top-14 right-0 mt-[94px] h-13 w-20 mr-5 ">
                    <div className='px-4 bg-white rounded-lg '>
                            <div className='flex justify-center ml-2 text-sm text-secondary font-bold'>
                                {points}
                            </div>
                    </div>
                
            
                </div>
        
        </div>

    : <></>}
    

    


   


    {/* Counter before each set*/}
    {counterOn && gameSet == 0 ?
        <div className="grid h-screen w-screen place-items-center absolute "><h1 className='text-bold text-xl text-white'>Game will start in...<span className='flex justify-center text-4xl'>{counter}</span></h1></div>
       
        :
       <></>
    }

    {counterOn && gameSet == 1.5 ?
        <div className="grid h-screen w-screen place-items-center absolute "><h1 className='text-bold text-xl text-white'>Set 2 will start in...<span className='flex justify-center text-4xl'>{counter}</span></h1></div>
       
        :
       <></>
    }
    {counterOn && gameSet == 2.5 ?
        <div className="grid h-screen w-screen place-items-center absolute "><h1 className='text-bold text-xl text-white'>Set 3 will start in...<span className='flex justify-center text-4xl'>{counter}</span></h1></div>
       
        :
       <></>
    }
    {counterOn && gameSet == 3.5 ?
        <div className="grid h-screen w-screen place-items-center absolute "><h1 className='text-bold text-xl text-white'>Set 4 will start in...<span className='flex justify-center text-4xl'>{counter}</span></h1></div>
       
        :
       <></>
    }

    {counterOn && gameSet == 4.5 ?
        <div className="grid h-screen w-screen place-items-center absolute "><h1 className='text-bold text-xl text-white'>Final set will start in...<span className='flex justify-center text-4xl'>{counter}</span></h1></div>
       
        :
       <></>
    }

        
     {/* GameEnvironment */}
     {/* Set 1 */}
     {gameSet == 1  ? 
      <Canvas dpr={[1, 2]}  style={{zIndex:1, height:'100vh', position:'fixed'}} camera={{ fov: 800, position: [0, 2, 10] }}>
      <OrbitControls enableRotate={false} enablePan={false} />
      <Suspense fallback={null}>
          <Stage>
          <Scene points={points} setPoints={setPoints}/>
          </Stage>
      </Suspense>
      </Canvas>
     :
       <></>
    }


    {/* Set 2 */}
    {gameSet == 2  ? 
      <Canvas dpr={[1, 2]}  style={{zIndex:1, height:'100vh', position:'fixed'}} scale={30} camera={{ fov: 800, position: [0, 2, 10] }}>
      {/* <OrbitControls enableRotate={false} enablePan={false} /> */}
      <Suspense fallback={null}>
          <Stage>
          <Scene points={points} setPoints={setPoints}/>
          </Stage>
      </Suspense>
      </Canvas>
     :
       <></>
    }


    {/* Set 3 */}
    {gameSet == 3  ? 
      <Canvas dpr={[1, 2]}  style={{zIndex:1, height:'100vh', position:'fixed'}} scale={30} camera={{ fov: 800, position: [0, 2, 10] }}>
      {/* <OrbitControls enableRotate={false} enablePan={false} /> */}
      <Suspense fallback={null}>
          <Stage>
          <Scene points={points} setPoints={setPoints}/>
          </Stage>
      </Suspense>
      </Canvas>
     :
       <></>
    }

    {/* Set 4 */}
    {gameSet == 4  ? 
      <Canvas dpr={[1, 2]}  style={{zIndex:1, height:'100vh', position:'fixed'}} scale={30} camera={{ fov: 800, position: [0, 2, 10] }}>
      {/* <OrbitControls enableRotate={false} enablePan={false} /> */}
      <Suspense fallback={null}>
          <Stage>
          <Scene points={points} setPoints={setPoints}/>
          </Stage>
      </Suspense>
      </Canvas>
     :
       <></>
    }

    {/* Set 5 */}
    {gameSet == 5  ? 
      <Canvas dpr={[1, 2]}  style={{zIndex:1, height:'100vh', position:'fixed'}} scale={30} camera={{ fov: 800, position: [0, 2, 10] }}>
      {/* <OrbitControls enableRotate={false} enablePan={false} /> */}
      <Suspense fallback={null}>
          <Stage>
          <Scene points={points} setPoints={setPoints}/>
          </Stage>
      </Suspense>
      </Canvas>
     :
       <></>
    }

    <BowlingCongratulations isCongratulationHidden={isCongratulationHidden} points={points} Continue={Continue} PlayAgain={PlayAgain} /> 

    <ExitGameModal hideExitDialog={hideExitDialog} isExitDialogHidden={isExitDialogHidden}/>



        </div>
  )
}

export default BowlingGame;