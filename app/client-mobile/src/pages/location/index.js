import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import FindDistance from "./locationHelper";
import { temporaryLocations } from "./locationHelper";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";

//@ MAPS PROPS
const mapsOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "85vh",
};

//@ MAIN COMPONENT
const index = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDOfw1lf2-dm4BgW9LsYap0FGjB4uxCKcs" , //INSERT API KEY
    libraries,
  });

  //@ STATES
  const [userCoordinates, setUserCoordinates] = useState([]);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(100);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const [selected, setSelected] = useState(null);

  //@ ERRORS HANDLERS
  const errorHanlder = (err) => {
    setError(err.code);
  };

  //@ COMPONENT USEEFFECT
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoordinates([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => errorHanlder(err),
      options
    );
  }, []);

  if (loadError) return "ERROR";
  if (!isLoaded) return "Loading Maps";
  if (error) return <UserDenied />;
  if (!userCoordinates) return "Can't Find Current Location";

  return (
    <div className="flex">
      <GoogleMap
        options={mapsOptions}
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={{ lat: userCoordinates[0], lng: userCoordinates[1] }}
      >
        <Marker
          position={{ lat: userCoordinates[0], lng: userCoordinates[1] }}
        />
        {temporaryLocations.map((item, index) => {
          return (
            <Marker
              key={index}
              position={{ lat: item.latitude, lng: item.longitude }}
              icon={{
                url: "https://mma.prnewswire.com/media/1719137/yo_kai_express_logo_Logo.jpg",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                setSelected(item);
              }}
            />
          );
        })}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => setSelected(null)}
          >
            <div className="flex flex-col">
              <h1 className="font-bold mt-1 text-secondary">Yo-Kai</h1>
              <p className="font-semibold  mt-1">{selected.address}</p>
              <h1 className="italic  mt-1">
                {FindDistance(
                  userCoordinates,
                  [selected.latitude, selected.longitude],
                  true
                ).toPrecision(2) + " Miles"}
              </h1>
              <a className="underline my-1 text-teal-700">Get Directions</a>
              <a className="underline my-1 text-secondary">Order Here?</a>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <div className=" w-10/12 mx-auto absolute  right-0 left-0 mt-10 rounded-md shadow-sm md:w-[50%]">
        <div
          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          aria-label="Search Yo-kai Store"
        >
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search"
          className=" border-[.5px] text-sm py-3 text-secondary rounded-full p-2 mx-auto  block w-full pl-10 sm:text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:border-secondary "
          placeholder="Location Name, City, State, Address"
          onChange={(e) => setDistance(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

//@RENDER FC
const RenderEmpty = ({ distance }) => {
  return (
    <div className="flex justify-center items-center align-center h-full mix-blend-darken">
      <p className="my-10 font-bold text-secondary text-center mx-auto">
        No Yo-Kai Machines within {distance ? distance : 0} miles radius.
      </p>
    </div>
  );
};

const UserDenied = () => {
  return (
    <div className="flex justify-center flex-col items-center align-center h-full">
      <p className="my-10 font-bold text-secondary">
        User Denied Location access
      </p>
      <button
        type="button"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-secondary "
      >
        Grant Access?
      </button>
    </div>
  );
};

export default index;

