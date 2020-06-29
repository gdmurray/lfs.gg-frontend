import React, {Component} from 'react';
import PrivateRoute from '../PrivateRoute';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {push} from 'connected-react-router'
import {TeamSettingsComponent, TeamRolesComponent, TeamPrivacyComponent} from "../../components/Team/Settings";

import {
    Header, Menu
} from "semantic-ui-react";

import "./settings.css";
import {TEAM_ROLES} from "../../constants";

class TeamSettings extends Component {
    componentDidMount() {
        if(this.props.permissions.team_id === this.props.activeTeam){
            if(this.props.permissions.role === TEAM_ROLES.PLAYER){
                this.props.goToRoute("/team");
            }
        }
    }

    render() {
        console.log(this.props);
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
                            <TeamSettingsComponent {...this.props}/>
                        </PrivateRoute>
                        <PrivateRoute path={`${this.props.match.path}/roles`}>
                            <TeamRolesComponent {...this.props}/>
                        </PrivateRoute>
                        <PrivateRoute path={`${this.props.match.path}/privacy`}>
                            <TeamPrivacyComponent {...this.props}/>
                        </PrivateRoute>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    activeTeam: state.userInfo.activeTeam,
    permissions: state.permissions.team
})

const mapDispatchToProps = dispatch => bindActionCreators({
    goToRoute: (url) => push(url)
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(TeamSettings);
