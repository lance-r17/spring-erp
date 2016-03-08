import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import { Badge, Col, Label, FaIcon, ListGroup, ListGroupItem, MenuItem, MenuItemLink, Nav, ProgressBar, SubMenu } from '../controls';



// tag::main-nav[]
class MainNav extends React.Component {
	render() {
		return (
			<nav id="mainnav-container">
				<div id="mainnav">

					{/* Shortcut buttons */}
					<MainNavShortcut />

					{/* Menu */}
					<MainNavMenuWrapper menus={this.props.menus} />

				</div>
			</nav>
		)
	}
}
// end::main-nav[]

// tag::main-nav-shortcut[]
var MainNavShortcut = React.createClass({
	render: function () {
		return (
			<div id="mainnav-shortcut">
                <ul className="list-unstyled">
                    <Col componentClass="li" xs={4} data-content="Additional Sidebar">
                        <a id="demo-toggle-aside" className="shortcut-grid" href="#">
                            <FaIcon fa="magic" />
                        </a>
                    </Col>
                    <Col componentClass="li" xs={4} data-content="Notification">
						<a id="demo-alert" className="shortcut-grid" href="#">
							<FaIcon fa="bullhorn" />
						</a>
                    </Col>
                    <Col componentClass="li" xs={4} data-content="Page Alerts">
						<a id="demo-page-alert" className="shortcut-grid" href="#">
							<FaIcon fa="bell" />
						</a>
					</Col>
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
						<MainNavMenuList menus={this.props.menus} />

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
		var menus =[];
		this.props.menus.forEach( (menu, i) => {
			const { header, links } = menu;

			if (i > 0) {
				menus.push(<MenuItem className="list-divider" divider />);
			}

			if (header) {
				menus.push(<MenuItem bsClass="list" header>{header}</MenuItem>);
			} 

			if (links) {
				links.forEach( (link, j) => {
					const { name, ...props } = link;
					menus.push(
						<MenuItemLink {...props} 
									  onlyActiveOnIndex={true}
									  activeClassName="active-link">
							{ name }
						</MenuItemLink>
					)
				});
			} 

			// if (level) {
			// 	menuItemEl = <SubMenu options={level} />
			// }
		});

		return (
			<ListGroup id="mainnav-menu" componentClass="ul">
				{menus}
			</ListGroup>
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
						<FaIcon fa="desktop" />
					</a>
				</div>

				{/*  Hide the content on collapsed navigation  */}
				<div id="demo-wg-server" className="hide-small mainnav-widget-content">
					<ListGroup componentClass="ul">
						<ListGroupItem className="pad-no pad-ver" bsClass="list-header" listItem>Server Status</ListGroupItem>
						
						<ListGroupItem bsClass="mar-btm" listItem>
							<Label bsStyle="info" className="pull-right">15%</Label>
							<p>CPU Usage</p>
							<ProgressBar now={15} className="progress-sm" bsStyle="info" srOnly />
						</ListGroupItem>

						<ListGroupItem bsClass="mar-btm" listItem>
							<Label bsStyle="danger" className="pull-right">75%</Label>
							<p>Bandwidth</p>
							<ProgressBar now={75} className="progress-sm" bsStyle="danger" srOnly />
						</ListGroupItem>

						<ListGroupItem bsClass="pad-ver" listItem>
							<Link to="/" className="btn btn-success btn-bock">View Details</Link>
						</ListGroupItem>
					</ListGroup>
				</div>
			</div>
		)
	}
});
// end::main-nav-menu-widget[]

module.exports = MainNav;
