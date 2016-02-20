import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import NavBar from './header.jsx';
import MainNav from './navigation.jsx';
import Dashboard from './dashboard.jsx';

// tag::app[]
var App = React.createClass({
	render: function () {
		return (
			<div id="container" className="effect mainnav-lg navbar-fixed">
				<NavBar />

				<div className="boxed">
					{/* MAIN CONTENT CONTAINER */}
					{this.props.children || <Dashboard />}

					{/* MAIN NAVIGATION */}
					<MainNav />
				</div>
			</div>
		)
	}
});
// end::app[]

module.exports = App;
