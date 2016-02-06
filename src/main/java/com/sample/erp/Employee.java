package com.sample.erp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

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
	private String descripiton;

	private Employee() {
	};

	public Employee(String firstName, String lastName, final String descripiton) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.descripiton = descripiton;
	}
}
// end::code[]
