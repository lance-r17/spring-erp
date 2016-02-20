import { Dashboard } from './components';

module.exports = {
	path: 'dashboard',
	getComponent(location, cb) {
		require.ensure([], (require) => {
			cb(null, Dashboard)
		})
	}
}