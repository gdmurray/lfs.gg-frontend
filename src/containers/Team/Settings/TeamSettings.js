import React, {Component} from 'react';
import PrivateRoute from "../../PrivateRoute";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {push} from 'connected-react-router'
import {TeamSettingsComponent, TeamRolesComponent, TeamPrivacyComponent} from "../../../components/Team/Settings";

import {
    Header, Menu
} from "semantic-ui-react";

import "./settings.css";
import {TEAM_ROLES} from "../../../constants";
import {deleteTeamRole} from "../../../actions/teamRoles";
import {fetchTeamSettings, uploadTeamLogo, updateTeamSettings} from "../../../actions/teamData";
import TeamSettingsForm from "../../../components/Team/Settings/TeamSettingsForm";
import TeamRolesForm from "../../../components/Team/Settings/TeamRolesForm";

class TeamSettings extends Component {
    componentDidMount() {
        if (this.props.permissions.data.team_id === this.props.activeTeam) {
            if (this.props.permissions.data.role === TEAM_ROLES.PLAYER) {
                this.props.goToRoute("/team");
            }
        }
    }

    render() {
        let splitLocation = this.props.location.pathname.split("/");
        const activeSettingsTab = splitLocation[splitLocation.length - 1];

        return (
            <div className="settings-wrapper">
                <div className="settings-content-wrapper">
                    <div className="settings-sidebar">
                        <ul>
                            <li className={activeSettingsTab === "settings" ? 'active' : ''}
                                onClick={() => this.props.goToRoute("/team/settings")}>Team Settings
                            </li>
                            <li className={activeSettingsTab === "roles" ? 'active' : ''}
                                onClick={() => this.props.goToRoute("/team/settings/roles")}>Roles
                            </li>
                            <li className={activeSettingsTab === "privacy" ? 'active' : ''}
                                onClick={() => this.props.goToRoute("/team/settings/privacy")}>Privacy
                            </li>
                        </ul>
                    </div>
                    <div className="settings-content">
                        <PrivateRoute exact path={`${this.props.match.path}`}>
                            <TeamSettingsComponent {...this.props} settingsTab={activeSettingsTab}>
                                <TeamSettingsForm/>
                            </TeamSettingsComponent>
                        </PrivateRoute>
                        <PrivateRoute path={`${this.props.match.path}/roles`}>
                            <TeamSettingsComponent {...this.props} settingsTab={activeSettingsTab}>
                                <TeamRolesForm/>
                            </TeamSettingsComponent>
                        </PrivateRoute>
                        <PrivateRoute path={`${this.props.match.path}/privacy`}>
                            <TeamSettingsComponent {...this.props} settingsTab={activeSettingsTab}>
                                <TeamSettingsForm/>
                            </TeamSettingsComponent>
                        </PrivateRoute>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    activeTeam: state.userInfo.activeTeam,
    settings: state.teamData.settings,
    permissions: state.permissions.team,
    activeUser: state.userInfo.data.id
})

const mapDispatchToProps = dispatch => bindActionCreators({
    goToRoute: (url) => push(url),
    fetchTeamSettings: (team, path) => fetchTeamSettings(team, path),
    uploadTeamLogo: (team, logo) => uploadTeamLogo(team, logo),
    updateTeamSettings: (team, data, path) => updateTeamSettings(team, data, path),
    deleteTeamRole: (team, role) => deleteTeamRole(team, role)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TeamSettings);
