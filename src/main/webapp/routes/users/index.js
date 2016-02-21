import Users from './components/users.jsx';

const path = 'users';

var route = {
	path: path,
	getComponent(location, callback) {
		require.ensure([], (require) => {
			callback(null, Users)
		})
	}
}

module.exports = route;
