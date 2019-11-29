import React, {Component } from 'react';
import {
    Sidebar, Menu, Dropdown, Header, Accordion,  Icon
} from "semantic-ui-react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'

function mapTeamsToOptions(teams){
    return teams.map((item, i) => ({key: item.team.name, text: item.team.name, value: item.team.id}));
}

class AppSidebar extends Component{
    state = {
        activeTabs: {
            0: false,
            1: false
        }
    }

    handleItemClick = (e, index) => {
        //console.log("Handle item click");
        var url = e.target.getAttribute('data-url');
        //console.log(url);
        if(url !== undefined && url !== null) {
            //console.log("go to url");
            this.props.goTo(url);
        } else if(e.target.href === undefined && e.target.type === undefined){
            var {activeTabs} = this.state;
            activeTabs[index] = !activeTabs[index]
            this.setState({
                activeTabs: activeTabs
            });
        }
    }
    
    renderTeams = () => {
        if(this.props.userInfo){
            if(this.props.userInfo.teams.length > 0){
                //console.log(this.props);
                const{teams} = this.props.userInfo;
                const{activeTeam} = this.props;
                return (
                    <div className="team-dropdown-wrapper">
                        <Dropdown selection className="team-dropdown" value={activeTeam} options={mapTeamsToOptions(teams)} upward={true}  />
                    </div>
                )
            }else{
                return (
                    <div>You dont belong to a team</div>
                )
            }
        }else{
            return (
                <div>You dont belong to a team</div>
            )
        }
    }
    
    render(){
        const {activeTabs} = this.state;
        return(
            <Sidebar visible={true} className='app-sidebar' vertical>
                <div className="top">
                    <Menu secondary vertical>
                        <Menu.Item>
                            <Header as='h1' className='app-header'>lfs.gg</Header>
                        </Menu.Item>
                        <Menu.Item className="side-element" onClick={() => this.props.goToHome()}>
                            <span>HOME</span>
                        </Menu.Item>
                        <Accordion as={Menu} vertical secondary className="sidebar-accordion">
                            <Menu.Item className={activeTabs[0] ? 'active side-element': 'side-element'}
                                        onClick={(e) => this.handleItemClick(e, 0)} 
                                        as="div">
                                <Accordion.Title
                                    index={0}
                                    active={activeTabs[0]}
                                    >
                                    <Icon name='dropdown' />
                                    <span><Icon name="twitter"/> TEAM</span>
                                </Accordion.Title>
                                <Accordion.Content active={activeTabs[0]}>
                                    <ul>
                                        <li data-url="/team">Home</li>
                                        <li data-url="/team/calendar">Schedule</li>
                                        <li data-url="/team/scrims">Scrims</li>
                                        <li data-url="/team/settings">Settings</li>
                                    </ul>
                                </Accordion.Content>
                            </Menu.Item>

                            <Menu.Item className={activeTabs[1] ? 'active side-element': 'side-element'}
                                        onClick={(e) => this.handleItemClick(e, 1)}
                                        as="div">
                            <Accordion.Title
                                    index={1}
                                    active={activeTabs[1]}
                                    >
                                    <Icon name='dropdown' />
                                    <span><Icon name="cog"/> SETTINGS</span>
                                </Accordion.Title>
                                <Accordion.Content active={activeTabs[1]}>
                                    <ul className="sidebar-accounts-list">
                                        <li>Settings</li>
                                    </ul>
                                </Accordion.Content>
                            </Menu.Item>
                        </Accordion>
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
    userInfo: state.userInfo.data,
    loading: state.userInfo.loading,
    activeTeam: state.userInfo.activeTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
    goToHome: () => push("/"),
    goTo: (url) => push(url)
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);