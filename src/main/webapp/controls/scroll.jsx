import React from 'react';
import ReactDOM from 'react-dom';
import nanoScroller from 'nanoscroller';
import $ from 'jquery';

class NanoScroller extends React.Component {
    componentDidMount() {
        this.scrollContainer = $(ReactDOM.findDOMNode(this.refs['scroll-container']));

        this.scrollContainer.nanoScroller({preventPageScrolling: true});
    }

    componentWillUnmount() {
        this.scrollContainer.nanoScroller({destroy: true});
    }

    render() {
        return (
            <div ref="scroll-container" {...this.props} className="nano scrollable">
                <div className="nano-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default NanoScroller;