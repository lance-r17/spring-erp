import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import { WrapIcons, Badge, Label, RoleLabels, RoleShortNameLabels } from '../controls';

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

// tag::nav-bar[]
export default class NavBar extends React.Component {
	render() {
		return (
			<header id="navbar">
				<div id="navbar-container" className="boxed">

					<NavBarBrand brandName="Spring ERP" />

					<NavBarContent notifications={notifications} mega={mega} languages={languages} user={this.props.user} />

				</div>
			</header>
		)
	}
}
// end::nav-bar[]

// tag::nav-bar-brand[]
class NavBarBrand  extends React.Component {
	render() {
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
}
// end::nav-bar-brand[]

// tag::nav-bar-content[]
class NavBarContent extends React.Component {
	render() {
		return (
			<div className="navbar-content clearfix">
				<NavBarDropdownMain notifications={this.props.notifications} mega={this.props.mega} />

				<NavBarDropdownSlave languages={this.props.languages} user={this.props.user} />
			</div>
		)
	}
}
// end::nav-bar-content[]

// tag::nav-bar-dropdown-main[]
class NavBarDropdownMain extends React.Component {
	render() {
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
}
// end::nav-bar-dropdown-main[]

// tag::nav-bar-dropdown-slave[]
class NavBarDropdownSlave  extends React.Component {
	render() {
		return (
			<ul className="nav navbar-top-links pull-right">

				{/* Language selector */}
				<LanguageDropdown languages={this.props.languages} />


				{/* User dropdown */}
				<UserDropdown user={this.props.user} />

			</ul>
		)
	}
}
// end::nav-bar-dropdown-slave[]


// tag::notification-dropdown[]
class NotificationDropdown  extends React.Component {
	render() {
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
}
// end::notification-dropdown[]


// tag::notification-dropdown-menu[]
class NotificationDropdownMenu extends React.Component {
	render() {

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
}
// end::notification-dropdown-menu[]


// tag::notification-dropdown-list[]
class NotificationDropdownList extends React.Component {
	render() {
		var notifications = this.props.notifications.map(notification => 
			<NotificationDropdownItem key={"notification-" + notification.id} notification={notification} />
		);
		return (
			<ul className="head-list">
				{/*  notification list */}
				{notifications}
			</ul>
		)
	}
}
// end::notification-dropdown-list[]

// tag::notification-dropdown-item[]
class NotificationDropdownItem extends React.Component {
	render() {
		const { type, progress, message } = this.props.notification;
		var notificaton = null;
		if (progress) {
			notificaton = <ProgressNotification progress={progress} />
		} else if (message) {
			notificaton = <MessageNotification message={message} />
		}
		return (
			<li>
				{notificaton}
			</li>
		)
	}
}
// end::notification-dropdown-item[]

// tag::progress-notification[]
class ProgressNotification extends React.Component {
	render() {
		var { status, subject, percentage } = this.props.progress;
		return (
			<a href="#">
				<div className="clearfix">
					<p className="pull-left">{subject}</p>
					<p className="pull-right">{percentage}</p>
				</div>
				<div className="progress progress-sm">
					<div style={{width: percentage}} className={cx('progress-bar', status ? 'progress-bar-' + status : '')}>
						<span className="sr-only">{percentage} Complete</span>
					</div>
				</div>
			</a>
		)
	}
}
// end::progress-notification[]

// tag::message-notification[]
class MessageNotification extends React.Component {
	render() {
		var { badge, label, icon, from, subject, since} = this.props.message;

		var highlight = null;
		var options = {};
		if (badge) {
			_.extend(options, badge, {right: true});
			highlight = <Badge options={options} />
		} else if (label) {
			_.extend(options, label, {right: true});
			highlight = <Label options={options} />
		}

		var image = null;
		if (icon) {
			image = WrapIcons[icon];
		} else if (from) {
			image = <img src={from.avatarUrl} alt="Profile Picture" className="img-circle img-sm" />
		}

		return (
			<a href="#" className="media">
				{highlight}
				<div className="media-left">
					{image}
				</div>
				<div className="media-body">
					<div className="text-nowrap">{subject}</div>
					<small className="text-muted">{since}</small>
				</div>
			</a>
		)
	}
}
// end::message-notification[]

// tag::mega-menu-dropdown[]
class MegaMenuDropdown extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			maxCols: 3
		};
	}

	render() {
		const { news, cols } = this.props.mega;
		var columns = [];
		var i = 0;
		if (news) {
			columns.push(
				<div className="col-sm-12 col-md-3" key={'mega-col-' + i++}>
					<MegaMenuNewsWidget news={news} />
				</div>
			);
		}
		if (cols) {

			this.props.mega.cols.forEach((col) => {
				if (i <= this.state.maxCols) {
					columns.push(
						<div className='col-sm-4 col-md-3' key={'mega-col-' + i}>
							<MegaMenuColList rows={col.rows} />
						</div>
					);
					i++;
				}
			});
		}
		return (
			<li className="mega-dropdown">
				<a href="#" className="mega-dropdown-toggle">
					<i className="fa fa-th-large fa-lg"></i>
				</a>
				<div className="dropdown-menu mega-dropdown-menu">
					<div className="clearfix">
						{columns}
					</div>
				</div>
			</li>
		)
	}
}
// end::mega-menu-dropdown[]

// tag::mega-menu-news-widget[]
class MegaMenuNewsWidget extends React.Component {
	render() {
		const { subject, content} = this.props.news;

		return (
			<div className="text-center bg-purple pad-all">
				<h3 className="text-thin mar-no">{subject}</h3>
				<div className="pad-ver box-inline">
					<span className="icon-wrap icon-wrap-lg icon-circle bg-trans-light">
						<i className="fa fa-shopping-cart fa-4x"></i>
					</span>
				</div>
				<p className="pad-btm">
					{content}
				</p>
				<a href="#" className="btn btn-purple">Learn More...</a>
			</div>
		)
	}
}
// end::mega-menu-news-widget[]

// tag::mega-menu-col-list[]
class MegaMenuColList extends React.Component {
	createHeader = (name, key) => {
		return (
			<li key={key} className="dropdown-header">{name}</li>
		)
	}

	createLink = (link, key) => {
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
	}

	createDivider = (key) => {
		return <li key={key} className="divider"></li>;
	}

	render() {
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
}
// end::mega-menu-col-list[]

// tag::language[]

// tag::language-dropdown[]
class LanguageDropdown extends React.Component {
	render() {
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
}
// end::language-dropdown[]

// tag::language-option-list[]
class LanguageOptionList extends React.Component {
	render() {
		const languages = this.props.languages.map(language => 
			<li key={'lan-' + language.id}>
				<LanguageOptionItem language={language} />
			</li>
		)
		return (
			<ul className="head-list dropdown-menu">
				{languages}
			</ul>
		)
	}
}
// end::language-option-list[]

// tag::language-option-item[]
class LanguageOptionItem extends React.Component {
	render() {
		const { id, name, active, flagUrl} = this.props.language;

		return (
			<a href="#" className={active ? 'active' : ''}>
				<img className="lang-flag" src={flagUrl} alt={name} />
				<span className="lang-id">{id}</span>
				<span className="lang-name">{name}</span>
			</a>
		)
	}
}
// end::language-option-item[]

// end::language[]

// tag::user[]

// tag::user-dropdown[]
class UserDropdown extends React.Component {
	render() {
		var user = this.props.user;
		return (
			<li id="dropdown-user" className="dropdown">
				<a href="#" data-toggle="dropdown" className="dropdown-toggle text-right">
					<span className="pull-right">
						<img className="img-circle img-user media-object" src={"img/" + user.avatarUrl} alt="Profile Picture" />
					</span>
					<div className="username hidden-xs">{user.firstName + " " + user.lastName}</div>
				</a>

				<UserMenu user={user} />

			</li>
		)
	}
}
// end::user-dropdown[]


// tag::user-menu[]
class UserMenu extends React.Component {
	render() {
		var user = this.props.user;
        var roles = [];
        _.each(user.roles, role => {
            roles.push(RoleLabels[role]);
		});
		return (
			<div className="dropdown-menu dropdown-menu-md dropdown-menu-right panel-default">

				{/* Dropdown heading */}
				<div className="pad-all bord-btm">
					<p className="text-lg text-muted text-semibold mar-no">
						{roles}
					</p>
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
}
// end::user-menu[]

// tag::user-profile[]
class UserProfile extends React.Component {
	render() {
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
}
// end::user-profile[]

// tag::user-setting[]
class UserSetting extends React.Component {
	render() {
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
}
// end::user-setting[]

// tag::user-help[]
class UserHelp extends React.Component {
	render() {
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
}
// end::user-help[]

// tag::user-lock[]
class UserLock extends React.Component {
	render() {
		return (
			<a href="#">
				<i className="fa fa-lock fa-fw fa-lg"></i> Lock screen
			</a>
		)
	}
}
// end::user-lock[]

// end::user[]
