import { useState,useEffect } from "react";
import './styles.css';


const CreateRamen = (props) => {
    const [mounted, setMounted] = useState(false);
    const { ramenImage, left, time, speed} = props;

    useEffect(() => {
        setTimeout(() => setMounted(true),time);
    })

    return (
        mounted &&
        <img src={ramenImage} 
            onClick={props.onClick} 
            className={`fixed z-50 w-[100px] ramen`}
            style={{
                animation:`fallDown ${speed}s linear normal forwards`, 
                left:`${left}px`
            }}
        />
    )

}

export default CreateRamen;