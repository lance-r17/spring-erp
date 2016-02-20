import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { WrapIcons, Badge, Label } from '../controls';

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
			from: {
				name: 'Lucy',
				avatarUrl: 'img/av4.png'
			},
			subject: 'Lucy sent you a message',
			since: '30 minutes ago'
		}
	},
	{
		id: 4,
		message: {
			from: {
				name: 'Jackson',
				avatarUrl: 'img/av3.png'
			},
			subject: 'Jackson sent you a message',
			since: '40 minutes ago'
		}
	},
	{
		id: 5,
		message: {
			icon: 'comment',
			subject: 'New comments waiting approval',
			since: '15 minutes ago'
		}
	},
	{
		id: 6,
		message: {
			icon: 'hdd',
			subject: 'HDD is full',
			since: '50 minutes ago',
			badge: {
				content: '90%',
				color: 'success'
			}
		}
	},
	{
		id: 7,
		message: {
			icon: 'word',
			subject: 'Write a news article',
			since: 'Last Update 8 hours ago'
		}
	},
	{
		id: 8,
		message: {
			icon: 'user',
			subject: 'New User Registered',
			since: '4 minutes ago',
			label: {
				content: 'New',
				color: 'danger'
			}
		}
	},
	{
		id: 9,
		message: {
			from: {
				name: 'Jackson',
				avatarUrl: 'img/av3.png'
			},
			subject: 'Jackson sent you a message',
			since: 'Yesterday'
		}
	}
];

const mega = {
	news: {
		subject: 'Weekend shopping',
		content: 'Members get <span className="text-lg text-bold">50%</span> more points. Lorem ipsum dolor sit amet!'
	},
	cols: [
		{
			rows: [
				{
					header: {
						name: 'Pages'
					}
				},
				{
					link: {
						name: 'Profile',
						href: '#'
					}
				},
				{
					link: {
						name: 'Search Result',
						href: '#'
					}
				},
				{
					link: {
						name: 'FAQ',
						href: '#'
					}
				},
				{
					link: {
						name: 'Screen Lock',
						href: '#'
					}
				},
				{
					link: {
						name: 'Disabled',
						href: '#',
						disabled: true
					}
				},
				{
					divider: {}
				},
				{
					header: {
						name: 'Icons'
					}
				},
				{
					link: {
						name: 'Font Awesome',
						href: '#',
						badge: {
							content: '479',
							color: 'purple'
						}
					}
				},
				{
					link: {
						name: 'Skycons',
						href: '#'
					}
				}
			]
		},
		{
			rows: [
				{
					header: {
						name: 'Mailbox'
					}
				},
				{
					link: {
						name: 'Indox',
						href: '#',
						label: {
							content: 'Hot',
							color: 'danger'
						}
					}
				},
				{
					link: {
						name: 'Read Message',
						href: '#'
					}
				},
				{
					link: {
						name: 'Compose',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					header: {
						name: 'Featured'
					}
				},
				{
					link: {
						name: 'Smart navigation',
						href: '#'
					}
				},
				{
					link: {
						name: 'Exclusive plugins',
						href: '#',
						badge: {
							content: '6',
							color: 'success'
						}
					}
				},
				{
					link: {
						name: 'Lot of themes',
						href: '#'
					}
				},
				{
					link: {
						name: 'Transition effects',
						href: '#'
					}
				}
			]
		},
		{
			rows: [
				{
					header: {
						name: 'Components'
					},
				},
				{
					link: {
						name: 'Tables',
						href: '#'
					}
				},
				{
					link: {
						name: 'Charts',
						href: '#'
					}
				},
				{
					link: {
						name: 'Forms',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					widget: {
						type: 'newsletter'
					}
				}
			]
		}
	]
};

const languages = [
	{
		id: 'EN',
		name: 'English',
		flagUrl: 'img/flags/united-kingdom.png',
		active: true
	},
	{
		id: 'FR',
		name: 'Fran&ccedil;ais',
		flagUrl: 'img/flags/france.png'
	},
	{
		id: 'DE',
		name: 'Deutsch',
		flagUrl: 'img/flags/germany.png'
	},
	{
		id: 'IT',
		name: 'Italiano',
		flagUrl: 'img/flags/italy.png'
	},
	{
		id: 'ES',
		name: 'Espa&ntilde;ol',
		flagUrl: 'img/flags/spain.png'
	}
];

const user = {
	id: 1,
	role: 'Manager',
	firstName: 'John',
	lastName: 'Doe',
	avatarUrl: 'img/av1.png',
	setting: {
		label: {
			content: 'New',
			color: 'success'
		}
	}
};

// tag::nav-bar[]
var NavBar = React.createClass({
	render: function () {
		return (
			<header id="navbar">
				<div id="navbar-container" className="boxed">

					<NavBarBrand brandName="Spring ERP" />

					<NavBarContent notifications={notifications} mega={mega} languages={languages} user={user} />

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
				<NavBarDropdownMain notifications={this.props.notifications} mega={this.props.mega} />

				<NavBarDropdownSlave languages={this.props.languages} user={user} />
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
				<li classNamee="tgl-menu-btn">
					<a className="mainnav-toggle" href="#">
						<i className="fa fa-navicon fa-lg"></i>
					</a>
				</li>


				{/* notification dropdown */}
				<NotificationDropdown notifications={this.props.notifications} />

				{/* Mega menu dropdown */}
				<MegaMenuDropdown mega={this.props.mega} />
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
				<LanguageDropdown languages={this.props.languages} />


				{/* User dropdown */}
				<UserDropdown user={this.props.user} />

			</ul>
		)
	}
});
// end::nav-bar-dropdown-slave[]


// tag::notification-dropdown[]
var NotificationDropdown = React.createClass({
	render: function() {
		var length = this.props.notifications.length;
		var options = { color: 'danger', content: length, header: true };
		var badgeEl = length > 0 ? <Badge options={options} /> : null;


		return (
			<li className="dropdown">
				<a href="#" data-toggle="dropdown" className="dropdown-toggle">
					<i className="fa fa-bell fa-lg"></i>
					{badgeEl}
				</a>

				{/* Notification dropdown menu */}
				<NotificationDropdownMenu notifications={this.props.notifications} />
			</li>
		)
	}
});
// end::notification-dropdown[]


// tag::notification-dropdown-menu[]
var NotificationDropdownMenu = React.createClass({
	render: function() {

		return (
			<div className="dropdown-menu dropdown-menu-md">
				<div className="pad-all bord-btm">
					<p className="text-lg text-muted text-semibold mar-no">You have {this.props.notifications.length} notifications.</p>
				</div>
				<div className="nano scrollable">
					<div className="nano-content">
						<NotificationDropdownList notifications={this.props.notifications} />
					</div>
				</div>

				{/* Dropdown footer */}
				<div className="pad-all bord-top">
					<a href="#" className="btn-link text-dark box-block">
						<i className="fa fa-angle-right fa-lg pull-right"></i>Show All Notifications
					</a>
				</div>
			</div>
		)
	}
});
// end::notification-dropdown-menu[]


// tag::notification-dropdown-list[]
var NotificationDropdownList = React.createClass({
	render: function () {
		var notificationListEl = [];
		this.props.notifications.forEach(notification => {
			notificationListEl.push(<NotificationDropdownItem key={"notification-" + notification.id} notification={notification} />)
		});
		return (
			<ul className="head-list">
				{/*  notification list */}
				{notificationListEl}
			</ul>
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
		var options = {};
		if (message.badge) {
			_.extend(options, message.badge, {right: true});
			highlightEl = <Badge options={options} />
		} else if (message.label) {
			_.extend(options, message.label, {right: true});
			highlightEl = <Label options={options} />
		}

		var imgEl = null;
		if (message.icon) {
			imgEl = WrapIcons[message.icon];
		} else if (message.from) {
			imgEl = <img src={message.from.avatarUrl} alt="Profile Picture" className="img-circle img-sm" />
		}

		return (
			<a href="#" className="media">
				{highlightEl}
				<div className="media-left">
					{imgEl}
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

// tag::mega-menu-dropdown[]
var MegaMenuDropdown = React.createClass({
	getInitialState: function() {
		return (
			{
				maxCols: 3
			}
		);
	},
	render: function() {
		var colEls = [];
		var i = 0;
		if (this.props.mega.news) {
			var colEl = (
				<div className="col-sm-12 col-md-3" key={'mega-col-' + i}>
					<MegaMenuNewsWidget news={this.props.mega.news} />
				</div>
			)
			colEls.push(colEl);
		}
		if (this.props.mega.cols) {

			this.props.mega.cols.forEach(col => {
				if (++i > this.state.maxCols) {
					return;
				}
				var colEl = (
					<div className='col-sm-4 col-md-3' key={'mega-col-' + i}>
						<MegaMenuColList rows={col.rows} />
					</div>
				)
				colEls.push(colEl);
			})
		}
		return (
			<li className="mega-dropdown">
				<a href="#" className="mega-dropdown-toggle">
					<i className="fa fa-th-large fa-lg"></i>
				</a>
				<div className="dropdown-menu mega-dropdown-menu">
					<div className="clearfix">
						{colEls}
					</div>
				</div>
			</li>
		)
	}
});
// end::mega-menu-dropdown[]

// tag::mega-menu-news-widget[]
var MegaMenuNewsWidget = React.createClass({
	render: function() {
		return (
			<div className="text-center bg-purple pad-all">
				<h3 className="text-thin mar-no">{this.props.news.subject}</h3>
				<div className="pad-ver box-inline">
					<span className="icon-wrap icon-wrap-lg icon-circle bg-trans-light">
						<i className="fa fa-shopping-cart fa-4x"></i>
					</span>
				</div>
				<p className="pad-btm">
					{this.props.news.content}
				</p>
				<a href="#" className="btn btn-purple">Learn More...</a>
			</div>
		)
	}
});
// end::mega-menu-news-widget[]

// tag::mega-menu-col-list[]
var MegaMenuColList = React.createClass({
	createHeader: function(name, key) {
		return (
			<li key={key} className="dropdown-header">{name}</li>
		)
	},
	createLink: function(link, key) {
		var className = link.disabled ? 'disabled' : '';
		var highlightEl = null;
		var options = {}
		if (link.badge) {
			_.extend(options, link.badge, {right: true});
			highlightEl = <Badge options={options} />
		} else if (link.label) {
			_.extend(options, link.label, {right: true});
			highlightEl = <Label options={options} />
		}

		return (
			<li key={key}>
				<a href={link.href} className={className}>
					{highlightEl}
					{link.name}
				</a>
			</li>
		)
	},
	createDivider: function(key) {
		return <li key={key} className="divider"></li>;
	},
	render: function() {
		var rowEls = [];
		var i = 0;
		if (this.props.rows) {
			this.props.rows.forEach(row => {
				var rowEl = null;
				var key = 'mega-row-' + i++;
				if (row.header) {
					rowEl = this.createHeader(row.header.name, key);
				} else if (row.link) {
					rowEl = this.createLink(row.link, key);
				} else if (row.divider) {
					rowEl = this.createDivider(key);
				} else if (row.widget) {

				}

				rowEls.push(rowEl);
			});
		}

		return (
			<ul className="list-unstyled">
				{rowEls}
			</ul>
		)
	}
});
// end::mega-menu-col-list[]

// tag::language[]

// tag::language-dropdown[]
var LanguageDropdown = React.createClass({
	render: function() {
		var langSelected = _.find(this.props.languages, {active: true});
		return (
			<li className="dropdown">
				<a id="demo-lang-switch" className="lang-selector dropdown-toggle" href="#" data-toggle="dropdown">
					<span className="lang-selected">
						<img className="lang-flag" src={langSelected.flagUrl} alt={langSelected.name} />
						<span className="lang-id">{langSelected.id}</span>
						<span className="lang-name">{langSelected.name}</span>
					</span>
				</a>

				{/* Language selector menu */}
				<LanguageOptionList languages={this.props.languages} />
			</li>
		)
	}
});
// end::language-dropdown[]

// tag::language-option-list[]
var LanguageOptionList = React.createClass({
	render: function() {
		var langEls = [];
		this.props.languages.forEach(language => {
			var langEl = (
				<li key={'lan-' + language.id}>
					<LanguageOptionItem language={language} />
				</li>
			)
			langEls.push(langEl);
		});
		return (
			<ul className="head-list dropdown-menu">
				{langEls}
			</ul>
		)
	}
});
// end::language-option-list[]

// tag::language-option-item[]
var LanguageOptionItem = React.createClass({
	render: function() {
		var language = this.props.language;
		var className = language.active ? 'active' : '';
		return (
			<a href="#" className={className}>
				<img className="lang-flag" src={language.flagUrl} alt={language.name} />
				<span className="lang-id">{language.id}</span>
				<span className="lang-name">{language.name}</span>
			</a>
		)
	}
});
// end::language-option-item[]

// end::language[]

// tag::user[]

// tag::user-dropdown[]
var UserDropdown = React.createClass({
	render: function () {
		var user = this.props.user;
		return (
			<li id="dropdown-user" className="dropdown">
				<a href="#" data-toggle="dropdown" className="dropdown-toggle text-right">
					<span className="pull-right">
						<img className="img-circle img-user media-object" src={user.avatarUrl} alt="Profile Picture" />
					</span>
					<div className="username hidden-xs">{user.firstName} {user.lastName}</div>
				</a>

				<UserMenu user={user} />

			</li>
		)
	}
});
// end::user-dropdown[]

// tag::user-menu[]
var UserMenu = React.createClass({
	render: function () {
		var user = this.props.user;
		return (
			<div className="dropdown-menu dropdown-menu-md dropdown-menu-right panel-default">

				{/* Dropdown heading */}
				<div className="pad-all bord-btm">
					<p className="text-lg text-muted text-semibold mar-no">{user.role}</p>
				</div>

				{/*  User dropdown menu  */}
				<ul className="head-list">
					<li>
						<UserProfile profile={user.profile} />
					</li>

					<li>
						<UserSetting setting={user.setting} />
					</li>

					<li>
						<UserHelp help={user.help} />
					</li>

					<li>
						<UserLock />
					</li>
				</ul>

				{/*  Dropdown footer  */}
				<div className="pad-all text-right">
					<a href="/logout" className="btn btn-primary">
						<i className="fa fa-sign-out fa-fw"></i> Logout
					</a>
				</div>
			</div>
		)
	}
});
// end::user-menu[]

// tag::user-profile[]
var UserProfile = React.createClass({
	render: function () {
		var profile = this.props.profile;
		var highlightEl = null;
		if (profile) {
			var options = {}
			 if (profile.badge) {
				_.extend(options, profile.badge, {right: true});
				highlightEl = <Badge options={options} />
			} else if (profile.label) {
				 _.extend(options, profile.label, {right: true});
				 highlightEl = <Label options={options} />
			 }
		}
		return (
			<a href="#">
				{highlightEl}
				<i className="fa fa-user fa-fw fa-lg"></i> Profile
			</a>
		)
	}
});
// end::user-profile[]

// tag::user-setting[]
var UserSetting = React.createClass({
	render: function () {
		var setting = this.props.setting;
		var highlightEl = null;
		if (setting) {
			var options = {}
			if (setting.badge) {
				_.extend(options, setting.badge, {right: true});
				highlightEl = <Badge options={options} />
			} else if (setting.label) {
				_.extend(options, setting.label, {right: true});
				highlightEl = <Label options={options} />
			}
		}
		return (
			<a href="#">
				{highlightEl}
				<i className="fa fa-gear fa-fw fa-lg"></i> Settings
			</a>
		)
	}
});
// end::user-setting[]

// tag::user-help[]
var UserHelp = React.createClass({
	render: function () {
		var help = this.props.help;
		var highlightEl = null;
		if (help) {
			var options = {}
			if (help.badge) {
				_.extend(options, help.badge, {right: true});
				highlightEl = <Badge options={options} />
			} else if (help.label) {
				_.extend(options, help.label, {right: true});
				highlightEl = <Label options={options} />
			}
		}
		return (
			<a href="#">
				{highlightEl}
				<i className="fa fa-question-circle fa-fw fa-lg"></i> Help
			</a>
		)
	}
});
// end::user-help[]

// tag::user-lock[]
var UserLock = React.createClass({
	render: function () {
		return (
			<a href="#">
				<i className="fa fa-lock fa-fw fa-lg"></i> Lock screen
			</a>
		)
	}
});
// end::user-lock[]

// end::user[]

module.exports = NavBar;
