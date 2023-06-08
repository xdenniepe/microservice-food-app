import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../../utility/constants";

const MenuLayout = (props) => {
    const { children, history, setHasLoaded } = props;
   
    const renderHeaderContent = () => {
        return (
            <Link to={history ? history : '/'}>
                <img src={IMAGES.LOGO} alt="Yo-Kai Express Logo" aria-label="Yo-Kai Express Logo" className="w-28 pt-2" />
            </Link>
        );
    }

    return (
        <div className="h-screen flex font-body bg-white">
            <div className="mx-auto">
                <div className="w-screen flex flex-col items-center justify-between border-b border-neutral-300 py-2 drop-shadow-primary">
                    { renderHeaderContent() }
                </div>
                <div className="flex flex-col justify-between py-6 px-4 sm:px-6">
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}


export default MenuLayout;