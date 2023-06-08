import React, { useEffect, useState } from 'react'

const StatusIndicator = () => {  
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    window.addEventListener("offline", offlineListener);
    return () => {
      window.removeEventListener("offline", offlineListener);
    }
  }, []);

  const offlineListener = () => {
    console.log("User went offline");
  }

    return (
      offline ? 
        (
          <div className="banner-offline">The app is currently offline</div>
        ) 
      :
        null
    )
}

export default StatusIndicator;