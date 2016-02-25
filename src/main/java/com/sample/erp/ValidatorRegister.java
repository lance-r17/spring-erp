package com.sample.erp;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.validation.Validator;

@Configuration
public class ValidatorRegister implements InitializingBean {

	private static final List<String> EVENTS;
	static {
		List<String> events = new ArrayList<String>();
		events.add("beforeCreate");
		events.add("afterCreate");
		events.add("beforeSave");
		events.add("afterSave");
		events.add("beforeLinkSave");
		events.add("afterLinkSave");
		events.add("beforeDelete");
		events.add("afterDelete");
		EVENTS = Collections.unmodifiableList(events);
	}

	@Autowired
	ListableBeanFactory beanFactory;

	@Autowired
	ValidatingRepositoryEventListener validatingRepositoryEventListener;

	@Override
	public void afterPropertiesSet() throws Exception {
		Map<String, Validator> validators = this.beanFactory
				.getBeansOfType(Validator.class);
		// Compatible with java 7 and below version.
		// If you are using java 8, suggest to uncomment java 8 version and comment the
		// code after it instead.
		// Java 8 version starts
		// for (Map.Entry<String, Validator> entry : validators.entrySet()) {
		// ValidatorRegister.EVENTS.stream().filter(p ->
		// entry.getKey().startsWith(p)).findFirst()
		// .ifPresent(p -> this.validatingRepositoryEventListener.addValidator(p,
		// entry.getValue()));
		// }
		// Java 8 version ends

		// Java 7 or below version starts
		for (Map.Entry<String, Validator> entry : validators.entrySet()) {
			for (String e : ValidatorRegister.EVENTS) {
				if (entry.getKey().startsWith(e)) {
					this.validatingRepositoryEventListener.addValidator(e,
							entry.getValue());
					break;
				}
			}
		}
		// Java 7 or below version ends
	}
}
