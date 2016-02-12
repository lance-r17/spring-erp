package com.sample.erp;

import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Lance Chen
 */
// tag::code[]
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {

}
// end::code[]

