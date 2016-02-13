package com.sample.erp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Version;

/**
 * @author Lance Chen
 */
// tag::code[]
@Data
@Entity
public class Employee {

	@Id
	@GeneratedValue
	private Long id;
	private String firstName;
	private String lastName;
	private String description;

	@Version
	@JsonIgnore
	private Long version;

	private Employee() {
	};

	public Employee(String firstName, String lastName, final String description) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.description = description;
	}
}
// end::code[]
