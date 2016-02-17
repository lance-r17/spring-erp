import React from 'react';
import classNames from 'classnames';

const shapes = {
	circle: 'icon-circle',
};

const graphes = {
	comment: 'fa-comment',
	hdd: 'fa-hdd-o',
	word: 'fa-file-word-o',
	user: 'fa-user'
};

var Icon = React.createClass({
	render: function() {
		var spanClassName = classNames('icon-wrap', shapes[this.props.shape], 'bg-' + this.props.bgColor);
		var iconClassName = classNames('fa', graphes[this.props.graph], 'fa-lg');
		return (
			<span className={spanClassName}>
				<i className={iconClassName}></i>
			</span>
		)
	}
});

var Icons = {};
Icons['comment'] = <Icon shape='circle' bgColor='primary' graph='comment' />;
Icons['hdd'] = <Icon shape='circle' bgColor='danger' graph='hdd' />;
Icons['word'] = <Icon shape='circle' bgColor='info' graph='word' />;
Icons['user'] = <Icon shape='circle' bgColor='success' graph='user' />;

module.exports = Icon;
module.exports.Icons = Icons;