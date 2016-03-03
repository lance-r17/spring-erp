import React from 'react';
import cx from 'classnames';
import api from '../../../lib/apiHelper';

import { Label, RoleLabel, RoleLabels, Formsy, FormStatic, FormInput, FormCheckboxGroup, ImageSelect, Modal, PanelAlert, Paging, NanoScroller } from '../../../controls';


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

const AVATAR_IMAGES = [
    'av1.png', 'av2.png', 'av3.png', 'av4.png', 'av5.png', 'av6.png'
];
// end::vars[]


// tag::users[]
var Users = React.createClass({
    getUsers: function(pageSize) {
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
    },
    // tag::create[]
    onCreate: function(user, successCallback, errorCallback) {
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
        
    },
    // end::create[]
    // tag::update[]
    onUpdate: function(user, updatedUser, successCallback, errorCallback) {
        api.patch({
            item: user,
            updatedItem: updatedUser,
            onSuccess: successCallback,
            onError: errorCallback
        });
    },
    // end::update[]
    // tag::disable[]
    onDisable: function(user, successCallback, errorCallback) {
        api.patch({
            item: user,
            updatedItem: { active : false },
            onSuccess: successCallback,
            onError: errorCallback
        });
    },
    // end::disable[]
    // tag::enable[]
    onEnable: function(user, successCallback, errorCallback) {
        api.patch({
            item: user,
            updatedItem: { active : true },
            onSuccess: successCallback,
            onError: errorCallback
        });
    },
    // end::enable[]
    // tag::delete[]
    onDelete: function(user, successCallback, errorCallback) {
        api.delete({
            item: user,
            onSuccess: successCallback,
            onError: errorCallback
        });
    },
    // end::delete[]
    // tag::update-page-size[]
    updatePageSize: function(pageSize) {
        if (this.state.pageSize !== pageSize) {
            this.getUsers(pageSize);
        }
    },
    // tag::navigate[]
    onNavigate: function(navUri) {
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
    },
    // end::navigate[]
    // tag::refresh-and-go-to-last-page[]
    refreshAndGoToLastPage: function() {
        api.getLinksByPage({
            rel: 'users',
            pageSize: this.state.pageSize,
            onSuccess: links => {
                this.onNavigate(links.last.href);
            }
        });
    },
    // end::refresh-and-go-to-last-page[]
    // tag::refresh-current-page[]
    refreshCurrentPage: function() {
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
        this.getUsers(this.props.pageSize || this.state.pageSize);
    },
    render: function() {
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
                                    <UserCreateModal onCreate={this.onCreate}
                                                     refreshAndGoToLastPage={this.refreshAndGoToLastPage} />
                                </Paging.Toolbar>

                                {/*  User list  */}
                                <div className="table-responsive">
                                    <UserTable users={this.state.users} 
                                               page={this.state.page} 
                                               onUpdate={this.onUpdate}
                                               onDisable={this.onDisable}
                                               onEnable={this.onEnable}
                                               onDelete={this.onDelete}
                                               refreshCurrentPage={this.refreshCurrentPage} />
                                </div>

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
});
// end::users[]

// tag::decorators[]
class ModalForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            showModal: false,
            showAlert: false,
            alertTitle: '',
            alertDetails: ''
        }
    }

    clearAlert = () => {
        this.setState({
            showAlert: false,
            alertTitle: '',
            alertDetails: ''
        });
    }

    close = () => {
        this.clearAlert();
        this.setState({ showModal: false });
    }
    
    open = () => {
        this.setState({ showModal: true });
    }

    handleClick = (e) => {
        e.preventDefault();

        this.open();
    }

    enableSubmit = () => {
        this.setState({
            canSubmit: true
        });
    }

    disableSubmit = () => {
        this.setState({
            canSubmit: false
        });
    }

}
// end::decorators[]

// tag::user-create-modal[]
// var UserCreateModal = React.createClass({
//     handleClick: function(e) {
//         e.preventDefault();

//         this.open();
//     },
//     enableSubmit: function () {
//         this.setState({
//             canSubmit: true
//         });
//     },
//     disableSubmit: function () {
//         this.setState({
//             canSubmit: false
//         });
//     },
//     handleSubmit: function (data, reset, invalidate) {
//         var newUser = {};
//         _.extend(newUser, data);
//         this.props.onCreate(newUser, response => {
//             this.props.refreshAndGoToLastPage();
//             this.close();
//         }, response => {
//             if (response.errors) {
//                 invalidate(response.errors);
//             } else if (response.status.code === 400) {
//                 this.setState({
//                     showAlert: true,
//                     alertTitle: 'REQUEST REJECTED!',
//                     alertDetails: response.entity.errors
//                 });
//             } else if (response.status.code === 403) {
//                 this.setState({
//                     showAlert: true,
//                     alertTitle: 'ACCESS DENIED!',
//                     alertDetails: 'You are not authorized to update this user.'
//                 });
//             } else {
//                 console.log(response);
//             }

//             return response;
//         });
//     },
//     clearAlert: function () {
//         this.setState({
//             showAlert: false,
//             alertTitle: '',
//             alertDetails: ''
//         });
//     },
//     close: function() {
//         this.clearAlert();
//         this.setState({ showModal: false });
//     },
//     open: function() {
//         this.setState({ showModal: true });
//     },
//     getInitialState: function() {
//         return ({
//             canSubmit: false,
//             showModal: false,
//             showAlert: false,
//             alertTitle: '',
//             alertDetails: ''
//         });
//     },
//     render: function() {
//         return (
//             <span>
//                 <button className="btn btn-info btn-labeled fa fa-plus" onClick={this.handleClick}>Add</button>

//                 <Modal show={this.state.showModal} onHide={this.close}>
//                     <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.enableSubmit} onInvalid={this.disableSubmit}>

//                         <Modal.Header closeButton>
//                             <Modal.Title>New User</Modal.Title>
//                         </Modal.Header>

//                         <Modal.Body>
//                             <PanelAlert bsStyle="danger" show={this.state.showAlert} title={this.state.alertTitle} errors={this.state.alertDetails} />
//                             <div className="media">
//                                 <div className="media-left navbar-top-links">
//                                     <ImageSelect id="user-create-img-sel" name="avatarUrl" className="img-lg img-circle" values={AVATAR_IMAGES} />
//                                 </div>
//                                 <div className="media-body">
//                                     <FormInput name="name" title="Username" required />
//                                     <FormInput name="firstName" type="text" title="First name" required />
//                                     <FormInput name="lastName" type="text" title="Last name" required />
//                                     <FormInput name="email" type="email" title="Email" validations="isEmail" validationError="This is not a valid email" required/>
//                                     <FormInput name="joinDate" type="text" title="Join Date" mask="9999-99-99" validations="isDate" validationError="This is not a valid date" required/>
//                                     <FormCheckboxGroup name="roles" title="Roles" items={ROLES_OPTION} />
//                                     <FormStatic name="active" defaultValue={true} hidden />
//                                 </div>
//                             </div>
//                         </Modal.Body>

//                         <Modal.Footer>
//                             <button type="submit" className="btn btn-primary" disabled={!this.state.canSubmit}>Save</button>
//                         </Modal.Footer>

//                     </Formsy.Form>
//                 </Modal>

//             </span>
//         )
//     }
// });

class UserCreateModal extends ModalForm {
    constructor(props) {
        super(props);
    }

    handleSubmit = (data, reset, invalidate) => {
        var newUser = {};
        _.extend(newUser, data);
        this.props.onCreate(newUser, response => {
            this.props.refreshAndGoToLastPage();
            this.close();
        }, response => {
            if (response.errors) {
                invalidate(response.errors);
            } else if (response.status.code === 400) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'REQUEST REJECTED!',
                    alertDetails: response.entity.errors
                });
            } else if (response.status.code === 403) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'ACCESS DENIED!',
                    alertDetails: 'You are not authorized to update this user.'
                });
            } else {
                console.log(response);
            }

            return response;
        });
    }

    render() {
        return (
            <span>
                <button className="btn btn-info btn-labeled fa fa-plus" onClick={this.handleClick}>Add</button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.enableSubmit} onInvalid={this.disableSubmit}>

                        <Modal.Header closeButton>
                            <Modal.Title>New User</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <PanelAlert bsStyle="danger" show={this.state.showAlert} title={this.state.alertTitle} errors={this.state.alertDetails} />
                            <div className="media">
                                <div className="media-left navbar-top-links">
                                    <ImageSelect id="user-create-img-sel" name="avatarUrl" className="img-lg img-circle" values={AVATAR_IMAGES} />
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
                            <button type="submit" className="btn btn-primary" disabled={!this.state.canSubmit}>Save</button>
                        </Modal.Footer>

                    </Formsy.Form>
                </Modal>

            </span>
        )
    }
}
// end::user-create-modal[]

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
    handleSubmit: function (data, reset, invalidate) {
        var updatedUser = {};
        _.extend(updatedUser, data);
        this.props.onUpdate(this.props.user, updatedUser, response => {
            this.props.refreshCurrentPage();
            this.close();
        }, response => {
            if (response.errors) {
                invalidate(response.errors);
            } else if (response.status.code === 400) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'REQUEST REJECTED!',
                    alertDetails: response.entity.errors
                });
            } else if (response.status.code === 403) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'ACCESS DENIED!',
                    alertDetails: 'You are not authorized to update this user.'
                });
            } else if (response.status.code === 404) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'DENIED!',
                    alertDetails: 'User is not found.'
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
                                <div className="media-left navbar-top-links">
                                    <ImageSelect id="user-create-img-sel" name="avatarUrl" defaultValue={avatarUrl} className="img-lg img-circle" values={AVATAR_IMAGES} />
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
                            <button type="submit" className="btn btn-primary" disabled={!this.state.canSubmit}>Save</button>
                        </Modal.Footer>

                    </Formsy.Form>
                </Modal>
                
            </span>
        )
    }
});
// end::user-edit-modal[]

// tag::user-delete-modal[]
var UserDeleteModal = React.createClass({
    handleClick: function(e) {
        e.preventDefault();

       this.open();
    },
    handleSubmit: function (data, reset, invalidate) {
        this.props.onDelete(this.props.user, response => {
            this.props.refreshCurrentPage();
            this.close();
        }, response => {
            if (response.errors) {
                invalidate(response.errors);
            } else if (response.status.code === 400) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'REQUEST REJECTED!',
                    alertDetails: response.entity.errors
                });
            } else if (response.status.code === 403) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'ACCESS DENIED!',
                    alertDetails: 'You are not authorized to update this user.'
                });
            } else if (response.status.code === 404) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'DENIED!',
                    alertDetails: 'User is not found.'
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
            showModal: false,
            showAlert: false,
            alertTitle: '',
            alertDetails: ''
        });
    },
    render: function() {
        var { avatarUrl, firstName, lastName } = this.props.user.entity;
        return (
            <span>
                <a className="btn btn-sm btn-default btn-icon btn-hover-danger fa fa-times add-tooltip" href="#" data-original-title="Delete" data-container="body" onClick={this.handleClick}></a>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.enableSubmit} onInvalid={this.disableSubmit}>

                        <Modal.Header closeButton>
                            <Modal.Title>Delete User</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>
                            <PanelAlert bsStyle="danger" show={this.state.showAlert} title={this.state.alertTitle} errors={this.state.alertDetails} />
                            <div className="media">
                                <div className="media-left">
                                    <img src={'img/' + avatarUrl} alt="Profile Picture" className="img-lg img-circle" />
                                </div>
                                <div className="media-body">
                                    <h4 className="text-thin">Are you sure to delete user profile of <strong>{ `${firstName} ${lastName}` }</strong>?</h4>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <button data-bb-handler="cancel" type="button" className="btn btn-default" onClick={this.close}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Confirm</button>
                        </Modal.Footer>

                    </Formsy.Form>
                </Modal>
                
            </span>
        )
    }
});
// end::user-delete-modal[]

// tag::user-disable-modal[]
var UserDisableModal = React.createClass({
    handleClick: function(e) {
        e.preventDefault();

        this.open();
    },
    handleSubmit: function (data, reset, invalidate) {
        this.props.onDisable(this.props.user, response => {
            this.props.refreshCurrentPage();
            this.close();
        }, response => {
            if (response.errors) {
                invalidate(response.errors);
            } else if (response.status.code === 400) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'REQUEST REJECTED!',
                    alertDetails: response.entity.errors
                });
            } else if (response.status.code === 403) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'ACCESS DENIED!',
                    alertDetails: 'You are not authorized to update this user.'
                });
            } else if (response.status.code === 404) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'DENIED!',
                    alertDetails: 'User is not found.'
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
            showModal: false,
            showAlert: false,
            alertTitle: '',
            alertDetails: ''
        });
    },
    render: function() {
        var { avatarUrl, firstName, lastName } = this.props.user.entity;
        return (
            <span>
                <a className="btn btn-sm btn-default btn-icon btn-hover-warning fa fa-lock add-tooltip" href="#" data-original-title="Ban user" data-container="body" onClick={this.handleClick}></a>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.enableSubmit} onInvalid={this.disableSubmit}>

                        <Modal.Header closeButton>
                            <Modal.Title>Disable User</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <PanelAlert bsStyle="danger" show={this.state.showAlert} title={this.state.alertTitle} errors={this.state.alertDetails} />
                            <div className="media">
                                <div className="media-left">
                                    <img src={'img/' + avatarUrl} alt="Profile Picture" className="img-lg img-circle" />
                                </div>
                                <div className="media-body">
                                    <h4 className="text-thin">Are you sure to disable user profile of <strong>{ `${firstName} ${lastName}` }</strong>?</h4>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <button data-bb-handler="cancel" type="button" className="btn btn-default" onClick={this.close}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Confirm</button>
                        </Modal.Footer>

                    </Formsy.Form>
                </Modal>

            </span>
        )
    }
});
// end::user-disable-modal[]

// tag::user-enable-modal[]
var UserEnableModal = React.createClass({
    handleClick: function(e) {
        e.preventDefault();

        this.open();
    },
    handleSubmit: function (data, reset, invalidate) {
        this.props.onEnable(this.props.user, response => {
            this.props.refreshCurrentPage();
            this.close();
        }, response => {
            if (response.errors) {
                invalidate(response.errors);
            } else if (response.status.code === 400) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'REQUEST REJECTED!',
                    alertDetails: response.entity.errors
                });
            } else if (response.status.code === 403) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'ACCESS DENIED!',
                    alertDetails: 'You are not authorized to update this user.'
                });
            } else if (response.status.code === 404) {
                this.setState({
                    showAlert: true,
                    alertTitle: 'DENIED!',
                    alertDetails: 'User is not found.'
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
            showModal: false,
            showAlert: false,
            alertTitle: '',
            alertDetails: ''
        });
    },
    render: function() {
        var { avatarUrl, firstName, lastName } = this.props.user.entity;
        return (
            <span>
                <a className="btn btn-sm btn-default btn-icon btn-hover-success fa fa-unlock add-tooltip" href="#" data-original-title="Enable user" data-container="body" onClick={this.handleClick}></a>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Formsy.Form className="form-horizontal" onValidSubmit={this.handleSubmit} onValid={this.enableSubmit} onInvalid={this.disableSubmit}>

                        <Modal.Header closeButton>
                            <Modal.Title>Enable User</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <PanelAlert bsStyle="danger" show={this.state.showAlert} title={this.state.alertTitle} errors={this.state.alertDetails} />
                            <div className="media">
                                <div className="media-left">
                                    <img src={'img/' + avatarUrl} alt="Profile Picture" className="img-lg img-circle" />
                                </div>
                                <div className="media-body">
                                    <h4 className="text-thin">Are you sure to enable user profile of <strong>{ `${firstName} ${lastName}` }</strong>?</h4>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <button data-bb-handler="cancel" type="button" className="btn btn-default" onClick={this.close}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Confirm</button>
                        </Modal.Footer>

                    </Formsy.Form>
                </Modal>

            </span>
        )
    }
});
// end::user-enable-modal[]

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
                          onDisable={this.props.onDisable}
                          onEnable={this.props.onEnable}
                          onDelete={this.props.onDelete}
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

    render: function () {
        var { avatarUrl, firstName, lastName, email, joinDate, active, roles } = this.props.user.entity;
        var fullName = `${firstName}  ${lastName}`;

        var options = {styleName: 'label-table'};
        var roles = roles.map(role => 
            <RoleLabel key={role} role={role} options={options} />
        );

        _.extend(options, (active ? {content: 'active', color: 'success'} : {content: 'disabled', color: 'default'}));
        var status = <Label options={options} />

        var actions = [];
        if (active) {
            actions.push(<UserEditModal user={this.props.user}
                                        onUpdate={this.props.onUpdate}
                                        refreshCurrentPage={this.props.refreshCurrentPage} />
            );
            actions.push(<UserDeleteModal user={this.props.user}
                                          onDelete={this.props.onDelete}
                                          refreshCurrentPage={this.props.refreshCurrentPage} />
            );
            actions.push(<UserDisableModal user={this.props.user}
                                           onDisable={this.props.onDisable}
                                           refreshCurrentPage={this.props.refreshCurrentPage} />
            );
        } else {
            actions.push(<UserEnableModal user={this.props.user}
                                          onEnable={this.props.onEnable}
                                          refreshCurrentPage={this.props.refreshCurrentPage} />
            );
            actions.push(<UserDeleteModal user={this.props.user}
                                          onDelete={this.props.onDelete}
                                          refreshCurrentPage={this.props.refreshCurrentPage} />
            );
        }
        return (
            <tr>
                <td className="min-w-td">{this.props.sequence}</td>
                <td><img src={'img/' + avatarUrl} alt="Profile Picture" className="img-circle img-sm" /></td>
                <td><a className="btn-link" href="#">{fullName}</a></td>
                <td>{email}</td>
                <td><span className="text-muted"><i className="fa fa-clock-o"></i> {joinDate}</span></td>
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
});
// end::user-table-row[]

module.exports = Users;
