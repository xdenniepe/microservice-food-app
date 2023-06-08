
import React from "react";
import { default as LinkExpired } from "./link-expired";
import { default as NotFound } from "./not-found";
import { useSearchParams } from "react-router-dom";

const Errors = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    switch(searchParams.get("message")) {
        case "linkexpired": return <LinkExpired />
        case "404"        : return <NotFound />
             default      : return <NotFound />
    }
}

export default Errors;