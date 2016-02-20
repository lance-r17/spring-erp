import React from 'react';
import { ScrollTopButton } from '../controls';
import NavBar from './header.jsx';
import MainNav from './navigation.jsx';
import Footer from './footer.jsx';

import { FullMenu, SimpleMenu } from '../stubs/menus';

import { Dashboard } from '../routes/dashboard/components';

// tag::app[]
var App = React.createClass({
	render: function () {
		return (
			<div id="container" className="effect mainnav-lg navbar-fixed mainnav-fixed">
				<NavBar />

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
