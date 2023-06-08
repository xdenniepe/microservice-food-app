import React from "react";
import { Link } from "react-router-dom";
import FindDistance from "./locationHelper";
const LocationCard = (props) => {
  const { userCoordinates, values } = props;
  return (
    <div className="w-full my-2 flex max-h-[6rem] shadow-xl mix-blend-normal bg-white/90 p-1 rounded-md  overflow-hidden ">
      <img
        alt={values.address}
        aria-label={`Location Number  ${props.number + 1} ${values.address}`}
        className="mix-blend-darken w-[4rem] my-auto h-[4rem] rounded-2xl"
        src={
          "https://mma.prnewswire.com/media/1719137/yo_kai_express_logo_Logo.jpg"
        }
      />
      <div className="flex flex-col w-full my-auto text-[13px] font-medium overflow-hidden px-1 relative">
        <div className=" w-full overflow-hidden">
          <p className="overflow-hidden mb-1">{values.address}</p>
        </div>
        <div className="w-full  flex flex-row relative my-1">
          <p className="text-[12px] ">
            {FindDistance(
              userCoordinates,
              [values.latitude, values.longitude],
              true
            ).toFixed()}{" "}
            Miles{" "}
          </p>
          <Link
            to="/"
            role={"button"}
            aria-label={`Order now? `}
            className=" absolute right-0 bottom-0 text-center text-sm  rounded-full self-end w-[7rem]  text-secondary font-bold border-secondary border-[1.5px]"
          >
            ORDER
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;

