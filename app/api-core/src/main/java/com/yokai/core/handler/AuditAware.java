package com.yokai.core.handler;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.yokai.core.security.jwt.JWTUtil;
import com.yokai.core.security.user.UserCredential;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;

public class AuditAware implements AuditorAware<Integer> {
	@Autowired
	private HttpServletRequest request;

	@Override
	public Optional<Integer> getCurrentAuditor() {
		String bearerToken = request.getHeader("Authorization");
		if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
			UserCredential user = JWTUtil.parseToken(bearerToken.substring(7, bearerToken.length()));
			return Optional.of(user.getUserId());
		}

		return Optional.empty();
	}

}