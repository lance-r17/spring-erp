import Employees from './components/employees.jsx'

module.exports = {
	path: 'employees',
	getComponent(location, cb) {
		require.ensure([], (require) => {
			cb(null, Employees)
		})
	}
}