import Employees from './components/employees.jsx';

const path = 'employees';

var route = {
	path: path,
	getComponent(location, callback) {
		require.ensure([], (require) => {
			callback(null, Employees)
		})
	}
}

var fullPaths = {};

fullPaths.employees = '/' + route.path;

module.exports = route;
module.exports.fullPaths = fullPaths;