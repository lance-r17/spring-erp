import React from 'react';
import classNames from 'classnames';

// tag::label[]
var Label = React.createClass({
	render: function () {
		var { color, right, content } = this.props.options;
		var className = classNames('label', color ? 'label-' + color : '', right ? 'pull-right' : '');
		return (
			<span className={className}>{content}</span>
		)
	}
});
// end::label[]

module.exports = Label;
module.exports.Label = Label;