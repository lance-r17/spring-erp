package com.sample.erp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * @author Lance Chen
 */
// tag::code[]
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN') and #user?.name != authentication?.name")
	User save(@Param("user") User user);

	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN') and #user?.name != authentication?.name")
	void delete(@Param("id") Long id);

	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN') and #user?.name != authentication?.name")
	void delete(@Param("user") User user);

	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	Iterable<User> findAll(Sort sort);

	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	Page<User> findAll(Pageable pageable);

	User findByName(String name);

	@Query("SELECT CASE WHEN COUNT(u) > 0 THEN 'true' ELSE 'false' END FROM User u WHERE u.name = ?1")
	public Boolean existsByName(@Param("name") String name);
}
// end::code[]

