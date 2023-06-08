package com.yokai.auth.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class TwilioService {
    
    @Value("${twilio.account.sid}")
    private String accountSID;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.sender}")
    private String sender;


    public void sendTextMessage(String messageBody, String recipient) {
        Twilio.init(accountSID, authToken);

        try {
            Message.creator(new PhoneNumber(recipient),
                            new PhoneNumber(sender),
                            messageBody).create();

            log.info("Text message has been sent.");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
