import React, {useEffect,  useState   } from "react";
import { IMAGES } from "../../../../utility/constants";
const BowlingCongratulations = (props) => {
    
    const { isCongratulationHidden, points, PlayAgain, Continue } = props;
    
    const [rewardDiscount, setRewardDiscount] = useState(0);
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
   
    useEffect(() => {
        calculate();
    });

    const calculate = () =>{

        if(points < 25){
            setRewardDiscount(0);
            setText1('Sorry');
            setText2(' only');
        }
        else if (points >=25 && points < 50){
            setRewardDiscount(10);
            setText1('Congratulations');
            setText2('');


        }
        else if( points > 50){
            setRewardDiscount(25);
            setText2('');
            setText1('Congratulations');

        }
        
    }


    return (
        <>
        <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={isCongratulationHidden}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div  className="fixed z-10 inset-0  overflow-y-auto">
            <div className="flex sm:items-center justify-center items-center h-full p-4 text-center sm:p-0 ">
                <div className="relative bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                
            
                <div>
                    <div className={`bg-white ${rewardDiscount == 0 ? 'px-20' : 'px-4'} pt-5 pb-4 sm:p-6 sm:pb-4`}>
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                                <div className=" flex justify-center ">
                                    {rewardDiscount == 0 ?
                                    <h4 className="text-black text-2xl font-bold">Nice Try!</h4>
                                    
                                    :
                                    <h4 className="text-black text-2xl font-bold">Congratulations</h4>
                                    }
                                </div>
                                {rewardDiscount == 0?
                                <img className="w-50 h-40 ml-15 " src={IMAGES.LOGOUTCOFFEECUP} alt={`Ramen`} aria-label='CLAIM BOX' />
                                :
                                <img className="w-42 h-32 ml-11 " src={IMAGES.REWARDSCLAIM} alt={`Ramen`} aria-label='CLAIM BOX' />

                                 }
                                 {rewardDiscount == 0 ?
                                 <></>
                                 :
                                 <div className=" mx-4 text-center">
                                    <h1 className=" text-md font-bold mt-2 text-black">You just scored </h1>
                                    <h1 className=" text-3xl font-bold mt-1  text-secondary">{rewardDiscount}% OFF </h1>
                                    <h1 className=" text-md px-4 mt-2  text-black">This discount has been automatically added to your Rewards section. </h1>
                                </div>
                                 }
                                
                            </div>
                        </div>
                    </div>
                        <div className="bg-white px-4 sm:px-6 sm:flex sm:flex-row-reverse mb-8">
                            <div className="flex justify-center">
                                <button  className="mb-3 items-center h-12 mt-5 w-4/5 inline-flex justify-center rounded-full border shadow-sm   bg-secondary text-lg font-semibold text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={PlayAgain} >Play Again</button>
                            </div>
                            <div className="flex justify-center">
                                <button  className="mb-3 items-center h-12 mt-1 w-4/5 inline-flex justify-center rounded-full border shadow-sm   bg-white text-lg font-semibold text-black border-1 border-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={Continue} >Exit Game</button>
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

export default BowlingCongratulations;