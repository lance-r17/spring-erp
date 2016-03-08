import React from 'react';
import cx from 'classnames';
import { ScrollTopButton } from '../controls';
import api from '../lib/apiHelper';

import Header from './header.jsx';
import MainNav from './navigation.jsx';
import Footer from './footer.jsx';

import { SimpleMenu } from '../stubs/menus';

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
		api.getSearchLinks({
			rel: 'users',
            onSuccess: (links) => {
                if (links.myself) {
                    api.get({
                        path: links.myself.href,
                        onSuccess: (response) => {
                            this.setState({
                                user: response.entity
                            })
                        }
                    })
                }
            }
		});
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
				<Header brandName="Spring ERP" user={this.state.user} />

				<div className="boxed">

					{/* MAIN CONTENT CONTAINER */}
					{this.props.children }

					{/* MAIN NAVIGATION */}
					<MainNav menus={SimpleMenu} />
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
