package com.yokai.auth.security.jwt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yokai.auth.entity.User;
import com.yokai.auth.repository.UserRepository;
import com.yokai.auth.security.WebSecurityConstants;
import com.yokai.auth.security.user.UserCredential;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private UserRepository userRepository;
	private AuthenticationManager authenticationManager;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
		this.authenticationManager = authenticationManager;
		this.userRepository= userRepository;
		setFilterProcessesUrl("/api/public/login");
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
			throws AuthenticationException {
		try {
			UserCredential creds = new ObjectMapper().readValue(req.getInputStream(), UserCredential.class);
            User user = userRepository.findByEmail(creds.getUsername()).get(); 
			
			Authentication auth = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(creds.getUsername(), creds.getPassword(), new ArrayList<>()));

			try {
				if ("ACT".equals(user.getStatus())) {
					if (auth.isAuthenticated()) {
						log.info("Account   : {}  authentication successful. ", creds.getUsername());
					} else {
						log.info("Username  : {} Password: {}", creds.getUsername(), creds.getPassword());
						log.info("Account   : {}  authentication failed. Invalid credentials ", creds.getUsername());
					}
		
					return auth;
				}
				
				if ("INA".equals(user.getStatus())) {
					log.info("Account   : {} is still inactive. ", creds.getUsername());
					
					return null;
				}
				
			} catch (NullPointerException e) {
				System.err.println("NullPointerException caught!");
				e.printStackTrace();
			}

		} catch (Exception e) {
      		log.error("Error : {}", e.toString());
		}
		return null;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
			Authentication auth) throws IOException {

		Calendar c 	= Calendar.getInstance();
		Date now 		= c.getTime();

		c.add(Calendar.MINUTE, WebSecurityConstants.EXPIRATION_TIME);
		Date expirationDate = c.getTime();

		String username = ((UserDetails) auth.getPrincipal()).getUsername();
		User user 			= userRepository.findByEmail(username).get();
		String token 		= JWT.create()
                      .withClaim("id", user.getUserId())
                      .withSubject(username)
			                .withIssuedAt(now)
                      .withNotBefore(now)
                      .withExpiresAt(expirationDate)
			                .sign(Algorithm.HMAC512(WebSecurityConstants.SECRET.getBytes()));

		res.getWriter().write(token);
		res.getWriter().flush();
	}

}
