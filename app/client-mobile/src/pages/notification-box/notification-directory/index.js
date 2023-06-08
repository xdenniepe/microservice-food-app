import React, { useEffect, useState }  from 'react';
import { DELETE, IMAGES,PUT } from "../../../utility/constants";
import { getLocalStorageItem } from '../../../service/helper';
import moment from 'moment';
import { BackButton } from "../../../components/common";
import { TrashBin } from "../../../utility/icons";
import {Navigate, useParams, useNavigate } from "react-router-dom";
import api from "../../../service/api";
import { request } from "../../../service/request";





const NotificationDirectory = (props) => {
    const { title, to, sidebarOpen, setSidebarOpen } = props;
    const { setHasLoaded }                           = props;
    const notificationHolder                         = getLocalStorageItem("notificationStorage");
    const [notificationId, setNotificationId]        = useState('');
    const params                                     = useParams();
    const notifIdObj                                 = params;
    const notifId                                    = notifIdObj.notifId;
    const navigate                                   = useNavigate();
    const seen                                       = 1;

    useEffect(() => {
      setNotificationId(notificationHolder.notifId);
      setHasLoaded(true);
      window.scrollTo(0, 0);
      updateSeen();
      }, [])


    const updateSeen = ()=>{


      request({
          url: api.NOTIFICATIONUPDATESEEN + seen + '/' + notifId,
          method: PUT,
     
              
      })
    }

    const deleteNotif = ()=>{


      request({
          url: api.NOTIFICATIONDELETENOTIF +  notifId,
          method: DELETE,
     
              
      }).then(response => {
        navigate(-1);   
      })
    }

  return (
    <div>
      <div className="relative h-32 bg-secondary flex justify-center items-center">
        <BackButton to={to} notificationId={notificationId} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} title={title}/>
        <button className={`cursor-pointer absolute right-4 top-7 active:bg-red-400`} role="button" aria-label="Delete button" onClick={deleteNotif}>
        <TrashBin className="flex-shrink-0 h-6 w-6"/>   
        </button>    
        <img hidden={notificationHolder.category === "Advisory" ? false : true} className="absolute -bottom-7 p-2 h-16 w-16 rounded-full bg-yellow-100" src={IMAGES.ADVISORY} />
        <img hidden={notificationHolder.category === "Offer" ? false : true} className="absolute -bottom-7 p-2 h-16 w-16 rounded-full bg-orange-100" src={IMAGES.OFFER}/>
        <img hidden={notificationHolder.category === "Tip" ? false : true} className="absolute -bottom-7 p-2 h-16 w-16 rounded-full bg-blue-100" src={IMAGES.HELPFUL_TIP}/>
        <img hidden={notificationHolder.category === "New Product" ? false : true} className="absolute -bottom-7 p-2 h-16 w-16 rounded-full bg-green-100" src={IMAGES.NEW_PRODUCT}/>
      </div>
      <div className="mt-12">
        <p className="font-light text-lg flex justify-center items-center">{notificationHolder.category}</p>
        <p className="font-light text-xl mt-10 ml-6 ">{notificationHolder.title}</p>
        <p className="font-extralight text-xxs mt-1 ml-6">{moment(moment.unix(notificationHolder.createdAt).tz('America/Los_Angeles').format("YYYY-MM-DD hh:MM:ss")).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>
      <div className="mt-10">
        <img src={notificationHolder.image} className="ml-8 w-72 h-44 flex justify-center items-center rounded-lg mds:w-9/12 mds:h-96"/>
        <p className="font-medium text-md text-secondary items-center justify-center flex mt-2">{notificationHolder.descriptionTitle}</p>
        <p className="break-after-column  font-light pl-12 pr-12 text-mds text-secondary items-center justify-center flex mt-4">{notificationHolder.description}</p>
      </div>
      <div className="mt-7 pb-4 items-center justify-center flex">
        <button className="bg-secondary text-white p-2 rounded-md">Click Here</button>
      </div>
      
    </div>
  )
}

export default NotificationDirectory