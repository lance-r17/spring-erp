import React from 'react';
import { Accordion, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonInput, ButtonToolbar, Carousel, CarouselItem, Col, CollapsibleNav, Dropdown, DropdownButton, Glyphicon, Grid, Image, Input, Interpolate, Jumbotron, Label, ListGroup, ListGroupItem, MenuItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Nav, Navbar, NavBrand, NavbarBrand, NavDropdown, NavItem, Overlay, OverlayTrigger, PageHeader, PageItem, Pager, Pagination, Panel, PanelGroup, Popover, ProgressBar, ResponsiveEmbed, Row, SafeAnchor, SplitButton, Tab, Table, Tabs, Thumbnail, Tooltip, Well, Collapse, Fade, FormControls, utils } from 'react-bootstrap';
import { Link, IndexLink } from 'react-router';
import cx from 'classnames';

const { bool, object, string, number, func, oneOfType, oneOf } = React.PropTypes

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
            this.setState({visible: true});
        }else if (scrollTop < this.state.offsetTop && this.state.visible) {
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
        const { index, href, className, style, fa, label, badge, children, onClick, ...props } = this.props;

        const classes = {
            disabled: this.props.disabled,
            active: this.props.active
        };

        var icon = null;
        if (fa) {
            icon = <FaIcon fa={fa} />
        }

        var highlight = null;
        if (label) {
            const { content, className, pullRight, ...labelProps } = label;
            highlight = <Label className={cx(className, { 'pull-right': pullRight })} {...labelProps} >{content}</Label>
        } else if (badge) {
            const { content, className, bsStyle, ...badgeProps } = badge;
            const classes = {
                [utils.bootstrapUtils.prefix({bsClass: 'badge'}, bsStyle)]: true
            };
            highlight = <Badge className={cx(className, classes)} {...badgeProps} >{content}</Badge>
        }

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
                >
                    { icon }
                    { children }
                    { highlight }
                </Link>
            </li>
        )
    }
}
// end::menu-item-link[]

// tag::image-x[]
class ImageX extends Image {

    static propTypes = {
        bsClass: string,
        bsSize: string
    };

    static defaultProps = {
        bsClass: 'img',
        bsSize: ''
    };

    constructor(props) {
        super(props);
    }

    render() {
        let sizeClass = utils.bootstrapUtils.prefix(this.props, this.props.bsSize);

        const classes = {
            'img-responsive': this.props.responsive,
            'img-rounded': this.props.rounded,
            'img-circle': this.props.circle,
            'img-thumbnail': this.props.thumbnail,
            [sizeClass]: (this.props.bsSize||'').trim().length > 0
        };

        return (
            <img {...this.props} className={cx(this.props.className, classes)} />
        )
    }
}
// tag::image-x[]

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
        const { className, bsClass, wrap, fa, large, wide, pullRight, ...iconProps } = this.props;
        const classes = {
            [utils.bootstrapUtils.prefix(this.props)]: true,
            [utils.bootstrapUtils.prefix(this.props, fa)]: true,
            [utils.bootstrapUtils.prefix(this.props, 'lg')]: large,
            [utils.bootstrapUtils.prefix(this.props, 'fw')]: wide,
            ['pull-right']: pullRight
        };

        if (wrap) {
            let bgClass = utils.bootstrapUtils.prefix({bsClass: 'bg'}, wrap.bsStyle || '');
            let sizeClass = utils.bootstrapUtils.prefix({bsClass: 'icon-wrap'}, wrap.bsSize || '');
            const wrapClasses = {
                'icon-circle': wrap.circle, 
                [bgClass]: (wrap.bsStyle||'').trim().length > 0,
                [sizeClass]: (wrap.bsSize||'').trim().length > 0
            };
            return (
                <span className={cx('icon-wrap', wrapClasses)}>
                    <i className={cx(className, classes)} {...iconProps} />
                </span>
            )
        } else {
            return (
                <i className={cx(className, classes)} {...iconProps} />
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
        bsSize: string
    };

    static defaultProps = {
        alt: 'Profile Picture',
        circle: true,
        bsSize: ''
    };

    render() {
        const { className, ...imageProps } = this.props;
        const classes = {
            'img-user': (this.props.bsSize||'').trim().length === 0
        };

        return (
            <ImageX className={cx(className, classes)} {...imageProps} />
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
export { Accordion, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonInput, ButtonToolbar, Carousel, CarouselItem, Col, CollapsibleNav, Dropdown, DropdownButton, Glyphicon, Grid, Image, Input, Interpolate, Jumbotron, Label, ListGroup, ListGroupItem, MenuItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Nav, Navbar, NavBrand, NavbarBrand, NavDropdown, NavItem, Overlay, OverlayTrigger, PageHeader, PageItem, Pager, Pagination, Panel, PanelGroup, Popover, ProgressBar, ResponsiveEmbed, Row, SafeAnchor, SplitButton, Tab, Table, Tabs, Thumbnail, Tooltip, Well, Collapse, Fade, FormControls, utils };
export { ScrollTopButton, ImageX, MenuItemLink, PanelAlert, FaIcon, Avatar };
