package com.yokai.auth.utility;

public class Constants {
  private Constants() {}
  
  public static final String ACTIVE_CODE                                  = "ACT";
  public static final String INACTIVE_CODE                                = "INA";
  public static final String FORGOT_PASSWORD_REQUEST                      = "Forgot Password";
  public static final String EMAIL_VERIFICATION_REQUEST                   = "Email Verification";
  public static final String LOCALHOST                                    = "localhost";
  public static final String NEW_PASSWORD_URI                             = "/resetpassword/";
  public static final String EMAIL_VERIFIED_URI                           = "/success/?message=accountverified&code=";
  public static final String URL_PROTOCOL_UNSECURED                       = "http://";
  public static final String URL_PROTOCOL_SECURED                         = "https://";
  public static final String LOCAL_BASE_URL                               = "localhost:3000";
}
