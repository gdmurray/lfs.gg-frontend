import React, {Component} from 'react';
import {AppSidebar, Navbar} from "../Nav/";
import { Container, Menu, Header } from 'semantic-ui-react';
//import TeamContent from "../../components/TeamContent";
import PrivateRoute from '../PrivateRoute';
import TeamSettings from './TeamSettings';
import TeamHomeComponent from '../../components/Team/TeamHomeComponent';

import TeamScrims from "./TeamScrims";
import TeamCalendar from "./TeamCalendar";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'

class TeamHome extends Component{
    constructor(props){
        super(props);
        this.state ={
            activeTab: 'home'
        }
    }
    handleItemClick = (e, { name }) => this.setState({ activeTab: name })

    routeDiff = (pathname, activeTab, source) => {
        if(pathname.includes('settings')){
            pathname = '/team/settings';
        }

        if(activeTab !== this.urlMap[pathname]){
            this.setState({
                activeTab: this.urlMap[pathname]
            })
        }
    }
    
    componentWillReceiveProps(props){
        this.routeDiff(props.location.pathname, this.state.activeTab, 'componentWillReceiveProps');
    }

    componentDidMount(){
        this.routeDiff(this.props.location.pathname, this.state.activeTab, 'componentDidMount');
    }

    handleTabClick = (e, {name}) => {
        const {activeTab} = this.state;
        var url = e.target.getAttribute('data-url');
        if(name !== activeTab){
            this.setState({
                activeTab: name
            });
            this.props.goToRoute(url);
        }
    }

    urlMap = {
        '/team': 'home',
        '/team/calendar': 'calendar',
        '/team/scrims': 'scrims',
        '/team/settings': 'settings'
    }
    
    render(){
        const {activeTab} = this.state;
        return (
            <div className="app-content">
                <AppSidebar />
                <div className="core-content">
                    <Navbar />
                    <div className="page-content">
                        <Header as="h2">Team Name</Header>
                        <Menu pointing secondary className="lfs-menu-secondary">
                            <Menu.Item
                                data-url="/team"
                                name='home'
                                active={activeTab === 'home'}
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
                            <Menu.Menu position='right'>
                                <Menu.Item
                                name='settings'
                                data-url="/team/settings"
                                active={activeTab === 'settings'}
                                onClick={this.handleTabClick}
                                />
                            </Menu.Menu>
                        </Menu>
                        <div className="team-inner-content">
                            <PrivateRoute exact path={`${this.props.match.path}/`} component={TeamHomeComponent}/>
                            <PrivateRoute exact path={`${this.props.match.path}/calendar`} component={() => <TeamCalendar />} />
                            <PrivateRoute exact path={`${this.props.match.path}/scrims`} component={TeamScrims} />
                            <PrivateRoute path={`${this.props.match.path}/settings`} component={TeamSettings} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    goToRoute: (url) => push(url)
}, dispatch);


export default connect(null, mapDispatchToProps)(TeamHome);

