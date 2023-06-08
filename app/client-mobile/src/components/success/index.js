import React from "react";
import { Link } from "react-router-dom"
import { CLASSES } from "../../utility/classes";

export const EmailSent = (props) => {
    const { message } = props;

    return (
        <>
            <h1 className="text-lg my-2 text-center font-semibold xss:text-mdss" aria-label={message.title}>{message.title}</h1>
            <img className="h-10/12 w-10/12 mt-5 mb-14 mx-auto xss:mb-5" src={message.image} alt={message.arialabel} role="img" aria-label={message.arialabel}/>
            {
                (message.name === "resetemail") ?
                    <p className="w-full font-light text-base text-center text-gray-500 xss:text-mdss" aria-label={`Please check email inbox for the confirmation link.`}>Please check <span className="text-secondary">email </span>{message.description}</p>
                :
                    <p className="w-full font-light text-base text-center text-gray-500 xss:text-mdss" aria-label={message.description}>{message.description}</p>
            }
            <Link to={message.to} className={`${CLASSES.buttonDefault} font-semibold text-white text-lg mt-8 py-2 w-11/12 text-center mx-auto xss:text-xxs`} role="link" aria-label={message.buttonlabel} >
                {message.buttonlabel} 
            </Link>
        </>
    )
}

export const SuccessMessage = (props) => {
    const { message } = props;

    return (
        <div className="flex flex-col items-center justify-center py-10 xss:py-0">
            <h1 className="text-xl my-2 text-center xss:text-mds" aria-label={message.title}>{message.title}</h1>
            <img className="h-5/12 w-5/12 mt-2 mb-8 mx-auto" src={message.image} alt={message.arialabel} role="img" aria-label={message.arialabel}/>
            <p className="w-10/12 font-light text-base text-center xss:text-mdss" aria-label={message.description}>{message.description}</p>
            <Link to={message.to} className={`${CLASSES.buttonDefault} font-semibold text-white text-lg mt-8 py-2 w-11/12 text-center mx-auto xss:text-xxs`} role="link" aria-label={message.buttonlabel} >
                {message.buttonlabel} 
            </Link>
        </div>
    )
}
