import React from 'react';
import cx from 'classnames';
import { ScrollTopButton } from '../controls';
// import client from '../lib/client';
import api from '../lib/apiHelper';

import NavBar from './header.jsx';
import MainNav from './navigation.jsx';
import Footer from './footer.jsx';

import { FullMenu, SimpleMenu } from '../stubs/menus';

import { Dashboard } from '../routes/dashboard/components';

// tag::app[]
export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			headerFixed: true,
			navigationFixed: true,
			user: {}
		}
	}

	getLoginUser = () => {
		api.get({
			path: '/user',
			onSuccess: (user) => {
				this.setState({
					user: user.entity
				});
			}
		})
	}

	componentDidMount() {
		this.getLoginUser();
	}

	render() {
		const containerClass = cx(
			['effect', 'mainnav-lg'],
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
}
// end::app[]
