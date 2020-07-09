import React, {Component} from 'react';
import {Container, Header, Tab, Menu, Image} from "semantic-ui-react";


const TeamNotifications = (props) => {
    console.log("Team props", props);
    return (
        <Tab.Pane>
            Notifications for {props.team.name}
        </Tab.Pane>
    )
}


class NotificationsHome extends Component {
    render() {
        return (
            <Tab.Pane>
                Home Notification Content
            </Tab.Pane>
        );
    }
}

export default class NotificationsComponent extends Component {
    state = {
        activeIndex: 0,
        selection: null
    }

    handleTabChange = (e, {activeIndex}) => {
        if (this.state.selection !== null) {
            if (this.state.selection.pane !== activeIndex) {
                this.setState({
                    selection: null,
                    activeIndex: activeIndex
                })
                this.props.goToRoute("/notifications");
            }
        } else {
            this.setState({activeIndex})
        }
    }


    componentDidMount() {
        // If there is a target notification in the url, handle that and set the tab to that
        if (!this.props.match.isExact) {
            const {path} = this.props.match;
            const {pathname} = this.props.location;
            let targetPath = pathname.replace(path, '').replace('/', '');
            const notificationTargets = targetPath.split('/');
            if (notificationTargets.length >= 1) {
                let paneTarget = notificationTargets[0];
                let panes = this.generatePanes();
                Array.prototype.withIndex = function () {
                    return this.map((v, i) => ({value: v, index: i}))
                }
                panes.forEach((e, index) => {
                    console.log(e, index);
                })
                let activePane = panes.withIndex().filter(x => x.value.menuItem.key == paneTarget);
                if (activePane.length > 0) {
                    const {index} = activePane[0];
                    this.setState({
                        activeIndex: index,
                        selection: {
                            pane: notificationTargets[0],
                            target: notificationTargets
                        }
                    })
                }
            }
        }
    }

    createTeamTabContent = (team) => {
        if (team.logo !== null) {
            return {
                menuItem: (
                    <Menu.Item key={team.id}>
                        <Image src={team.logo} circular size={"mini"}/>&nbsp;{team.name}
                    </Menu.Item>
                ),
                render: () => <TeamNotifications {...this.props} team={team}/>
            }
        } else {
            return {
                menuItem: {key: team.id, icon: 'users', content: team.name},
                render: () => <TeamNotifications {...this.props} team={team}/>
            }
        }
    }

    generatePanes = () => {
        const {teams} = this.props.userInfo;
        const panes = [
            {
                menuItem: {key: 'Home', icon: 'home', content: 'Home'},
                render: () => <NotificationsHome {...this.props}/>
            }
        ]
        for (var team of teams) {
            panes.push(this.createTeamTabContent(team.team))
        }
        return panes;
    }

    render() {
        return (
            <Container>
                <Header as={"h2"} content={"Your Notifications"}/>
                <Tab activeIndex={this.state.activeIndex}
                     className={"notifications-tabs"}
                     panes={this.generatePanes()}
                     onTabChange={this.handleTabChange}/>
            </Container>
        )
    }
}
