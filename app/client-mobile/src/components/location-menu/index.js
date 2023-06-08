import { QuestionMarkCircleIcon,HeartIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Carousel from "react-multi-carousel"
import { IMAGES } from "../../utility/constants";
import { useNavigate } from "react-router";

import { request } from "../../service/request";
import api from "../../service/api";

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30
    }
  };

  const CustomDot = ({ onClick, active, index, carouselState }) => {
      const { currentSlide } = carouselState;
      return ( 
          <div style={{padding:"4px"}}>
          <button
            style={{cursor:"pointer", outline:"0", marginRight:"6px" ,margin:"0", padding:"0",borderColor:"transparent",borderStyle:"solid" ,borderWidth: "2px", transition: "background .5s",boxShadow: "none", display: "inline-block", width: "7px", height: "7px",borderRadius:"50%", background: active ? "white" : "gray", opacity: active ? "1" : "0.7" }}
            onClick={() => onClick()}
          />
          </div>
      );
    };

  const images = [
    IMAGES.MENU_CAROUSEL_1,
    IMAGES.MENU_CAROUSEL_2,
    IMAGES.MENU_CAROUSEL_3
  ];
  
  // Because this is an inframe, so the SSR mode doesn't not do well here.
  // It will work on real devices.
  const MenuCarousel = ({ deviceType }) => {

    const navigate = useNavigate();
    const handleNavigate = () =>{
      navigate('/locationmenu/location-direction')
    }
    
    return (
        <Carousel
      ssr
      deviceType={deviceType}
      itemClass="image-item"
      responsive={responsive}
      showDots
      customDot={<CustomDot />}
    >
      {images?.map((image, index) => {
        return (
          <>
            <div key={`product_${index}`} style={{ position: "relative" }}>
              <QuestionMarkCircleIcon className="absolute z-10 flex justify-center stroke-white w-10 h-10 self-end mt-1 ml-1" onClick={handleNavigate}/>
              <img
                draggable={false}
                alt="text"
                /* style={{ width: "100%", height: "100%" }} */
                src={image}
                className="object-cover h-80 w-screen xss:h-auto"
              />
              
            </div>
            
          </>
          
        );
      })}
      
    </Carousel>
    );
  };
  
  export default MenuCarousel;

