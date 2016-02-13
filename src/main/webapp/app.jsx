define(function (require){
	'use strict';
	
	// tag::vars[]
	var React = require('react'),
		ReactDOM = require('react-dom'),
        when = require('when'),
	    client = require('./client'),
		follow = require('./follow'),
		root = '/api';
	// end::vars[]

	require('./less/main.less');

	// tag::app[]
	var App = React.createClass({
		// tag::follow-2[]
		loadFromServer: function(pageSize) {
			follow(client, root, [{rel: 'employees', params:{size: pageSize}}]
			).then(employeeCollection => {
				return client({
					method: 'GET',
					path: employeeCollection.entity._links.profile.href,
					headers: {'Accept': 'application/schema+json'}
				}).then(schema => {
					this.schema = schema.entity;
                    this.links = employeeCollection.entity._links;
					return employeeCollection;
				});
			}).then(employeeCollection => {
				return employeeCollection.entity._embedded.employees.map(employee =>
					client({
						method: 'GET',
						path: employee._links.self.href
					})
				);
			}).then(employeePromises => {
				return when.all(employeePromises);
			}).done(employees => {
				this.setState({
					employees: employees,
					attributes: Object.keys(this.schema.properties),
					pageSize: pageSize,
					links: this.links
				});
			});
		},
		// end::follow-2[]
		// tag::create[]
		onCreate: function (employee) {
			follow(client, root, ['employees']
			).then(employeeCollection => {
				return client({
					method: 'POST',
					path: employeeCollection.entity._links.self.href,
					entity: employee,
					headers: {'Content-Type': 'application/json'}
				})
			}).then(response => {
				return follow(client, root, [
					{rel: 'employees', params: {size: this.state.pageSize}}
				]);
			}).done(response => {
				this.onNavigate(response.entity._links.last.href);
			});
		},
		// end::create[]
        // tag::update[]
        onUpdate: function(employee, updatedEmployee) {
            client({
                method: 'PUT',
                path: employee.entity._links.self.href,
                entity: updatedEmployee,
                headers: {
                    'Content-Type': 'application/json',
                    'If-Match': employee.headers.Etag
                }
            }).done(response => {
                this.loadFromServer(this.state.pageSize);
            }, response => {
                if (response.status.code === 412) {
                    alert('DENIED: Unable to update ' + employee.entity._links.self.href + '. Your copy is stale.');
                }
            });
        },
        // end::update[]
		// tag::delete[]
		onDelete: function (employee) {
			client({
				method: 'DELETE',
				path: employee._links.self.href
			}).done(response => {
				this.loadFromServer(this.state.pageSize);
			});
		},
		// end::delete[]
		// tag::navigate[]
		onNavigate: function(navUri) {
			client({
				method: 'GET',
				path: navUri
			}).then(employeeCollection => {
                this.links = employeeCollection.entity._links;

                return employeeCollection.entity._embedded.employees.map(employee =>
                    client({
                        method: 'GET',
                        path: employee._links.self.href
                    })
                );
            }).then(employeePromises => {
                return when.all(employeePromises);
            }).done(employees => {
				this.setState({
					employees: employees,
					attributes: Object.keys(this.schema.properties),
					pageSize: this.state.pageSize,
					links: this.links
				})
			})
		},
		// end::navigate[]
		// tag::update-page-size[]
		updatePageSize: function(pageSize) {
			if (this.state.pageSize !== pageSize) {
				this.loadFromServer(pageSize);
			}
		},
		// end::update-page-size[]
		getInitialState: function() {
			return ({
				employees: [],
				attributes: [],
				pageSize: 2,
				links: {}
			});
		},
		componentDidMount: function() {
			this.loadFromServer(this.state.pageSize);
		},
		render: function () {
			return (
				<div>
					<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate} />
					<EmployeeList employees={this.state.employees}
                                  attributes={this.state.attributes}
								  links={this.state.links}
								  pageSize={this.state.pageSize}
                                  onUpdate={this.onUpdate}
								  onNavigate={this.onNavigate}
								  onDelete={this.onDelete}
								  updatePageSize={this.updatePageSize} />
				</div>
			)
		}
	});
	// end::app[]

	// tag::create-dialog[]
	var CreateDialog = React.createClass({

		handleSubmit: function(e) {
			e.preventDefault();

			var newEmployee = {};
			this.props.attributes.forEach(attribute => {
				newEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
			});
			console.log(newEmployee);
			this.props.onCreate(newEmployee);

			// Clear out the dialog's input
			this.props.attributes.forEach(attribute => {
				ReactDOM.findDOMNode(this.refs[attribute]).value = '';
			});

			// Navigate away from the dialog to hide it
			window.location = '#';
		},

		render: function() {
			var inputs = this.props.attributes.map(attribute =>
				<p key={attribute}>
					<input type="text" placeholder={attribute} ref={attribute} className="field"/>
				</p>
			);

			return (
				<div>
					<a href="#createEmployee">Create</a>

					<div id="createEmployee" className="modalDialog">
						<div>
							<a href="#" title="Close" className="close">X</a>

							<h2>Create new employee</h2>

							<form>
								{inputs}
								<button onClick={this.handleSubmit}>Create</button>
							</form>
						</div>
					</div>
				</div>
			)
		}
	});
	// end::create-dialog[]

    // tag::update-dialog[]
    var UpdateDialog = React.createClass({
        handleSubmit: function(e) {
            e.preventDefault();

            var updatedEmployee = {};
            this.props.attributes.forEach(attribute => {
                updatedEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
            });
            this.props.onUpdate(this.props.employee, updatedEmployee);
            window.location = "#";
        },
        render: function() {
            var inputs = this.props.attributes.map(attribute =>
                <p key={this.props.employee.entity[attribute]}>
                    <input type="text" placeholder={attribute} defaultValue={this.props.employee.entity[attribute]}
                           ref={attribute} className="field"/>
                </p>
            );

            var dialogId = "updateEmployee-" + this.props.employee.entity._links.self.href;

            return (
                <div key={this.props.employee.entity._links.self.href}>
                    <a href={"#" + dialogId}>Update</a>

                    <div id={dialogId} className="modalDialog">
                        <div>
                            <a href="#" title="Close" className="close">X</a>

                            <h2>Update an employee</h2>

                            <form>
                                {inputs}
                                <button onClick={this.handleSubmit}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    });
    // end::update-dialog[]

	// tag::employee-list[]
	var EmployeeList = React.createClass({
		// tag::handle-page-size-update[]
		handleInput: function(e) {
			e.preventDefault();
			var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
			if (/^[0-9]+$/.test(pageSize)) {
				this.props.updatePageSize(pageSize);
			} else {
				ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
			}
		},
		// end::handle-page-size-update[]
		// tag::handle-nav[]
		handleNavFirst: function(e) {
			e.preventDefault();
			this.props.onNavigate(this.props.links.first.href);
		},
		handleNavPrev: function(e) {
			e.preventDefault();
			this.props.onNavigate(this.props.links.prev.href);
		},
		handleNavNext: function(e) {
			e.preventDefault();
			this.props.onNavigate(this.props.links.next.href);
		},
		handleNavLast: function(e) {
			e.preventDefault();
			this.props.onNavigate(this.props.links.last.href);
		},
		// end::handle-nav[]
		// tag::employee-list-render[]
		render: function() {
			var employees = this.props.employees.map(employee => 
				<Employee key={employee.entity._links.self.href} employee={employee} attributes={this.props.attributes} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} />
			);

			var navLinks = [];
			if ("first" in this.props.links) {
				navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
			}
			if ("prev" in this.props.links) {
				navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
			}
			if ("next" in this.props.links) {
				navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
			}
			if ("last" in this.props.links) {
				navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
			}

			return (
				<div>
					<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
					<table>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Description</th>
                                <th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{employees}
						</tbody>
					</table>
					<div>
						{navLinks}
					</div>
				</div>
			)
		}
		// end::employee-list-render[]
	});
	// end::employee-list[]

	// tag::employee[]
	var Employee = React.createClass({
		handleDelete: function() {
			this.props.onDelete(this.props.employee);
		},
		render: function() {
			return (
				<tr>
					<td>{this.props.employee.entity.firstName}</td>
					<td>{this.props.employee.entity.lastName}</td>
					<td>{this.props.employee.entity.description}</td>
                    <td>
                        <UpdateDialog employee={this.props.employee}
                                      attributes={this.props.attributes}
                                      onUpdate={this.props.onUpdate} />
                    </td>
					<td>
						<button onClick={this.handleDelete}>Delete</button>
					</td>
				</tr>
			)
		}
	});
	// end::employee[]

	// tag::render[]
	ReactDOM.render(
		<App />,
		document.getElementById('react')
	)
	// end::render[]
});
