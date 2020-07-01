import React, {Component} from 'react';
import {
    Modal,
    Dropdown,
    Icon,
    Button as SUIButton
} from "semantic-ui-react";
import {validateEmail} from "../../../utils";
import {ROLE_OPTIONS, TEAM_ROLES} from "../../../constants";
import {Form, Input, Button} from "formik-semantic-ui";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {createTeamInvite} from "../../../actions/teamRoles";
import {push} from 'connected-react-router'

// todo: overhaul formik shit so the error message doesnt suck ASS

const METHODS = {
    EMAIL: "EMAIL",
    LINK: "LINK"
}

class InviteUserModal extends Component {
    state = {
        inviteMethod: METHODS.EMAIL,
        inviteType: TEAM_ROLES.PLAYER
    }

    handleSubmit = (values, formikApi) => {
        if (values.email === '') {
            formikApi.setFieldError('email', 'Cannot be Blank')
        } else {
            const {inviteType, inviteMethod} = this.state;
            values.role = inviteType;
            values.method = inviteMethod;
            console.log(values);
            this.props.createTeamInvite(this.props.activeTeam, values);
        }
    }

    validate = (values) => {
        var errors = {}
        if (values.email !== '' && !(validateEmail(values.email))) {
            errors.email = "Please Enter a Valid Email Address"
        }
        return errors;
    }

    render() {

        return (
            <Modal trigger={<Button basic size={"mini"}>Invite</Button>}
                   size={"tiny"}
                   className={"invite-modal"}>
                <Modal.Header>
                    <div>Invite <Dropdown
                        onChange={(e, {value}) => this.setState({inviteType: value})}
                        defaultValue={TEAM_ROLES.PLAYER}
                        options={ROLE_OPTIONS.filter(elem => elem.value !== "OWNER")}/></div>
                    <div>
                        <SUIButton disabled={true} size={"mini"}>Invite Link <Icon name={"linkify"}/></SUIButton>
                    </div>
                </Modal.Header>
                <Modal.Content>
                    <Form initialValues={{email: ''}} validate={this.validate} onSubmit={this.handleSubmit}>
                        <div className={"invite-wrapper"}>
                            <Input
                                type={"email"}
                                name={'email'}
                                inputProps={{placeholder: 'Email Address'}}
                                labelPosition='right'
                            />
                            <Button.Submit>Invite</Button.Submit>
                        </div>
                    </Form>

                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    invite: state.teamRoles
})

const mapDispatchToProps = dispatch => bindActionCreators({
    createTeamInvite: (team, data) => createTeamInvite(team, data)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InviteUserModal);
