package com.sample.erp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;

@Controller
public class CurrentUserController {

	private UserLinks userLinks;

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public HttpEntity<Resource<User>> currentUser(@ModelAttribute User self) {
		List<Link> linkList = new ArrayList<Link>();
		linkList.add(this.userLinks.getSelfLink(self));
		UserResource userResource = new UserResource(self, linkList);

		return new ResponseEntity<Resource<User>>(userResource, HttpStatus.OK);
	}

	@Autowired
	public void setUserLinks(UserLinks userLinks) {
		this.userLinks = userLinks;
	}

	static class UserResource extends Resource<User> {
		public UserResource(User content, Iterable<Link> links) {
			super(content, links);
		}
	}
}
