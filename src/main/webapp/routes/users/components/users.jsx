import React from 'react';
import api from '../../../lib/apiHelper';

import { RoleLabel, RoleLabels, Formsy, FormStatic, FormInput, FormCheckboxGroup, ImageSelect, Button, Label, Modal, PanelAlert, Paging, Table, Tooltip, OverlayTrigger, Avatar, FaIcon, NanoScroller } from '../../../controls';
import { formModal } from '../../../decorators';

// tag::vars[]

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

const AVATAR_IMAGES = [
    'av1.png', 'av2.png', 'av3.png', 'av4.png', 'av5.png', 'av6.png'
];
// end::vars[]


// tag::users[]
export default class Users extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            users: [],
            attributes: [],
            pageSize: 1,
            links: {},
            createModalOpen: false
        };
    }

    getUsers = (pageSize) => {
        api.getAllByPaging({
            rel: 'users', 
            pageSize: pageSize, 
            onSuccess: response => {
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
    }

    // tag::create[]
    onCreate = (user, successCallback, errorCallback) => {
        api.getSearchLinks({
            rel: 'users',
            onSuccess: links => {
                if (links.existsByName) {
                    api.get({
                        path: links.existsByName.href,
                        params: { name: user.name },
                        onSuccess: response => {
                            if (!response.entity) {
                                api.post({
                                    rel: 'users',
                                    item: user,
                                    onSuccess: successCallback,
                                    onError: errorCallback
                                })
                            } else {
                                errorCallback({
                                    errors: {
                                        name: "Username already exists"
                                    }
                                });
                            }
                        }
                    });
                }
            }
        })
        
    }
    // end::create[]

    // tag::update[]
    onUpdate = (user, updatedUser, successCallback, errorCallback) => {
        api.patch({
            item: user,
            updatedItem: updatedUser,
            onSuccess: successCallback,
            onError: errorCallback
        });
    }
    // end::update[]

    // tag::disable[]
    onDisable = (user, successCallback, errorCallback) => {
        api.patch({
            item: user,
            updatedItem: { active : false },
            onSuccess: successCallback,
            onError: errorCallback
        });
    }
    // end::disable[]

    // tag::enable[]
    onEnable = (user, successCallback, errorCallback) => {
        api.patch({
            item: user,
            updatedItem: { active : true },
            onSuccess: successCallback,
            onError: errorCallback
        });
    }
    // end::enable[]

    // tag::delete[]
    onDelete = (user, successCallback, errorCallback) => {
        api.delete({
            item: user,
            onSuccess: successCallback,
            onError: errorCallback
        });
    }
    // end::delete[]

    // tag::update-page-size[]
    updatePageSize = (pageSize) => {
        if (this.state.pageSize !== pageSize) {
            this.getUsers(pageSize);
        }
    }
    // end::update-page-size[]

    // tag::navigate[]
    onNavigate = (navUri) => {
        api.navigateTo({
            navUri: navUri,
            resource: 'users',
            onSuccess: response => {
                this.setState({
                    page: response.page,
                    users: response.items,
                    links: response.links
                });
            }
        });
    }
    // end::navigate[]

    // tag::refresh-and-go-to-last-page[]
    refreshAndGoToLastPage = () => {
        api.getLinksByPage({
            rel: 'users',
            pageSize: this.state.pageSize,
            onSuccess: links => {
                this.onNavigate((links.last || links.self).href);
            }
        });
    }
    // end::refresh-and-go-to-last-page[]

    // tag::refresh-current-page[]
    refreshCurrentPage = () => {
        api.getAllByPaging({
            rel: 'users',
            pageSize: this.state.pageSize,
            pageNumber: this.state.page.number,
            schema: this.state.schema,
            onSuccess: response => {
                this.setState({
                    page: response.page,
                    users: response.items,
                    attributes: response.attributes,
                    pageSize: this.state.pageSize,
                    links: response.links
                });
            }
        });
    }
    // end::refresh-current-page[]


    componentDidMount() {
        this.getUsers(this.props.pageSize || this.state.pageSize);
    }

    render() {
        return (
            <div id="content-container">

                {/* Page Title */}
                <div id="page-title">
                    <h1 className="page-header text-overflow">Users</h1>
                </div>
                {/* End page Title */}

                {/* Page content */}
                <div id="page-content">
                    <div className="panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">Users Management</h3>
                        </div>
                        <div className="panel-body">
                            <Paging.Wrapper>

                                <Paging.Toolbar pageSize={this.state.pageSize}
                                                updatePageSize={this.updatePageSize} >
                                    <UserCreateModal toggleButton={{value: 'Add', className: 'btn-labeled fa fa-plus', bsStyle: 'info'}}
                                                     onCreate={this.onCreate}
                                                     refreshAndGoToLastPage={this.refreshAndGoToLastPage} />
                                </Paging.Toolbar>

                                {/*  User list  */}
                                <UserTable users={this.state.users} 
                                           page={this.state.page} 
                                           onUpdate={this.onUpdate}
                                           onDisable={this.onDisable}
                                           onEnable={this.onEnable}
                                           onDelete={this.onDelete}
                                           refreshCurrentPage={this.refreshCurrentPage} />

                                <hr/>

                                <Paging.Pagination page={this.state.page}
                                                   links={this.state.links}
                                                   onNavigate={this.onNavigate} />

                            </Paging.Wrapper>
                        </div>
                    </div>
                </div>
                {/* End page content */}

            </div>
        )
    }
}
// end::users[]

// tag::user-create-modal[]
@formModal
class UserCreateModal extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (data, reset, invalidate) => {
        var newUser = {};
        _.extend(newUser, data);
        this.props.onCreate(newUser, response => {
            this.props.refreshAndGoToLastPage();
            this.props.closeModal();
        }, response => {
            if (response.errors) {
                invalidate(response.errors);
            } else if (response.status.code === 400) {
                this.props.popAlert('REQUEST REJECTED!', response.entity.errors);
            } else if (response.status.code === 403) {
                this.props.popAlert('ACCESS DENIED!', 'You are not authorized to update this user.');
            } else {
                console.log(response);
            }

            return response;
        });
    }

    render() {
        return (
            <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.props.enableSubmit} onInvalid={this.props.disableSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="media">
                        {this.props.alerts}

                        <div className="media-left navbar-top-links">
                            <ImageSelect id="user-create-img-sel" name="avatarUrl" values={AVATAR_IMAGES} bsSize="lg" circle />
                        </div>
                        <div className="media-body">
                            <FormInput name="name" title="Username" required />
                            <FormInput name="firstName" type="text" title="First name" required />
                            <FormInput name="lastName" type="text" title="Last name" required />
                            <FormInput name="email" type="email" title="Email" validations="isEmail" validationError="This is not a valid email" required/>
                            <FormInput name="joinDate" type="text" title="Join Date" mask="9999-99-99" validations="isDate" validationError="This is not a valid date" required/>
                            <FormCheckboxGroup name="roles" title="Roles" items={ROLES_OPTION} />
                            <FormStatic name="active" defaultValue={true} hidden />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button type="submit" className="btn btn-primary" disabled={!this.props.canSubmit}>Save</button>
                </Modal.Footer>

            </Formsy.Form>
        )
    }
}
// end::user-create-modal[]

// tag::user-edit-modal[]
@formModal
class UserEditModal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (data, reset, invalidate) => {
        var updatedUser = {};
        _.extend(updatedUser, data);
        this.props.onUpdate(this.props.user, updatedUser, response => {
            this.props.refreshCurrentPage();
            this.props.closeModal();
        }, response => {
            if (response.errors) {
                invalidate(response.errors);
            } else if (response.status.code === 400) {
                this.props.popAlert('REQUEST REJECTED!', response.entity.errors);
            } else if (response.status.code === 403) {
                this.props.popAlert('ACCESS DENIED!', 'You are not authorized to update this user.');
            } else if (response.status.code === 404) {
                this.props.popAlert('DENIED!', 'User is not found.');
            } else if (response.status.code === 412) {
                this.props.popAlert('DENIED!', 'Unable to update. Your copy is stale.');
            } else {
                console.log(response);
            }

            return response;
        });
    }

    render() {
        var { name, avatarUrl, firstName, lastName, email, joinDate, roles } = this.props.user.entity;
        return (
            <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.props.enableSubmit} onInvalid={this.props.disableSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title>User Edit</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {this.props.alerts}

                    <div className="media">
                        <div className="media-left navbar-top-links">
                            <ImageSelect id="user-create-img-sel" name="avatarUrl" defaultValue={avatarUrl} values={AVATAR_IMAGES} bsSize="lg" circle />
                        </div>
                        <div className="media-body">
                            <FormStatic name="name" defaultValue={name} title="Username" />
                            <FormInput name="firstName" defaultValue={firstName} type="text" title="First name" required />
                            <FormInput name="lastName" defaultValue={lastName} type="text" title="Last name" required />
                            <FormInput name="email" defaultValue={email} type="email" title="Email" validations="isEmail" validationError="This is not a valid email" required/>
                            <FormInput name="joinDate" defaultValue={joinDate} type="text" title="Join Date" mask="9999-99-99" validations="isDate" validationError="This is not a valid date" required/>
                            <FormCheckboxGroup name="roles" value={roles} title="Roles" items={ROLES_OPTION} />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button type="submit" className="btn btn-primary" disabled={!this.props.canSubmit}>Save</button>
                </Modal.Footer>

            </Formsy.Form>
        )
    }
}
// end::user-edit-modal[]

// tag::user-delete-modal[]
@formModal
class UserDeleteModal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (data, reset, invalidate) => {
        this.props.onDelete(this.props.user, response => {
            this.props.refreshCurrentPage();
            this.props.closeModal();
        }, response => {
            if (response.errors) {
                invalidate(response.errors);
            } else if (response.status.code === 400) {
                this.props.popAlert('REQUEST REJECTED!', response.entity.errors);
            } else if (response.status.code === 403) {
                this.props.popAlert('ACCESS DENIED!', 'You are not authorized to update this user.');
            } else if (response.status.code === 404) {
                this.props.popAlert('DENIED!', 'User is not found.');
            } else if (response.status.code === 412) {
                this.props.popAlert('DENIED!', 'Unable to update. Your copy is stale.');
            } else {
                console.log(response);
            }

            return response;
        });
    }

    render() {
        var { avatarUrl, firstName, lastName } = this.props.user.entity;
        return (
            <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.props.enableSubmit} onInvalid={this.props.disableSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {this.props.alerts}

                    <div className="media">
                        <div className="media-left">
                            <Avatar src={`img/${avatarUrl}`} bsSize="lg" />
                        </div>
                        <div className="media-body">
                            <h4 className="text-thin">Are you sure to delete user profile of <strong>{ `${firstName} ${lastName}` }</strong>?</h4>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button data-bb-handler="cancel" type="button" className="btn btn-default" onClick={this.props.closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Confirm</button>
                </Modal.Footer>

            </Formsy.Form>
        )
    }
}
// end::user-delete-modal[]

// tag::user-disable-modal[]
@formModal
class UserDisableModal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (data, reset, invalidate) => {
        this.props.onDisable(this.props.user, response => {
            this.props.refreshCurrentPage();
            this.props.closeModal();
        }, response => {
            if (response.errors) {
                invalidate(response.errors);
            } else if (response.status.code === 400) {
                this.props.popAlert('REQUEST REJECTED!', response.entity.errors);
            } else if (response.status.code === 403) {
                this.props.popAlert('ACCESS DENIED!', 'You are not authorized to update this user.');
            } else if (response.status.code === 404) {
                this.props.popAlert('DENIED!', 'User is not found.');
            } else if (response.status.code === 412) {
               this.props.popAlert('DENIED!', 'Unable to update. Your copy is stale.');
            } else {
                console.log(response);
            }

            return response;
        });
    }

    render() {
        var { avatarUrl, firstName, lastName } = this.props.user.entity;
        return (
            <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.props.enableSubmit} onInvalid={this.props.disableSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title>Disable User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.alerts}

                    <div className="media">
                        <div className="media-left">
                            <Avatar src={`img/${avatarUrl}`} bsSize="lg" />
                        </div>
                        <div className="media-body">
                            <h4 className="text-thin">Are you sure to disable user profile of <strong>{ `${firstName} ${lastName}` }</strong>?</h4>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button data-bb-handler="cancel" type="button" className="btn btn-default" onClick={this.props.closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Confirm</button>
                </Modal.Footer>

            </Formsy.Form>
        )
    }
    
}
// end::user-disable-modal[]

// tag::user-enable-modal[]
@formModal
class UserEnableModal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (data, reset, invalidate) => {
        this.props.onEnable(this.props.user, response => {
            this.props.refreshCurrentPage();
            this.props.closeModal();
        }, response => {
            if (response.errors) {
                invalidate(response.errors);
            } else if (response.status.code === 400) {
                this.props.popAlert('REQUEST REJECTED!', response.entity.errors);
            } else if (response.status.code === 403) {
                this.props.popAlert('ACCESS DENIED!', 'You are not authorized to update this user.');
            } else if (response.status.code === 404) {
                this.props.popAlert('DENIED!', 'User is not found.');
            } else if (response.status.code === 412) {
                this.props.popAlert('DENIED!', 'Unable to update. Your copy is stale.');
            } else {
                console.log(response);
            }

            return response;
        });
    }

    render() {
        var { avatarUrl, firstName, lastName } = this.props.user.entity;
        return (
            <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.props.enableSubmit} onInvalid={this.props.disableSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title>Enable User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.alerts}

                    <div className="media">
                        <div className="media-left">
                            <Avatar src={`img/${avatarUrl}`} bsSize="lg" />
                        </div>
                        <div className="media-body">
                            <h4 className="text-thin">Are you sure to enable user profile of <strong>{ `${firstName} ${lastName}` }</strong>?</h4>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button data-bb-handler="cancel" type="button" className="btn btn-default" onClick={this.props.closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Confirm</button>
                </Modal.Footer>

            </Formsy.Form>
        )
    }
}
// end::user-enable-modal[]

// tag::user-table[]
class UserTable extends React.Component {
    render() {
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
                          onDisable={this.props.onDisable}
                          onEnable={this.props.onEnable}
                          onDelete={this.props.onDelete}
                          refreshCurrentPage={this.props.refreshCurrentPage} />
        );
        return (
            <Table className="table-vcenter mar-top" striped hover responsive>
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

                <tbody>
                    {users}
                </tbody>
            </Table>
        )
    }
}
// end::user-table[]

// tag::user-table-row[]
class UserTableRow extends React.Component {

    render() {
        var { avatarUrl, firstName, lastName, email, joinDate, active, roles, _links } = this.props.user.entity;
        var fullName = `${firstName}  ${lastName}`;

        var options = {styleName: 'label-table'};
        var roles = roles.map(role => 
            <RoleLabel key={role} role={role} options={options} />
        );
        var status = <Label bsStyle={active ? 'success' : 'default'} className="label-table">{active ? 'active' : 'disabled'}</Label>

        var actions = [];
        if (active) {
            actions.push(<UserEditModal key="action-edit"
                                        user={this.props.user}
                                        toggleButton={{href: '#', className: 'btn-icon btn-hover-success fa fa-pencil', bsSize: "small"}}
                                        tooltip={{placement: "top", title: "Edit"}}
                                        onUpdate={this.props.onUpdate}
                                        refreshCurrentPage={this.props.refreshCurrentPage} />
            );
            actions.push(<UserDeleteModal key="action-delete"
                                          user={this.props.user}
                                          toggleButton={{href: '#', className: 'btn-icon btn-hover-danger fa fa-times', bsSize: "small"}}
                                          tooltip={{placement: "top", title: "Delete"}}
                                          onDelete={this.props.onDelete}
                                          refreshCurrentPage={this.props.refreshCurrentPage} />
            );
            actions.push(<UserDisableModal key="action-disable"
                                           user={this.props.user}
                                           toggleButton={{href: '#', className: 'btn-icon btn-hover-warning fa fa-lock', bsSize: "small"}}
                                           tooltip={{placement: "top", title: "Ban User"}}
                                           onDisable={this.props.onDisable}
                                           refreshCurrentPage={this.props.refreshCurrentPage} />
            );
        } else {
            actions.push(<UserEnableModal key="action-enable"
                                          user={this.props.user}
                                          toggleButton={{href: '#', className: 'btn-icon btn-hover-success fa fa-unlock', bsSize: "small"}}
                                          tooltip={{placement: "top", title: "Enable User"}}
                                          onEnable={this.props.onEnable}
                                          refreshCurrentPage={this.props.refreshCurrentPage} />
            );
            actions.push(<UserDeleteModal key="action-delete"
                                          user={this.props.user}
                                          toggleButton={{href: '#', className: 'btn-icon btn-hover-danger fa fa-times', bsSize: "small"}}
                                          tooltip={{placement: "top", title: "Delete"}}
                                          onDelete={this.props.onDelete}
                                          refreshCurrentPage={this.props.refreshCurrentPage} />
            );
        }
        return (
            <tr>
                <td className="min-w-td">{this.props.sequence}</td>
                <td><Avatar src={`img/${avatarUrl}`} bsSize="sm" /></td>
                <td><a className="btn-link" href="#">{fullName}</a></td>
                <td>{email}</td>
                <td><span className="text-muted"><FaIcon fa="clock-o" /> {joinDate}</span></td>
                <td>{status}</td>
                <td className="labels">
                    {roles}
                </td>
                <td className="min-w-td text-center">
                    <div className="btn-group">
                        {actions}
                    </div>
                </td>
                
            </tr>
        )
    }
}
// end::user-table-row[]
