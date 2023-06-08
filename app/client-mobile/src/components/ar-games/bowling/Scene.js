import { Debug, Physics } from '@react-three/cannon'
import React, { useEffect, useState} from 'react'
import { Balls } from './Balls'
import { Plane } from './Plane'
import { Pins } from './Pins'
import { PinWithHands } from './PinWithHands'
import { Cursor } from './Drag'
import { TriggerBox } from './TriggerBox'


export function Scene(props) {

  const {points, setPoints} = props;
  // const [points, setPoints] = useState(0);

   
  const [notdisabled1, setnotDisabled1] = useState(true);
  const [notdisabled2, setnotDisabled2] = useState(true);
  const [notdisabled3, setnotDisabled3] = useState(true);
  const [notdisabled4, setnotDisabled4] = useState(true);
  const [notdisabled5, setnotDisabled5] = useState(true);
  const [notdisabled6, setnotDisabled6] = useState(true);


  const [removeTrigger1, setRemoveTrigger1] = useState(true);
  const [removeTrigger2, setRemoveTrigger2] = useState(true);
  const [removeTrigger3, setRemoveTrigger3] = useState(true);
  const [removeTrigger4, setRemoveTrigger4] = useState(true);
  const [removeTrigger5, setRemoveTrigger5] = useState(true);
  const [removeTrigger6, setRemoveTrigger6] = useState(true);
  const [removeBall, setRemoveball] = useState(false);




  useEffect(() => {
}, []);


const removePin1 = () =>{
  setRemoveTrigger1(false);
  
  setPoints(prev => prev + 1);

  setTimeout(() => {
    setRemoveball(true);
    }, 1000);

  setTimeout(() => {
  setnotDisabled1(false);
}, 2000);
  

};


const removePin2 = () =>{
  
  setTimeout(() => {
    setRemoveball(true);
    }, 1000);

  setRemoveTrigger2(false);
  setPoints(prev => prev + 1);
 
  setTimeout(() => {
  setnotDisabled2(false);
  
  }, 2000);
};


const removePin3 = () =>{
  setTimeout(() => {
    setRemoveball(true);
    }, 1000);
  setRemoveTrigger3(false);
  setPoints(prev => prev + 1);
 
  setTimeout(() => {
  setnotDisabled3(false);
  


  }, 2000);

};


const removePin4 = () =>{
  
  setTimeout(() => {
    setRemoveball(true);
    }, 1000);
  setRemoveTrigger4(false);
  setPoints(prev => prev + 1);

 
  setTimeout(() => {
  setnotDisabled4(false);
  

  }, 2000);

};



const removePin5 = () =>{
  setRemoveTrigger5(false);
  setTimeout(() => {
    setRemoveball(true);
    }, 1000);
  setPoints(prev => prev + 1);
  

  setTimeout(() => {
  setnotDisabled5(false);
  

  }, 2000);

};
const removePin6 = () =>{
  setRemoveTrigger6(false);
  setTimeout(() => {
    setRemoveball(true);
    }, 1000);
  setPoints(prev => prev + 1);
  

  setTimeout(() => {
  setnotDisabled6(false);
  
  }, 2000);

}

const funcRemoveBall = () =>{
  setTimeout(() => {
    setRemoveball(true);
    }, 500);
}



  return (
    

    
    <Physics  broadphase="SAP" iterations={100} gravity={[5,-1500,5]} defaultContactMaterial={{ friction: 1, restitution: .4 }}>
    {/* <Html className=''>
    <h1 className='text-4xl'>SCORE: <span className='text-7xl'>{points}</span></h1>
    </Html> */}

     

     {/* <Debug color={'green'}> */}

      <Cursor />
    {/* </Debug> */}

      {/* <Debug color={'green'}> */}
      <TriggerBox onCollide={funcRemoveBall} position={[0,320,-4700]}size={[4000,3000,1000]} /> 

      <TriggerBox onCollide={funcRemoveBall} position={[0,-1000, 1000]}size={[3500,1000,6500]} /> 


      <TriggerBox onCollide={funcRemoveBall} position={[2250,320,900]}size={[500,3000,9200]} /> 


      <TriggerBox onCollide={funcRemoveBall} position={[-2250,320,1200]}size={[500,3000,9200]} /> 
      {/* </Debug> */}





      <Plane size={[4000, 11000]}  position={[0,320,-2500]}/>
      {removeBall ?
      <></>
      :
      <Balls />
      
      }
     {/* <Debug color={'black'} > */}

      {/* Pin 1 */}
      
      {removeTrigger1 ? 
      <TriggerBox onCollide={removePin1} position={[0,320,-2100]}size={[300,600,100]} /> 
      : <></>}
      {notdisabled1 ?
      <PinWithHands position={[0,700,-2300]}  />
       :  <></>
      }
      
      {/*Pin 2  */}
      {notdisabled2 ? 
      <Pins position={[-400,700,-2900]} disabled={true}/>
       : <></>} 
      {removeTrigger2 ?
      <TriggerBox onCollide={removePin2} position={[-400,320,-2700]}size={[300,600,100]} />   
       :  <></> 
     } 



      {/* Pin 3 */}
      {notdisabled3 ? 
      <PinWithHands position={[400,700,-2900]}/>
      : <></>} 
      {removeTrigger3 ? 
      <TriggerBox onCollide={removePin3} position={[400,320,-2700]}size={[300,600,100]}  visible={false}/>   
     :  <></>
      } 

      
      {/* Pin 4 */}
      {notdisabled4 ? 
      <Pins position={[700,650,-3600]}/>
      : <></>} 
      {removeTrigger4 ? 
      <TriggerBox onCollide={removePin4} position={[700,320,-3400]}size={[300,600,100]}  visible={false}/>   
       :  <></>
      } 

      {/* Pin5 */}
      {notdisabled5 ? 
      <PinWithHands position={[-700,700,-3600]}/>
       : <></>}
      {removeTrigger5 ?
      <TriggerBox onCollide={removePin5} position={[-700,320,-3400]}size={[300,600,100]}  visible={false}/>   
      :  <></>
      } 

      {/* Pin6 */}
      {notdisabled6 ? 
      <Pins position={[0,730,-3600]}/>
       : <></>} 
      {removeTrigger6 ? 
      <TriggerBox onCollide={removePin6} position={[0,320,-3400]}size={[300,600,100]}  visible={false}/>   
       :  <></>
      }  

{/* </Debug> */}

      {/* </Debug> */}
    </Physics>
    
  );
}

