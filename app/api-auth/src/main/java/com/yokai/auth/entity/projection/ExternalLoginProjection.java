package com.yokai.auth.entity.projection;

import com.yokai.auth.entity.ExternalLogin;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withId", types = { ExternalLogin.class }) 
interface ExternalLoginProjection { 
    Integer getExternalId();
    Integer getUserId();
    String getEmail();
    String getType();
    String getStatus();
    String getSub();
    Long getDateDeleted();
	
}
