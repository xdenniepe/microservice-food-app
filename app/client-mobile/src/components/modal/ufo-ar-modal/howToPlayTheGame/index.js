import React, {  } from "react";
import { IMAGES, LOGOUT } from "../../../../utility/constants";
import { XIcon } from "@heroicons/react/outline";

const UFOHowToPlayTheGame = (props) => {
    
    const { hideConfirmationDialog, isDialogHidden } = props;
   
    return (
        <>
        <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={isDialogHidden}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div  className="fixed z-10 inset-0  overflow-y-auto">
            <div className="flex sm:items-center justify-center items-center h-full p-7 text-center sm:p-0 ">
                <div className="relative bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                            
                                <div className="mt-2 flex justify-center items-center">
                                    <h4 className="text-black text-xl font-extrabold">Game Description</h4>
                                </div>
                                <div className="mt-6 mx-4 overflow-y-auto h-60">
                                    <p className="text-lg leading-7  text-gray-580">
                                    (AR) game where you collect ramen ingredients falling from above. 
                                    Accomplish the mission within the given time limit and earn points or rewards. 
                                    <br/>
                                    <br/>
                                    Simply tap on the falling objects to earn points. Each object has it's own unique point value:
                                    <br/>
                                    <br/>
                                    <ul className="list-disc list-outside px-10 ml-6 marker:text-gray-500">
                                        <li> 
                                            Ramen bowl - (5) points
                                        </li>
                                        <br/>
                                        <li>
                                            Ingredients - (1) point
                                        </li>
                                        <br/>
                                        <li>
                                            Bomb - (-5) points
                                        </li>
                                        <br/>
                                    </ul>
                                    
                                    </p>
                                    <br/>
                                    <div className="flex justify-center">
                                    <span className="text-center text-xl text-gray-580">Enjoy and have fun!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-4 sm:px-6 sm:flex sm:flex-row-reverse mb-8 flex justify-center">
                    <button  className="mb-3 items-center h-12 mt-5 w-3/4 inline-flex justify-center rounded-full border shadow-sm px-4 py-2 bg-secondary text-lg font-semibold text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={hideConfirmationDialog}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </>
      )
}

export default UFOHowToPlayTheGame;