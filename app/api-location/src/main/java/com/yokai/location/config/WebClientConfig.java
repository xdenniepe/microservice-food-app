package com.yokai.location.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    @Qualifier("mock")
    public WebClient mockClient(@Value("${api.mock}") String endpoint){
        return WebClient.builder()
                .baseUrl(endpoint)
                .build();
    }

}