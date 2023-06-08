import { createContext, useContext, useEffect, useReducer, useState } from "react";
import LocationReducer, { initialState, initializer, SET_HAS_FETCHED, SET_LOCATION_MENU, SET_NEARBY_LOCATIONS, SET_NEAREST_VM_ADDRESS, SET_USER_LOCATION } from "../reducer/locationReducer";
import { ADD_PRODUCTS } from "../reducer/productReducer";
import { ProductContext } from "./productContext";
import { GET } from "../utility/constants";
import { request } from "../service/request";
import { setLocalStorageItem, shuffleArray } from "../service/helper";
import api from "../service/api";

export const LocationContext = createContext();

const LocationContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(LocationReducer, initialState, initializer);
    const productDispatch   = useContext(ProductContext).dispatch;

    const { locationMenu, userLocation, vmId, vmAddress } = state;
    const [status, setStatus] = useState([]);

    useEffect(() => {     
        if (vmId) {
            setLocalStorageItem('vmId', vmId);

            getNearestVmProducts();
        } 

        if (vmAddress) {
            setLocalStorageItem('vmAddress', vmAddress);
        }
        
    }, [vmId, vmAddress]);

    useEffect(() => {
        if(locationMenu) {
            setLocalStorageItem('locationMenu', locationMenu);
        }
    }, [locationMenu])

    useEffect(() => { 
        // Terminate the hook when javascript geolocation API returns undefined coordinates.

        if(userLocation.lat === undefined && userLocation.lng === undefined) { 
            return; 
        } // Get nearest locations from the user within 10-mile radius. 
        
        async function fetchData () { 
            await getNearbyLocations();

            dispatch({
                type: SET_HAS_FETCHED
            });
        } 

        fetchData();
    }, [userLocation]);

    const getUserLocation = () => { 
        // Check if user's location service is enabled. 

        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition((position) => { 
                dispatch({
                    type: SET_USER_LOCATION,
                    payload: { 
                        lat: position.coords.latitude, 
                        lng: position.coords.longitude, 
                        pin: "user" 
                    }
                });
            }, (error) => { 
                    console.log("geolocation error -> ", error.code); 
                }); 
        } else { 
            console.log("Location service is not enabled."); 
        } 
    }

    const getNearbyLocations = () => { 
        return  request({ 
                    url : `${api.LOCATIONS_BOUNDARY}?`, 
                    method: GET, 
                    params : { 
                        lat: userLocation.lat, 
                        lng: userLocation.lng, 
                    } 
                }).then(response => { 
                    const allLocations = (response.data).map(x => { 
                        return { 
                            address: x.address, 
                            lat : x.lat, 
                            lng : x.lng, 
                            pin : "vendingMachine",
                            locationName: x.locationName,
                            status: x.status,
                            vmId: x.vendingMachineId,
                        }; 
                        
                    });
                    const locationsForDropdown = (response.data).map(x => { 
                        return { 
                            address: x.address, 
                            vmId : x.vendingMachineId,
                            locationName: x.locationName,
                            status: x.status,
                            vmId: x.vendingMachineId,
                        }; 
                    });

                    // Set locations to be rendered on the map. 
                    
                    dispatch({
                        type   : SET_NEARBY_LOCATIONS,
                        payload: [...allLocations]
                    });

                    // Set locations to be rendered on the dropdown. 
                    
                    dispatch({
                        type   : SET_LOCATION_MENU,
                        payload: locationsForDropdown
                    });
                }).catch(error => {
                    console.log("error -> ", error); 
                        
                    throw error; 
                }); 
     };

    const getNearestVm = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position, _options = { timeout: 5000 }) => {
                request({
                    url    : api.LOCATIONS_NEAREST,
                    method : GET,
                    params : {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                }).then(response => {
                    dispatch({
                        type: SET_NEAREST_VM_ADDRESS,
                        payload: response.data[0].address
                    });

                    getNearestVmProducts(response.data[0].vendingMachineId);
                }).catch(error => {
                    console.log("error -> ", error);
                });
            }, (error) => {
                console.log("geolocation error -> ", error.code);
            });
        } else {
            console.log("Location service is not enabled.");
        }
    }

    const getNearestVmProducts = (id = vmId) => {
        request({
            url   : api.PRODUCTS,
            method: GET,
            params: {
                id: id
            }
        }).then(response => {
            productDispatch({
                type   : ADD_PRODUCTS,
                payload: shuffleArray(response.data)
            });
            setStatus(200)
        }).catch(error => {
            const { response } = error;
            console.log(response);
            setStatus(response.data.status)
        });
    }

    return (
        <LocationContext.Provider 
            value={{ 
                status,
                state, 
                dispatch, 
                getNearbyLocations,
                getNearestVm, 
                getNearestVmProducts,
                getUserLocation,
            }}
        >
            { children }
        </LocationContext.Provider>
    );
};

export default LocationContextProvider;