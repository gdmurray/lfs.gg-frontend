import React, {Component} from 'react';
import PrivateRoute from '../PrivateRoute';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import {TeamSettingsComponent, TeamRolesComponent, TeamPrivacyComponent} from "../../components/Team/Settings";

import {
    Header
} from "semantic-ui-react";

import "./settings.css";

class TeamSettings extends Component{
    render(){
        let splitLocation = this.props.location.pathname.split("/");
        const activeSettingsTab = splitLocation[splitLocation.length - 1];
        console.log(activeSettingsTab);
        return (
            <div className="settings-wrapper">
                <div className="settings-content-wrapper">
                    <div className="settings-sidebar">
                        <ul>
                            <li className={activeSettingsTab === "settings" ? 'active': ''} onClick={() => this.props.goToRoute("/team/settings")}>Team Settings</li>
                            <li className={activeSettingsTab === "roles" ? 'active': ''} onClick={() => this.props.goToRoute("/team/settings/roles")}>Roles</li>
                            <li className={activeSettingsTab === "privacy" ? 'active': ''} onClick={() => this.props.goToRoute("/team/settings/privacy")}>Privacy</li>
                        </ul>
                    </div>
                    <div className="settings-content">
                        <PrivateRoute exact path={`${this.props.match.path}`} component={TeamSettingsComponent}/>
                        <PrivateRoute path={`${this.props.match.path}/roles`} component={TeamRolesComponent}/>
                        <PrivateRoute path={`${this.props.match.path}/privacy`} component={TeamPrivacyComponent}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    goToRoute: (url) => push(url)
}, dispatch);


export default connect(null, mapDispatchToProps)(TeamSettings);