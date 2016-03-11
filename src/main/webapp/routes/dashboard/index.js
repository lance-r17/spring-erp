import Dashboard from './components/dashboard.jsx';

let route = {
	path: 'dashboard',
	getComponent(location, cb) {
		require.ensure([], (require) => {
			cb(null, Dashboard)
		})
	}
}

export default route;