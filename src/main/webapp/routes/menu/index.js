import Menu from './components/menu.jsx';

let route = {
	path: 'menu',
	getComponent(location, callback) {
		require.ensure([], (require) => {
			callback(null, Menu)
		})
	}
}

export default route;
