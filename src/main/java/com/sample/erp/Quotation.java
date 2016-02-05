package com.sample.erp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Quotation {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String client;
	private String season;
	private String style;
	private String description;
	private String currency;
	private double grossProfitRate;

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public String getClient() {
		return this.client;
	}

	public void setClient(final String client) {
		this.client = client;
	}

	public String getSeason() {
		return this.season;
	}

	public void setSeason(final String season) {
		this.season = season;
	}

	public String getStyle() {
		return this.style;
	}

	public void setStyle(final String style) {
		this.style = style;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(final String description) {
		this.description = description;
	}

	public String getCurrency() {
		return this.currency;
	}

	public void setCurrency(final String currency) {
		this.currency = currency;
	}

	public double getGrossProfitRate() {
		return this.grossProfitRate;
	}

	public void setGrossProfitRate(final double grossProfitRate) {
		this.grossProfitRate = grossProfitRate;
	}

}
