import React from 'react';
import classNames from 'classnames';
import _ from 'lodash'

const shapes = {
	circle: 'icon-circle'
};

const graphes = {
	'comment': 		'fa-comment',
	'hdd': 			'fa-hdd-o',
	'word': 		'fa-file-word-o',
	'user': 		'fa-user',
	'users': 		'fa-users',
	'dashboard': 	'fa-dashboard',
	'th': 			'fa-th',
	'flask': 		'fa-flask',
	'briefcase': 	'fa-briefcase',
	'edit': 		'fa-edit',
	'table': 		'fa-table',
	'line-chart': 	'fa-line-chart',
	'plug': 		'fa-plug',
	'envelope': 	'fa-envelope',
	'file': 		'fa-file',
	'plus-square': 	'fa-plus-square',
	'chevron-up': 	'fa-chevron-up'
};

var Icon = React.createClass({
	render: function() {
		var { graph, extra } = this.props.options;
		var className = classNames('fa', graphes[graph], extra);
		return (
			<i className={className}></i>
		)
	}
});

var Icons={};
// _.each(['dashboard', 'th', 'flask', 'briefcase', 'edit', 'table', 'line-chart', 'plug', 'envelope'], 
_.each(_.keys(graphes),
	name => {
		Icons[name] = <Icon options={{graph: name}} />
	}
);

var WrapIcon = React.createClass({
	render: function() {
		var { shape, bgColor, graph } = this.props.options;
		var className = classNames('icon-wrap', shapes[shape], bgColor ? 'bg-' + bgColor : '');
		return (
			<span className={className}>
				<Icon options={{graph: graph, extra: 'fa-lg'}} />
			</span>
		)
	}
});

var WrapIcons = {};
WrapIcons['comment'] 	= <WrapIcon options={{shape:'circle', bgColor: 'primary', graph: 'comment'}} />;
WrapIcons['hdd'] 		= <WrapIcon options={{shape: 'circle', bgColor: 'danger', graph:'hdd'}} />;
WrapIcons['word'] 		= <WrapIcon options={{bgColor: 'info', graph: 'word'}} />;
WrapIcons['user'] 		= <WrapIcon options={{bgColor: 'success', graph: 'user'}} />;

module.exports = Icon;
module.exports.Icon = Icon;
module.exports.Icons = Icons;
module.exports.WrapIcon = WrapIcon;
module.exports.WrapIcons = WrapIcons;
