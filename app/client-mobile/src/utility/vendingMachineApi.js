import React, { useEffect } from "react";
import md5 from "md5"
import { request } from "../service/request";
import { GET } from "./constants";

const VendingMachineApi = () => {
  
    const app_id="&100001"
    const app_secret = "mK5<OED4-QwV)d0}gT9bg6oi7M)W71tf_5KF5H[QAYB9iMvMKMPEq]v6TVbC"
    const date = Date.now()
    const hashed = md5(app_id.concat("&", app_secret, "&", date))
    /* const app_data = hashed.toUpperCase(); */


   /*  const getDevices = () => {

      request({
        url: `https://api.yokaiexpress.com/api.php?do=`,
        method: GET,
        headers: {
            
        }
    }).then(response => {

    }).catch(error => {
        console.log(error);

        setErrors({
            password: 'The email and/or password you entered is incorrect.'
        })
    })
    } */

    useEffect(() => {
      console.log("app_id", app_id)
      console.log("app_secret", app_secret)
      console.log("date", date)
      console.log("app_data", app_data)
    }, [])

  return (
    <></>
  )
};

export default VendingMachineApi;
