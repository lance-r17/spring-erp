import React from 'react'
import { Router, Route, Link, hashHistory } from 'react-router'
import NavBar from './nav-bar.jsx'

define(function (require){
	'use strict';

	// tag::app[]
	var App = React.createClass({
		render: function () {
			return (
				<div id="container" className="effect mainnav-lg">
					<NavBar />
					{this.props.children}
				</div>
			)
		}
	});
	// end::app[]

	return App;
});