import React from 'react';
import { Accordion, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonInput, ButtonToolbar, Carousel, CarouselItem, Col, CollapsibleNav, Dropdown, DropdownButton, Glyphicon, Grid, Image, Input, Interpolate, Jumbotron, Label, ListGroup, ListGroupItem, MenuItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Nav, Navbar, NavBrand, NavbarBrand, NavDropdown, NavItem, Overlay, OverlayTrigger, PageHeader, PageItem, Pager, Pagination, Panel, PanelGroup, Popover, ProgressBar, ResponsiveEmbed, Row, SafeAnchor, SplitButton, Tab, Table, Tabs, Thumbnail, Tooltip, Well, Collapse, Fade, FormControls, utils } from 'react-bootstrap';
import { Link } from 'react-router';
import cx from 'classnames';

const { bool, object, string, func, oneOfType } = React.PropTypes

// tag::menu-item-link[]
class MenuItemLink extends MenuItem {
    constructor(props) {
        super(props);
    }

    render() {
        const { href, className, style, onClick, ...props } = this.props;

        const classes = {
            disabled: this.props.disabled,
            active: this.props.active
        };

        return (
            <li role="presentation"
                className={cx(className, classes)}
                style={style}
            >
                <Link
                    {...props}
                    to={href}
                    role="menuitem"
                    tabIndex="-1"
                    onClick={utils.createChainedFunction(onClick, this.handleClick)}
                />
            </li>
        )
    }
}
// end::menu-item-link[]

// tag::panel-alert[]
class PanelAlert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const className = cx('alert-wrap', this.props.show ? 'in' : '');
        var messages = null;
        if (this.props.errors) {
            if ( Object.prototype.toString.call( this.props.errors ) === '[object Array]') {
                messages = this.props.errors.map(error =>
                    <p>{error.message}</p>
                )
            } else {
                messages = <p>{this.props.errors}</p>
            }
        }
        return (
            <div className="panel-alert">
                <div className={className}>
                    <Alert bsStyle={this.props.bsStyle}>
                        <div className="media">
                            <strong>{this.props.title}</strong>
                            {messages}
                        </div>
                    </Alert>
                </div>
            </div>
        )
    }
}
// end::panel-alert[]

// tag::fa-icon[]
class FaIcon extends React.Component {

    static propTypes = {
        bsClass: string,
        large: bool,
        wide: bool,
        pullRight: bool,
        fa: string.isRequired
    };

    static defaultProps = {
        bsClass: 'fa',
        large: false,
        wide: false,
        pullRight: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        const className = cx(this.props.className, this.props.bsClass, `fa-${this.props.fa}`, {'fa-lg': this.props.large}, {'fa-fw': this.props.wide}, {'pull-right': this.props.pullRight});
        return (
            <i className={className} />
        )
    }
}
// end::fa-icon[]

var controls = {};
_.extend(
    controls, 
    { Accordion, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonInput, ButtonToolbar, Carousel, CarouselItem, Col, CollapsibleNav, Dropdown, DropdownButton, Glyphicon, Grid, Image, Input, Interpolate, Jumbotron, Label, ListGroup, ListGroupItem, MenuItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Nav, Navbar, NavBrand, NavbarBrand, NavDropdown, NavItem, Overlay, OverlayTrigger, PageHeader, PageItem, Pager, Pagination, Panel, PanelGroup, Popover, ProgressBar, ResponsiveEmbed, Row, SafeAnchor, SplitButton, Tab, Table, Tabs, Thumbnail, Tooltip, Well, Collapse, Fade, FormControls, utils }, 
    // custom controls
    { MenuItemLink, PanelAlert, FaIcon }
);

export default controls;
