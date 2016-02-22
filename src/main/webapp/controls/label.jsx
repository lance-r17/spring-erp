import React from 'react';
import cx from 'classnames';

// tag::label[]
var Label = React.createClass({
	render: function () {
		var { color, right, content } = this.props.options;
		var className = cx('label', color ? 'label-' + color : '', right ? 'pull-right' : '');
		return (
			<span className={className}>{content}</span>
		)
	}
});
// end::label[]

const ROLE_MAPPING = {
    'ROLE_MANAGER': {
        content: 'Manager',
        shortName: 'M',
        color: 'primary'
    },
    'ROLE_ADMIN':  {
        content: 'Administrator',
        shortName: 'A',
        color: 'danger'
    },
    'ROLE_APPROVER': {
        content: 'Approver',
        shortName: 'A',
        color: 'success'
    },
    'ROLE_OPERATOR': {
        content: 'Operator',
        shortName: 'O',
        color: 'warning'
    }
};


var RoleLabels = {};
_.each(_.keys(ROLE_MAPPING),
    key => {
        var options = {};
        _.extend(options, ROLE_MAPPING[key]);
        RoleLabels[key] = <Label options={options} />
    }
);

var RoleShortNameLabels = {};
_.each(_.keys(ROLE_MAPPING),
    key => {
        var options = {};
        var { color, shortName } = ROLE_MAPPING[key]
        _.extend(options, {content: shortName, color: color});
        RoleLabels[key] = <Label options={options} />
    }
);

module.exports = Label;
module.exports.Label = Label;
module.exports.RoleLabels = RoleLabels;
module.exports.RoleShortNameLabels = RoleShortNameLabels;
