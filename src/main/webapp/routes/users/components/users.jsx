import React from 'react';
import { findDOMNode, render } from 'react-dom';
import { Modal, Alert } from 'react-bootstrap';
import InputElement from 'react-input-mask';
import cx from 'classnames';
import when from 'when';
import client from '../../../client';
import follow from '../../../follow';
import stompClient from '../../../websocket-listener';

import { Label, RoleLabel, RoleLabels } from '../../../controls';


// tag::vars[]
const root = '/api';
// end::vars[]

// tag::users[]
var Users = React.createClass({
    loadFromServer: function(pageSize) {
        follow(client, root, [{rel: 'users', params:{size: pageSize}}]
        ).then(userCollection => {
            return client({
                method: 'GET',
                path: userCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                Object.keys(schema.entity.properties).forEach(property => {
                    if (schema.entity.properties[property].hasOwnProperty('format') &&
                        schema.entity.properties[property].format === 'uri') {
                        delete schema.entity.properties[property];
                    }
                    if (schema.entity.properties[property].hasOwnProperty('$ref')) {
                        delete schema.entity.properties[property];
                    }
                });
                this.schema = schema.entity;
                this.links = userCollection.entity._links;
                return userCollection;
            });
        }).then(userCollection => {
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
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: this.links
            });
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
                }
                if (response.status.code === 412) {
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
                attributes: Object.keys(this.schema.properties),
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
                attributes: Object.keys(this.schema.properties),
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

const RoleMapping = {
    'ROLE_MANAGER': 'Manager', 
    'ROLE_APPROVER': 'Approver',
    'ROLE_OPERATOR': 'Operator',
    'ROLE_ADMIN': 'Administrator'
};

// tag::user-edit-modal[]
var UserEditModal = React.createClass({
    handleClick: function(e) {
        e.preventDefault();

       this.open();
    },
    handleRoleChange: function (e) {
    },
    handleSubmit: function (e) {
        e.preventDefault();

        // keep avatarUrl and active status unchanged
        var { name, avatarUrl, active } = this.props.user.entity;
        var updatedUser = { name, avatarUrl, active };

        _.each(["firstName", "lastName", "email", "joinDate"], ref => {
            updatedUser[ref] = findDOMNode(this.refs[ref]).value.trim();
        });
        updatedUser.roles = [];
        _.each(["ROLE_MANAGER", "ROLE_APPROVER", "ROLE_OPERATOR", "ROLE_ADMIN"], role => {
            var ref = role.toLowerCase();
            var node = findDOMNode(this.refs[ref]);
            if (node.checked) {
                updatedUser.roles.push(node.value.trim());
            }
        });
        

        this.props.onUpdate(this.props.user, updatedUser, response => {
            this.props.refreshCurrentPage();
            this.close();
        }, response => {
            if (response.status.code === 403) {
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
        });
        // console.log(updatedUser);

    },
    getInitialState: function() {
        return ({ 
            showModal: false,
            showAlert: false,
            alertTitle: '',
            alertDetails: ''
        });
    },
    close: function() {
        this.setState({
            showModal: false,
            showAlert: false,
            alertTitle: '',
            alertDetails: ''
        });
    },
    open: function() {
        this.setState({ showModal: true });
    },
    render: function() {
        var { name, avatarUrl, firstName, lastName, email, joinDate, active, roles } = this.props.user.entity;
        var rolesEl = [];
        _.each(["ROLE_MANAGER", "ROLE_APPROVER", "ROLE_OPERATOR", "ROLE_ADMIN"], role => {
            var ref = role.toLowerCase();
            var hasRole = _.some(roles, item => {
                return item === role;
            });
            var labelClass = cx('form-checkbox', 'form-icon', 'form-text', hasRole ? 'active' : '')
            var roleEl = (
                <label key={ref} className={labelClass}>
                    <input ref={ref} name={ref} type="checkbox" value={role} defaultChecked={hasRole} onChange={this.handleRoleChange} /> {RoleMapping[role]}
                </label>
            )
            rolesEl.push(roleEl);
        });
        return (
            <span>
                <a className="btn btn-sm btn-default btn-icon btn-hover-success fa fa-pencil add-tooltip" href="#" data-original-title="Edit" data-container="body" onClick={this.handleClick}></a>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PanelAlert bsStyle="danger" show={this.state.showAlert} title={this.state.alertTitle} details={this.state.alertDetails} />
                        <div className="media">
                            <div className="media-left">
                                <img className="media-object img-lg img-circle" src={'img/' + avatarUrl} alt="Profile picture" />
                            </div>
                            <div className="media-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <form className="form-horizontal">
                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="name">User Name</label>
                                                <div className="col-md-4">
                                                    <p className="form-control-static">{name}</p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="name">First Name</label>
                                                <div className="col-md-4">
                                                    <input ref="firstName" defaultValue={firstName} type="text" placeholder="First name" className="form-control input-md" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="name">Last Name</label>
                                                <div className="col-md-4">
                                                    <input ref="lastName" defaultValue={lastName} type="text" placeholder="Last name" className="form-control input-md" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="name">Email</label>
                                                <div className="col-md-4">
                                                    <input ref="email" defaultValue={email} type="email" placeholder="Email" className="form-control input-md" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="name">Join Date</label>
                                                <div className="col-md-4">
                                                    <InputElement ref="joinDate" defaultValue={joinDate} mask="9999-99-99" className="form-control input-md" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-4 control-label" htmlFor="name">Roles</label>
                                                <div className="col-md-8">
                                                    <div className="form-block">
                                                        {rolesEl}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button data-bb-handler="confirm" type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </Modal.Footer>
                </Modal>
            </span>
        )
    }
});
// end::user-edit-modal[]


// tag::controls[]

// tag::panel-alert[]
var PanelAlert = React.createClass({
   render: function() {
       var className = cx('alert-wrap', this.props.show ? 'in' : '');
       return (
           <div className="panel-alert">
               <div className={className}>
                   <Alert bsStyle={this.props.bsStyle}>
                       <strong>{this.props.title}</strong>
                       {this.props.details}
                   </Alert>
               </div>
           </div>
       )
   }
});
// end::panel-alert[]

// tag::paging-wrapper[]
var PagingWrapper = React.createClass({
    // tag::handle-page-size-update[]
    handleChange: function(e) {
        e.preventDefault();
        var pageSize = findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        }
    },
    // end::handle-page-size-update[]
    render: function() {
        var pageSizeOptions = [1, 2, 5, 10, 25, 50, 100];
        var selectOptionsEl = pageSizeOptions.map(size =>
            <option value={size}>{size}</option>
        );
        return (
            <div className="form-inline dt-bootstrap no-footer">
                <div className="dataTables_length">
                    <label>
                        Show&nbsp;
                        <select ref="pageSize" className="form-control input-sm" onChange={this.handleChange} value={this.props.pageSize}>
                            {selectOptionsEl}
                        </select>
                        &nbsp;entries
                    </label>
                </div>

                {this.props.children}

                <hr/>

                {/* Pagination */}
                <Pagination page={this.props.page} 
                            links={this.props.links} 
                            onNavigate={this.props.onNavigate} />
            </div>
        )
    }
});
// tag::paging-wrapper[]

// tag::pagination[]
var Pagination = React.createClass({
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
    handleDisableClick: function (e) {
        e.preventDefault();
    },
    // end::handle-nav[]
    render: function() {
        var records = null;
        var navLinks = [];

        if (this.props.page) {
            var { size, totalElements, totalPages, number } = this.props.page;
            var first = number * size + 1;
            var last = Math.min((number + 1) * size, totalElements);
            records = `Showing ${first} to ${last} of ${totalElements} entries`;

            // build pagination links
            if ("prev" in this.props.links) {
                navLinks.push(<li key="prev"><a className="fa fa-angle-left" href="#" onClick={this.handleNavPrev}></a></li>)
            } else {
                navLinks.push(<li key="prev" className="disabled"><a className="fa fa-angle-left" href="#" onClick={this.handleDisableClick}></a></li>);
            }
            
            if ("first" in this.props.links && number !== 0) {
                navLinks.push(<li key="first"><a href="#" onClick={this.handleNavFirst}>1</a></li>);
            } else {
                navLinks.push(<li key="first" className="active"><a href="#" onClick={this.handleDisableClick}>1</a></li>);
            }

            if (number > 3 || (number === 3 & number < totalPages - 1)) {
                navLinks.push(<li><span>...</span></li>);
            }

            if (number > 1 && number + 3 != totalPages && "prev" in this.props.links) {
                navLinks.push(<li key="preceeding"><a href="#" onClick={this.handleNavPrev}>{number}</a></li>)
            }

            if (number > 0 && number < totalPages - 1) {
                navLinks.push(<li key="current" className="active"><a href="#" onClick={this.handleDisableClick}>{number + 1}</a></li>);
            }

            if (number !== 2 && number + 2 < totalPages && "next" in this.props.links) {
                navLinks.push(<li key="after"><a href="#" onClick={this.handleNavNext}>{number + 2}</a></li>)
            }

            if (number < totalPages - 3) {
                navLinks.push(<li><span>...</span></li>);
            }

            if ("last" in this.props.links && totalPages > number + 1) {
                navLinks.push(<li key="last"><a href="#" onClick={this.handleNavLast}>{totalPages}</a></li>);
            } else if (totalPages > 1 && totalPages === number + 1) {
                navLinks.push(<li key="last" className="active"><a href="#" onClick={this.handleDisableClick}>{totalPages}</a></li>);
            }
            
            if ("next" in this.props.links) {
                navLinks.push(<li key="next"><a className="fa fa-angle-right" href="#" onClick={this.handleNavNext}></a></li>)
            } else {
                navLinks.push(<li key="next" className="disabled"><a className="fa fa-angle-right" href="#" onClick={this.handleDisableClick}></a></li>);
            }
        }

        return (
            <div className="row">
                <div className="col-sm-6">
                    <div className="dataTables_info" role="status" aria-live="polite">
                        {records}
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="text-right">
                        <ul className="pagination mar-no">
                            {/*
                            <li className="disabled"><a className="fa fa-angle-left" href="#"></a></li>
                            <li className="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><span>...</span></li>
                            <li><a href="#">20</a></li>
                            <li><a className="fa fa-angle-right" href="#"></a></li>
                            */}
                            {navLinks}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});
// end::pagination[]
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
