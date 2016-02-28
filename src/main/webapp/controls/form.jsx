import React from 'react';
import Formsy from 'formsy-react';
import InputElement from 'react-input-mask';
import cx from 'classnames';
import validator from 'validator';

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

var FormStatic = React.createClass({
    mixins: [Formsy.Mixin],
    componentWillMount: function () {
        this.setValue(this.props.defaultValue);
    },
    render: function () {
        const { name, title, hidden} = this.props;
        return (
            <div className={cx('form-group', hidden ? 'hide' : '')}>
                <label className="col-md-4 control-label" htmlFor={name}>{title}</label>
                <div className="col-md-4">
                    <p name={name} className="form-control-static">{hidden ? '' : this.getValue()}</p>
                </div>
            </div>
        )
    }
});

var FormInput = React.createClass({
    mixins: [Formsy.Mixin],
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue: function (event) {
        this.setValue(event.currentTarget.value);
    },
    componentWillMount: function () {
        this.setValue(this.props.defaultValue);
    },
    componentWillReceiveProps: function (nextProps) {
        // Only change to the new default value if it is currently showing the old one
        if (this.getValue() === this.props.defaultValue && nextProps.defaultValue !== this.props.defaultValue) {
            this.setValue(nextProps.defaultValue);
        }
    },
    render: function() {
        var { name, className, type, title, mask } = this.props;
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
                mask: mask || "",
                value: this.getValue(),
                onChange: this.changeValue
            }
        );

        var formGroupClassName = 'form-group',
            errorMessage = null,
            errors = [];
        
        if (this.showRequired()) {
            errorMessage = `${title} is required`;
        } else if (this.showError()) {
            // An error message is returned ONLY if the component is invalid
            // or the server has returned an error message
            errorMessage = this.getErrorMessage();
        }

        if (errorMessage) {
            formGroupClassName = cx(formGroupClassName, ['has-error', 'has-feedback']);
            errors.push(<i className="form-control-feedback fa fa-times-circle fa-lg"></i>);
            errors.push(<small className="help-block">{errorMessage}</small>);
        }

        return (
            <div className={formGroupClassName}>
                <label className="col-md-4 control-label" htmlFor={name}>{title}</label>
                <div className="col-md-7">
                    <InputElement {...props} placeholder={title} />
                    {errors}
                </div>
            </div>
        )
    }
});

var FormCheckboxGroup = React.createClass({
    mixins: [Formsy.Mixin],
    getInitialState: function() {
        return { 
            value: [], 
            cmp: (a, b) => a === b 
        };
    },
    componentDidMount: function () {
        const value = this.props.value || [];
        this.setValue(value);
        this.setState({ 
            value: value, 
            cmp: this.props.cmp || this.state.cmp 
        });
    },
    changeValue: function (value, event) {
        const checked = event.currentTarget.checked;

        let newValue = [];
        if (checked) {
            newValue = this.state.value.concat(value);
        } else {
            newValue = this.state.value.filter(it => !this.state.cmp(it, value));
        }

        this.setValue(newValue);
        this.setState({ value: newValue });
    },
    render: function () {

        const { name, title, items } = this.props;
        const labelClassName  = cx('form-checkbox', 'form-icon', 'form-text');
        var checkboxes = items.map((item, i) => (
             <label key={i} className={cx(labelClassName, contains(this.state.value, item.value, this.state.cmp) ? 'active' : '')}>
                <input
                  type="checkbox"
                  name={name}
                  onChange={this.changeValue.bind(this, item.value)}
                  checked={contains(this.state.value, item.value, this.state.cmp)}
                /> {item.display || item.value}
            </label>
        ));

        var formGroupClassName = 'form-group',
            errorMessage = null,
            errors = [];
        
        if (this.showRequired()) {
            errorMessage = `${title} is required`;
        } else if (this.showError()) {
            // An error message is returned ONLY if the component is invalid
            // or the server has returned an error message
            errorMessage = this.getErrorMessage();
        }

        if (errorMessage) {
            formGroupClassName = cx(formGroupClassName, ['has-error', 'has-feedback']);
            errors.push(<i className="form-control-feedback fa fa-times-circle fa-lg"></i>);
            errors.push(<small className="help-block">{errorMessage}</small>);
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

});

const FormControls = {
	Formsy,
	FormStatic,
	FormInput,
	FormCheckboxGroup
}

module.exports = FormControls;
