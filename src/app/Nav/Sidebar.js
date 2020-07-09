import React, {Component} from "react";
import {TEAM_ROLES} from "../../utils/constants";
import {
    Sidebar as SUISidebar,
    Menu, Dropdown, Header, Accordion, Icon, Image
} from "semantic-ui-react";


function mapTeamsToOptions(teams) {
    return teams.map((item, i) => ({key: item.team.id, text: item.team.name, value: item.team.id}));
}

class Sidebar extends Component {
    state = {
        activeTab: null
    }

    componentDidMount() {
        this.handlePath(this.props.pathname);
        if (this.props.userInfo.data == null || this.props.userInfo.data == undefined) {
            this.props.fetchUserInfo();
        }
    }

    handlePath = (path) => {
        if (path === "/") {
            this.setState({activeTab: 0})
        } else if (path.startsWith("/team")) {
            this.setState({activeTab: 2})
        }
    }

    teamOptions = [
        {
            name: "Home",
            url: "/team",
            icon: "/img/icons/home-solid-red.svg"
        },
        {
            name: "Schedule",
            url: "/team/calendar",
            icon: "/img/icons/calendar-alt-regular.svg"
        },
        {
            name: "Scrims",
            url: "/team/scrims",
            icon: "/img/icons/swords-crossed-red.svg"
        },
        {
            name: "Settings",
            url: "/team/settings",
            icon: "/img/icons/cog-solid.svg"
        }
    ]

    settingsOptions = [
        {
            name: "Edit Profile",
            url: "/profile"
        },
        {
            name: "Notifications",
            url: "/settings/notifications"
        },
        {
            name: "Privacy",
            url: "/settings/privacy",
        },
        {
            name: "Account",
            url: "/settings/account"
        }
    ]

    handleItemClick = (e) => {
        var url = e.target.getAttribute('data-url');

    }

    handleMenuItemClick = (e) => {
        var url = e.currentTarget.getAttribute('data-url');
        if (url !== undefined && url !== null) {
            this.props.goTo(url);
        }
    }

    handleTeamChange = (e, data) => {
        const {value} = data;
        this.props.changeActiveTeam(value);
    }

    teamListTitle = (activeTeam) => {
        if (activeTeam == null) {
            return "SELECT A TEAM"
        } else {
            return "TEAM SELECTED"
        }
    }
    renderTeams = () => {
        if (this.props.userInfo.data) {
            const {teams} = this.props.userInfo.data;
            if (teams.length > 0) {
                const {activeTeam} = this.props;
                if (activeTeam == null) {
                    return (
                        <div className="team-dropdown-wrapper">
                            <div className="dropdown-header">SELECT TEAM</div>
                            <Dropdown onChange={this.handleTeamChange} selection className="team-dropdown"
                                      placeholder={"Select Team"} options={mapTeamsToOptions(teams)} upward={true}/>
                        </div>
                    )
                } else {
                    return (
                        <div className="team-dropdown-wrapper">
                            <div className="dropdown-header">TEAM SELECTED</div>
                            <Dropdown onChange={this.handleTeamChange} selection className="team-dropdown"
                                      value={activeTeam} options={mapTeamsToOptions(teams)} upward={true}/>
                        </div>
                    )
                }

            } else {
                return (
                    <div className="team-dropdown-error">
                        You dont belong to a team
                    </div>
                )
            }
        } else {
            return (
                <div className="team-dropdown-error">
                    You dont belong to a team
                </div>
            )
        }
    }

    filterSidebar = (elem) => {
        if (elem.key == "/team/settings") {
            //if (this.props.permissions.team.data.role === TEAM_ROLES.PLAYER) {
            //    return false;
            //}

        }
        return true
    }

    render() {
        const {activeTab} = this.state;
        return (
            <SUISidebar visible={true} className='app-sidebar'>
                <div className="top">
                    <Menu secondary vertical>
                        <Menu.Item className="sidebar-logo">
                            <Header as='h1' textAlign="center" className='app-header'><img
                                src={process.env.PUBLIC_URL + "/logo.svg"}/></Header>
                        </Menu.Item>
                        <Menu.Item className="sidebar-shortcuts">
                            <div data-url="/" className={activeTab === 0 ? 'active' : ''}
                                 onClick={this.handleMenuItemClick}>
                                <Image alias="home" src={process.env.PUBLIC_URL + "/img/icons/home.svg"}/>
                            </div>
                            <div data-url="/schedule" className={activeTab === 1 ? 'active' : ''}
                                 onClick={this.handleMenuItemClick}>
                                <Image alias="scrims"
                                       src={process.env.PUBLIC_URL + "/img/icons/clock-regular-white.svg"}/>
                            </div>
                            <div data-url="/teams" className={activeTab === 2 ? 'active' : ''}
                                 onClick={this.handleMenuItemClick}>
                                <Image alias="teams" src={process.env.PUBLIC_URL + "/img/icons/team.svg"}/>
                            </div>
                        </Menu.Item>
                        <hr className="sidebar-line"/>
                        <Menu text vertical className="sidebar-menu">
                            <Menu.Item header>Team</Menu.Item>
                            {this.teamOptions.map((obj, idx) => {
                                var assetName = obj.name.toLowerCase().replace(" ", '-');
                                return (
                                    <Menu.Item data-url={obj.url} onClick={this.handleMenuItemClick} key={obj.url}>
                                        <div><img alias={obj.name} src={process.env.PUBLIC_URL + obj.icon}/></div>
                                        <span>{obj.name}</span>
                                    </Menu.Item>
                                )
                            }).filter(elem => this.filterSidebar(elem))}
                        </Menu>
                        <Menu text vertical className="sidebar-menu">
                            <Menu.Item header>Settings</Menu.Item>
                            {this.settingsOptions.map((obj, idx) => {
                                var assetName = obj.name.toLowerCase().replace(" ", '-');
                                return (
                                    <Menu.Item data-url={obj.url} onClick={this.handleMenuItemClick} key={obj.url}>
                                        <Image alias={obj.name}
                                               src={process.env.PUBLIC_URL + `/img/icons/menu/${assetName}.svg`}/>
                                        <span>{obj.name}</span>
                                    </Menu.Item>
                                )
                            })}
                        </Menu>
                    </Menu>
                </div>
                <div className="bottom">
                    <hr className="sidebar-line"/>
                    {this.renderTeams()}
                </div>
            </SUISidebar>
        )
    }
}

export default Sidebar;
