import React from 'react';
import classNames from 'classnames';
import { Icons } from './icon.jsx';

var ScrollTopButton = React.createClass({
	getInitialState: function() {
		return ({
			offsetTop: 250,
			visible: false
		});
	},
	componentDidMount: function() {
		window.addEventListener('scroll', this.handleScroll);
	},
	componentWillUnmount: function() {
	    window.removeEventListener('scroll', this.handleScroll);
	},
	handleScroll: function(event) {
	    let scrollTop = event.srcElement.body.scrollTop;

	    if (scrollTop > this.state.offsetTop && !this.state.visible) {
            // nifty.navbar.addClass('shadow');
            this.setState({visible: true});
        }else if (scrollTop < this.state.offsetTop && this.state.visible) {
            // nifty.navbar.removeClass('shadow');
            this.setState({visible: false});
        }
	},
	handleClick: function(e) {
		e.preventDefault();

        $('body, html').animate({
            scrollTop : 0
        }, 500);
	},
	render: function() {
		var iconEl = Icons['chevron-up'];
		var className = classNames('btn', this.state.visible ? 'in' : '');
		return (
			<button id='scroll-top' className={className} onClick={this.handleClick} >
				{iconEl}
			</button>
		)
	}
});

var Buttons = {};
Buttons.ScrollTopButton = ScrollTopButton;

module.exports = Buttons;
module.exports.Buttons = Buttons;