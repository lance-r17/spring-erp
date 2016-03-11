import Users from './components/users.jsx';

let route = {
	path: 'users',
	getComponent(location, callback) {
		require.ensure([], (require) => {
			callback(null, Users)
		})
	}
}

export default route;