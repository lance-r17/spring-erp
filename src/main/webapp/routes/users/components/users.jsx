import React from 'react'
import { findDOMNode, render } from 'react-dom'
import when from 'when'
import client from '../../../client'
import follow from '../../../follow'
import stompClient from '../../../websocket-listener'


// tag::vars[]
var	root = '/api';
// end::vars[]

// tag::users[]
var Users = React.createClass({
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
                            <PagingWrapper>

                                {/*  User list  */}
                                <div className="table-responsive">
                                    <UserTable />
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

// tag::controls[]
// tag::paging-wrapper[]
var PagingWrapper = React.createClass({
    render: function() {
        return (
            <div className="form-inline dt-bootstrap no-footer">
                <div className="dataTables_length">
                    <label>
                        Show&nbsp;
                        <select name="demo-dt-basic_length" aria-controls="demo-dt-basic" className="form-control input-sm">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        &nbsp;entries
                    </label>
                </div>

                {this.props.children}

                <hr/>

                {/* Pagination */}
                <Pagination />
            </div>
        )
    }
});
// tag::paging-wrapper[]

// tag::pagination[]
var Pagination = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <div className="dataTables_info" role="status" aria-live="polite">
                        Showing 1 to 10 of 57 entries
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="text-right">
                        <ul className="pagination mar-no">
                            <li className="disabled"><a className="fa fa-angle-left" href="#"></a></li>
                            <li className="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><span>...</span></li>
                            <li><a href="#">20</a></li>
                            <li><a className="fa fa-angle-right" href="#"></a></li>
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
        return (
            <table className="table table-hover table-striped table-vcenter mar-top">
                <UserTableHeader />
                <tbody>
                    <tr>
                        <td className="min-w-td">1</td>
                        <td><img src="img/av1.png" alt="Profile Picture" className="img-circle img-sm" /></td>
                        <td><a className="btn-link" href="#">John Doe</a></td>
                        <td>john.doe@example.com</td>
                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 22, 2014</span></td>
                        <td>$24.98</td>
                        <td><span className="label label-table label-info">Trial</span></td>
                        <td className="min-w-td text-center">
                            <div className="btn-group">
                                <a className="btn btn-sm btn-default btn-icon btn-hover-success fa fa-pencil add-tooltip" href="#" data-original-title="Edit" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-danger fa fa-times add-tooltip" href="#" data-original-title="Delete" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-warning fa fa-lock add-tooltip" href="#" data-original-title="Ban user" data-container="body"></a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="min-w-td">2</td>
                        <td><img src="img/av2.png" alt="Profile Picture" className="img-circle img-sm" /></td>
                        <td><a className="btn-link" href="#">Charles S Boyle</a></td>
                        <td>char_boy90@example.com</td>
                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 24, 2014</span></td>
                        <td>$564.00</td>
                        <td><span className="label label-table label-success">Free</span></td>
                        <td className="min-w-td text-center">
                            <div className="btn-group">
                                <a className="btn btn-sm btn-default btn-icon btn-hover-success fa fa-pencil add-tooltip" href="#" data-original-title="Edit" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-danger fa fa-times add-tooltip" href="#" data-original-title="Delete" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-warning fa fa-lock add-tooltip" href="#" data-original-title="Ban user" data-container="body"></a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="min-w-td">3</td>
                        <td><img src="img/av3.png" alt="Profile Picture" className="img-circle img-sm" /></td>
                        <td><a className="btn-link" href="#">Scott S. Calabrese</a></td>
                        <td>scot.em23@example.com</td>
                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 15, 2014</span></td>
                        <td>$58.87</td>
                        <td><span className="label label-table label-purple">Bussiness</span></td>
                        <td className="min-w-td text-center">
                            <div className="btn-group">
                                <a className="btn btn-sm btn-default btn-icon btn-hover-success fa fa-pencil add-tooltip" href="#" data-original-title="Edit" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-danger fa fa-times add-tooltip" href="#" data-original-title="Delete" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-warning fa fa-lock add-tooltip" href="#" data-original-title="Ban user" data-container="body"></a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="min-w-td">4</td>
                        <td><img src="img/av4.png" alt="Profile Picture" className="img-circle img-sm" /></td>
                        <td><a className="btn-link" href="#">Lucy Moon</a></td>
                        <td>just_lucy.doe@example.com</td>
                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 12, 2014</span></td>
                        <td>$97.50</td>
                        <td><span className="label label-table label-mint">Personal</span></td>
                        <td className="min-w-td text-center">
                            <div className="btn-group">
                                <a className="btn btn-sm btn-default btn-icon btn-hover-success fa fa-pencil add-tooltip" href="#" data-original-title="Edit" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-danger fa fa-times add-tooltip" href="#" data-original-title="Delete" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-warning fa fa-lock add-tooltip" href="#" data-original-title="Ban user" data-container="body"></a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="min-w-td">5</td>
                        <td><img src="img/av5.png" alt="Profile Picture" className="img-circle img-sm" /></td>
                        <td><a className="btn-link" href="#">Teresa L. Doe</a></td>
                        <td>ter.l.doe@example.com</td>
                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 24, 2014</span></td>
                        <td>$12.79</td>
                        <td><span className="label label-table label-success">Free</span></td>
                        <td className="min-w-td text-center">
                            <div className="btn-group">
                                <a className="btn btn-sm btn-default btn-icon btn-hover-success fa fa-pencil add-tooltip" href="#" data-original-title="Edit" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-danger fa fa-times add-tooltip" href="#" data-original-title="Delete" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-warning fa fa-lock add-tooltip" href="#" data-original-title="Ban user" data-container="body"></a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="min-w-td">6</td>
                        <td><img src="img/av6.png" alt="Profile Picture" className="img-circle img-sm" /></td>
                        <td><a className="btn-link" href="#">Maria Marz</a></td>
                        <td>maria_545@example.com</td>
                        <td><span className="text-muted"><i className="fa fa-clock-o"></i> Oct 12, 2014</span></td>
                        <td>$249.99</td>
                        <td><span className="label label-table label-info">Trial</span></td>
                        <td className="min-w-td text-center">
                            <div className="btn-group">
                                <a className="btn btn-sm btn-default btn-icon btn-hover-success fa fa-pencil add-tooltip" href="#" data-original-title="Edit" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-danger fa fa-times add-tooltip" href="#" data-original-title="Delete" data-container="body"></a>
                                <a className="btn btn-sm btn-default btn-icon btn-hover-warning fa fa-lock add-tooltip" href="#" data-original-title="Ban user" data-container="body"></a>
                            </div>
                        </td>
                    </tr>
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
                    <th>Balance</th>
                    <th>Subscription</th>
                    <th className="min-w-td text-center">Actions</th>
                </tr>
            </thead>
        )
    }
});
// end::user-table-header[]

module.exports = Users;
