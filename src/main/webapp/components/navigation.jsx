import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Icons, Badge, Label, MenuItemLink, SubMenu } from '../controls'

const menu = [
	{
		header: {
			name: 'Navigation'
		}
	},
	{
		link: {
			name: 'Dashboard',
			href: '#',
			active: true,
			icon: {
				name: 'dashboard'
			},
			label: {
				color: 'success',
				content: 'Top'
			}
		}
	},
	{
		level: {
			name: 'Layouts',
			icon: {
				name: 'th'
			},
			subMenu: [
				{
					link: {
						name: 'Collapsed Navigation',
						href: '#'
					}
				},
				{
					link: {
						name: 'Off-Canvas Navigation',
						href: '#'
					}
				},
				{
					link: {
						name: 'Slide-in Navigation',
						href: '#'
					}
				},
				{
					link: {
						name: 'Revealing Navigation',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					link: {
						name: 'Aside on the right side',
						href: '#'
					}
				},
				{
					link: {
						name: 'Aside on the left side',
						href: '#'
					}
				},
				{
					link: {
						name: 'Bright aside theme',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					link: {
						name: 'Fixed Navbar',
						href: '#'
					}
				},
				{
					link: {
						name: 'Fixed Footer',
						href: '#'
					}
				}
			]
		}
	},
	{
		link: {
			name: 'Widgets',
			href: '#',
			icon: {
				name: 'flask'
			},
			badge: {
				content: '9',
				color: 'warning'
			}
		}
	},
	{
		divider: {}
	},
	{
		header: {
			name: 'Components'
		}
	},
	{
		level: {
			name: 'UI Elements',
			icon: {
				name: 'briefcase'
			},
			subMenu: [
				{
					link: {
						name: 'Buttons',
						href: '#'
					}
				},
				{
					link: {
						name: 'Checkboxes & Radio',
						href: '#'
					}
				},
				{
					link: {
						name: 'Panels',
						href: '#'
					}
				},
				{
					link: {
						name: 'Modals',
						href: '#'
					}
				},
				{
					link: {
						name: 'Progress bars',
						href: '#'
					}
				},
				{
					link: {
						name: 'Components',
						href: '#'
					}
				},
				{
					link: {
						name: 'Typography',
						href: '#'
					}
				},
				{
					link: {
						name: 'List Group',
						href: '#'
					}
				},
				{
					link: {
						name: 'Tabs & Accordions',
						href: '#'
					}
				},
				{
					link: {
						name: 'Alerts & Tooltips',
						href: '#'
					}
				},
				{
					link: {
						name: 'Helper Classes',
						href: '#'
					}
				}
			]
		}
	},
	{
		level: {
			name: 'Forms',
			icon: {
				name: 'edit'
			},
			subMenu: [
				{
					link: {
						name: 'General',
						href: '#'
					}
				},
				{
					link: {
						name: 'Components',
						href: '#'
					}
				},
				{
					link: {
						name: 'Validation',
						href: '#'
					}
				},
				{
					link: {
						name: 'Wizard',
						href: '#'
					}
				}
			]
		}
	},
	{
		level: {
			name: 'Tables',
			icon: {
				name: 'table'
			},
			subMenu: [
				{
					link: {
						name: 'Static Tables',
						href: '#'
					}
				},
				{
					link: {
						name: 'Bootstrap Tables',
						href: '#'
					}
				},
				{
					link: {
						name: 'Data Tables',
						href: '#',
						lable: {
							content: 'New',
							color: 'info'
						}
					}
				},
				{
					link: {
						name: 'Foo Tables',
						href: '#',
						lable: {
							content: 'New',
							color: 'info'
						}
					}
				}
			]
		}
	},
	{
		link: {
			name: 'Charts',
			href: '#',
			icon: {
				name: 'line-chart'
			}
		}
	},
	{
		divider: {}
	},
	{
		header: {
			name: 'Extra'
		}
	},
	{
		level: {
			name: 'Miscellaneous',
			label: {
				content: 'New',
				color: 'mint'
			},
			icon: {
				name: 'plug'
			},
			subMenu: [
				{
					link: {
						name: 'Calendar',
						href: '#'
					}
				},
				{
					link: {
						name: 'Google Map',
						href: '#'
					}
				}
			]
		}
	},
	{
		level: {
			name: 'Email',
			icon: {
				name: 'envelope'
			},
			subMenu: [
				{
					link: {
						name: 'Inbox',
						href: '#'
					}
				},
				{
					link: {
						name: 'View Message',
						href: '#'
					}
				},
				{
					link: {
						name: 'Compose Message',
						href: '#'
					}
				}
			]
		}
	},
	{
		level: {
			name: 'Pages',
			icon: {
				name: 'file'
			},
			subMenu: [
				{
					link: {
						name: 'Blank Page',
						href: '#'
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
						name: 'Search Results',
						href: '#'
					}
				},
				{
					link: {
						name: 'Timeline',
						href: '#',
						label: {
							content: 'New',
							color: 'info'
						}
					}
				},
				{
					link: {
						name: 'FAQ',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					link: {
						name: '404 Error',
						href: '#'
					}
				},
				{
					link: {
						name: '500 Error',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					link: {
						name: 'Login',
						href: '#'
					}
				},
				{
					link: {
						name: 'Register',
						href: '#'
					}
				},
				{
					link: {
						name: 'Password Reminder',
						href: '#'
					}
				},
				{
					link: {
						name: 'Lock Screen',
						href: '#'
					}
				}
			]
		}
	},
	{
		level: {
			name: 'Menu Level',
			icon: {
				name: 'plus-square'
			},
			subMenu: [
				{
					link: {
						name: 'Second Level Item',
						href: '#'
					}
				},
				{
					link: {
						name: 'Second Level Item',
						href: '#'
					}
				},
				{
					link: {
						name: 'Second Level Item',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					level: {
						name: 'Third Level',
						subMenu: [
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							}
						]
					}
				},
				{
					level: {
						name: 'Third Level',
						subMenu: [
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								divider: {}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							}
						]
					}
				}
			]
		}
	}
]

// tag::main-nav[]
var MainNav = React.createClass({
	render: function () {
		return (
			<nav id="mainnav-container">
				<div id="mainnav">

					{/* Shortcut buttons */}
					<MainNavShortcut />

					{/* Menu */}
					<MainNavMenuWrapper menu={menu} />

				</div>
			</nav>
		)
	}
});
// end::main-nav[]

// tag::main-nav-shortcut[]
var MainNavShortcut = React.createClass({
	render: function () {
		return (
			<div id="mainnav-shortcut">
				<ul className="list-unstyled">
					<li className="col-xs-4" data-content="Additional Sidebar">
						<a id="demo-toggle-aside" className="shortcut-grid" href="#">
							<i className="fa fa-magic"></i>
						</a>
					</li>
					<li className="col-xs-4" data-content="Notification">
						<a id="demo-alert" className="shortcut-grid" href="#">
							<i className="fa fa-bullhorn"></i>
						</a>
					</li>
					<li className="col-xs-4" data-content="Page Alerts">
						<a id="demo-page-alert" className="shortcut-grid" href="#">
							<i className="fa fa-bell"></i>
						</a>
					</li>
				</ul>
			</div>
		)
	}
});
// end::main-nav-shortcut[]

// tag::main-nav-menu-wrapper[]
var MainNavMenuWrapper = React.createClass({
	render: function () {
		return (
			<div id="mainnav-menu-wrap">
				<div className="nano">
					<div className="nano-content">

						{/* Menu List */}
						<MainNavMenuList menu={this.props.menu} />

						{/* Widget */}
						<MainNavMenuWidget />

					</div>
				</div>
			</div>
		)
	}
});
// end::main-nav-menu-wrapper[]

// tag::main-nav-menu-list[]
var MainNavMenuList = React.createClass({
	render: function () {
		var menuListEl =[];
		this.props.menu.forEach(item => {
			var { header, divider, link, level } = item;
			var menuItemEl = null;
			if (header) {
				menuItemEl = <li className="list-header">{header.name}</li>
			} else if (link) {
				var className = classNames(link.active ? 'active-link' : '');
				menuItemEl = (
					<li className={className}>
						<MenuItemLink options={link} />
					</li>
				)
			} else if (divider) {
				menuItemEl = <li className="list-divider"></li>
			} else if (level) {
				menuItemEl = <SubMenu options={level} />
			}

			menuListEl.push(menuItemEl);
		});

		return (
			<ul id="mainnav-menu" className="list-group">
				{menuListEl}
			</ul>
		)
	}
});
// end::main-nav-menu-list[]

// tag::main-nav-menu-widget[]
var MainNavMenuWidget = React.createClass({
	render: function () {
		return (
			<div className="mainnav-widget">

				{/*  Show the button on collapsed navigation  */}
				<div className="show-small">
					<a href="#" data-toggle="menu-widget" data-target="#demo-wg-server">
						<i className="fa fa-desktop"></i>
					</a>
				</div>

				{/*  Hide the content on collapsed navigation  */}
				<div id="demo-wg-server" className="hide-small mainnav-widget-content">
					<ul className="list-group">
						<li className="list-header pad-no pad-ver">Server Status</li>
						<li className="mar-btm">
							<span className="label label-primary pull-right">15%</span>
							<p>CPU Usage</p>
							<div className="progress progress-sm">
								<div className="progress-bar progress-bar-primary" style={{width: '15%'}}>
									<span className="sr-only">15%</span>
								</div>
							</div>
						</li>
						<li className="mar-btm">
							<span className="label label-purple pull-right">75%</span>
							<p>Bandwidth</p>
							<div className="progress progress-sm">
								<div className="progress-bar progress-bar-purple" style={{width: '75%'}}>
									<span className="sr-only">75%</span>
								</div>
							</div>
						</li>
						<li className="pad-ver"><a href="#" className="btn btn-success btn-bock">View Details</a></li>
					</ul>
				</div>
			</div>
		)
	}
});
// end::main-nav-menu-widget[]

module.exports = MainNav;
