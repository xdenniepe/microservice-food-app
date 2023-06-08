import React, { useEffect, useState } from "react";
import { GET } from "../utility/constants";
import { request } from "../service/request";
import api from "../service/api";

const LocationDetector = () => {

    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');
  
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          })
          request({
            url: `${api.LOCATION}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=2770dbe922bdbbaa79edf44e343d46e2`,
            method: GET

        }).then(response => {
            console.log("location", response);
        }).catch(error => {
            console.log(error);
        }) 
    }, [latitude, longitude])

  return (
    <></>
  )
};

export default LocationDetector;

// import { BrowserView, MobileView } from "react-device-detect";

// const DeviceDetector = () => (
//   <>
//     <BrowserView>I am rendered on: Desktop</BrowserView>
//     <MobileView>I am rendered on: Mobile</MobileView>
//   </>
// );

// export default DeviceDetector;