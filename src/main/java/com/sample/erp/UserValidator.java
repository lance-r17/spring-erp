package com.sample.erp;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public class UserValidator implements Validator {
	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}

	@Override
	public void validate(Object target, Errors errors) {
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "user.name.required");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "firstName",
				"user.firstName.required");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "lastName",
				"user.lastName.required");

		User user = (User) target;
	}
}
