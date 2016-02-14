package com.sample.erp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(Employee.class)
public class EmployeeEventHandler {

	private final SimpMessagingTemplate websocket;

	private final EntityLinks entityLinks;

	@Autowired
	public EmployeeEventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
		this.websocket = websocket;
		this.entityLinks = entityLinks;
	}

	@HandleAfterCreate
	public void newEmployee(Employee employee) {
		this.websocket.convertAndSend(WebSocketConfiguration.MESSAGE_PREFIX
				+ "/newEmployee", getPath(employee));
	}

	@HandleAfterSave
	public void updateEmployee(Employee employee) {
		this.websocket.convertAndSend(WebSocketConfiguration.MESSAGE_PREFIX
				+ "/updateEmployee", getPath(employee));
	}

	@HandleAfterDelete
	public void deleteEmployee(Employee employee) {
		this.websocket.convertAndSend(WebSocketConfiguration.MESSAGE_PREFIX
				+ "/deleteEmployee", getPath(employee));
	}

	/**
	 * Take an {@link Employee} and get the URI using Spring Data REST's
	 * {@link EntityLinks}.
	 * 
	 * @param employee
	 */
	private String getPath(Employee employee) {
		return this.entityLinks
				.linkForSingleResource(employee.getClass(), employee.getId()).toUri()
				.getPath();
	}
}
