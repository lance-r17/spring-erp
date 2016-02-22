package com.sample.erp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class UserLinks {

	private final EntityLinks entityLinks;

	@Autowired
	UserLinks(EntityLinks entityLinks) {
		Assert.notNull(entityLinks, "EntityLinks must not be null!");
		this.entityLinks = entityLinks;
	}

	Link getSelfLink(User user) {
		return this.entityLinks.linkForSingleResource(User.class, user.getId())
				.withSelfRel();
	}
}
