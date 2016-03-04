package com.sample.erp;

import org.springframework.security.core.authority.AuthorityUtils;

/**
 * @author Lance Chen
 */
// tag::code[]
public class CurrentUser extends org.springframework.security.core.userdetails.User {

    private User user;

    public CurrentUser(User user) {
        super(user.getName(), user.getPassword(), user.isActive(), true, true, true, AuthorityUtils.createAuthorityList(user.getRoles()));
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public Long getId() {
        return user.getId();
    }

    public String[] getRoles() {
        return user.getRoles();
    }

}
// end::code[]
