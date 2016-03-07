import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import { Badge, Label, FaIcon, MenuItemLink, SubMenu } from '../controls';



// tag::main-nav[]
var MainNav = React.createClass({
	render: function () {
		return (
			<nav id="mainnav-container">
				<div id="mainnav">

					{/* Shortcut buttons */}
					<MainNavShortcut />

					{/* Menu */}
					<MainNavMenuWrapper menu={this.props.menu} />

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
				var className = cx({'active-link': link.active});
                var highlight = null;
                if (link.label) {
                    highlight = <Label bsStyle={link.label.color} className="pull-right">{link.label.content}</Label>
                } else if (link.badge) {
                    highlight = <Badge pullRight={true} className={cx(`badge-${link.badge.color}`)}>{link.badge.content}</Badge>
                }
				menuItemEl = (
                    <MenuItemLink className={className}
                                  href={link.href}
                                  onlyActiveOnIndex={true}
                                  activeClassName="active-link">
                        <FaIcon fa={link.icon.name} />
                        <span className="menu-title">
                            {link.name}
                            {highlight}
                        </span>
                    </MenuItemLink>
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
