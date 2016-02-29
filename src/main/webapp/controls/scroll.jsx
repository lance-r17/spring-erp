import React from 'react';
import ReactDOM from 'react-dom';
import nanoScroller from 'nanoscroller';
import $ from 'jquery';

var NanoScroller =  React.createClass({
    componentDidMount: function () {
        this.scrollContainer = $(ReactDOM.findDOMNode(this.refs['scroll-container']));

        this.scrollContainer.nanoScroller({preventPageScrolling: true});
    },

    componentWillUnmount: function () {
        this.scrollContainer.nanoScroller({destroy: true});
    },

    render: function () {
        return (
            <div ref="scroll-container" {...this.props} className="nano scrollable">
                <div className="nano-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = NanoScroller;