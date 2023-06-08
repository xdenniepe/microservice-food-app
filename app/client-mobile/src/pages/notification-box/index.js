import React, { useState, useEffect, useContext } from 'react';
import { GET,PUT, IMAGES, DELETE } from "../../utility/constants";
import { Link } from "react-router-dom"
import moment from 'moment';
import { getLocalStorageItem, setLocalStorageItem } from '../../service/helper';
import api from "../../service/api";
import { AuthContext } from "../../context/authContext";
import { request } from '../../service/request';
import { useTranslation } from 'react-i18next';
import EmptyNotifications from '../../components/emptystate/emptynotifications';



const Notification = () => {
    const { t } = useTranslation(["notifications"]);
    const [notificationHolder, setNotificationHolder] = useState([]);
    const { user }                             = useContext(AuthContext)?.state;
    const userId = user.userId;
    const seen = 1;


    useEffect(() => {

      getNotification();


    },[]);

      const getNotification = () => {
        
          request({
              url: api.NOTIFICATION+userId,
              method: GET,
          }).then(response => {
            setNotificationHolder(response.data);
          })
      }

      const markAllAsRead = () => {
        request({
          url: api.NOTIFICATIONUPDATEALLSEEN + seen + '/' + userId,
          method: PUT,
      }).then(response => {
        console.log(response.data);
        window.location.reload(false);
      })

      }
      const deleteAll = () => {
        request({
          url: api.NOTIFICATIONDELETEALLNOTIF + userId,
          method: DELETE,
      }).then(response => {
        console.log(response.data);
        window.location.reload(false);
      })

      }

      const handleNext = (response) => () => {
        setLocalStorageItem("notificationStorage",response);
      }

  return (
     (notificationHolder.length === 0 ) ?
    <div>
        <EmptyNotifications />
    </div>
    
    :
    <div>
      <div className="flex justify-center items-center pt-6">
        <button className="absolute left-5" onClick={deleteAll}>{t('Delete all')}</button>
        <button className="absolute right-5" onClick={markAllAsRead} >{t('Mark all as Read')}</button>
      </div> 
    <div className="mt-10 border-y border-gray-200">
        <div className="divide-y divide-gray-200 overflow-auto">
            {notificationHolder.map((index)=>(
            
          <Link onClick={handleNext(index)} to={`/notification/directory/${index.notifId}`} key={index.notifId} className='relative h-20 flex justify-evenly items-center'>
            
            <img hidden={index.category === "Advisory" ? false : true} className="absolute left-4 p-2 h-14 w-14 rounded-full bg-yellow-100" src={IMAGES.ADVISORY}/>
            <img hidden={index.category === "Offer" ? false : true} className="absolute left-4 p-2 h-14 w-14 rounded-full bg-orange-100" src={IMAGES.OFFER}/>
            <img hidden={index.category === "Tip" ? false : true} className="absolute left-4 p-2 h-14 w-14 rounded-full bg-blue-100" src={IMAGES.HELPFUL_TIP}/>
            <img hidden={index.category === "New Product" ? false : true} className="absolute left-4 p-2 h-14 w-14 rounded-full bg-green-100" src={IMAGES.NEW_PRODUCT}/>
                
            <div className='absolute left-24 xxss:w-52 flex-col'>
                <p className='text-mdss font-medium py-1 truncate'>{index.title}</p>
                <p className='text-xs font-light'>{moment.utc(moment.unix(index.createdAt).tz('America/Los_Angeles').format("YYYY-MM-DD hh:MM:ss")).local().startOf('seconds').fromNow()}</p>
                {/* <p className='text-xs font-light'>{moment.utc(index.createdAt).local().startOf('seconds').fromNow()}</p> */}
            </div>
  
            <div hidden={index.seen === 1 ? true : false} className='absolute right-5 text-xxs text-red-800'>
                <b>{t('New')}</b>
            </div>
           
            
          </Link>
            ))}
        </div>
    </div>
    
    </div>

  
  )
  
}

export default Notification