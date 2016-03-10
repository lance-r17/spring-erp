import React from 'react';
import { Button, Modal, OverlayTrigger, Tooltip, PanelAlert } from '../controls/bootstrap.jsx';

const toggleable = (DecoratedComponent) => {

    return class extends React.Component {
    	constructor(props) {
			super(props);

			this.state = {
				open: false
			}
		}

		onToggle = (data) => {

			var open = !this.state.open;

			if (typeof data !== "undefined") {
				if (typeof data === "boolean") {
					open = data;
				} else if (typeof data.altKey !== "undefined" && data.preventDefault) {
					// it's an Event
					data.preventDefault();
				}
			}

			this.setState({
				open: open
			});
		}

		render() {
			var props = {}
			_.extend(props, this.props, { onToggle: this.onToggle });
			return (
				<DecoratedComponent {...props} {...this.state} />
			)
		}
    }
}

const formModal = (DecoratedComponent) => {

    @toggleable
    class FormModal extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                canSubmit: false,
                hasAlert: false,
                alertTitle: '',
                alertDetails: ''
            }
        }

        clearAlert = () => {
            this.setState({
                hasAlert: false,
                alertTitle: '',
                alertDetails: ''
            });
        }

        popAlert = (title, details) => {
            this.setState({
                hasAlert: true,
                alertTitle: title,
                alertDetails: details
            })
        }

        closeModal = () => {
            this.clearAlert();
            this.props.onToggle(false);
        }

        enableSubmit = () => {
            this.setState({
                canSubmit: true
            });
        }

        disableSubmit = () => {
            this.setState({
                canSubmit: false
            });
        }

        render() {
            const { toggleButton, tooltip, open, onToggle, ...propsForDecoration } = this.props;
            const methods = {
                enableSubmit: this.enableSubmit,
                disableSubmit: this.disableSubmit,
                popAlert: this.popAlert,
                closeModal: this.closeModal
            };
            const alerts = <PanelAlert bsStyle="danger" show={this.state.hasAlert} title={this.state.alertTitle} errors={this.state.alertDetails} />

            var props = {};
            _.extend(props, {...propsForDecoration}, {...this.state}, { alerts }, {...methods});

            var button = <Button {...toggleButton} onClick={onToggle}>{toggleButton.value}</Button>

            if (tooltip) {
                const { placement, title } = tooltip;
                button = (
                    <OverlayTrigger placement={ placement } overlay={ <Tooltip>{title}</Tooltip> }>
                        { button }
                    </OverlayTrigger>
                );
            }

            return (
                <span>
                    { button }
                    <Modal show={ open } onHide={ this.closeModal }>
                        <DecoratedComponent {...props} />
                    </Modal>
                </span>
            )
        }
    }

    return FormModal;
}

export { toggleable, formModal };