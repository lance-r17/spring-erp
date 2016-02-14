package com.sample.erp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;
import lombok.ToString;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Lance Chen
 */
// tag::code[]
@Data
@ToString(exclude = "password")
@Entity
public class Manager {

	public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

	@Id
	@GeneratedValue
	private Long id;

	private String name;

	@JsonIgnore
	private String password;

	private String[] roles;

	protected Manager() {
	}

	public Manager(String name, String password, String... roles) {
		this.name = name;
		this.setPassword(password);
		this.roles = roles;
	}

	public void setPassword(String password) {
		this.password = Manager.PASSWORD_ENCODER.encode(password);
	}
}
// end::code[]
