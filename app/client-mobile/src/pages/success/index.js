import React, { useEffect, useState } from "react";
import { CLASSES } from "../../utility/classes";
import { GET, IMAGES } from "../../utility/constants";
import { useSearchParams, useNavigate } from "react-router-dom";
import { request } from "../../service/request";
import api from "../../service/api";
import { SuccessMessage, EmailSent } from "../../components/success";
import { useTranslation } from "react-i18next";


const messages = [
    {
        buttonlabel: "Back to Sign in",
        description: "Your email has been verified and account successfully created.",
        name: "accountverified",
        title: "Congratulations!",
        image: IMAGES.SUCCESS,
        to: "/login",
        arialabel: "Check Icon - Password Reset Successful"
    },
    {
        buttonlabel: "Back to Sign in",
        description: "Password has been changed successfully",
        name: "resetpassword",
        title: "Success!",
        image: IMAGES.SUCCESS,
        to: "/login",
        arialabel: "Check Icon - Password Reset Successful"
    },
    {
        name: "resetemail",
        title: "RESET PASSWORD",
        description: `inbox for the confirmation link.`,
        buttonlabel: "Back to Sign In",
        image: IMAGES.RESETCONFIRMATION,
        to: "/login",
        arialabel: "Mail Icon - Email Verification Sent"
    },
    {
        name: "verifyemail",
        title: "CHECK YOUR EMAIL",
        description: "We just sent an email to xxxxxx@youremail.com. It may take up to 5 minutes to receive the email. Please click the button in the body of the message to verify your email address.",
        buttonlabel: "Verify Email Address",
        image: IMAGES.RESETCONFIRMATION,
        to: "/login",
        arialabel: "Mail Icon - Email Verification Sent"
    }
]

const Success = (props) => {
    const { t } = useTranslation(["success_messages"]);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { setHasLoaded, renderSr } = props;
    const [ message, setMessage ] = useState('');
    const navigate                        = useNavigate();

    useEffect(() => {
        setHasLoaded(true);
        if(searchParams.get("message") === 'accountverified') {
            request({
                url   : `${api.REGISTER_VERIFY}/${searchParams.get("code")}`,
                method: GET
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
                navigate(`/error?message=linkexpired&code=${searchParams.get("code")}`);
            })
        }
    }, [])

    const displayMessage = (message) => {
        switch(searchParams.get("message")) {
            case "resetemail": return (
                <>
                    <EmailSent message={message} />
                </>
            )
            case "verifyemail":  return <EmailSent message={message} />
            case "resetpassword":
            case "accountverified": return <SuccessMessage message={message} />
            default : return <></>
        }
    }
    

    return (
        <div className={CLASSES.container}>
            <div className={CLASSES.main}>     
                { renderSr() }             
                {
                    messages.map((message, index) => (
                        <div key={`success_${index}`} className="px-4 h-full flex flex-col items-center align-center justify-center text-center">
                            {message.name === searchParams.get("message") ? displayMessage(message) : <></>}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Success;