import { getLocalStorageItem } from "../service/helper";

export const initialState = {
    hasFetched     : false,
    locationMenu   : [],
    nearbyLocations: [],
    userLocation   : {},
    vmAddress      : "",
    vmId           : ""
};

export const initializer = (initialState) => {
    return {
        ...initialState,
        locationMenu: getLocalStorageItem('locationMenu') || [],
        vmAddress   : getLocalStorageItem('vmAddress') || "",
        vmId        : getLocalStorageItem('vmId') || ""
    };
};

export const CLEANSE_STATES         = 'CLEANSE_STATES';
export const SET_HAS_FETCHED        = 'SET_HAS_FETCHED';
export const SET_LOCATION_MENU      = 'SET_LOCATION_MENU';
export const SET_NEARBY_LOCATIONS   = 'SET_NEARBY_LOCATIONS';
export const SET_NEAREST_VM_ID      = 'SET_NEAREST_VM_ID';
export const SET_NEAREST_VM_ADDRESS = 'SET_NEAREST_VM_ADDRESS';
export const SET_USER_LOCATION      = 'SET_USER_LOCATION';

const LocationReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CLEANSE_STATES: 
            return { 
                ...state, 
                locationMenu: [],
                vmAddress   : "",
                vmId        : ""
            };

        case SET_HAS_FETCHED:
            return {
                ...state,
                hasFetched: true
            };

        case SET_LOCATION_MENU:
            return {
                ...state,
                locationMenu: payload
            };

        case SET_NEARBY_LOCATIONS:
            return {
                ...state,
                nearbyLocations: payload
            };

        case SET_NEAREST_VM_ID:
            return {
                ...state,
                vmId: payload
            };

        case SET_NEAREST_VM_ADDRESS:
            return {
                ...state,
                vmAddress: payload
            };

        case SET_USER_LOCATION:
            return {
                ...state,
                userLocation: payload
            };

        default:
            throw new Error(`Unhandle action type: ${type}`);
    }
};

export default LocationReducer;