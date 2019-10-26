import React, { Component } from 'react'
import {
    Modal, Form, Button
} from 'semantic-ui-react';

export default class EditScrimModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: props.modalOpen
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ modalOpen: props.modalOpen })
    }
    handleClose = () => {
        this.props.onClose();
        this.setState({ modalOpen: false })
    }

    render() {
        return (
            <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}>
                <Modal.Header>Edit Scrim Details</Modal.Header>
                <Modal.Content>

                </Modal.Content>
                <Modal.Actions>
                    <Button >Save</Button>
                    <Button onClick={this.handleClose}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}