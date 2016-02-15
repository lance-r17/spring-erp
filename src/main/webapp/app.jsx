import React from 'react'
import { findDOMNode, render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'
import when from 'when'
import client from './client'
import follow from './follow'
import stompClient from './websocket-listener'
import './less/nifty.less'

define(function (require){
	'use strict';
	
	// tag::vars[]
	var	root = '/api';
	// end::vars[]

	// tag::app[]
	var App = React.createClass({
		render: function () {
			return (
				<div id="container" className="effect mainnav-lg">
					{/* tag::NAVBAR[] */}
					{/* =================================================== */}
					<header id="navbar">
						<div id="navbar-container" className="boxed">

							{/* tag::brand-logo-name[] */}
							{/* ================================ */}
							<div className="navbar-header">
								<a href="index.html" className="navbar-brand">
									<img src="img/logo.png" alt="Spring ERP Logo" className="brand-icon" />
									<div className="brand-title">
										<span className="brand-text">Spring ERP</span>
									</div>
								</a>
							</div>
							{/* ================================ */}
							{/* end::brand-logo-name[] */}


							{/* Navbar Dropdown */}
							{/* ================================ */}
							<div className="navbar-content clearfix">
								<ul className="nav navbar-top-links pull-left">

									{/* Navigation toogle button */}
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									<li className="tgl-menu-btn">
										<a className="mainnav-toggle" href="#">
											<i className="fa fa-navicon fa-lg"></i>
										</a>
									</li>
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									{/* End Navigation toogle button */}


									{/* Messages Dropdown */}
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									<li className="dropdown">
										<a href="#" data-toggle="dropdown" className="dropdown-toggle">
											<i className="fa fa-envelope fa-lg"></i>
											<span className="badge badge-header badge-warning">9</span>
										</a>

										{/* Message dropdown menu */}
										<div className="dropdown-menu dropdown-menu-md with-arrow">
											<div className="pad-all bord-btm">
												<p className="text-lg text-muted text-thin mar-no">You have 3 messages.</p>
											</div>
											<div className="nano scrollable">
												<div className="nano-content">
													<ul className="head-list">
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
																<div className="media-left">
																	<img src="img/av2.png" alt="Profile Picture" className="img-circle img-sm" />
																</div>
																<div className="media-body">
																	<div className="text-nowrap">Andy sent you a message</div>
																	<small className="text-muted">15 minutes ago</small>
																</div>
															</a>
														</li>
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
																<div className="media-left">
																	<img src="img/av4.png" alt="Profile Picture" className="img-circle img-sm" />
																</div>
																<div className="media-body">
																	<div className="text-nowrap">Lucy sent you a message</div>
																	<small className="text-muted">30 minutes ago</small>
																</div>
															</a>
														</li>
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
																<div className="media-left">
																	<img src="img/av3.png" alt="Profile Picture" className="img-circle img-sm" />
																</div>
																<div className="media-body">
																	<div className="text-nowrap">Jackson sent you a message</div>
																	<small className="text-muted">40 minutes ago</small>
																</div>
															</a>
														</li>
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
																<div className="media-left">
																	<img src="img/av6.png" alt="Profile Picture" className="img-circle img-sm" />
																</div>
																<div className="media-body">
																	<div className="text-nowrap">Donna sent you a message</div>
																	<small className="text-muted">5 hours ago</small>
																</div>
															</a>
														</li>
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
																<div className="media-left">
																	<img src="img/av4.png" alt="Profile Picture" className="img-circle img-sm" />
																</div>
																<div className="media-body">
																	<div className="text-nowrap">Lucy sent you a message</div>
																	<small className="text-muted">Yesterday</small>
																</div>
															</a>
														</li>
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
																<div className="media-left">
																	<img src="img/av3.png" alt="Profile Picture" className="img-circle img-sm" />
																</div>
																<div className="media-body">
																	<div className="text-nowrap">Jackson sent you a message</div>
																	<small className="text-muted">Yesterday</small>
																</div>
															</a>
														</li>
													</ul>
												</div>
											</div>

											{/* Dropdown footer */}
											<div className="pad-all bord-top">
												<a href="#" className="btn-link text-dark box-block">
													<i className="fa fa-angle-right fa-lg pull-right"></i>Show All Messages
												</a>
											</div>
										</div>
									</li>
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									{/* End message dropdown */}


									{/* Notification dropdown */}
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									<li className="dropdown">
										<a href="#" data-toggle="dropdown" className="dropdown-toggle">
											<i className="fa fa-bell fa-lg"></i>
											<span className="badge badge-header badge-danger">5</span>
										</a>

										{/* Notification dropdown menu */}
										<div className="dropdown-menu dropdown-menu-md with-arrow">
											<div className="pad-all bord-btm">
												<p className="text-lg text-muted text-thin mar-no">You have 3 messages.</p>
											</div>
											<div className="nano scrollable">
												<div className="nano-content">
													<ul className="head-list">

														{/*  Dropdown list */}
														<li>
															<a href="#">
																<div className="clearfix">
																	<p className="pull-left">Database Repair</p>
																	<p className="pull-right">70%</p>
																</div>
																<div className="progress progress-sm">
																	<div style={{width: "70%"}} className="progress-bar">
																		<span className="sr-only">70% Complete</span>
																	</div>
																</div>
															</a>
														</li>

														{/*  Dropdown list */}
														<li>
															<a href="#">
																<div className="clearfix">
																	<p className="pull-left">Upgrade Progress</p>
																	<p className="pull-right">10%</p>
																</div>
																<div className="progress progress-sm">
																	<div style={{width: "10%"}} className="progress-bar progress-bar-warning">
																		<span className="sr-only">10% Complete</span>
																	</div>
																</div>
															</a>
														</li>
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
																<div className="media-left">
																	<span className="icon-wrap icon-circle bg-primary">
																		<i className="fa fa-comment fa-lg"></i>
																	</span>
																</div>
																<div className="media-body">
																	<div className="text-nowrap">New comments waiting approval</div>
																	<small className="text-muted">15 minutes ago</small>
																</div>
															</a>
														</li>
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
														<span className="badge badge-success pull-right">90%</span>
																<div className="media-left">
																	<span className="icon-wrap icon-circle bg-danger">
																		<i className="fa fa-hdd-o fa-lg"></i>
																	</span>
																</div>
																<div className="media-body">
																	<div className="text-nowrap">HDD is full</div>
																	<small className="text-muted">50 minutes ago</small>
																</div>
															</a>
														</li>
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
																<div className="media-left">
																	<span className="icon-wrap bg-info">
																		<i className="fa fa-file-word-o fa-lg"></i>
																	</span>
																</div>
																<div className="media-body">
																	<div className="text-nowrap">Write a news article</div>
																	<small className="text-muted">Last Update 8 hours ago</small>
																</div>
															</a>
														</li>
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
														<span className="label label-danger pull-right">New</span>
																<div className="media-left">
																	<span className="icon-wrap bg-purple">
																		<i className="fa fa-comment fa-lg"></i>
																	</span>
																</div>
																<div className="media-body">
																	<div className="text-nowrap">Comment Sorting</div>
																	<small className="text-muted">Last Update 8 hours ago</small>
																</div>
															</a>
														</li>
												
														{/*  Dropdown list */}
														<li>
															<a href="#" className="media">
																<div className="media-left">
																	<span className="icon-wrap bg-success">
																		<i className="fa fa-user fa-lg"></i>
																	</span>
																</div>
																<div className="media-body">
																	<div className="text-nowrap">New User Registered</div>
																	<small className="text-muted">4 minutes ago</small>
																</div>
															</a>
														</li>
													</ul>
												</div>
											</div>

											{/* Dropdown footer */}
											<div className="pad-all bord-top">
												<a href="#" className="btn-link text-dark box-block">
													<i className="fa fa-angle-right fa-lg pull-right"></i>Show All Notifications
												</a>
											</div>
										</div>
									</li>
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									{/* End notifications dropdown */}



									{/* Mega dropdown */}
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									<li className="mega-dropdown">
										<a href="#" className="mega-dropdown-toggle">
											<i className="fa fa-th-large fa-lg"></i>
										</a>
										<div className="dropdown-menu mega-dropdown-menu">
											<div className="clearfix">
												<div className="col-sm-12 col-md-3">

													{/* Mega menu widget */}
													<div className="text-center bg-purple pad-all">
														<h3 className="text-thin mar-no">Weekend shopping</h3>
														<div className="pad-ver box-inline">
															<span className="icon-wrap icon-wrap-lg icon-circle bg-trans-light">
																<i className="fa fa-shopping-cart fa-4x"></i>
															</span>
														</div>
														<p className="pad-btm">
															Members get <span className="text-lg text-bold">50%</span> more points. Lorem ipsum dolor sit amet!
														</p>
														<a href="#" className="btn btn-purple">Learn More...</a>
													</div>

												</div>
												<div className="col-sm-4 col-md-3">

													{/* Mega menu list */}
													<ul className="list-unstyled">
														<li className="dropdown-header">Pages</li>
														<li><a href="#">Profile</a></li>
														<li><a href="#">Search Result</a></li>
														<li><a href="#">FAQ</a></li>
														<li><a href="#">Sreen Lock</a></li>
														<li><a href="#" className="disabled">Disabled</a></li>
														<li className="divider"></li>
														<li className="dropdown-header">Icons</li>
														<li><a href="#"><span className="pull-right badge badge-purple">479</span> Font Awesome</a></li>
														<li><a href="#">Skycons</a></li>
													</ul>

												</div>
												<div className="col-sm-4 col-md-3">

													{/* Mega menu list */}
													<ul className="list-unstyled">
														<li className="dropdown-header">Mailbox</li>
														<li><a href="#"><span className="pull-right label label-danger">Hot</span>Indox</a></li>
														<li><a href="#">Read Message</a></li>
														<li><a href="#">Compose</a></li>
														<li className="divider"></li>
														<li className="dropdown-header">Featured</li>
														<li><a href="#">Smart navigation</a></li>
														<li><a href="#"><span className="pull-right badge badge-success">6</span>Exclusive plugins</a></li>
														<li><a href="#">Lot of themes</a></li>
														<li><a href="#">Transition effects</a></li>
													</ul>

												</div>
												<div className="col-sm-4 col-md-3">

													{/* Mega menu list */}
													<ul className="list-unstyled">
														<li className="dropdown-header">Components</li>
														<li><a href="#">Tables</a></li>
														<li><a href="#">Charts</a></li>
														<li><a href="#">Forms</a></li>
														<li className="divider"></li>
														<li>
															<form role="form" className="form">
																<div className="form-group">
																	<label className="dropdown-header" htmlFor="demo-megamenu-input">Newsletter</label>
																	<input id="demo-megamenu-input" type="email" placeholder="Enter email" className="form-control" />
																</div>
																<button className="btn btn-primary btn-block" type="submit">Submit</button>
															</form>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</li>
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									{/* End mega dropdown */}

								</ul>
								<ul className="nav navbar-top-links pull-right">

									{/* Language selector */}
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									<li className="dropdown">
										<a id="demo-lang-switch" className="lang-selector dropdown-toggle" href="#" data-toggle="dropdown">
											<span className="lang-selected">
												<img className="lang-flag" src="img/flags/united-kingdom.png" alt="English" />
												<span className="lang-id">EN</span>
												<span className="lang-name">English</span>
											</span>
										</a>

										{/* Language selector menu */}
										<ul className="head-list dropdown-menu with-arrow">
											<li>
												{/* English */}
												<a href="#" className="active">
													<img className="lang-flag" src="img/flags/united-kingdom.png" alt="English" />
													<span className="lang-id">EN</span>
													<span className="lang-name">English</span>
												</a>
											</li>
											<li>
												{/* France */}
												<a href="#">
													<img className="lang-flag" src="img/flags/france.png" alt="France" />
													<span className="lang-id">FR</span>
													<span className="lang-name">Fran&ccedil;ais</span>
												</a>
											</li>
											<li>
												{/* Germany */}
												<a href="#">
													<img className="lang-flag" src="img/flags/germany.png" alt="Germany" />
													<span className="lang-id">DE</span>
													<span className="lang-name">Deutsch</span>
												</a>
											</li>
											<li>
												{/* Italy */}
												<a href="#">
													<img className="lang-flag" src="img/flags/italy.png" alt="Italy" />
													<span className="lang-id">IT</span>
													<span className="lang-name">Italiano</span>
												</a>
											</li>
											<li>
												{/* Spain */}
												<a href="#">
													<img className="lang-flag" src="img/flags/spain.png" alt="Spain" />
													<span className="lang-id">ES</span>
													<span className="lang-name">Espa&ntilde;ol</span>
												</a>
											</li>
										</ul>
									</li>
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									{/* End language selector */}



									{/* User dropdown */}
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									<li id="dropdown-user" className="dropdown">
										<a href="#" data-toggle="dropdown" className="dropdown-toggle text-right">
											<span className="pull-right">
												<img className="img-circle img-user media-object" src="img/av1.png" alt="Profile Picture" />
											</span>
											<div className="username hidden-xs">John Doe</div>
										</a>


										<div className="dropdown-menu dropdown-menu-md dropdown-menu-right with-arrow panel-default">

											{/*  Dropdown heading  */}
											<div className="pad-all bord-btm">
												<p className="text-lg text-muted text-thin mar-btm">750Gb of 1,000Gb Used</p>
												<div className="progress progress-sm">
													<div className="progress-bar" style={{width: "70%"}}>
														<span className="sr-only">70%</span>
													</div>
												</div>
											</div>


											{/*  User dropdown menu  */}
											<ul className="head-list">
												<li>
													<a href="#">
														<i className="fa fa-user fa-fw fa-lg"></i> Profile
													</a>
												</li>
												<li>
													<a href="#">
														<span className="badge badge-danger pull-right">9</span>
														<i className="fa fa-envelope fa-fw fa-lg"></i> Messages
													</a>
												</li>
												<li>
													<a href="#">
														<span className="label label-success pull-right">New</span>
														<i className="fa fa-gear fa-fw fa-lg"></i> Settings
													</a>
												</li>
												<li>
													<a href="#">
														<i className="fa fa-question-circle fa-fw fa-lg"></i> Help
													</a>
												</li>
												<li>
													<a href="#">
														<i className="fa fa-lock fa-fw fa-lg"></i> Lock screen
													</a>
												</li>
											</ul>

											{/*  Dropdown footer  */}
											<div className="pad-all text-right">
												<a href="/logout" className="btn btn-primary">
													<i className="fa fa-sign-out fa-fw"></i> Logout
												</a>
											</div>
										</div>
									</li>
									{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
									{/* End user dropdown */}

								</ul>
							</div>
							{/* ================================ */}
							{/* End Navbar Dropdown */}

						</div>
					</header>
					{/* =================================================== */}
					{/* end::NAVBAR[] */}
					<ul>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/employees">Employees</Link></li>
					</ul>
					{this.props.children}
				</div>
			)
		}
	});
	// end::app[]

	// tag::about[]
    var About = React.createClass({
        render: function() {
            return (
                <h3>
                    About Spring ERP
                </h3>
            )
        }
    });
    // end::about[]

	// tag::employees[]
	var Employees = React.createClass({
		// tag::follow-2[]
		loadFromServer: function(pageSize) {
			follow(client, root, [{rel: 'employees', params:{size: pageSize}}]
			).then(employeeCollection => {
				return client({
					method: 'GET',
					path: employeeCollection.entity._links.profile.href,
					headers: {'Accept': 'application/schema+json'}
				}).then(schema => {
					Object.keys(schema.entity.properties).forEach(property => {
						if (schema.entity.properties[property].hasOwnProperty('format') && 
							schema.entity.properties[property].format === 'uri') {
							delete schema.entity.properties[property];
						}
						if (schema.entity.properties[property].hasOwnProperty('$ref')) {
							delete schema.entity.properties[property];
						}
					});
					this.schema = schema.entity;
                    this.links = employeeCollection.entity._links;
					return employeeCollection;
				});
			}).then(employeeCollection => {
				this.page = employeeCollection.entity.page;
				return employeeCollection.entity._embedded.employees.map(employee =>
					client({
						method: 'GET',
						path: employee._links.self.href
					})
				);
			}).then(employeePromises => {
				return when.all(employeePromises);
			}).done(employees => {
				this.setState({
					page: this.page,
					employees: employees,
					attributes: Object.keys(this.schema.properties),
					pageSize: pageSize,
					links: this.links
				});
			});
		},
		// end::follow-2[]
		// tag::create[]
		onCreate: function (employee) {
			follow(client, root, ['employees']
			).done(response => {
				return client({
					method: 'POST',
					path: response.entity._links.self.href,
					entity: employee,
					headers: {'Content-Type': 'application/json'}
				})
			})
		},
		// end::create[]
        // tag::update[]
        onUpdate: function(employee, updatedEmployee) {
            client({
                method: 'PUT',
                path: employee.entity._links.self.href,
                entity: updatedEmployee,
                headers: {
                    'Content-Type': 'application/json',
                    'If-Match': employee.headers.Etag
                }
            }).done(response => {
                /* Let the websocket handler update the state */
            }, response => {
            	if (response.status.code === 403) {
            		alert('ACCESS DENIED: You are not authorized to update ' + employee.entity._links.self.href);
            	}
                if (response.status.code === 412) {
                    alert('DENIED: Unable to update ' + employee.entity._links.self.href + '. Your copy is stale.');
                }
            });
        },
        // end::update[]
		// tag::delete[]
		onDelete: function (employee) {
			client({
				method: 'DELETE',
				path: employee.entity._links.self.href
			}).done(response => {
				/* let the websocket handle updating the UI */
			}, response => {
				if (response.status.code === 403) {
					alert('ACCESS DENIED: You are not authorized to delete ' + employee.entity._links.self.href);
				}
			});
		},
		// end::delete[]
		// tag::navigate[]
		onNavigate: function(navUri) {
			client({
				method: 'GET',
				path: navUri
			}).then(employeeCollection => {
                this.links = employeeCollection.entity._links;
                this.page = employeeCollection.entity.page;

                return employeeCollection.entity._embedded.employees.map(employee =>
                    client({
                        method: 'GET',
                        path: employee._links.self.href
                    })
                );
            }).then(employeePromises => {
                return when.all(employeePromises);
            }).done(employees => {
				this.setState({
					page: this.page,
					employees: employees,
					attributes: Object.keys(this.schema.properties),
					pageSize: this.state.pageSize,
					links: this.links
				})
			})
		},
		// end::navigate[]
		// tag::update-page-size[]
		updatePageSize: function(pageSize) {
			if (this.state.pageSize !== pageSize) {
				this.loadFromServer(pageSize);
			}
		},
		// end::update-page-size[]
		// tag::refresh-and-go-to-last-page[]
		refreshAndGoToLastPage: function() {
			follow(client, root, [{
				rel: 'employees',
				params: {size: this.state.pageSize}
			}]).done(response => {
				this.onNavigate(response.entity._links.last.href);
			});
		},
		// end::refresh-and-go-to-last-page[]
		// tag::refresh-current-page[]
		refreshCurrentPage: function() {
			follow(client, root, [{
				rel: 'employees',
				params: {
					size: this.state.pageSize,
					page: this.state.page.number
				}
			}]).then(employeeCollection => {
				this.links = employeeCollection.entity._links;
				this.page = employeeCollection.entity.page;

				return employeeCollection.entity._embedded.employees.map(employee => {
					return client({
						method: 'GET',
						path: employee._links.self.href
					})
				});
			}).then(employeePromises => {
				return when.all(employeePromises);
			}).done(employees => {
				this.setState({
					page: this.page,
					employees: employees,
					attributes: Object.keys(this.schema.properties),
					pageSize: this.state.pageSize,
					links: this.links
				})
			});
		},
		// end::refresh-current-page[]
		getInitialState: function() {
			return ({
				employees: [],
				attributes: [],
				pageSize: 2,
				links: {}
			});
		},
		componentDidMount: function() {
			this.loadFromServer(this.state.pageSize);
			stompClient.register([
				{route: '/topic/newEmployee', callback: this.refreshAndGoToLastPage},
				{route: '/topic/updateEmployee', callback: this.refreshCurrentPage},
				{route: '/topic/deleteEmployee', callback: this.refreshCurrentPage}
			]);
		},
		render: function () {
			return (
				<div>
					<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate} />
					<EmployeeList employees={this.state.employees}
                                  attributes={this.state.attributes}
								  links={this.state.links}
								  pageSize={this.state.pageSize}
                                  onUpdate={this.onUpdate}
								  onNavigate={this.onNavigate}
								  onDelete={this.onDelete}
								  updatePageSize={this.updatePageSize} />
				</div>
			)
		}
	});
	// end::employees[]

	// tag::create-dialog[]
	var CreateDialog = React.createClass({

		handleSubmit: function(e) {
			e.preventDefault();

			var newEmployee = {};
			this.props.attributes.forEach(attribute => {
				newEmployee[attribute] = findDOMNode(this.refs[attribute]).value.trim();
			});
			console.log(newEmployee);
			this.props.onCreate(newEmployee);

			// Clear out the dialog's input
			this.props.attributes.forEach(attribute => {
				findDOMNode(this.refs[attribute]).value = '';
			});

			// Navigate away from the dialog to hide it
			// window.location = '#';
		},

		render: function() {
			var inputs = this.props.attributes.map(attribute =>
				<p key={attribute}>
					<input type="text" placeholder={attribute} ref={attribute} className="field"/>
				</p>
			);

			return (
				<div>
					<a href="#createEmployee">Create</a>

					<div id="createEmployee" className="modalDialog">
						<div>
							<a href="#" title="Close" className="close">X</a>

							<h2>Create new employee</h2>

							<form>
								{inputs}
								<button onClick={this.handleSubmit}>Create</button>
							</form>
						</div>
					</div>
				</div>
			)
		}
	});
	// end::create-dialog[]

    // tag::update-dialog[]
    var UpdateDialog = React.createClass({
        handleSubmit: function(e) {
            e.preventDefault();

            var updatedEmployee = {};
            this.props.attributes.forEach(attribute => {
                updatedEmployee[attribute] = findDOMNode(this.refs[attribute]).value.trim();
            });
            this.props.onUpdate(this.props.employee, updatedEmployee);
            // window.location = "#";
        },
        render: function() {
            var inputs = this.props.attributes.map(attribute =>
                <p key={this.props.employee.entity[attribute]}>
                    <input type="text" placeholder={attribute} defaultValue={this.props.employee.entity[attribute]}
                           ref={attribute} className="field"/>
                </p>
            );

            var dialogId = "updateEmployee-" + this.props.employee.entity._links.self.href;

            return (
                <div key={this.props.employee.entity._links.self.href}>
                    <a href={"#" + dialogId}>Update</a>

                    <div id={dialogId} className="modalDialog">
                        <div>
                            <a href="#" title="Close" className="close">X</a>

                            <h2>Update an employee</h2>

                            <form>
                                {inputs}
                                <button onClick={this.handleSubmit}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    });
    // end::update-dialog[]

	// tag::employee-list[]
	var EmployeeList = React.createClass({
		// tag::handle-page-size-update[]
		handleInput: function(e) {
			e.preventDefault();
			var pageSize = findDOMNode(this.refs.pageSize).value;
			if (/^[0-9]+$/.test(pageSize)) {
				this.props.updatePageSize(pageSize);
			} else {
				findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
			}
		},
		// end::handle-page-size-update[]
		// tag::handle-nav[]
		handleNavFirst: function(e) {
			e.preventDefault();
			this.props.onNavigate(this.props.links.first.href);
		},
		handleNavPrev: function(e) {
			e.preventDefault();
			this.props.onNavigate(this.props.links.prev.href);
		},
		handleNavNext: function(e) {
			e.preventDefault();
			this.props.onNavigate(this.props.links.next.href);
		},
		handleNavLast: function(e) {
			e.preventDefault();
			this.props.onNavigate(this.props.links.last.href);
		},
		// end::handle-nav[]
		// tag::employee-list-render[]
		render: function() {
			var employees = this.props.employees.map(employee => 
				<Employee key={employee.entity._links.self.href} employee={employee} attributes={this.props.attributes} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} />
			);

			var navLinks = [];
			if ("first" in this.props.links) {
				navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
			}
			if ("prev" in this.props.links) {
				navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
			}
			if ("next" in this.props.links) {
				navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
			}
			if ("last" in this.props.links) {
				navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
			}

			return (
				<div>
					<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
					<table>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Description</th>
								<th>Manager</th>
                                <th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{employees}
						</tbody>
					</table>
					<div>
						{navLinks}
					</div>
				</div>
			)
		}
		// end::employee-list-render[]
	});
	// end::employee-list[]

	// tag::employee[]
	var Employee = React.createClass({
		handleDelete: function() {
			this.props.onDelete(this.props.employee);
		},
		render: function() {
			return (
				<tr>
					<td>{this.props.employee.entity.firstName}</td>
					<td>{this.props.employee.entity.lastName}</td>
					<td>{this.props.employee.entity.description}</td>
					<td>{this.props.employee.entity.manager.name}</td>
                    <td>
                        <UpdateDialog employee={this.props.employee}
                                      attributes={this.props.attributes}
                                      onUpdate={this.props.onUpdate} />
                    </td>
					<td>
						<button onClick={this.handleDelete}>Delete</button>
					</td>
				</tr>
			)
		}
	});
	// end::employee[]

	// tag::render[]
    // Declarative route configuration (could also load this config lazily
    // instead, all you really need is a single root route, you don't need to
    // colocate the entire config).
    render((
		<Router history={hashHistory} >
			<Route path="/" component={App}>
				<Route path="about" component={About} />
				<Route path="employees" component={Employees} />
			</Route>
		</Router>
	), document.getElementById('react') );
	// end::render[]
});
