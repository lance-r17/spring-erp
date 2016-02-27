import React from 'react';
import cx from 'classnames';
import when from 'when';
import api from '../../../lib/apiHelper';
import client from '../../../lib/client';
import follow from '../../../lib/follow';

import { Label, RoleLabel, RoleLabels, Formsy, FormStatic, FormInput, FormCheckboxGroup, Modal, PanelAlert, PagingWrapper } from '../../../controls';


// tag::vars[]
const root = '/api';

const ROLES_OPTION = [
    {
        value: 'ROLE_MANAGER',
        display: 'Manager'
    },
    {
        value: 'ROLE_APPROVER',
        display : 'Approver'
    },
    {
        value: 'ROLE_OPERATOR', 
        display: 'Operator'
    },
    {
        value: 'ROLE_ADMIN',
        display: 'Administrator'
    }
];
// end::vars[]


// tag::users[]
var Users = React.createClass({
    loadFromServer: function(pageSize) {
        api.loadPagingData({
            rel: 'users', 
            pageSize: pageSize, 
            callback: response => {
                this.setState({
                    page: response.page,
                    users: response.items,
                    schema: response.schema,
                    attributes: response.attributes,
                    pageSize: pageSize,
                    links: response.links
                });
            }
        });
    },
    // tag::update[]
    onUpdate: function(user, updatedUser, successCallBack, failCallBack) {
        client({
            method: 'PUT',
            path: user.entity._links.self.href,
            entity: updatedUser,
            headers: {
                'Content-Type': 'application/json',
                'If-Match': user.headers.Etag
            }
        }).done(response => {
            /* Let the websocket handler update the state */
            if (successCallBack) {
                successCallBack(response);
            }
        }, response => {
            if (failCallBack) {
                failCallBack(response);
            } else {
                if (response.status.code === 403) {
                    alert('ACCESS DENIED: You are not authorized to update ' + user.entity._links.self.href);
                } else if (response.status.code === 412) {
                    alert('DENIED: Unable to update ' + user.entity._links.self.href + '. Your copy is stale.');
                }
            }
        });
    },
    // end::update[]
    // tag::update-page-size[]
    updatePageSize: function(pageSize) {
        if (this.state.pageSize !== pageSize) {
            this.loadFromServer(pageSize);
        }
    },
    // tag::navigate[]
    onNavigate: function(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then(userCollection => {
            this.links = userCollection.entity._links;
            this.page = userCollection.entity.page;

            return userCollection.entity._embedded.users.map(user =>
                client({
                    method: 'GET',
                    path: user._links.self.href
                })
            );
        }).then(userPromises => {
            return when.all(userPromises);
        }).done(users => {
            this.setState({
                page: this.page,
                users: users,
                attributes: Object.keys(this.state.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            })
        })
    },
    // end::navigate[]
    // tag::refresh-current-page[]
    refreshCurrentPage: function() {
        follow(client, root, [{
            rel: 'users',
            params: {
                size: this.state.pageSize,
                page: this.state.page.number
            }
        }]).then(userCollection => {
            this.links = userCollection.entity._links;
            this.page = userCollection.entity.page;

            return userCollection.entity._embedded.users.map(user => {
                return client({
                    method: 'GET',
                    path: user._links.self.href
                })
            });
        }).then(userPromises => {
            return when.all(userPromises);
        }).done(users => {
            this.setState({
                page: this.page,
                users: users,
                attributes: Object.keys(this.state.schema.properties),
                pageSize: this.state.pageSize,
                links: this.links
            })
        });
    },
    // end::refresh-current-page[]
    // end::update-page-size[]
    getInitialState: function() {
        return ({
            users: [],
            attributes: [],
            pageSize: 1,
            links: {},
            createModalOpen: false
        });
    },
    componentDidMount: function() {
        this.loadFromServer(this.state.pageSize);
    },
    render: function() {
        return (
            <div id="content-container">

                {/* Page Title */}
                {/* =================================================== */}
                <div id="page-title">
                    <h1 className="page-header text-overflow">Users</h1>
                </div>

                {/* Page content */}
                {/* =================================================== */}
                <div id="page-content">
                    <div className="panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">Users Management</h3>
                        </div>
                        <div className="panel-body">
                            <PagingWrapper pageSize={this.state.pageSize} 
                                           page={this.state.page} 
                                           links={this.state.links} 
                                           updatePageSize={this.updatePageSize}
                                           onNavigate={this.onNavigate}  >

                                {/*  User list  */}
                                <div className="table-responsive">
                                    <UserTable users={this.state.users} 
                                               page={this.state.page} 
                                               onUpdate={this.onUpdate}
                                               refreshCurrentPage={this.refreshCurrentPage} />
                                </div>

                            </PagingWrapper>
                        </div>
                    </div>
                </div>
                {/* End page content */}

            </div>
        )
    }
});
// end::users[]

// tag::user-edit-modal[]
var UserEditModal = React.createClass({
    handleClick: function(e) {
        e.preventDefault();

       this.open();
    },
    enableSubmit: function () {
        this.setState({
            canSubmit: true
        });
    },
    disableSubmit: function () {
        this.setState({
            canSubmit: false
        });
    },
    handleSubmit: function (data, restModel, updateInputsWithError) {
        var { avatarUrl } = this.props.user.entity;
        var updatedUser = { avatarUrl };
        _.extend(updatedUser, data);
        this.props.onUpdate(this.props.user, updatedUser, response => {
            this.props.refreshCurrentPage();
            this.close();
        }, response => {
            if (response.status.code === 400) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'REQUEST REJECTED!',
                    alertDetails: ''
                });
                updateInputsWithError(response.entity.errors);
            } else if (response.status.code === 403) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'ACCESS DENIED!',
                    alertDetails: 'You are not authorized to update this user.'
                });
            } else if (response.status.code === 412) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'DENIED!',
                    alertDetails: 'Unable to update. Your copy is stale.'
                });
            } else {
                console.log(response);
            }

            return response;
        });
    },
    clearAlert: function () {
        this.setState({
            showAlert: false,
            alertTitle: '',
            alertDetails: ''
        });
    },
    close: function() {
        this.clearAlert();
        this.setState({ showModal: false });
    },
    open: function() {
        this.setState({ showModal: true });
    },
    getInitialState: function() {
        return ({
            canSubmit: false,
            showModal: false,
            showAlert: false,
            alertTitle: '',
            alertDetails: ''
        });
    },
    render: function() {
        var { name, avatarUrl, firstName, lastName, email, joinDate, active, roles } = this.props.user.entity;
        return (
            <span>
                <a className="btn btn-sm btn-default btn-icon btn-hover-success fa fa-pencil add-tooltip" href="#" data-original-title="Edit" data-container="body" onClick={this.handleClick}></a>
                
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.enableSubmit} onInvalid={this.disableSubmit}>

                        <Modal.Header closeButton>
                            <Modal.Title>User Edit</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>
                            <PanelAlert bsStyle="danger" show={this.state.showAlert} title={this.state.alertTitle} errors={this.state.alertDetails} />
                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object img-lg img-circle" src={'img/' + avatarUrl} alt="Profile picture" />
                                </div>
                                <div className="media-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormStatic name="name" defaultValue={name} title="Username" />
                                            <FormInput name="firstName" defaultValue={firstName} type="text" title="First name" required />
                                            <FormInput name="lastName" defaultValue={lastName} type="text" title="Last name" required />
                                            <FormInput name="email" defaultValue={email} type="email" title="Email" validations="isEmail" validationError="This is not a valid email" required/>
                                            <FormInput name="joinDate" defaultValue={joinDate} type="text" title="Join Date" mask="9999-99-99" validations="isDate" validationError="This is not a valid date" required/>
                                            <FormCheckboxGroup name="roles" value={roles} title="Roles" items={ROLES_OPTION} />
                                            <FormStatic name="active" defaultValue={active} hidden />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <button type="submit" className="btn btn-primary" disabled={!this.state.canSubmit}>Save</button>
                        </Modal.Footer>

                    </Formsy.Form>
                </Modal>
                
            </span>
        )
    }
});
// end::user-edit-modal[]

// tag::controls[]


// end::controls[]

// tag::user-table[]
var UserTable = React.createClass({
    render: function() {
        var sequence = 1;
        if (this.props.page) {
            var { number, size } = this.props.page;
            sequence = number * size + 1;
        }
        var users = this.props.users.map(user =>
            <UserTableRow key={user.entity._links.self.href} 
                          user={user} 
                          sequence={sequence++} 
                          onUpdate={this.props.onUpdate}
                          refreshCurrentPage={this.props.refreshCurrentPage} />
        );
        return (
            <table className="table table-hover table-striped table-vcenter mar-top">
                <UserTableHeader />
                <tbody>
                    {users}
                </tbody>
            </table>
        )
    }
});
// end::user-table[]

// tag::user-table-header[]
var UserTableHeader = React.createClass({
    render: function () {
        return (
            <thead>
                <tr>
                    <th className="min-w-td">#</th>
                    <th className="min-w-td">User</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Join Date</th>
                    <th>Status</th>
                    <th>Roles</th>
                    <th className="min-w-td text-center">Actions</th>
                </tr>
            </thead>
        )
    }
});
// end::user-table-header[]

// tag::user-table-row[]
var UserTableRow = React.createClass({
    
    closeModal: function() {
        this.setState({
            editModalOpen: false
        });
    },
    getInitialState: function() {
        return ({
            editModalOpen: false
        });
    },
    render: function () {
        var { avatarUrl, firstName, lastName, email, joinDate, active, roles } = this.props.user.entity;
        var fullName = `${firstName}  ${lastName}`;

        var options = {styleName: 'label-table'};
        var roles = roles.map(role =>
            <RoleLabel key={role} role={role} options={options} />
        );

        _.extend(options, (active ? {content: 'active', color: 'success'} : {content: 'disabled', color: 'default'}));
        var statusEl = <Label options={options} />
        var modalEl = this.state.editModalOpen ? <Modal title={'Edit User'} open={this.state.editModalOpen} user={this.props.user} closeModal={this.closeModal} /> : null;
        return (
            <tr>
                <td className="min-w-td">{this.props.sequence}</td>
                <td><img src={'img/' + avatarUrl} alt="Profile Picture" className="img-circle img-sm" /></td>
                <td><a className="btn-link" href="#">{fullName}</a></td>
                <td>{email}</td>
                <td><span className="text-muted"><i className="fa fa-clock-o"></i> {joinDate}</span></td>
                <td>{statusEl}</td>
                <td className="labels">
                    {roles}
                </td>
                <td className="min-w-td text-center">
                    <div className="btn-group">
                        <UserEditModal user={this.props.user} 
                                       onUpdate={this.props.onUpdate}
                                       refreshCurrentPage={this.props.refreshCurrentPage} />
                        <a className="btn btn-sm btn-default btn-icon btn-hover-danger fa fa-times add-tooltip" href="#" data-original-title="Delete" data-container="body"></a>
                        <a className="btn btn-sm btn-default btn-icon btn-hover-warning fa fa-lock add-tooltip" href="#" data-original-title="Ban user" data-container="body"></a>
                    </div>
                </td>
                
            </tr>
        )
    }
});
// end::user-table-row[]

module.exports = Users;
