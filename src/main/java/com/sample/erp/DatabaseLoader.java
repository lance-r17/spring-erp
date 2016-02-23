package com.sample.erp;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * @author Lance Chen
 */
// tag::code[]
@Component
public class DatabaseLoader implements CommandLineRunner {

	// private final EmployeeRepository employees;
	// private final ManagerRepository managers;
	private final UserRepository users;

	@Autowired
	// public DatabaseLoader(EmployeeRepository employeeRepository,
	// ManagerRepository managerRepository, UserRepository userRepository) {
	// this.employees = employeeRepository;
	// this.managers = managerRepository;
	public DatabaseLoader(UserRepository userRepository) {
		this.users = userRepository;
	}

	public void run(String... arg0) throws Exception {

		// Manager greg = this.managers
		// .save(new Manager("greg", "turnquist", "ROLE_MANAGER"));
		//
		// Manager oliver = this.managers.save(new Manager("oliver", "gierke",
		// "ROLE_MANAGER"));
		//
		// SecurityContextHolder.getContext().setAuthentication(
		// new UsernamePasswordAuthenticationToken("greg", "dosen't matter",
		// AuthorityUtils.createAuthorityList("ROLE_MANAGER")));
		//
		// this.employees.save(new Employee("Frodo", "Baggins", "ring bearer", greg));
		// this.employees.save(new Employee("Bilbo", "Baggins", "burglar", greg));
		// this.employees.save(new Employee("Gandalf", "the Grey", "wizard", greg));
		//
		// SecurityContextHolder.getContext().setAuthentication(
		// new UsernamePasswordAuthenticationToken("oliver", "dosen't matter",
		// AuthorityUtils.createAuthorityList("ROLE_MANAGER")));
		//
		// this.employees.save(new Employee("Samwise", "Gamgee", "gardener", oliver));
		// this.employees.save(new Employee("Meriadoc", "Brandybuck", "pony rider",
		// oliver));
		// this.employees.save(new Employee("Peregrin", "Took", "pipe smoker", oliver));

		// create super admin
		SecurityContextHolder.getContext().setAuthentication(
				new UsernamePasswordAuthenticationToken("super", "dosen't matter",
						AuthorityUtils.createAuthorityList("ROLE_ADMIN")));

		this.users.save(new User("john", "johndoe", "John", "Doe",
				"john.doe@example.com", "av1.png", Date.valueOf("2014-10-22"), true,
				"ROLE_MANAGER", "ROLE_APPROVER", "ROLE_OPERATOR", "ROLE_ADMIN"));
		this.users.save(new User("charles", "charlesboyle", "Charles S", "Boyle",
				"char_boy90@example.com", "av2.png", Date.valueOf("2014-10-24"), true,
				"ROLE_OPERATOR"));
		this.users.save(new User("scott", "scottcal", "Scott S.", "Calabrese",
				"scot.em23@example.com", "av3.png", Date.valueOf("2014-10-15"), true,
				"ROLE_APPROVER"));
		this.users.save(new User("lucy", "lucymoon", "Lucy", "Moon",
				"just_lucy.doe@example.com", "av4.png", Date.valueOf("2014-10-12"),
				false, "ROLE_APPROVER"));
		this.users.save(new User("teresa", "teresadoe", "Teresa L.", "Doe",
				"ter.l.doe@example.com", "av5.png", Date.valueOf("2014-10-24"), true,
				"ROLE_ADMIN"));
		this.users.save(new User("maria", "mariamarz", "Maria", "Marz",
				"maria_545@example.com", "av6.png", Date.valueOf("2014-10-22"), true,
				"ROLE_OPERATOR"));

		SecurityContextHolder.clearContext();
	}
}
// end::code[]
