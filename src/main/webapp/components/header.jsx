import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import { RoleLabels, Badge, Button, Dropdown, DropdownMenu, Label, Image, Avatar, MenuItem, MenuItemLink, Navbar, Nav, NavDropdown, ProgressBar, FaIcon, NanoScroller } from '../controls';

const notifications = [
	{
		id: 1,
		progress: {
			subject: 'Database Repair',
			percentage: 70
		}
	},
	{
		id: 2,
		progress: {
			subject: 'Upgrade Progress',
			percentage: 10,
			bsStyle: 'warning'
		}
	},
	{
		id: 3,
		message: {
			from: {
				name: 'Lucy',
				avatarUrl: 'av4.png'
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
				avatarUrl: 'av3.png'
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
			icon: 'hdd-o',
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
			icon: 'file-word-o',
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
				avatarUrl: 'av3.png'
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
			menus: [
				{
					header: 'Pages',
					links: [
						{
							name: 'Profile',
							href: '/profile'
						},
						{
							name: 'Search Result',
						},
						{
							name: 'FAQ',
						},
						{
							name: 'Screen Lock',
						},
						{
							name: 'Disabled',
							disabled: true
						}
					]
				},
				{
					header: 'Icons',
					links: [
						{
							name: 'Font Awesome',
							badge: {
								content: '479',
								color: 'purple'
							}
						},
						{
							name: 'Skycons',
						}
					]
				}
			]
		},
		{
			menus: [
				{
					header: 'Mailbox',
					links: [
						{
							name: 'Indox',
							label: {
								content: 'Hot',
								color: 'danger'
							}
						},
						{
							name: 'Read Message',
						},
						{
							name: 'Compose',
						}
					]
				},
				{
					header: 'Featured',
					links: [
						{
							name: 'Smart navigation',
						},
						{
							name: 'Exclusive plugins',
							badge: {
								content: '6',
								color: 'success'
							}
						},
						{
							name: 'Lot of themes',
						},
						{
							name: 'Transition effects',
						}
					]
				}
			]
		},
		{
			menus: [
				{
					header: 'Components',
					links: [
						{
							name: 'Tables',
						},
						{
							name: 'Charts',
						},
						{
							name: 'Forms',
						},
					]
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
export default class Header extends React.Component {
	render() {
        const { brandName, user } = this.props;

		return (

			<header id="navbar">
				<div id="navbar-container" className="boxed">

                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">
                                <Image src="img/logo.png" alt={`${brandName} Logo`} className="brand-icon" />
                                <div className="brand-title">
                                    <span className="brand-text">{brandName}</span>
                                </div>
                            </a>
                        </Navbar.Brand>
                    </Navbar.Header>

                    <div className="navbar-content clearfix">
                        <Nav className="navbar-top-links" pullLeft>
                            <MenuItem href="#" className="mainnav-toggle">
                                <FaIcon fa="navicon" large />
                            </MenuItem>
                            {/* notification dropdown */}
                            <NotificationDropdown notifications={notifications} />

                            {/* Mega menu dropdown */}
                            <MegaMenuDropdown mega={mega} />
                        </Nav>

                        <Nav className="navbar-top-links" pullRight>
                            {/* Language selector */}
                            <LanguageDropdown languages={languages} />

                            {/* User dropdown */}
                            <UserDropdown user={user} />
                        </Nav>
                    </div>
                </div>
            </header>
		)
	}
}
// end::nav-bar[]

// tag::decorators[]
const toggleable = (DecoratedComponent) => {

    return class extends React.Component {
    	constructor(props) {
			super(props);

			this.state = {
				open: false
			}
		}

		onToggle = (open) => {
			this.setState({
				open: open
			});
		}

		render() {
			var props = {}
			_.extend(props, this.props, { onToggle: this.onToggle });
			return (
				<DecoratedComponent {...props} {...this.state} />
			)
		}
    }
}
// end::decorators[]

// tag::notification-dropdown[]
@toggleable
class NotificationDropdown extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { notifciations, onToggle, open } = this.props;
		const length = notifications.length;
		const badge = length > 0 ? <Badge className={cx(['badge-header', 'badge-danger'])}>{length}</Badge> : null;
		const scrollableNotifications = open ? (
			<NanoScroller>
                <NotificationDropdownList notifications={notifications} />
            </NanoScroller>
        ) : null;

		return (
            <Dropdown id="dropdown-notification" componentClass="li" onToggle={onToggle} open={open} >
                <Dropdown.Toggle useAnchor noCaret>
                    <FaIcon fa="bell" large />
                    {badge}
                </Dropdown.Toggle>

                {/* Notification dropdown menu */}
                <Dropdown.Menu className="dropdown-menu-md">
                    <div className="pad-all bord-btm">
                        <p className="text-lg text-muted text-semibold mar-no">{`You have ${length} notifications.`}</p>
                    </div>
                    
                    {scrollableNotifications}

                    {/* Dropdown footer */}
                    <div className="pad-all bord-top">
                        <a href="#" className="btn-link text-dark box-block">
                            <FaIcon fa="angle-right" large pullRight />Show All Notifications
                        </a>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
		)
	}
}
// end::notification-dropdown[]


// tag::notification-dropdown-list[]
class NotificationDropdownList extends React.Component {
	render() {
		var notifications = [];
		this.props.notifications.forEach( (notification, i) => {
			const { progress, message } = notification;
			const key = `ntf-${i}`;
			const props = { key, progress, message };
			if (progress) {
				notifications.push(<ProgressNotification {...props} />);
			} else if (message) {
				notifications.push(<MessageNotification {...props} />);
			}
		});
		return (
			<ul className="head-list">
				{notifications}
			</ul>
		)
	}
}
// end::notification-dropdown-list[]

// tag::progress-notification[]
class ProgressNotification extends React.Component {
	render() {
		var { subject, percentage, ...props } = this.props.progress;
		return (
			<MenuItemLink>
				<div className="clearfix">
					<p className="pull-left">{subject}</p>
					<p className="pull-right">{`${percentage}%`}</p>
				</div>
				<ProgressBar now={percentage} className="progress-sm" {...props} srOnly />
			</MenuItemLink>
		)
	}
}
// end::progress-notification[]

// tag::message-notification[]
class MessageNotification extends React.Component {
	render() {
		var { badge, label, icon, from, subject, since} = this.props.message;

		var highlight = null;
		if (badge) {
			highlight = <Badge className={cx(`badge-${badge.color}`)} pullRight>{badge.content}</Badge>
		} else if (label) {
			highlight = <Label bsStyle={label.color} className="pull-right">{label.content}</Label>
		}

		var image = null;
		if (icon) {
			// image = WrapIcons[icon];
			image = <FaIcon fa={icon} wrap={{bsStyle: 'primary'}} />
		} else if (from) {
			image = <Avatar src={`img/${from.avatarUrl}`} small />
		}

		return (
			<MenuItemLink className="media">
				{highlight}
				<div className="media-left">
					{image}
				</div>
				<div className="media-body">
					<div className="text-nowrap">{subject}</div>
					<small className="text-muted">{since}</small>
				</div>
			</MenuItemLink>
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

			cols.forEach((col) => {
				if (i <= this.state.maxCols) {
					columns.push(
						<div className='col-sm-4 col-md-3' key={'mega-col-' + i}>
							<MegaMenuColList menus={col.menus} />
						</div>
					);
					i++;
				}
			});
		}
		return (
			<Dropdown id="dropdown-mega" className="mega-dropdown" componentClass="li">
                <Dropdown.Toggle className="mega-dropdown-toggle" useAnchor noCaret>
                    <FaIcon fa="th-large" large />
                </Dropdown.Toggle>

                {/* Mega dropdown menu */}
                <Dropdown.Menu className="mega-dropdown-menu">
                    <div className="clearfix">
						{columns}
					</div>
                </Dropdown.Menu>
            </Dropdown>
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

	render() {
		const { menus } = this.props;
		var rows = [];
		if (menus) {
			menus.forEach((menu, i) => {
				if (i > 0) {
					rows.push(<MenuItem key={`divider-${i}`} divider />);
				}

				if (menu.header) {
					rows.push(
						<MenuItem key={`header-${i}`} header>
							{menu.header}
						</MenuItem>
					);
				} 

				if (menu.links) {
					menu.links.forEach((link, j) => {
						const { badge, label, name, ...props } = link;

						var highlight = null;
						if (badge) {
							highlight = <Badge className={cx(`badge-${badge.color}`)} pullRight>{badge.content}</Badge>
						} else if (label) {
							highlight = <Label bsStyle={label.color} className="pull-right">{label.content}</Label>
						}

						rows.push(
							<MenuItemLink key={`link-${i}-${j}`} {...props}>
								{highlight}
								{name}
							</MenuItemLink>
						);
					});
				}
			});
		}

		return (
			<ul className="list-unstyled">
				{rows}
			</ul>
		)
	}
}
// end::mega-menu-col-list[]


// tag::language-dropdown[]
class LanguageDropdown extends React.Component {
	render() {
		var langSelected = _.find(this.props.languages, {active: true});
		const languages = this.props.languages.map(language => 
			<MenuItem key={'lan-' + language.id} className={cx({'active': language.active})}>
				<Image className="lang-flag" src={language.flagUrl} alt={language.name} />
				<span className="lang-id">{language.id}</span>
				<span className="lang-name">{language.name}</span>
			</MenuItem>
		)
		return (
			<Dropdown id="dropdown-language" componentClass="li">
				<Dropdown.Toggle className="lang-selector" useAnchor noCaret>
					<span className="lang-selected">
						<Image className="lang-flag" src={langSelected.flagUrl} alt={langSelected.name} />
						<span className="lang-id">{langSelected.id}</span>
						<span className="lang-name">{langSelected.name}</span>
					</span>
				</Dropdown.Toggle>

				{/* Language selector menu */}
				<Dropdown.Menu className="head-list" >
					{languages}
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}
// end::language-dropdown[]

// tag::user-dropdown[]
class UserDropdown extends React.Component {
	render() {
		var user = this.props.user;
        var roles = [];
        _.each(user.roles, role => {
            roles.push(RoleLabels[role]);
		});
		return (
			<Dropdown id="dropdown-user" componentClass="li" pullRight>
				<Dropdown.Toggle useAnchor noCaret>
					<span className="pull-right">
						<Avatar className="media-object" src={`img/${user.avatarUrl}`} />
					</span>
					<div className="username hidden-xs">{`${user.firstName} ${user.lastName}`}</div>
				</Dropdown.Toggle>
				<Dropdown.Menu className="dropdown-menu-md panel-default head-list" >
					<div className="pad-all bord-btm">
						<p className="text-lg text-muted text-semibold mar-no">
							{roles}
						</p>
					</div>

					<MenuItemLink href="/profile">
						<FaIcon fa="user" large wide /> Profile
					</MenuItemLink>
					<MenuItemLink href="/setting">
						<FaIcon fa="gear" large wide /> Setting
					</MenuItemLink>
					<MenuItemLink>
						<FaIcon fa="question-circle" large wide /> Help
					</MenuItemLink>
					<MenuItemLink>
						<FaIcon fa="lock" large wide /> Lock Screen
					</MenuItemLink>

					<div className="pad-all text-right">
						<Button href="/logout" className="btn btn-primary">
							<FaIcon fa="sign-out" large wide /> Logout
						</Button>
					</div>
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}
// end::user-dropdown[]
