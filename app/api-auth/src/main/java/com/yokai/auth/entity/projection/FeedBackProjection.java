package com.yokai.auth.entity.projection;

import com.yokai.auth.entity.FeedBackEntity;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withId", types = { FeedBackEntity.class }) 
interface FeedBackProjection { 
    Integer getFeedBackId();
    String getName();
    String getEmail();
    String getReason();
    String getDescription();
}
