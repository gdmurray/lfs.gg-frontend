import React, {Component} from 'react';
import {ROLE_HEIRARCHY, ROLE_OPTIONS} from "../../utils/constants";
import {capitalize} from "../../utils/utils";
import InviteUserModal from "../Notifications/InviteUserModal";
import {
    Header,
    Table, Confirm,
    Button, Icon, Dropdown
} from "semantic-ui-react";

import sortBy from "lodash/sortBy";

// todo: sort by OWNER, ADMIN, USER, PLAYER
export default class TeamRolesForm extends Component {

    state = {
        editMode: false,
        open: false,
        activeRole: null
    }

    openConfirm = () => this.setState({open: true})
    closeConfirm = () => this.setState({open: false})
    confirmDelete = () => {
        const {activeRole} = this.state;
        this.props.deleteTeamRole(this.props.activeTeam, activeRole);
        this.setState({activeRole: null})
        this.closeConfirm()
    }

    isUser = (user, role) => {
        return (user === role.user.id)
    }

    nameSubtitle = (role) => {
        if (this.props.activeUser == role.user.id) {
            return (
                <span>
                    (You)
                </span>
            )
        }

        if (role.invite !== null) {
            return (
                <span>({role.invite.status})</span>
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

    deleteRole = (roleId) => {
        this.setState({
            activeRole: roleId
        })
        this.openConfirm()
    }
    renderEditMode = (role) => {
        if (this.state.editMode && !(this.isUser(this.props.activeUser, role))) {
            return (
                <Table.Cell>
                    <Button onClick={this.deleteRole.bind(this, role.id)} icon='user delete' color={"red"}
                            size={"mini"}/>
                </Table.Cell>
            )
        }
    }

    invitedSubtitle = (role) => {

    }
    renderUsers = () => {
        let rows = [];
        if (this.props.settings.data.length > 0) {
            const {data} = this.props.settings;
            let sortedData = sortBy(data, [function (o) {
                return ROLE_HEIRARCHY[o.role]
            }, 'id']);
            for (var role of sortedData) {
                rows.push(
                    <Table.Row key={role.id} className={"user-row"}>
                        <Table.Cell>
                            {role.user.username} {this.nameSubtitle(role)}
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
                <Confirm open={this.state.open}
                         centered
                         size={"small"}
                         onCancel={this.closeConfirm}
                         onConfirm={this.confirmDelete}/>
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
