package com.yokai.auth.security.jwt;

import com.yokai.auth.security.WebSecurityConstants;
import com.yokai.auth.security.user.UserCredential;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JWTUtil {

	public static UserCredential parseToken(String token) {
		try {
			Claims body = Jwts.parser().setSigningKey(WebSecurityConstants.SECRET.getBytes()).parseClaimsJws(token).getBody();
			log.info("JWTUtil id: {}", (Integer) body.get("id"));
			UserCredential u = new UserCredential();
			u.setUsername(body.getSubject());
			u.setUserId((Integer) body.get("id"));

			return u;

		} catch (JwtException | ClassCastException e) {
			e.printStackTrace();
			return null;
		}
	}
}
