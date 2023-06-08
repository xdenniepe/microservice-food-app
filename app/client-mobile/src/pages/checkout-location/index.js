import React, { useEffect, useState } from 'react';
import { CLASSES } from "../../utility/classes";
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { IMAGES } from "../../utility/constants";

const CheckOut = () => {
    const [latitude, setLatitude]   = useState('');
    const [longitude,setLongtitude] = useState('');
    const [place, setPlace] = useState('');
    let geocoder = null;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "" //Input API Key Here
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongtitude(position.coords.longitude);
        })
    },[])

    const center = { lat: latitude, lng: longitude};
   
    const latLng = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    }

    if(isLoaded){
        geocoder = new google.maps.Geocoder();
        geocoder
        .geocode({ location: latLng })
        .then((response) => {
            setPlace(response.results[0].formatted_address)
        }).catch(e => {
            console.log(e);
        });
    }else{
        geocoder = null;
    }

  return (
    <div>
        <div className="flex justify-center items-center font-bold text-md text-[#751132]">
            <h2>CHECK OUT</h2>
        </div>
        <div className="mt-5">
            <h3 className="ml-3 font-bold text-mdx text-[#751132]">Pick up at</h3>
            <div className={`${CLASSES.roundedCard} border px-4 mt-2`}>
               <div className="flex flex-row">
                    <div className="flex justify-center items-center">
                       <div className="w-20 h-20 bg-slate-400 rounded-md">
                        { !isLoaded ? <h1>Loading ....</h1> 
                        :  
                        <GoogleMap
                          center={center}
                          zoom={15} 
                          mapContainerStyle={{width:'80px',height:'80px',borderRadius:'10px'}}
                          options={{
                            zoomControl:       false,
                            streetViewControl: false,
                            mapTypeControl:    false,
                            fullscreenControl:false
                          }}
                          >
                            <Marker
                             position={center}
                             />
                          </GoogleMap>
                          }
                       </div>
                    </div>
                    <div className="ml-4 mt-6">
                        <p className="text-xxs">{place}</p>  
                    </div>
               </div>
            </div>
        </div>

        <div className="mt-5 overflow-scroll">
            <h3 className="ml-3 font-bold text-mdx text-[#751132]">Select Payment</h3>
            <div>
                <p className="text-xxs ml-3 mt-2 font-light">No cards on file found. Please tap the button to add a card that you can use for future transactions.</p>
            </div>
            <div className="mt-10 flex flex-col justify-center items-center">
                <button className={`${CLASSES.buttonCard} text-[#751132] font-bold text-mdx flex justify-start items-start`}>
                    <span className="ml-0 flex justify-center items-center w-6 h-6 text-2xl rounded-md bg-secondary text-[#FAFAFA]">+</span>
                    <span className="flex-1">Add Card</span>
                </button>
                <button className={`text-[#751132] mt-6 font-bold text-mdx w-1/2`}>One Time Payment</button>
            </div>
            <button className={`${CLASSES.buttonDefault} mt-16 font-bold text-mdss text-[#FAFAFA]`}>Continue</button>
        </div>
    </div>
  )
}

export default CheckOut