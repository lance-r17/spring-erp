package com.sample.erp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {

	private final UserRepository repository;

	@Autowired
	// public SpringDataJpaUserDetailsService(ManagerRepository repository) {
	public SpringDataJpaUserDetailsService(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		User user = this.repository.findByName(name);
		return new org.springframework.security.core.userdetails.User(
				user.getName(),
				user.getPassword(), 
				user.isActive(), 
				true, 
				true, 
				true,
				AuthorityUtils.createAuthorityList(user.getRoles()));
	}
}
