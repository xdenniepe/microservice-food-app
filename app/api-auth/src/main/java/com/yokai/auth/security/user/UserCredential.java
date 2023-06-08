package com.yokai.auth.security.user;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserCredential implements Serializable {
	private static final long serialVersionUID = 1905122041950251207L;

	private Integer userId;
	private String username;
	private String password;
  
}