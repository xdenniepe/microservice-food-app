package com.yokai.core.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {
  private final Integer userId;
  private final String  email;
  private final String  firstName;
  private final String  lastName;
  private final String  password;
  private final String  phoneNumber;
  private final String  username;
  private final String  oneTimePassword;
  private final Long    otpRequestTime;
  private final String  checkPass;
  private final Long dateDeleted;
  private final String  birthday;
  private final String  gender;
}
