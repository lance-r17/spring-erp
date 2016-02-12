package com.sample.erp;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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

	private Employee() {
	};

	public Employee(String firstName, String lastName, final String description) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.description = description;
	}
}
// end::code[]
