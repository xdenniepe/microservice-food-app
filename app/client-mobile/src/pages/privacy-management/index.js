import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
const PrivacyAccountManagement = () => {
  return (
    <div className="flex flex-col space-y-6 mt-8 w-full h-[80vh]">
      <Link
        to={"/privacyPolicy"}
        className="mx-auto w-11/12 rounded-lg shadow-lg border-2 h-16 flex flex-row relative"
      >
        <h1
          className="my-auto ml-5 font-bold opacity-60"
          aria-label="Privacy Policy"
        >
          Privacy Policy
        </h1>
        <div className="my-auto absolute top-4 right-2">
          <MdOutlineArrowForwardIos className=" w-6 h-6 opacity-70 text-secondary" />
        </div>
      </Link>
      <Link
        to={"/"}
        className="mx-auto w-11/12 rounded-lg shadow-lg border-2 h-16 flex flex-row relative"
      >
        <h1
          className="my-auto ml-5 font-bold opacity-60"
          aria-label="Delete Account"
        >
          Delete Account
        </h1>
        <div className="my-auto absolute top-4 right-2">
          <MdOutlineArrowForwardIos className=" w-6 h-6 opacity-70 text-secondary" />
        </div>
      </Link>
    </div>
  );
};

export default PrivacyAccountManagement;
