import React from 'react'
import { findDOMNode, render } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'

import App from './components/app.jsx'
import EmoloyeesRoute from './routes/employees'

define(function (require){
	'use strict';

	// tag::about[]
    var About = React.createClass({
        render: function() {
            return (
                <h3>
                    About Spring ERP
                </h3>
            )
        }
    });
    // end::about[]

    const rootRoute = {
		component: 'div',
		childRoutes: [
			{
				path: '/',
				component: App,
				childRoutes: [
					EmoloyeesRoute
				]
			}
		]
	};

	// tag::render[]
    // Declarative route configuration (could also load this config lazily
    // instead, all you really need is a single root route, you don't need to
    // colocate the entire config).
    render((
		<Router history={hashHistory} routes={rootRoute} />
	), document.getElementById('react') );
	// end::render[]
});
