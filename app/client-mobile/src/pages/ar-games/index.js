
import React, { useEffect} from 'react'
import { CLASSES } from "../../utility/classes";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../utility/constants";


const ARDashboard = (props) => {
    const { setHasLoaded, renderSr} = props;
   
   
    const navigate = useNavigate();
  
  
    

    useEffect(() => {
        setHasLoaded(true);
        window.scrollTo(0, 0);
       
    }, [])
   




    return (
       
        <div>
            { renderSr() }
          
            <div className={`${CLASSES.main}`}>
                <div className={CLASSES.container}>
                    
                    <div className="flex flex-col px-10">
                            <div className="px-3 ml-4 mb-3 flex justify-center ">
                                <h1 className='text-xs text-center'>
                                <span className='font-bold'>Welcome to Yo-Kai AR Mini-Games! </span>
                                <br/><br/>
                                Discover, Play & Experience these games in the Augmented Reality mode and get a chance to win awesome rewards!
                                </h1>
                            </div>
                        <div className={`${CLASSES.roundedCard} flex flex-row border mb-3 border-black border-opacity-20  cursor-pointer rounded-3xl h-36`}   onClick={() => {navigate(`/ar-games/ufo`)}}>
                        
                            <div className="pb-6 ">
                                <img className="object-cover w-40 h-35 mb-4 rounded-xl float-right" src={IMAGES.UFOICON} alt={`Ramen`} aria-label='UFOICON' />
                            </div>
                            <div className="w-full m-auto pl-4 mb-5">
                                <div className="flex-col flex-grow w-full">
                                    <p className="font-extrabold text-secondary  xss:text-mdss text-xl " role="dialog"aria-label='ufoGame'>UFO Game </p>
                                    <p className="font-light text-sm tracking-tight xss:text-mdss mb-3" role="dialog" aria-label='fasdfasd'>Play Now!</p>
                                </div>
                            </div>
                           
                        </div>
                        <div className="px-3 ml-4 mb-3 flex justify-center ">
                            <p className="font-extrabold text-secondary  xss:text-mdss text-xl " role="dialog"aria-label='ufoGame'>Or</p>
                            </div>
                            <div className={`${CLASSES.roundedCard} flex flex-row border mb-3 border-black border-opacity-20  cursor-pointer rounded-3xl h-36`}   onClick={() => {navigate(`/ar-games/bowling`)}}>
                        
                        <div className="pb-6 ">
                            <img className="object-cover w-40 h-35 mb-4 rounded-xl float-right" src={IMAGES.BOWLINGICON} alt={`Ramen`} aria-label='UFOICON' />
                        </div>
                        <div className="w-full m-auto pl-4 mb-5">
                            <div className="flex-col flex-grow w-full">
                                <p className="font-extrabold text-secondary  xss:text-mdss text-xl " role="dialog"aria-label='ufoGame'>Bowling </p>
                                <p className="font-light text-sm tracking-tight xss:text-mdss mb-3" role="dialog" aria-label='fasdfasd'>Play Now!</p>
                            </div>
                        </div>
                       
                    </div>
                   
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ARDashboard;