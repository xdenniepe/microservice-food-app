import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useJsApiLoader, GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import { IMAGES } from "../../utility/constants";
import { ProductContext } from "../../context/productContext";
import { HIDE_MODAL } from "../../reducer/productReducer";
import { LocationContext } from "../../context/locationContext";
import { SET_NEAREST_VM_ID, SET_NEAREST_VM_ADDRESS } from "../../reducer/locationReducer";
import LocationDropdown from "../location-dropdown";
import { MAP_CENTER, MAP_CONTAINER, MAP_STYLE } from "../../utility/constants";
import { useTranslation } from "react-i18next";

const RenderVmLocations = () => { 
    const { t } = useTranslation(["location"]);
    const productContext  = useContext(ProductContext);
    const productDispatch = productContext.dispatch;
    
    const locationContext  = useContext(LocationContext);
    const locationDispatch = locationContext.dispatch;
    const getUserLocation  = locationContext.getUserLocation;
    const hasFetched       = locationContext.state.hasFetched;
    const nearbyLocations  = locationContext.state.nearbyLocations;
    const userLocation     = locationContext.state.userLocation;

    const [mergedLocations, setMergedLocations] = useState([]);

    const navigate = useNavigate();
    
    const { isLoaded } = useJsApiLoader({ 
        id: 'google-map-script', 
        googleMapsApiKey: "AIzaSyArpF2P6uUfhZsgmfd_clesvo11JBoz2vk" 
    });
    
    useEffect(() => { 
        // Get the user's current device location.
        
        getUserLocation(); 
    }, []);

    useEffect(() => { 
        // Merge nearest location and current location to render markers. 

        mergeLocs(); 
    }, [nearbyLocations]);

    const createKey = (location) => {
        return location.lat + location.lng
    };
    
    const handleLocation = (location) => { 
        if (location.pin !== "user") { 
            locationDispatch({
                type: SET_NEAREST_VM_ADDRESS,
                payload: location.address
            });
            
            selectMenu(location.vmId); 
        } else { 
            return; 
        } 
    };

    const mergeLocs = () => { 
        if(userLocation.lat && userLocation.lng) { 
            setMergedLocations([...nearbyLocations, userLocation]); 
        } 
    }

    const onLoad = useCallback((map) => { 
        const bounds = new window.google.maps.LatLngBounds();

        mergedLocations.forEach(location => { bounds.extend(location); }); 
        
        map.fitBounds(bounds); 
    }, [mergedLocations, nearbyLocations, userLocation]);

    const renderLoadingState = () => { 
        // Insert component for map loading state.

        return ( 
            <>
            <div className="">
                <h1 className="text-xl font-bold text-center mt-10">{t('Finding nearby Yo-Kai Machines')}</h1>
            </div> 
            </>
        ); 
    };

    const selectMenu = (vmId) => { 

        productDispatch({
            type    : HIDE_MODAL,
            payload : false
        });
        
        locationDispatch({
            type: SET_NEAREST_VM_ID,
            payload: vmId
        })

        navigate("/locationmenu"); 
    };

    const renderMap = () => { 
        return ( 
            <div className="relative flex flex-col items-center"> 
                <div className="absolute z-[1] w-full"> 
                    <LocationDropdown selectMenu = {selectMenu} /> 
                </div> 
                <div className="relative z-[0.5]"> 
                    <GoogleMap 
                        defaultCenter     = {MAP_CENTER} 
                        mapContainerStyle = {MAP_CONTAINER} 
                        onLoad            = {onLoad} 
                        options           = {{
                            fullscreenControl: false,
                            mapTypeControl   : false,
                            streetViewControl: false,
                            styles           : MAP_STYLE,
                            zoomControl      : false
                        }} 
                    > 
                        <MarkerClusterer> 
                            {
                                (clusterer) => mergedLocations.map((location) => (
                                    <Marker 
                                        key       = {createKey(location)} 
                                        position  = {location} 
                                        clusterer = {clusterer} 
                                        icon      = {{ 
                                            anchor    : new window.google.maps.Point(17, 46), 
                                            scaledSize: new window.google.maps.Size(60, 60), 
                                            url       : (location.pin === "user") ? IMAGES.USERMARK : IMAGES.LOCATIONPIN , 
                                        }} 
                                        onClick   = {() => { handleLocation(location) }} 
                                    /> 
                                )) 
                            }
                         </MarkerClusterer> 
                    </GoogleMap> 
                </div> 
            </div>
        ); 
    };

    return (isLoaded && hasFetched) ? renderMap() : renderLoadingState();
};

export default RenderVmLocations;

