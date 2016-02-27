import React from 'react';
import { Modal, Alert } from 'react-bootstrap';
import cx from 'classnames';


// tag::panel-alert[]
var PanelAlert = React.createClass({
   render: function() {
        var className = cx('alert-wrap', this.props.show ? 'in' : '');
        var messages = null;
        if (this.props.errors) {
            if ( Object.prototype.toString.call( this.props.errors ) === '[object Array]') {
                messages = this.props.errors.map(error =>
                    <p>{error.message}</p>
                )
            } else {
                messages = <p>{this.props.errors}</p>
            }
        }
        return (
            <div className="panel-alert">
                <div className={className}>
                    <Alert bsStyle={this.props.bsStyle}>
                        <div className="media">
                            <strong>{this.props.title}</strong>
                            {messages}
                        </div>
                    </Alert>
                </div>
            </div>
        )
   }
});
// end::panel-alert[]

var BootStrapControls = {
	Modal, 
	Alert,
	// tag::custom-controls[]
	PanelAlert
	// end::custom-controls[]
}

module.exports = BootStrapControls;