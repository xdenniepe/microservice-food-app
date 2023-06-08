package com.yokai.auth.service;

import com.yokai.auth.entity.User;
import com.yokai.core.dto.UserDTO;
import com.yokai.auth.entity.ExternalLogin;
import com.yokai.core.dto.ExternalLoginDTO;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class RegistrationService {

  private final UserService userService;

  public User register(@RequestBody UserDTO user) {
    log.info("Registration email: {} password: {}", user.getEmail(), user.getPassword());
    User userEntity = userService.register(user);

    return userEntity;
  }

  public User updateUser(@RequestBody UserDTO user) {
    return userService.updateUserProfile(user);
  }

  public ExternalLogin updateExternal(@RequestBody ExternalLoginDTO externalLoginDto) {
    return userService.updateExternalUser(externalLoginDto);
  }

  
  
}
