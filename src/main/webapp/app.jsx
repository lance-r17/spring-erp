import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router';

import { App } from './components';
import { Dashboard, Users, Menu, Report } from './routes';

define(function (require){
	'use strict';

	const indexRoute = {
		onEnter: (nextState, replace) => { 
			let path = Dashboard.path;
			replace(`/${path}`); 
		}
	};

    const rootRoute = {
		component: 'div',
		childRoutes: [
			{
				path: '/',
				component: App,
				indexRoute: indexRoute,
				childRoutes: [
					Dashboard,
					Users,
					Menu,
					Report
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
