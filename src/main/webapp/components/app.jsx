import React from 'react'
import { Router, Route, Link, hashHistory } from 'react-router'
import NavBar from './nav-bar.jsx'
import MainNav from './main-nav.jsx'

define(function (require){
	'use strict';

	// tag::app[]
	var App = React.createClass({
		render: function () {
			return (
				<div id="container" className="effect mainnav-lg">
					<NavBar />

					<div className="boxed">
						{/* MAIN CONTENT CONTAINER */}
						{this.props.children}

						{/* MAIN NAVIGATION */}
			        	<MainNav />
			        </div>
				</div>
			)
		}
	});
	// end::app[]

	return App;
});