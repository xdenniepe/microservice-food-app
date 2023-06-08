import { useBox } from '@react-three/cannon'




export function TriggerBox({ onCollide, size, position }) {
 
    const [ref] = useBox(() => ({ isTrigger: true, args: size, position, onCollide}))




  
  return (
    
    <mesh ref={ref} position={position} >
    <boxGeometry args={size} />
    <meshStandardMaterial wireframe color={'black'} visible={false}/>
  </mesh>
      
    
  );
}

