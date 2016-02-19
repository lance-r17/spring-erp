import React from 'react';
import classNames from 'classnames';
import { Icons } from './icon.jsx';
import { Badge } from './badge.jsx';
import { Label } from './label.jsx';


// tag::menu-item-link[]
var MenuItemLink = React.createClass({
	render: function() {
		var { name, href, active, icon, badge, label, next } = this.props.options;
		var iconEl = null;
		if (icon) {
			iconEl = Icons[icon.name]
		}

		var highlightEl = null;
		var options = {}
		if (badge) {
			_.extend(options, badge, {right: true});
			highlightEl = <Badge options={options} />
		} else if (label) {
			_.extend(options, label, {right: true});
			highlightEl = <Label options={options} />
		}

		var arrowEl = null;
		if (next) {
			arrowEl = <i className="arrow"></i>
		}

		var innerEl = null;
		if (iconEl) {
			innerEl = (
                <span className="menu-title">
					<strong>{name}</strong>
					{highlightEl}
				</span>
			)
		} else {
			innerEl = name;
		}
		
		return (
			<a href={href}>
				{iconEl}
            	{innerEl}
            	{arrowEl}
            </a>
		)
	}
});
// end::menu-item-link[]

// tag::divider[]
var Divider = React.createClass({
	render: function() {
		return (
			<li className="list-divider"></li>
		)
	}
});
// end::divider[]

// tag::menu[]
var SubMenu = React.createClass({
	
	render: function() {
		var { name, icon, badge, link, subMenu} = this.props.options,
			options = { name, icon, badge, link};

		var subMenuEl = [];
		subMenu.forEach(item => {
			var { divider, link, level } = item;
			var menuItemEl = null;
			if (divider) {
				menuItemEl = <Divider />
			} else if (link) {
				var className = classNames(link.active ? 'active-link' : '');
				menuItemEl = (
					<li className={className}> 
						<MenuItemLink options={link} />
					</li>
				)
			} else if (level) {
				menuItemEl = <SubMenu options={level} />
			}

			subMenuEl.push(menuItemEl);
		});

		_.extend(options, {href: '#', next: true});

		return (
			<li>
                <MenuItemLink options={options} />

                {/* Submenu */}
                <ul className="collapse">
                	{subMenuEl}
                </ul>
            </li>
		)
	}
});
// end::menu[]

var MenuControls = {};
MenuControls.MenuItemLink = MenuItemLink;
MenuControls.SubMenu = SubMenu;

// tag::export-menu-controls[]
module.exports = MenuControls;
module.exports.MenuControls = MenuControls;
// tag::export-menu-controls[]