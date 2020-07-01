import React, {Component} from 'react';
import {ROLE_HEIRARCHY, ROLE_OPTIONS} from "../../../constants";
import {capitalize} from "../../../utils";
import InviteUserModal from "../../../containers/Team/Settings/InviteUserModal";
import {
    Header,
    Table,
    Button, Icon, Dropdown
} from "semantic-ui-react";

// todo: sort by OWNER, ADMIN, USER, PLAYER
export default class TeamRolesForm extends Component {

    state = {
        editMode: false
    }

    isUser = (user, role) => {
        return (user === role.user.id)
    }

    isYou = (role) => {
        if (this.props.activeUser == role.user.id) {
            return (
                <span>
                    (You)
                </span>
            )
        }
    }

    renderRoleDropdown = (role) => {
        if (!(this.isUser(this.props.activeUser, role))) {
            return (
                <Dropdown
                    defaultValue={role.role}
                    inline
                    options={ROLE_OPTIONS}/>
            )
        } else {
            return capitalize(role.role.toLowerCase());
        }
    }

    renderEditMode = (role) => {
        if (this.state.editMode && !(this.isUser(this.props.activeUser, role))) {
            return (
                <Table.Cell>
                    <Icon name={"user delete"} color={"red"}/>
                </Table.Cell>
            )
        }
    }
    renderUsers = () => {
        let rows = [];
        if (this.props.settings.data.length > 0) {
            const {data} = this.props.settings;
            data.sort((a, b) => (ROLE_HEIRARCHY[a.role] > ROLE_HEIRARCHY[b.role] ? 1 : -1))
            for (var role of data) {
                rows.push(
                    <Table.Row key={role.id} className={"user-row"}>
                        <Table.Cell>
                            {role.user.username} {this.isYou(role)}
                        </Table.Cell>
                        <Table.Cell>
                            {role.user.email}
                        </Table.Cell>
                        <Table.Cell>
                            {this.renderRoleDropdown(role)}
                        </Table.Cell>
                        {this.renderEditMode(role)}
                    </Table.Row>
                )
            }
        }
        return rows;
    }

    render() {
        return (
            <div>
                <div className={"role-bar"}>
                    <Header as={"h4"}>Roles</Header>
                    <div>
                        <Button active={this.state.editMode}
                                basic size={"mini"}
                                onClick={() => this.setState({editMode: !this.state.editMode})}>Edit</Button>
                        <InviteUserModal {...this.props}/>
                    </div>


                </div>
                <Table basic="very">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell colSpan={this.state.editMode ? '2' : '1'}>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderUsers()}
                    </Table.Body>
                </Table>
            </div>

        )
    }
}
