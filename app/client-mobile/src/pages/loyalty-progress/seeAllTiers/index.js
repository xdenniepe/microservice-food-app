import React, { useEffect, useRef, useState, useContext } from 'react'
import { CLASSES } from "../../../utility/classes";
import { useNavigate } from "react-router-dom";
import { IMAGES, GET, PUT } from "../../../utility/constants";
import { Link, useParams } from "react-router-dom";
import { request } from "../../../service/request";
import api from "../../../service/api";
import { AuthContext } from "../../../context/authContext";
import { useTranslation } from "react-i18next";


const AllTiers = (props) => {
    const { setHasLoaded, toast } = props;
  

    useEffect(() => {
        setHasLoaded(true);
        window.scrollTo(0, 0);
       
        }, [])




    


    return (
        <div>
            <div className='px-6'>
                <div className={`${CLASSES.roundedCard} w-full mt-7 bg-center  bg-giftboxcardBronze bg-no-repeat bg-cover  border-black border-opacity-20 py-3 cursor-pointer h-36`} >
                    <div className=" space-y-8 mt-2">
                        <div className="flex flex-row space-x-12">
                            <h1 className="text-2xl text-white font-bold mr-2 ">
                        BRONZE
                            </h1>
                        
                        </div>
                    </div>
                    <div className=" space-y-2 mt-1">
                        <div className="space-x-5">
                            <h1 className="text-md text-white font-bold ">
                                $10 - $500
                            </h1>
                            
                        </div>
                    </div>
                    <div className=" space-y-2 mt-3">
                        <div className="space-x-1">
                            <h1 className="text-xs text-white font-normal ">
                                Spend more than $500 to upgrade to silver
                            </h1>
                            
                        </div>
                    </div>
                </div>
                <div className={`${CLASSES.roundedCard} w-full mt-3 bg-center  bg-giftboxcardSilver bg-no-repeat bg-cover  border-black border-opacity-20 py-3 cursor-pointer h-36`} >
                    <div className=" space-y-8 mt-2">
                        <div className="flex flex-row space-x-12">
                            <h1 className="text-2xl text-white font-bold mr-2 ">
                        SILVER
                            </h1>
                        
                        </div>
                    </div>
                    <div className=" space-y-2 mt-1">
                        <div className="space-x-5">
                            <h1 className="text-md text-white font-bold ">
                                $501 - $1000
                            </h1>
                            
                        </div>
                    </div>
                    <div className=" space-y-2 mt-3">
                        <div className="space-x-1">
                            <h1 className="text-xs text-white font-normal ">
                                Spend more than $1000 to upgrade to gold
                            </h1>
                            
                        </div>
                    </div>
                </div>
                <div className={`${CLASSES.roundedCard} w-full mt-3 bg-center  bg-giftboxcardGold bg-no-repeat bg-cover  border-black border-opacity-20 py-3 cursor-pointer h-36`} >
                    <div className=" space-y-8 mt-2">
                        <div className="flex flex-row space-x-12">
                            <h1 className="text-2xl text-white font-bold mr-2 ">
                        GOLD
                            </h1>
                        
                        </div>
                    </div>
                    <div className=" space-y-2 mt-1">
                        <div className="space-x-5">
                            <h1 className="text-md text-white font-bold ">
                                $1001 - $1500
                            </h1>
                            
                        </div>
                    </div>
                    <div className=" space-y-2 mt-3">
                        <div className="space-x-1">
                            <h1 className="text-xs text-white font-normal ">
                                Spend more than $1500 to upgrade to diamond
                            </h1>
                            
                        </div>
                    </div>
                </div>
                <div className={`${CLASSES.roundedCard} w-full mt-3 bg-center  bg-giftboxcardDiamond bg-no-repeat bg-cover  border-black border-opacity-20 py-3 cursor-pointer h-36`} >
                    <div className=" space-y-8 mt-2">
                        <div className="flex flex-row space-x-12">
                            <h1 className="text-2xl text-white font-bold mr-2 ">
                        DIAMOND
                            </h1>
                        
                        </div>
                    </div>
                    <div className=" space-y-2 mt-1">
                        <div className="space-x-5">
                            <h1 className="text-md text-white font-bold ">
                                $1501 plus
                            </h1>
                            
                        </div>
                    </div>
                    <div className=" space-y-2 mt-3">
                        <div className="space-x-1">
                            <h1 className="text-xs text-white font-normal ">
                                Enjoy your exclusive rewards
                            </h1>
                            
                        </div>
                    </div>
                </div>

                
                
            </div>
            <br/>
                <br/>
                <br/>
      </div>
    )
}

export default AllTiers;
