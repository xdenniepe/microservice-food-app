import React, {  } from "react";
import { IMAGES, LOGOUT } from "../../../../utility/constants";
import { XIcon } from "@heroicons/react/outline";

const bowlingHowToPlayTheGame = (props) => {
    
    const { hideConfirmationDialog, isDialogHidden } = props;
   
    return (
        <>
        <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={isDialogHidden}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div  className="fixed z-10 inset-0  overflow-y-auto">
            <div className="flex sm:items-center justify-center items-center h-full p-6 text-center sm:p-0 ">
                <div className="relative bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                
                    <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                            
                                <div className="mt-2 flex justify-center items-center">
                                    <h4 className="text-black text-xl font-extrabold">Game Description</h4>
                                </div>
                                <div className="mt-6 mx-4 ml-8  overflow-y-auto h-60">
                                    <p className=" leading-7 text-lg text-gray-580">
                                    Ramen Bowling Game - an Augmented Reality (AR) game that tests your hand / eye 
                                    coordination.
                                    <br/>
                                    <br/>
                                    Flick forward with your finger to throw the noodle ball and knock down the pins as best as you can.
                                    <br/>
                                    <br/>
                                    <ul className="list-disc list-outside px-4 ml-4 marker:text-gray-500">
                                        <li> 
                                            You'll be given 10 pins per frame / 5 frames in total.
                                        </li>
                                        <br/>
                                        <li>
                                            Striking a single pin will earn you 1 point.
                                        </li>
                                        <br/>
                                        <li>
                                            A score of 25 - 49 will earn you a 10% discount.
                                        </li>
                                        <br/>
                                        <li>
                                            A perfect score of 50 will earn you a 25% discount.
                                        </li>
                                   
                                    </ul>
                                    </p>
                                    <br/>
                                    <div className="flex justify-center">
                                    <span className="text-center text-lg text-gray-580">Enjoy and have fun!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-4 sm:px-6 sm:flex sm:flex-row-reverse mb-8 flex justify-center">
                    <button  className="mb-3 items-center h-12 mt-5 w-3/4   inline-flex justify-center rounded-full border shadow-sm px-4 py-2 bg-secondary text-lg font-semibold text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={hideConfirmationDialog}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </>
      )
}

export default bowlingHowToPlayTheGame;