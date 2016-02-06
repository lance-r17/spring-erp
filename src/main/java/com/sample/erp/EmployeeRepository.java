package com.sample.erp;

import org.springframework.data.repository.CrudRepository;

/**
 * @author Lance Chen
 */
// tag::code[]
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

}
// end::code[]