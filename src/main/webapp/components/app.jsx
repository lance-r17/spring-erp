import React from 'react';
import cx from 'classnames';
import { ScrollTopButton } from '../controls';
import client from '../lib/client';

import NavBar from './header.jsx';
import MainNav from './navigation.jsx';
import Footer from './footer.jsx';

import { FullMenu, SimpleMenu } from '../stubs/menus';

import { Dashboard } from '../routes/dashboard/components';

var	root = '/api';

// tag::app[]
var App = React.createClass({
	loadFromServer: function() {
		client({
			method: 'GET',
			path: '/user'
		}).then(user => {
			this.setState({user: user.entity});
		})
	},
	getInitialState: function() {
		return ({
			headerFixed: true,
			navigationFixed: true,
			user: {}
		});
	},
	componentDidMount: function() {
		this.loadFromServer();
	},
	render: function () {
		var containerClass = cx(
			'effect',
			'mainnav-lg',
			this.state.headerFixed ? 'navbar-fixed' : '',
			this.state.navigationFixed ? 'mainnav-fixed' : ''
		);

		return (
			<div id="container" className={containerClass}>
				<NavBar user={this.state.user} />

				<div className="boxed">

					{/* MAIN CONTENT CONTAINER */}
					{this.props.children || <Dashboard />}

					{/* MAIN NAVIGATION */}
					<MainNav menu={SimpleMenu} />
				</div>

				{/* FOOTER */}
				<Footer company="Your Company" version="v1.0" />

				{/* SCROLL TOP BUTTON */}
        		<ScrollTopButton />
			</div>
		)
	}
});
// end::app[]

module.exports = App;
