package com.yokai.auth.security.jwt;

import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@Data
public class JwtProperties {

	private String secretKey = "orY8noPtzMBfouI2vq5ta4bwh6tddKv4";

	// validity in milliseconds
	private long validityInMs = 864_000_000; // 1h

}