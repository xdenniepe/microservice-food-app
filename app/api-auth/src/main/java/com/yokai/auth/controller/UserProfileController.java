package com.yokai.auth.controller;

import java.util.Locale;

import javax.mail.MessagingException;

import com.yokai.auth.entity.User;
import com.yokai.auth.service.EmailService;
import com.yokai.auth.service.RegistrationService;
import com.yokai.auth.service.UserService;
import com.yokai.core.dto.ReceiptDTO;
import com.yokai.core.dto.UserDTO;
import com.yokai.auth.entity.ExternalLogin;
import com.yokai.core.dto.ExternalLoginDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.io.IOException;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(path = "/api")
@Slf4j
public class UserProfileController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/users/update")
    public ResponseEntity<User> udpateUser(@RequestBody UserDTO request) {
        return ResponseEntity.ok(registrationService.updateUser(request));
    }

    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/users/update/external")
    public ResponseEntity<ExternalLogin> udpateExternal(@RequestBody ExternalLoginDTO request) {
        return ResponseEntity.ok(registrationService.updateExternal(request));
    }


    @PostMapping("/users/receipt")
    public ResponseEntity<Object> sendReceiptEmail(@RequestBody ReceiptDTO request) throws MessagingException, IOException, java.io.IOException {
        log.info("Sending Email Confirmation {}", request.getOrderId());

        HttpStatus status = null;
        User       user   = userService.findByUserId(request.getUserId()).get();
        Locale     locale = new Locale.Builder().setLanguage("en").setRegion("US").build();

        emailService.sendReceiptEmail(user, locale, request);

        status = HttpStatus.OK;
        return new ResponseEntity<>(status);
    }

    @PostMapping("/users/receiptjp")
    public ResponseEntity<Object> sendReceiptEmailJp(@RequestBody ReceiptDTO request) throws MessagingException, IOException, java.io.IOException {
        log.info("Sending Email Confirmation {}", request.getOrderId());

        HttpStatus status = null;
        User       user   = userService.findByUserId(request.getUserId()).get();
        Locale     locale = new Locale.Builder().setLanguage("en").setRegion("US").build();

        emailService.sendReceiptEmailJp(user, locale, request);

        status = HttpStatus.OK;
        return new ResponseEntity<>(status);
    }
}