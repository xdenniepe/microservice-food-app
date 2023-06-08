import React, { useEffect, useRef,useState } from 'react'
import { CLASSES } from "../../utility/classes";
import { BackButton, Button } from "../../components/common";
import i18n from 'i18next';

import { useNavigate } from "react-router-dom";



const PrivacyPolicy = (props) => {
	const { setHasLoaded, renderSr, sidebarOpen, setSidebarOpen } = props;
	const privacyRef = useRef(null)
    const navigate = useNavigate();
    const lang = localStorage.getItem('i18nextLng');
    const [enColor, setEnColor]                 = useState('text-black');
    const [jpColor, setJpColor]                 = useState('text-black');




	useEffect(() => {
        textcolor();
		setHasLoaded(true);
		window.scrollTo(0, 0)
	}, [])

    const textcolor = () =>{
        if (lang == "en"){
            setEnColor('text-secondary');
        }
        else if (lang == "jp"){
            setJpColor('text-secondary');
        }
    }

    const English = (e) =>{
        i18n.changeLanguage('en');
        localStorage.setItem("i18nextLng", "en");
        navigate(-1)
    }

    const Japanese = () =>{
        i18n.changeLanguage('jp');
        localStorage.setItem("i18nextLng", "jp");
        navigate(-1)

    }

    const Mandarin = () =>{
        
    }

	return (
		<div className={CLASSES.container}>
            <div className={CLASSES.main}>
            <div className="mt-3 mr-2 flex ">
            <BackButton onClick={() => navigate(-1)} className=''/>
           
                
                    <div className='ml-7'>
                     { renderSr() }
                    <h1 className={`${CLASSES.title} xxs:text-mds xss:text-mdss xss:px-4`} aria-label="Select Language">SELECT LANGUAGE</h1>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center  mt-3">
                    <button className={`${CLASSES.title} xxs:text-mds xss:text-mdss xss:px-4 ${enColor}`} onClick={English} aria-label="English">English</button>
                </div>
                <div className="flex flex-row items-center justify-center mt-2">
                    <button className={`${CLASSES.title} xxs:text-mds xss:text-mdss xss:px-4 ${jpColor}`} onClick={Japanese} aria-label="Japanese">日本語</button>
                </div>
                <div className="flex flex-row items-center justify-center mt-2">
                    <button className={`${CLASSES.title} xxs:text-mds xss:text-mdss xss:px-4 text-black`} onClick={Mandarin} aria-label="Mandarin">中国人</button>
                </div>
               
                
                
            </div>
        </div>
	)
}

export default PrivacyPolicy