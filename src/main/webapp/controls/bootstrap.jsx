import React from 'react';
import { Accordion, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonInput, ButtonToolbar, Carousel, CarouselItem, Col, CollapsibleNav, Dropdown, DropdownButton, Glyphicon, Grid, Image, Input, Interpolate, Jumbotron, Label, ListGroup, ListGroupItem, MenuItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Nav, Navbar, NavBrand, NavbarBrand, NavDropdown, NavItem, Overlay, OverlayTrigger, PageHeader, PageItem, Pager, Pagination, Panel, PanelGroup, Popover, ProgressBar, ResponsiveEmbed, Row, SafeAnchor, SplitButton, Tab, Table, Tabs, Thumbnail, Tooltip, Well, Collapse, Fade, FormControls, utils } from 'react-bootstrap';
import cx from 'classnames';


// tag::panel-alert[]
class PanelAlert extends React.Component {
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

class FaIcon extends React.Component {
    static propTypes = {
        bsClass: React.PropTypes.string,
        large: React.PropTypes.bool,
        wide: React.PropTypes.bool,
        fa: React.PropTypes.string.isRequired
    };

    static defaultProps = {
        bsClass: 'fa',
        large: false,
        wide: false
    };

    render() {
        return (
            <i className={cx(this.props.className, this.props.bsClass, `fa-${this.props.fa}`, {'fa-lg': this.props.large}, {'fa-fw': this.props.wide})}></i>
        )
    }
}
// end::panel-alert[]

var controls = {};
_.extend(
    controls, 
    { Accordion, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonInput, ButtonToolbar, Carousel, CarouselItem, Col, CollapsibleNav, Dropdown, DropdownButton, Glyphicon, Grid, Image, Input, Interpolate, Jumbotron, Label, ListGroup, ListGroupItem, MenuItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Nav, Navbar, NavBrand, NavbarBrand, NavDropdown, NavItem, Overlay, OverlayTrigger, PageHeader, PageItem, Pager, Pagination, Panel, PanelGroup, Popover, ProgressBar, ResponsiveEmbed, Row, SafeAnchor, SplitButton, Tab, Table, Tabs, Thumbnail, Tooltip, Well, Collapse, Fade, FormControls, utils }, 
    // custom controls
    { PanelAlert, FaIcon }
);

export default controls;