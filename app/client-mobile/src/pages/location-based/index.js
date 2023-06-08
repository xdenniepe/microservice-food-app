import React from "react";
import RenderVmLocations from "../../components/location-based/index.js";
import { CLASSES } from "../../utility/classes";

const VmLocation = () => {
    return (
        <div className={`${CLASSES.container} px-0 py-0`}>
            <div className={`${CLASSES.main} px-0 py-0 w-full`}>
                <RenderVmLocations />
            </div>
        </div>
    )
}

export default VmLocation;
