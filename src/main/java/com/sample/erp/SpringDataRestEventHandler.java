package com.sample.erp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(Employee.class)
public class SpringDataRestEventHandler {

	private final ManagerRepository repository;

	@Autowired
	public SpringDataRestEventHandler(ManagerRepository repository) {
		this.repository = repository;
	}

	@HandleBeforeCreate
	public void applyUserInformationUsingSecurityContext(Employee employee) {
		String name = SecurityContextHolder.getContext().getAuthentication().getName();
		Manager manager = this.repository.findByName(name);
		if (manager == null) {
			Manager newManager = new Manager();
			newManager.setName(name);
			newManager.setRoles(new String[] { "ROLE_MANAGER" });
			manager = this.repository.save(newManager);
		}
		employee.setManager(manager);
	}
}
