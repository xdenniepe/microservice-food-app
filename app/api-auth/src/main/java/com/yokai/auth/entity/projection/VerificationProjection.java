package com.yokai.auth.entity.projection;

import com.yokai.auth.entity.Verification;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withId", types = { Verification.class }) 
interface VerificationProjection { 
    Integer getVerificationId();
    Integer getUserId();
    Long getDateDeleted();
    String getCode();
}
