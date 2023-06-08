package com.yokai.auth.security.user;

import java.util.ArrayList;

import com.yokai.auth.entity.User;
import com.yokai.auth.mapper.HibernateFieldMapper;
import com.yokai.auth.repository.UserRepository;

import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class UserDetailService implements UserDetailsService {

  @Autowired
  UserRepository userRepository;

	private DozerBeanMapper dozer;

  @Autowired
	public UserDetailService() {
		this.dozer = new DozerBeanMapper();
		this.dozer.setCustomFieldMapper(new HibernateFieldMapper());

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username).get();
    UserCredential credential = new UserCredential();
		credential.setUsername(user.getEmail());
		credential.setPassword(user.getPassword()); 

		UserPrincipal principal = new UserPrincipal(dozer.map(credential, UserCredential.class), new ArrayList<>());
    log.info("Username: {}", principal.getUsername());
		log.info("Password: {}", principal.getPassword());
		return principal;

	}
}
