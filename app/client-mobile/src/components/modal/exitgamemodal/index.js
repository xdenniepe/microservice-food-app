import React from "react";
import { useNavigate } from "react-router";

const ExitGameModal = (props) => {
    const {hideExitDialog, isExitDialogHidden} = props;
    const navigate = useNavigate();

    return(
        <>
            <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={isExitDialogHidden}>
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div  className="fixed z-10 inset-0  overflow-y-auto">
                    <div className="flex sm:items-center justify-center items-center h-full p-4 text-center sm:p-0 ">
                        <div className="relative bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                            <div className="bg-white px-8 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-2 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                                        <h3 className="uppercase leading-6 font-2xl text-secondary text-2xl mb-6 font-bold" id="modal-title">Quit Game?</h3>
                                        <div className="mt-2">
                                            <p className="text-md text-gray-550 mb-5">Are you sure you want to exit the game?</p>
                                        </div>
                                        <div className="px-3 py-3 sm:px-6 flex flex-col">
                                            <button type="button" className=" mt-4 mx-auto w-11/12 justify-center rounded-[.95rem] border-secondary shadow-sm px-2 py-2 bg-secondary text-base font-medium text-white sm:mt-0 sm:ml-4 sm:w-auto sm:text-sm border-[1px]" onClick={hideExitDialog}>Keep Playing</button>
                                            <button type="button" className="mt-4 mx-auto w-11/12 justify-center rounded-[.95rem] border-gray-500 shadow-sm px-2 py-2 bg-white text-base font-medium text-gray-500 sm:mt-0 sm:ml-4 sm:w-auto sm:text-sm border-[1px]" onClick={() => navigate("/ar-games")}>Exit Game</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}

export default ExitGameModal;