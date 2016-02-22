package com.sample.erp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class SecurityControllerAdvice {

	private UserRepository repository;

	@ModelAttribute
	public User currentUser(Authentication authentication) {
		if (null == authentication) {
			return null;
		}

		return this.repository.findByName(authentication.getName());
	}

	@Autowired
	public void setRepository(UserRepository userRepository) {
		this.repository = userRepository;
	}
}
