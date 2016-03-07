import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

// tag::divider[]
class Divider extends React.Component {
	render() {
		return (
			<li className="list-divider"></li>
		)
	}
}
// end::divider[]

// tag::menu[]
class SubMenu extends React.Component {
	
	render() {
		var { name, icon, link, badge, label, subMenu} = this.props.options,
			options = { name, icon, link, badge, label };

		var subMenuEl = [];
		subMenu.forEach(item => {
			var { divider, link, level } = item;
			var menuItemEl = null;
			if (divider) {
				menuItemEl = <Divider />
			} else if (link) {
				var className = cx({'active-link': link.active});
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
}
// end::menu[]

var MenuControls = {
	SubMenu
};

export default MenuControls;
