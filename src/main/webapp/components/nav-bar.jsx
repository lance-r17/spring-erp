import React from 'react'
import classNames from 'classnames'
import { Icons } from '../controls'

define(function(require) {
	'use strict';

	const messages = [
		{
			id: 1,
			from: {
				name: 'Andy',
				avatarUrl: 'img/av2.png'
			},
			subject: 'Andy sent you a message',
			since: '15 minutes ago'
		},
		{
			id: 2,
			from: {
				name: 'Lucy',
				avatarUrl: 'img/av4.png'
			},
			subject: 'Lucy sent you a message',
			since: '30 minutes ago'
		},
		{
			id: 3,
			from: {
				name: 'Jackson',
				avatarUrl: 'img/av3.png'
			},
			subject: 'Jackson sent you a message',
			since: '40 minutes ago'
		},
		{
			id: 4,
			from: {
				name: 'Donna',
				avatarUrl: 'img/av6.png'
			},
			subject: 'Donna sent you a message',
			since: '5 hours ago'
		},
		{
			id: 5,
			from: {
				name: 'Lucy',
				avatarUrl: 'img/av4.png'
			},
			subject: 'Lucy sent you a message',
			since: 'Yesterday'
		},
		{
			id: 6,
			from: {
				name: 'Jackson',
				avatarUrl: 'img/av3.png'
			},
			subject: 'Jackson sent you a message',
			since: 'Yesterday'
		}
		
	];

	const notifications = [
		{
			id: 1,
			progress: {
                subject: 'Database Repair',
                percentage: '70%'
            }
		}, 
		{
            id: 2,
			progress: {
                subject: 'Upgrade Progress',
                percentage: '10%',
                status: 'warning'
            }
		},
		{
            id: 3,
			message: {
                icon: 'comment',
                subject: 'New comments waiting approval',
                since: '15 minutes ago'
            }
		},
		{
            id: 4,
			message: {
                icon: 'hdd',
                subject: 'HDD is full',
                since: '50 minutes ago',
                highlight: {
                    type: 'badge',
                    content: '90%'
                }
            }
		},
		{
            id: 5,
            message: {
                icon: 'word',
                subject: 'Write a news article',
                since: 'Last Update 8 hours ago'
            }
		},
		{
            id: 6,
            message: {
                icon: 'user',
                subject: 'New User Registered',
                since: '4 minutes ago'
            }
		}
	];

	// tag::nav-bar[]
	var NavBar = React.createClass({
		render: function () {
			return (
				<header id="navbar">
					<div id="navbar-container" className="boxed">

						<NavBarBrand brandName="Spring ERP" />

						<NavBarContent messages={messages} notifications={notifications} />

					</div>
				</header>
			)
		}
	});
	// end::nav-bar[]

	// tag::nav-bar-brand[]
	var NavBarBrand = React.createClass({
		render: function() {
			return (
				<div className="navbar-header">
					<a href="/" className="navbar-brand">
						<img src="img/logo.png" alt={this.props.brandName + " Logo"} className="brand-icon" />
						<div className="brand-title">
							<span className="brand-text">{this.props.brandName}</span>
						</div>
					</a>
				</div>
			)
		}
	});
	// end::nav-bar-brand[]

	// tag::nav-bar-content[]
	var NavBarContent = React.createClass({
		render: function() {
			return (
				<div className="navbar-content clearfix">
					<NavBarDropdownMain messages={this.props.messages} notifications={this.props.notifications} />
					
					<NavBarDropdownSlave />
				</div>
			)
		}
	});
	// end::nav-bar-content[]

	// tag::nav-bar-dropdown-main[]
	var NavBarDropdownMain = React.createClass({
		render: function() {
			return (
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


					{/* message dropdown list */}
					<MessageDropdownList messages={this.props.messages} />


					{/* notification dropdown list */}
					<NotificationDropdownList notifications={this.props.notifications} />



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
			)
		}
	});
	// end::nav-bar-dropdown-main[]

	// tag::nav-bar-dropdown-slave[]
	var NavBarDropdownSlave = React.createClass({
		render: function() {
			return (
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
			)
		}
	});
	// end::nav-bar-dropdown-slave[]

	// tag::messages-dropdown-list[]
	var MessageDropdownList = React.createClass({
		render: function () {
			var messages = this.props.messages;
			var badge = messages.length > 0 ? (<span className="badge badge-header badge-warning">{messages.length}</span>) : "";
			var messageList = [];
			messages.forEach(message => {
				messageList.push(<MessageDropdownItem message={message} key={"message-" + message.id} />)
			});

			return (
				<li className="dropdown">
					<a href="#" data-toggle="dropdown" className="dropdown-toggle">
						<i className="fa fa-envelope fa-lg" />
						{badge}
					</a>
					{/* Message dropdown menu */}
					<div className="dropdown-menu dropdown-menu-md with-arrow">
						<div className="pad-all bord-btm">
							<p className="text-lg text-muted text-thin mar-no">You have {messages.length} messages.</p>
						</div>
						<div className="nano scrollable">
							<div className="nano-content">
								<ul className="head-list">
									{/*  message list */}
									{messageList}
								</ul>
							</div>
						</div>

						{/* Dropdown footer */}
						<div className="pad-all bord-top">
							<a href="#" className="btn-link text-dark box-block">
								<i className="fa fa-angle-right fa-lg pull-right" />Show All Messages
							</a>
						</div>
					</div>
				</li>
			)
		}
	});
	// end::message-dropdown-list[]

	// tag::messag-dropdown-item[]
	var MessageDropdownItem = React.createClass({
		render: function () {
			return (
				<li>
					<a href="#" className="media">
						<div className="media-left">
							<img src={this.props.message.from.avatarUrl} alt="Profile Picture" className="img-circle img-sm" />
						</div>
						<div className="media-body">
							<div className="text-nowrap">{this.props.message.subject}</div>
							<small className="text-muted">{this.props.message.since}</small>
						</div>
					</a>
				</li>
			)
		}
	});
	// end::message-dropdown-item[]

	// tag::notification-dropdown-list[]
	var NotificationDropdownList = React.createClass({
		render: function() {
			var notifications = this.props.notifications;
			var badge = notifications.length > 0 ? (<span className="badge badge-header badge-danger">{notifications.length}</span>) : "";
			var notificationList = [];
			notifications.forEach(notification => {
				notificationList.push(<NotificationDropdownItem key={"notification-" + notification.id} notification={notification} />)
			});

			return (
				<li className="dropdown">
					<a href="#" data-toggle="dropdown" className="dropdown-toggle">
						<i className="fa fa-bell fa-lg" />
						{badge}
					</a>

					{/* Notification dropdown menu */}
					<div className="dropdown-menu dropdown-menu-md with-arrow">
						<div className="pad-all bord-btm">
							<p className="text-lg text-muted text-thin mar-no">You have {notifications.length} messages.</p>
						</div>
						<div className="nano scrollable">
							<div className="nano-content">
								<ul className="head-list">
									{/*  notification list */}
									{notificationList}
								</ul>
							</div>
						</div>

						{/* Dropdown footer */}
						<div className="pad-all bord-top">
							<a href="#" className="btn-link text-dark box-block">
								<i className="fa fa-angle-right fa-lg pull-right" />Show All Notifications
							</a>
						</div>
					</div>
				</li>
			)
		}
	});
	// end::notification-dropdown-list[]

	// tag::notification-dropdown-item[]
	var NotificationDropdownItem = React.createClass({
		render: function () {
			var type = this.props.notification.type;
			var notificatonEL = "";
			if (this.props.notification.progress) {
				notificatonEL = <ProgressNotification progress={this.props.notification.progress} />
			} else if (this.props.notification.message) {
				notificatonEL = <MessageNotification message={this.props.notification.message} />
			}
			return (
				<li>
					{notificatonEL}
				</li>
			)
		}
	});
	// end::notification-dropdown-item[]

	// tag::progress-notification[]
	var ProgressNotification = React.createClass({
		render: function () {
            var progress = this.props.progress;
            var progressClassName = classNames('progress-bar', progress.status ? 'progress-bar-' + progress.status : '');
			return (
				<a href="#">
					<div className="clearfix">
						<p className="pull-left">{progress.subject}</p>
						<p className="pull-right">{progress.percentage}</p>
					</div>
					<div className="progress progress-sm">
						<div style={{width: progress.percentage}} className={progressClassName}>
							<span className="sr-only">{progress.percentage} Complete</span>
						</div>
					</div>
				</a>
			)
		}
	});
	// end::progress-notification[]

	// tag::message-notification[]
	var MessageNotification = React.createClass({
		render: function () {
			var message = this.props.message;
			var highlightEl = null;
			if (message.highlight) {
				if (message.highlight.type === 'badge') {
					highlightEl = <span className="badge badge-success pull-right">{message.highlight.content}</span>
				} else if (message.highlight.type === 'label') {
					highlightEl = <span className="label label-danger pull-right">{message.highlight.content}</span>
				}
			}
			var iconEl = Icons[message.icon];
			return (
				<a href="#" className="media">
					{highlightEl}
					<div className="media-left">
						{iconEl}
					</div>
					<div className="media-body">
						<div className="text-nowrap">{message.subject}</div>
						<small className="text-muted">{message.since}</small>
					</div>
				</a>
			)
		}
	});
	// end::message-notification[]


	return NavBar;
});
