package com.yokai.core.security;

public class WebSecurityConstants {
  public static final String SECRET = "SECRET_KEY";
	public static final int EXPIRATION_TIME = 43200; // 30 days in minutes
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String HEADER_STRING = "Authorization";
	public static final String SIGN_UP_URL = "/api/public/register";

	private WebSecurityConstants() {
		throw new IllegalStateException("Utility class");
	}
}
