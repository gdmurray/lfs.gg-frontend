import React, {Component} from 'react';
import {Container, Header, Loader} from "semantic-ui-react";
import {TEAM_SETTINGS_TITLES} from "../../../constants";

// TODO: Error Rendering
export default class TeamSettingsComponent extends Component {

    componentDidMount() {
        this.props.fetchTeamSettings(this.props.activeTeam, this.props.settingsTab);
    }

    render() {
        if (this.props.settings.loading || this.props.settings.data === undefined) {
            return (
                <Container>
                    <Header as={"h2"}>
                        {TEAM_SETTINGS_TITLES[this.props.settingsTab]}
                    </Header>
                    <Loader active inline style={{marginLeft: '100px'}}>Loading</Loader>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Header as={"h2"}>
                        {TEAM_SETTINGS_TITLES[this.props.settingsTab]}
                    </Header>
                    {React.cloneElement(this.props.children, {...this.props})}
                </Container>
            )
        }
    }
}
