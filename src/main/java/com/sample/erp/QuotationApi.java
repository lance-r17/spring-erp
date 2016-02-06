package com.sample.erp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

//@RestController
public class QuotationApi {

	@Autowired
	private QuotationRepository quotationRepository;

	@RequestMapping(value = "/quotations", method = RequestMethod.GET)
	List<Quotation> getQuotations(@PathVariable("client") final String client) {
		return this.quotationRepository.findAll();
	}

	@RequestMapping(value = "/quotations/{client}", method = RequestMethod.GET)
	List<Quotation> getClientsQuotations(@PathVariable("client") final String client) {
		return this.quotationRepository.findByClient(client);
	}

	@RequestMapping(value = "/quotation/{quotation}", method = RequestMethod.POST)
	void addQuotation(@PathVariable("quotation") final Quotation quotation) {
		this.quotationRepository.save(quotation);
	}
}
