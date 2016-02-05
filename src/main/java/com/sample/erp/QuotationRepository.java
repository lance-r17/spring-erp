package com.sample.erp;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotationRepository extends JpaRepository<Quotation, Long> {
	List<Quotation> findByClient(String client);
}
