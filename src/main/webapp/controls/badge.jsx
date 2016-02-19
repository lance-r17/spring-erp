import React from 'react';
import classNames from 'classnames';

// tag::badge[]
var Badge = React.createClass({
	render: function () {
		var { header, color, right, content } = this.props.options;
		var className = classNames('badge', header ? 'badge-header' : '', color ? 'badge-' + color : '', right ? 'pull-right' : '');
		return (
			<span className={className}>{content}</span>
		)
	}
});
// end::badge[]

module.exports = Badge;
module.exports.Badge = Badge;