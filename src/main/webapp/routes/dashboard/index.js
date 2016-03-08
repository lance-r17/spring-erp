import Dashboard from './components/dashboard.jsx';

module.exports = {
	path: 'dashboard',
	getComponent(location, cb) {
		require.ensure([], (require) => {
			cb(null, Dashboard)
		})
	}
}