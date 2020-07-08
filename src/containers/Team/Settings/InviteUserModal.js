import React, {Component} from 'react';
import {
    Modal,
    Dropdown,
    Icon,
    Message,
    Input as SUInput,
    Button as SUIButton, Loader
} from "semantic-ui-react";
import {validateEmail} from "../../../utils";
import {ROLE_OPTIONS, TEAM_ROLES, INVITE_METHODS} from "../../../constants";
import {Form, Input, Button} from "formik-semantic-ui";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {createTeamInvite, generateTeamInviteURL} from "../../../actions/invitations";
import {push} from 'connected-react-router'

// todo: overhaul formik shit so the error message doesnt suck ASS


class InviteUserModal extends Component {
    state = {
        inviteType: null,
        inviteRole: TEAM_ROLES.PLAYER,
        copied: false
    }

    handleSubmit = (values, formikApi) => {
        console.log(values, formikApi);
        console.log("bruh");
        if (values.email === '') {
            formikApi.setFieldError('email', 'Cannot be Blank')
        } else {
            const {inviteType, inviteRole} = this.state;
            values.role = inviteRole;
            values.method = INVITE_METHODS.USERNAME;
            console.log(values);
            this.props.createTeamInvite(this.props.activeTeam, values);
        }
    }

    validate = (values) => {
        console.log("validate", values);
        var errors = {}
        if (values.username === '') {
            errors.username = "Username cannot be blank";
        }
        return errors;
    }

    generateInviteLink = () => {
        const {inviteRole} = this.state;
        this.setState({
            inviteType: INVITE_METHODS.LINK
        })
        let values = {
            role: inviteRole,
            method: INVITE_METHODS.LINK
        }

        if (this.props.invite.inviteLink === null) {
            this.props.generateTeamInviteURL(this.props.activeTeam, values);
        }
    }

    copyText = (e) => {
        console.log(e);
        this.inviteLinkRef.select();
        document.execCommand('copy');
        this.inviteLinkRef.focus();
        this.setState({
            copied: true
        })
    }

    renderBody = () => {
        if (this.props.invite.inviteLink !== null) {
            return (
                <React.Fragment>
                    <SUInput value={this.props.invite.inviteLink.link}

                             ref={(input) => this.inviteLinkRef = input}
                             action={{
                                 icon: 'copy',
                                 content: 'Copy',
                                 onClick: this.copyText
                             }}/>
                    <Message
                        success
                        hidden={!this.state.copied}
                        compact
                        content='Invite Url Copied to Clipboard... URL Expires in 1 Hour'
                    />
                </React.Fragment>


            )
        } else {
            return (
                <Form initialValues={{email: ''}} validate={this.validate} onSubmit={this.handleSubmit}>
                    <div className={"invite-wrapper"}>
                        <Input
                            type={"text"}
                            name={'username'}
                            inputProps={{placeholder: 'Username'}}
                            labelPosition='right'
                        />
                        <Button.Submit>Invite</Button.Submit>
                    </div>
                </Form>
            )
        }
    }

    renderContent = () => {
        if (this.state.inviteType === null) {
            return (
                <Button.Group size={"large"} widths={"2"}>
                    <Button onClick={() => this.setState({inviteType: INVITE_METHODS.USERNAME})} color={"green"}><Icon
                        name={"user"}/> Username</Button>
                    <Button.Or/>
                    <Button color={"blue"}
                            onClick={this.generateInviteLink}>Invite Link <Icon name={"linkify"}/></Button>
                </Button.Group>
            )
        } else if (this.state.inviteType == INVITE_METHODS.LINK) {
            if (this.props.invite.loading) {
                return (
                    <Loader inline active>Loading</Loader>
                )
            } else {

                return (
                    <React.Fragment>
                        <SUInput
                            value={this.props.invite.inviteLink.link}
                            ref={(input) => this.inviteLinkRef = input}
                            action={{
                                icon: 'copy',
                                content: 'Copy',
                                onClick: this.copyText
                            }}/>
                        <Message
                            success
                            hidden={!this.state.copied}
                            compact
                            content='Invite Url Copied to Clipboard... URL Expires in 1 Hour'
                        />
                    </React.Fragment>
                )
            }
        } else {
            return (
                <Form initialValues={{username: ''}} validate={this.validate} onSubmit={this.handleSubmit}>
                    <div className={"invite-wrapper"}>
                        <Input
                            type={"text"}
                            name={'username'}
                            inputProps={{placeholder: 'Username'}}
                            labelPosition='right'
                        />
                        <Button.Submit>Invite</Button.Submit>
                    </div>
                </Form>
            )
        }

    }

    render() {
        return (
            <Modal trigger={<Button basic size={"mini"}>Invite</Button>}
                   size={"tiny"}
                   className={"invite-modal"}>
                <Modal.Header>
                    <div>Invite <Dropdown
                        onChange={(e, {value}) => this.setState({inviteRole: value})}
                        defaultValue={TEAM_ROLES.PLAYER}
                        options={ROLE_OPTIONS.filter(elem => elem.value !== "OWNER")}/></div>
                    <div>
                    </div>
                </Modal.Header>
                <Modal.Content>
                    {this.renderContent()}
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    invite: state.invitations
})

const mapDispatchToProps = dispatch => bindActionCreators({
    createTeamInvite: (team, data) => createTeamInvite(team, data),
    generateTeamInviteURL: (team, data) => generateTeamInviteURL(team, data)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InviteUserModal);
