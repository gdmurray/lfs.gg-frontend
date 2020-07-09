import React, {Component} from 'react';
import AppWrapper from "../Nav/AppWrapper";
import {Container, Menu, Header} from 'semantic-ui-react';
//import TeamContent from "../../components/TeamContent";
import NoTeamsFound from "./NoTeamsFound";
import PrivateRoute from '../common/PrivateRoute';
import TeamSettings from "../TeamSettings/TeamSettings";
import TeamHomeComponent from './TeamHomeComponent';

import TeamScrims from "./TeamScrims";
import TeamCalendar from "./TeamCalendar";
import {connect} from 'react-redux';
import {fetchUserTeamPermissions} from "../User/ducks/actions";
import {bindActionCreators} from 'redux'
import {push} from 'connected-react-router'
import {refreshPermissions} from "../../utils/utils";
import {fetchTeamHomeData} from "./ducks/actions";
import {TEAM_ROLES} from "../../utils/constants";
import TeamSchedule from "./TeamSchedule";
import {activeTeam} from "../../reducers";
// TODO: Better Error Handling
// TODO: Vary view based on authentication... gonna need some fun classes

class TeamHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'home'
        }
    }

    handleItemClick = (e, {name}) => this.setState({activeTab: name})

    routeDiff = (pathname, activeTab, source) => {
        if (pathname.includes('settings')) {
            pathname = '/team/settings';
        }

        if (activeTab !== this.urlMap[pathname]) {
            this.setState({
                activeTab: this.urlMap[pathname]
            })
        }
    }

    componentWillReceiveProps(props) {
        this.routeDiff(props.location.pathname, this.state.activeTab, 'componentWillReceiveProps');
    }

    componentDidMount() {
        this.routeDiff(this.props.location.pathname, this.state.activeTab, 'componentDidMount');
        if (this.props.activeTeam !== undefined && this.props.activeTeam !== null) {
            // TODO: Add Last fetched flag, so we can keep the persisted data
            this.props.fetchTeamHomeData(this.props.activeTeam);

            // Refresh Permissions if it didnt happen before
            if (refreshPermissions(this.props)) {
                console.log("refresh Permissions");
                this.props.refreshPermissions(this.props.activeTeam);
            }
        }
    }

    handleTabClick = (e, {name}) => {
        const {activeTab} = this.state;
        var url = e.target.getAttribute('data-url');
        if (name !== activeTab) {
            this.setState({
                activeTab: name
            });
            this.props.goToRoute(url);
        }
    }

    urlMap = {
        '/team': 'home',
        '/team/calendar': 'calendar',
        '/team/schedule': 'schedule',
        '/team/scrims': 'scrims',
        '/team/settings': 'settings'
    }

    renderSettingsTab = (activeTab) => {
        if (this.props.permissions.data.team_id === this.props.activeTeam) {
            if (this.props.permissions.data.role !== TEAM_ROLES.PLAYER) {
                return (
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='settings'
                            data-url="/team/settings"
                            active={activeTab === 'settings'}
                            onClick={this.handleTabClick}
                        />
                    </Menu.Menu>
                )
            }
        }
        return null;
    }

    render() {
        const {activeTab} = this.state;
        if (this.props.activeTeam) {
            return (
                <AppWrapper>
                    <Header as="h2">{this.props.teamData.data.name}</Header>
                    <Menu pointing secondary className="lfs-menu-secondary">
                        <Menu.Item
                            data-url="/team"
                            name='home'
                            active={activeTab === 'home'}
                            onClick={this.handleTabClick}
                        />
                        <Menu.Item
                            name="schedule"
                            data-url={"/team/schedule"}
                            active={activeTab === 'schedule'}
                            onClick={this.handleTabClick}
                        />
                        <Menu.Item
                            name='calendar'
                            data-url="/team/calendar"
                            active={activeTab === 'calendar'}
                            onClick={this.handleTabClick}
                        />
                        <Menu.Item
                            name='scrims'
                            data-url="/team/scrims"
                            active={activeTab === 'scrims'}
                            onClick={this.handleTabClick}
                        />
                        {this.renderSettingsTab(activeTab)}
                    </Menu>
                    <div className="team-inner-content">
                        <PrivateRoute exact path={`${this.props.match.path}/`}
                                      component={TeamHomeComponent}/>
                        <PrivateRoute exact path={`${this.props.match.path}/calendar`}
                                      component={TeamCalendar}/>
                        <PrivateRoute exact path={`${this.props.match.path}/schedule`}
                                      component={TeamSchedule}/>
                        <PrivateRoute exact path={`${this.props.match.path}/scrims`}
                                      component={TeamScrims}/>
                        <PrivateRoute path={`${this.props.match.path}/settings`}
                                      component={TeamSettings}/>
                    </div>
                </AppWrapper>
            )
        } else {
            return (
                <AppWrapper>
                    <NoTeamsFound {...this.props}/>
                </AppWrapper>
            )
        }
    }
}

const mapStateToProps = state => ({
    activeTeam: activeTeam(state),
    permissions: state.user.teamPermissions,
    teamData: state.teams.teamData
})
const mapDispatchToProps = dispatch => bindActionCreators({
    goToRoute: (url) => push(url),
    fetchTeamHomeData: (id) => fetchTeamHomeData(id),
    refreshPermissions: (team) => fetchUserTeamPermissions(team)
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(TeamHome);

