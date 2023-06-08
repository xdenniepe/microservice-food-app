package com.yokai.cloudgateway.config;

import java.util.List;
import java.util.function.Predicate;

import com.yokai.cloudgateway.utility.Constants;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class RouterValidator {

    public static final List<String> openApiEndpoints = List.of(
      Constants.PUBLIC_API + "/login",
      Constants.PUBLIC_API + "/deleteUser",
      Constants.PUBLIC_API + "/deleteUser/**",
      Constants.PUBLIC_API + "/verify",
      Constants.PUBLIC_API + "/clearOtp",
      Constants.PUBLIC_API + "/register",
      Constants.PUBLIC_API + "/register/**",
      Constants.PUBLIC_API + "/search/findByToken",
      Constants.PUBLIC_API + "/search/findByEmail",
      Constants.PUBLIC_API + "/search/findByUserSub",
      Constants.PUBLIC_API + "/search/findByVerificationUserId",
      Constants.PUBLIC_API + "/search/findByVerificationCode",
      Constants.PUBLIC_API + "/search/findByUserId",
      Constants.PUBLIC_API + "/forgotpassword",
      Constants.PUBLIC_API + "/newpassword",
      Constants.PUBLIC_API + "/newpassword/**"
    );

    public Predicate<ServerHttpRequest> isSecured =
        request -> openApiEndpoints
                .stream()
                .noneMatch(uri -> request.getURI().getPath().contains(uri));
}
