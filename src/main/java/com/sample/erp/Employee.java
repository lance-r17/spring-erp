package com.sample.erp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

	@ManyToOne
	private Manager manager;

	protected Employee() {
	}

	public Employee(String firstName, String lastName, String description, Manager manager) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.description = description;
		this.manager = manager;
	}
}
// end::code[]
