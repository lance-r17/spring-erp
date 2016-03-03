package com.sample.erp;

import java.sql.Date;
import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Version;

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
public class User {

	public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

	@Id
	@GeneratedValue
	private Long id;
	@Column(unique = true)
	private String name;
	private String firstName;
	private String lastName;
	private String email;
	private String avatarUrl;
	private Date joinDate;
	private boolean active;

	@JsonIgnore
	private String password;
	private String[] roles;

	@Version
	@JsonIgnore
	private Long version;

	protected User() {
	}

	public User(String name, String password, String firstName, String lastName,
			String email, String avatarUrl, Date joinDate, boolean active,
			String... roles) {
		this.name = name;
		this.setPassword(password);
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.avatarUrl = avatarUrl;
		this.joinDate = joinDate;
		this.active = active;

		this.roles = roles;
	}

	public void setPassword(String password) {
		this.password = User.PASSWORD_ENCODER.encode(password);
	}

	public void addRole(String role) {
		if (!Arrays.asList(this.roles).contains(role)) {
			String[] newRoles = new String[this.roles.length + 1];
			System.arraycopy(this.roles, 0, newRoles, 0, this.roles.length);
			newRoles[this.roles.length] = role;

			this.roles = newRoles;
		}
	}
}
// end::code[]
