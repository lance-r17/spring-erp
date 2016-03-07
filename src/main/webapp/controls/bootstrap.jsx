import React from 'react';
import { Accordion, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonInput, ButtonToolbar, Carousel, CarouselItem, Col, CollapsibleNav, Dropdown, DropdownButton, Glyphicon, Grid, Image, Input, Interpolate, Jumbotron, Label, ListGroup, ListGroupItem, MenuItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Nav, Navbar, NavBrand, NavbarBrand, NavDropdown, NavItem, Overlay, OverlayTrigger, PageHeader, PageItem, Pager, Pagination, Panel, PanelGroup, Popover, ProgressBar, ResponsiveEmbed, Row, SafeAnchor, SplitButton, Tab, Table, Tabs, Thumbnail, Tooltip, Well, Collapse, Fade, FormControls, utils } from 'react-bootstrap';
import { Link } from 'react-router';
import cx from 'classnames';

const { bool, object, string, func, oneOfType } = React.PropTypes

// tag::scorll-top-button[]
class ScrollTopButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            offsetTop: 250,
            visible: false
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        let scrollTop = event.srcElement.body.scrollTop;

        if (scrollTop > this.state.offsetTop && !this.state.visible) {
            // nifty.navbar.addClass('shadow');
            this.setState({visible: true});
        }else if (scrollTop < this.state.offsetTop && this.state.visible) {
            // nifty.navbar.removeClass('shadow');
            this.setState({visible: false});
        }
    }
    
    handleClick = (event) => {
        event.preventDefault();

        $('body, html').animate({
            scrollTop : 0
        }, 500);
    }

    render() {
        var className = cx({ 'in': this.state.visible });
        return (
            <Button id='scroll-top' className={className} onClick={this.handleClick} >
                <FaIcon fa="chevron-up" />
            </Button>
        )
    }
}
// end::scorll-top-button[]

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
                    to={href || '/'}
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
        wrap: oneOfType([ bool, object ]).isRequired,
        large: bool,
        wide: bool,
        pullRight: bool,
        fa: string.isRequired
    };

    static defaultProps = {
        bsClass: 'fa',
        wrap: false,
        large: false,
        wide: false,
        pullRight: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { className, bsClass, wrap, fa, large, wide, pullRight, ...otherProps } = this.props;
        const classes = {
            [utils.bootstrapUtils.prefix(this.props, fa)]: true,
            [utils.bootstrapUtils.prefix(this.props, 'lg')]: large,
            [utils.bootstrapUtils.prefix(this.props, 'fw')]: wide,
            'pull-right': pullRight
        };

        if (wrap) {
            const wrapperClasses = { 
                [utils.bootstrapUtils.prefix({bsClass: 'bg'}, wrap.bsStyle || '')]: (wrap.bsStyle !== null),
                'icon-circle': wrap.circle, 
                'icon-wrap-xs': wrap.xsmall, 
                'icon-wrap-sm': wrap.small, 
                'icon-wrap-md': wrap.middle, 
                'icon-wrap-lg': wrap.large
            };
            return (
                <span className={cx('icon-wrap', wrapperClasses)}>
                    <i className={cx(className, bsClass, classes)} {...otherProps} />
                </span>
            )
        } else {
            return (
                <i className={cx(className, bsClass, classes)} {...otherProps} />
            )
        }
    }
}
// end::fa-icon[]

// tag::avatar[]
class Avatar extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        alt: string,
        circle: bool,
        xsmall: bool,
        small: bool,
        middle: bool,
        large: bool
    };

    static defaultProps = {
        alt: 'Profile Picture',
        circle: true,
        xsmall: false,
        small: false,
        middle: false,
        large: false
    };

    render() {
        var { className, xsmall, small, middle, large, ...otherProps } = this.props;
        className = cx(className, [{'img-lg': large}, {'img-md': middle}, {'img-sm': small}, {'img-xs': xsmall}, {'img-user': !(large||middle||small||xsmall)}]);
        return (
            <Image className={className} {...otherProps} />
        )
    }
}
// end::avatar[]

var controls = {};
_.extend(
    controls, 
    { Accordion, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonInput, ButtonToolbar, Carousel, CarouselItem, Col, CollapsibleNav, Dropdown, DropdownButton, Glyphicon, Grid, Image, Input, Interpolate, Jumbotron, Label, ListGroup, ListGroupItem, MenuItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Nav, Navbar, NavBrand, NavbarBrand, NavDropdown, NavItem, Overlay, OverlayTrigger, PageHeader, PageItem, Pager, Pagination, Panel, PanelGroup, Popover, ProgressBar, ResponsiveEmbed, Row, SafeAnchor, SplitButton, Tab, Table, Tabs, Thumbnail, Tooltip, Well, Collapse, Fade, FormControls, utils }, 
    // custom controls
    { ScrollTopButton, MenuItemLink, PanelAlert, FaIcon, Avatar }
);

export default controls;
