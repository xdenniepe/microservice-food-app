package com.yokai.auth.entity.projection;

import com.yokai.auth.entity.User;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withId", types = { User.class }) 
interface UserProjection { 
    Integer getUserId();
    String getEmail();
    String getFirstName();
    String getLastName();
    String getStatus();
    String getPhoneNumber();
    String getPassword();
	String getCheckPass();
    Long getDateDeleted();
    String getBirthday();
    String getGender();

}
