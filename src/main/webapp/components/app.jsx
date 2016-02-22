import React from 'react';
import { ScrollTopButton } from '../controls';
import client from '../client';
import follow from '../follow';

import NavBar from './header.jsx';
import MainNav from './navigation.jsx';
import Footer from './footer.jsx';

import { FullMenu, SimpleMenu } from '../stubs/menus';

import { Dashboard } from '../routes/dashboard/components';

var	root = '/api';

// tag::app[]
var App = React.createClass({
	loadFromServer: function() {
		// console.log('load from server');
		// follow(client, root, [{rel: 'user'}]
		// ).then(response => {
		// 	return client({
		// 		method: 'GET',
		// 		path: response.entity._links.self.href
		// 	}).then(user => {
		// 		return user.entity;
		// 	})
		// }).done(user => {
		// 	this.setState({
		// 		user: user
		// 	});
		// })
		client({
			method: 'GET',
			path: root + '/user'
		}).then(user => {
			this.setState({user: user.entity});
		})
	},
	getInitialState: function() {
		return ({
			user: {}
		});
	},
	componentDidMount: function() {
		this.loadFromServer();
	},
	render: function () {
		return (
			<div id="container" className="effect mainnav-lg navbar-fixed mainnav-fixed">
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
