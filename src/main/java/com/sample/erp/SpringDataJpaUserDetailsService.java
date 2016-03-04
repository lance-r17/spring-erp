package com.sample.erp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * @author Lance Chen
 */
// tag::code[]
@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {

	private final UserRepository repository;

	@Autowired
	public SpringDataJpaUserDetailsService(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		User user = this.repository.findByName(name);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("User with name=%s was not found", name));
		}

		return new CurrentUser(user);
	}
}
// end::code[]
