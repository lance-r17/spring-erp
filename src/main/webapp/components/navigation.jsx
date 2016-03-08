import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import { Badge, Col, Collapse, Label, FaIcon, ListGroup, ListGroupItem, MenuItem, MenuItemLink, Nav, ProgressBar } from '../controls';



// tag::main-nav[]
export default class MainNav extends React.Component {
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
class MainNavShortcut extends React.Component {
	render() {
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
}
// end::main-nav-shortcut[]

// tag::main-nav-menu-wrapper[]
class MainNavMenuWrapper extends React.Component {
	render() {
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
}
// end::main-nav-menu-wrapper[]

// tag::main-nav-menu-list[]
class MainNavMenuList extends React.Component {
	render() {
		var menus =[];
		this.props.menus.forEach( (menu, i) => {
			const { header, links } = menu;

			if (i > 0) {
				menus.push(<MenuItem key={`divider-${i}`} className="list-divider" divider />);
			}

			if (header) {
				menus.push(<MenuItem key={`header-${i}`} bsClass="list" header>{header}</MenuItem>);
			} 

			if (links) {
				links.forEach( (link, j) => {
					menus.push(
						<NavLink key={`link-${i}`} {...link} />
					)
				});
			}
		});

		return (
			<ListGroup id="mainnav-menu" componentClass="ul">
				{menus}
			</ListGroup>
		)
	}
}
// end::main-nav-menu-list[]

// tag::nav-link[]
class NavLink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { collapse, name, ...props } = this.props;

        if (collapse) {
            return (
                <NavCollapseLink {...collapse} />
            )
        } else {
            return (
                <MenuItemLink {...props}
                    onlyActiveOnIndex={true}
                    activeClassName="active-link">
                    { name }
                </MenuItemLink>
            )
        }
    }
}
// end::nav-link[]

// tag::nav-collapse-link[]
class NavCollapseLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const { links, name, fa, ...props } = this.props;

        var navLinks = links.map( (link, i) =>
            <NavLink key={`sublink-${i}`} {...link} />
        )

        return (
            <li>
                <a href="#" onClick={this.handleClick}>
                    <FaIcon fa={fa} />
                    <span className="menu-title">{name}</span>
                    <i className="arrow"></i>
                </a>

                <Collapse in={this.state.open}>
                    <ul>
                        { navLinks }
                    </ul>
                </Collapse>
            </li>
        )
    }
}
// end::nav-collapse-link[]

// tag::main-nav-menu-widget[]
class MainNavMenuWidget extends React.Component {
	render() {
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
						<ListGroupItem className="pad-no pad-ver" bsClass="list-header" listItem>
							Server Status
						</ListGroupItem>
						
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
}
// end::main-nav-menu-widget[]
