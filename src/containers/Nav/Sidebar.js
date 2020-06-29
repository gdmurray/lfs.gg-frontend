import React, {Component} from 'react';
import {
    Sidebar, Menu, Dropdown, Header, Accordion, Icon
} from "semantic-ui-react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {push} from 'connected-react-router'
import {TEAM_ROLES} from "../../constants";
import permissions from "../../reducers/permissions";


function mapTeamsToOptions(teams) {
    return teams.map((item, i) => ({key: item.team.id, text: item.team.name, value: item.team.id}));
}

// TODO: HANDLE LOGOUT NOT REDIRECTING
// TODO: SIMPLIFY SIDEBAR GENERATION WITH ROUTE LISTS... FUCK DIS HARDCODING SHIT
class AppSidebar extends Component {
    state = {
        activeTab: null
    }

    tabs = {
        '/': 'home',
        '/scrims': 'scrims',
        '/teams': 'teams'
    }

    handleRoute = (pathname, activeTab) => {
        if (activeTab !== this.tabs[pathname]) {
            this.setState({activeTab: this.tabs[pathname]})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handleRoute(this.props.pathname, this.state.activeTab);
    }

    componentDidMount() {
        this.handleRoute(this.props.pathname, this.state.activeTab);
    }


    handleSidebarClick = (e) => {
        var url = e.currentTarget.getAttribute('data-url');

        if (url !== undefined && url !== null) {
            this.props.goTo(url);
        }
    }

    renderTeams = () => {
        if (this.props.userInfo) {
            if (this.props.userInfo.teams.length > 0) {
                //console.log(this.props);
                const {teams} = this.props.userInfo;
                const {activeTeam} = this.props;
                return (
                    <div className="team-dropdown-wrapper">
                        <Dropdown selection className="team-dropdown" value={activeTeam}
                                  options={mapTeamsToOptions(teams)} upward={true}/>
                    </div>
                )
            } else {
                return (
                    <div>You dont belong to a team</div>
                )
            }
        } else {
            return (
                <div>You dont belong to a team</div>
            )
        }
    }

    renderTeamSettings = () => {
        if (this.props.permissions.team.team_id == this.props.activeTeam) {
            if (this.props.permissions.team.role !== TEAM_ROLES.PLAYER) {
                return (
                    <Menu.Item data-url="/team/settings" name='settings' onClick={this.handleSidebarClick}>
                        <div><img src={process.env.PUBLIC_URL + '/img/icons/cog-solid.svg'}/></div>
                        Settings
                    </Menu.Item>
                )
            }
        }
    }

    sidebarElement = (name, url, icon) => {
        return (
            <Menu.Item data-url={url} onClick={this.handleSidebarClick}>
                <div><img src={process.env.PUBLIC_URL + icon}/></div>
                {name}
            </Menu.Item>
        )
    }
    renderTeamTab = () => {
        const {activeTabs} = this.state;
        if (this.props.activeTeam !== undefined) {
            return (
                <Menu.Item className="side-element">
                    <span>MY TEAM</span>
                    <Menu.Menu>
                        {this.sidebarElement('Home', '/team', '/img/icons/home-solid-red.svg')}
                        <Menu.Item data-url="/team/calendar" name='add' onClick={this.handleSidebarClick}>
                            <div><img src={process.env.PUBLIC_URL + '/img/icons/calendar-alt-regular.svg'}/></div>
                            Calendar
                        </Menu.Item>
                        <Menu.Item data-url="/team/scrims" name='scrims' onClick={this.handleSidebarClick}>
                            <div><img src={process.env.PUBLIC_URL + '/img/icons/swords-crossed-red.svg'}/></div>
                            Scrims
                        </Menu.Item>
                        {this.renderTeamSettings()}
                    </Menu.Menu>
                </Menu.Item>
            )
        }
    }

    render() {
        const {activeTab} = this.state;
        return (
            <Sidebar visible={true} className='app-sidebar'>
                <div className="top">
                    <Menu secondary vertical>
                        <Menu.Item className="app-header">
                            <img src={process.env.PUBLIC_URL + '/logo.svg'} alt={"lfs logo"}/>
                        </Menu.Item>
                        <Menu.Item>
                            <div className="sidebar-tabs">
                                <div className={activeTab == 'home' ? 'active' : ''}
                                     data-url='/' onClick={this.handleSidebarClick}>
                                    <img src={process.env.PUBLIC_URL + '/img/icons/home.svg'}/>
                                </div>
                                <div className={activeTab == 'scrims' ? 'active' : ''}
                                     data-url='/scrims' onClick={this.handleSidebarClick}>
                                    <img src={process.env.PUBLIC_URL + '/img/icons/swords-crossed.svg'}/>
                                </div>
                                <div className={activeTab == 'teams' ? 'active' : ''}
                                     data-url='/teams' onClick={this.handleSidebarClick}>
                                    <img src={process.env.PUBLIC_URL + '/img/icons/users-solid.svg'}/>
                                </div>
                            </div>
                        </Menu.Item>
                        <hr className="sidebar-divider"/>
                        {this.renderTeamTab()}
                        <Menu.Item className="side-element">
                            <span>SETTINGS</span>
                            <Menu.Menu>
                                <Menu.Item data-url="/profile/edit" onClick={this.handleSidebarClick}>
                                    <div><img src={process.env.PUBLIC_URL + '/img/icons/user-edit-solid.svg'}/></div>
                                    Edit Profile
                                </Menu.Item>
                                <Menu.Item data-url="/notifications" onClick={this.handleSidebarClick}>
                                    <div><img src={process.env.PUBLIC_URL + '/img/icons/bell-solid.svg'}/></div>
                                    Notifications
                                </Menu.Item>
                                <Menu.Item data-url="/settings/privacy" onClick={this.handleSidebarClick}>
                                    <div><img src={process.env.PUBLIC_URL + '/img/icons/padlock.svg'}/></div>
                                    Privacy
                                </Menu.Item>
                                <Menu.Item data-url="/settings/account" onClick={this.handleSidebarClick}>
                                    <div><img src={process.env.PUBLIC_URL + '/img/icons/cogs-solid.svg'}/></div>
                                    Account
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="bottom">
                    {this.renderTeams()}
                </div>
            </Sidebar>
        )
    }
}

const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    userInfo: state.userInfo.data,
    permissions: state.permissions,
    loading: state.userInfo.loading,
    activeTeam: state.userInfo.activeTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
    goToHome: () => push("/"),
    goTo: (url) => push(url)
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);
