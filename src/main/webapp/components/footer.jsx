import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { WrapIcons, Badge, Label } from '../controls';

// tag::footer[]
var Footer = React.createClass({
	render: function () {
		return (
			<footer id="footer">

	            {/* Visible when footer positions are fixed */}
	            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
	            <div className="show-fixed pull-right">
	                <ul className="footer-list list-inline">
	                    <li>
	                        <p className="text-sm">SEO Proggres</p>
	                        <div className="progress progress-sm progress-light-base">
	                            <div style={{width: '80%'}} className="progress-bar progress-bar-danger"></div>
	                        </div>
	                    </li>

	                    <li>
	                        <p className="text-sm">Online Tutorial</p>
	                        <div className="progress progress-sm progress-light-base">
	                            <div style={{width: '80%'}} className="progress-bar progress-bar-primary"></div>
	                        </div>
	                    </li>
	                    <li>
	                        <button className="btn btn-sm btn-dark btn-active-success">Checkout</button>
	                    </li>
	                </ul>
	            </div>

	            {/* Version */}
	            <Version version={this.props.version} />

	            
	            {/* &#0169; Copyright */}
	            <Copyright company={this.props.company} />

	        </footer>
		)
	}
});
// end::footer[]

// tag::copyright[]
var Copyright = React.createClass({
	render: function () {
		var year = new Date().getFullYear();
		return (
			<p className="pad-lft">&#0169; {year} {this.props.company}</p>
		)
	}
});
// end::copyright[]

// tag::version[]
var Version = React.createClass({
	render: function () {
		return (
			<div className="hide-fixed pull-right pad-rgt">Currently {this.props.version}</div>
		)
	}
});
// end::version[]

module.exports = Footer