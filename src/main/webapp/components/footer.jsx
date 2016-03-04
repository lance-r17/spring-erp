import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { WrapIcons, Badge, Label } from '../controls';

// tag::footer[]
export default class Footer extends React.Component {
	render() {
		return (
			<footer id="footer">

	            {/* Version */}
	            <Version version={this.props.version} />

	            
	            {/* &#0169; Copyright */}
	            <Copyright company={this.props.company} />

	        </footer>
		)
	}
}
// end::footer[]

// tag::copyright[]
class Copyright extends React.Component {
	render() {
		var year = new Date().getFullYear();
		return (
			<p className="pad-lft">&#0169; {year} {this.props.company}</p>
		)
	}
}
// end::copyright[]

// tag::version[]
class Version extends React.Component {
	render() {
		return (
			<div className="hide-fixed pull-right pad-rgt">Currently {this.props.version}</div>
		)
	}
}
// end::version[]