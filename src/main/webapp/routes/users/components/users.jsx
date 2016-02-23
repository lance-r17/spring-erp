import React from 'react';
import { findDOMNode, render } from 'react-dom';
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
    // end::update-page-size[]
    getInitialState: function() {
        return ({
            users: [],
            attributes: [],
            pageSize: 1,
            links: {}
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
                                           onNavigate={this.onNavigate} >

                                {/*  User list  */}
                                <div className="table-responsive">
                                    <UserTable users={this.state.users} page={this.state.page} />
                                </div>

                            </PagingWrapper>
                        </div>
                    </div>
                </div>
                {/* End page content */}

                <div className="bootbox modal fade in" tabindex="-1" role="dialog" aria-hidden="false" style={{display: 'block', paddingRight: '0px'}}>
                    <div className="modal-backdrop fade in" style={{height: '398px'}}></div>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4 className="modal-title">That html</h4>
                            </div>

                            <div className="modal-body">
                                <div className="bootbox-body">
                                    <div className="media">
                                        <div className="media-left">
                                            <img className="media-object img-lg img-circle" src="img/av3.png" alt="Profile picture" />
                                        </div>
                                        <div className="media-body">
                                            <h4 className="text-thin">You can also use <strong>html</strong></h4>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button data-bb-handler="confirm" type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
});
// end::users[]

// tag::controls[]
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
            <UserTableRow key={user.entity._links.self.href} user={user} sequence={sequence++} />
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
    render: function () {
        var { avatarUrl, firstName, lastName, email, joinDate, active, roles } = this.props.user.entity;
        var fullName = `${firstName}  ${lastName}`;

        var options = {styleName: 'label-table'};
        var roles = roles.map(role =>
            <RoleLabel key={role} role={role} options={options} />
        );

        _.extend(options, (active ? {content: 'active', color: 'success'} : {content: 'disabled', color: 'default'}));
        var statusEl = <Label options={options} />
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
                        <a className="btn btn-sm btn-default btn-icon btn-hover-success fa fa-pencil add-tooltip" href="#" data-original-title="Edit" data-container="body"></a>
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
