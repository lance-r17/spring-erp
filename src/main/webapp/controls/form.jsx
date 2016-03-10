import React from 'react';
import Formsy from 'formsy-react';
import { Decorator as FormsyElement } from 'formsy-react';
import InputElement from 'react-input-mask';
import cx from 'classnames';
import validator from 'validator';
import NanoScroller from './scroll.jsx';
import { Dropdown, ImageX, MenuItem } from './bootstrap.jsx';
import { toggleable } from '../decorators';

const { bool, object, string, func, oneOfType, oneOf } = React.PropTypes

// tag::validation-rules[]
Formsy.addValidationRule('isDate', (values, value) => {
    return value ? validator.isDate(value) : false;
});
// end::validation-rules[]

// tag::helpers[]
function contains(container, item, cmp) {
    for (const it of container) {
        if (cmp(it, item)) {
            return true;
        }
    }
    return false;
}
// end::helpers[]

@FormsyElement()
class FormStatic extends React.Component {

    componentWillMount() {
        this.props.setValue(this.props.defaultValue);
    }

    render() {
        const { name, title, hidden} = this.props;
        return (
            <div className={cx('form-group', hidden ? 'hide' : '')}>
                <label className="col-md-4 control-label" htmlFor={name}>{title}</label>
                <div key={`static-${name}`} className="col-md-4">
                    <p name={name} className="form-control-static">{hidden ? '' : this.props.getValue()}</p>
                </div>
            </div>
        )
    }
}

@FormsyElement()
class FormInput extends React.Component {

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue = (event) => {
        this.props.setValue(event.currentTarget.value);
    }

    componentWillMount() {
        this.props.setValue(this.props.defaultValue);
    }

    componentWillReceiveProps(nextProps) {
        // Only change to the new default value if it is currently showing the old one
        if (this.props.getValue() === this.props.defaultValue && nextProps.defaultValue !== this.props.defaultValue) {
            this.props.setValue(nextProps.defaultValue);
        }
    }

    render() {
        var { name, className, type, title, placeholder, mask } = this.props;
        className  =cx(className, ['form-control', 'input-md']);
        var props = {};
        _.extend(
            props,
            {
                name,  
                className, 
                type
            }, 
            {
                mask: mask || '',
                placeholder: placeholder || title,
                value: this.props.getValue(),
                onChange: this.changeValue
            }
        );

        var formGroupClassName = cx('form-group', this.props.showRequired() ? 'required' : this.props.showError() ? ['has-error', 'has-feedback'] : ''),
            errors = [];
        
        if (this.props.showError() && !this.props.showRequired()) {
            // An error message is returned ONLY if the component is invalid
            // or the server has returned an error message
            var errorMessage = this.props.getErrorMessage();
            errors.push(<i key="error-icon" className="form-control-feedback fa fa-times-circle fa-lg"></i>);
            errors.push(<small key="error-msg" className="help-block">{errorMessage}</small>);
        }

        return (
            <div key={`input-${name}`} className={formGroupClassName}>
                <label className="col-md-4 col-xs-6 control-label" htmlFor={name}>{title}</label>
                <div className="col-md-7 col-xs-6">
                    <InputElement {...props} />
                    {errors}
                </div>
            </div>
        )
    }
}

@FormsyElement()
class FormCheckboxGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: [],
            cmp: (a, b) => a === b 
        };
    }

    componentDidMount() {
        const value = this.props.value || [];
        this.props.setValue(value);
        this.setState({ 
            value: value, 
            cmp: this.props.cmp || this.state.cmp 
        });
    }

    changeValue = (value, event) => {
        const checked = event.currentTarget.checked;

        let newValue = [];
        if (checked) {
            newValue = this.state.value.concat(value);
        } else {
            newValue = this.state.value.filter(it => !this.state.cmp(it, value));
        }

        this.props.setValue(newValue);
        this.setState({ value: newValue });
    }

    render() {

        const { name, title, items } = this.props;
        const labelClassName  = cx('form-checkbox', 'form-icon', 'form-text');
        var checkboxes = items.map((item, i) => (
             <label key={`form-checkbox-${name}-option-${i}`} className={cx(labelClassName, contains(this.state.value, item.value, this.state.cmp) ? 'active' : '')}>
                <input
                  type="checkbox"
                  name={name}
                  onChange={this.changeValue.bind(this, item.value)}
                  checked={contains(this.state.value, item.value, this.state.cmp)}
                /> {item.display || item.value}
            </label>
        ));

        var formGroupClassName = cx('form-group', this.props.showRequired() ? 'required' : this.props.showError() ? ['has-error', 'has-feedback'] : ''),
            errors = [];
        
        if (this.props.showError() && !this.props.showRequired()) {
            // An error message is returned ONLY if the component is invalid
            // or the server has returned an error message
            var errorMessage = this.props.getErrorMessage();
            errors.push(<i key="error-icon" className="form-control-feedback fa fa-times-circle fa-lg"></i>);
            errors.push(<small key="error-msg" className="help-block">{errorMessage}</small>);
        }

        return (
            <div className={formGroupClassName}>
                <label className="col-md-4 control-label" htmlFor={name}>{title}</label>
                <div className="col-md-8">
                    <div className="form-block">
                        {checkboxes}
                        {errors}
                    </div>
                </div>
            </div>
        );
    }

}

@FormsyElement()
@toggleable
class ImageSelect extends React.Component {

    static propTypes = {
        responsive: bool,
        rounded: bool,
        circle: bool,
        thumbnail: bool
    };

    static defaultProps = {
        responsive: false,
        rounded: false,
        circle: false,
        thumbnail: false
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { defaultValue, values} = this.props;
        this.props.setValue(defaultValue || values[0]);
    }

    componentWillReceiveProps(nextProps) {
        const { defaultValue, values} = this.props;

        var value = defaultValue || values[0];
        var nextValue = nextProps.defaultValue || nextProps.values[0];
        // Only change to the new default value if it is currently showing the old one
        if (this.props.getValue() === value && nextValue !== value) {
            this.props.setValue(nextValue);
        }
    }

    changeValue = (value, event) => {
        event.preventDefault();

        this.props.setValue(value);
        this.props.onToggle(false);
    }

    render() {
        const { id, className, values, bsSize, circle, responsive, rounded, thumbnail, open, onToggle } = this.props;
        const imgProps = { bsSize, circle, responsive, rounded, thumbnail };
        var images = values.map( (value, i) =>
            <MenuItem key={`image-option-${i}`} onClick={this.changeValue.bind(this, value)}>
                <ImageX src={`img/${value}`} className={className} {...imgProps} />
            </MenuItem>
        );
        var dropdownMenu = open ? (
            <NanoScroller>
                <ul className="head-list">
                    { images }
                </ul>
            </NanoScroller>
        ) : null;

        return(
            <Dropdown id={id} onToggle={onToggle} open={open} >
                <Dropdown.Toggle className="with-caret-bottom-right" useAnchor noCaret>
                    <ImageX src={'img/' + this.props.getValue()} className={cx(className, ['media-object', 'mar-hor'])} {...imgProps} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-img dropdown-menu-img-lg">
                    { dropdownMenu }
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

var controls = {};
_.extend(
    controls, 
    {
        Formsy,
        FormStatic,
        FormInput,
        FormCheckboxGroup,
        ImageSelect
    }
);

export default controls;
