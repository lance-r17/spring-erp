import Menu from './components/report.jsx';

let route = {
	path: 'report',
	getComponent(location, callback) {
		require.ensure([], (require) => {
			callback(null, Menu)
		})
	}
}

export default route;
