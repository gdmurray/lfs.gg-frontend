import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {bindActionCreators} from 'redux'
import {AppWrapper} from "../Nav/";
import {changeActiveTeam} from "../User/ducks/actions";
import {activeTeam, userTeams} from "../../reducers";

import {ROUTES} from "../../utils/routes";
import {Menu, Button, Header, Container, Card, Image} from "semantic-ui-react";
import {capitalize} from "../../utils/utils";
import "../TeamSettings/team.css";

class UserTeamsList extends Component {
    renderTeamLogo = (team) => {
        if (team.logo) {
            return (
                <Image
                    floated='left'
                    size='tiny'
                    src={team.logo}
                />
            )
        }
    }

    activateTeam = (e) => {
        let teamId = e.currentTarget.getAttribute('data-key');
        if (teamId !== this.props.activeTeam) {
            this.props.changeActiveTeam(teamId);
        } else {
            this.props.goTo("/team")
        }
    }

    renderTeams = () => {
        console.log(this.props.teams);
        if (this.props.teams.length > 0) {
            return this.props.teams.map(data => {
                const {team} = data;
                return (
                    <Card fluid key={team.id} data-key={team.id} className={"team-list-card"}
                          onClick={this.activateTeam}>
                        <Card.Content>
                            {this.renderTeamLogo(team)}
                            <Card.Header>{team.name}</Card.Header>
                            <Card.Meta>{capitalize(data.role.toLowerCase())}</Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <Card.Description>
                                Here We'd display the roster
                            </Card.Description>
                        </Card.Content>
                    </Card>
                )
            })
        } else {
            return (
                <div>No Teams Found</div>
            )
        }
    }

    render() {
        return (
            <AppWrapper>
                <Container>
                    <div className={"teams-header"}>
                        <Header>Your Teams</Header>
                        <Button onClick={e => this.props.goTo(ROUTES.CREATE_TEAM)} secondary>Create Team</Button>
                    </div>
                    <Card.Group>
                        {this.renderTeams()}
                    </Card.Group>
                </Container>
            </AppWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.user.userInfo.data,
    teams: userTeams(state),
    activeTeam: state.user.userInfo.activeTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
    goTo: (url) => push(url),
    changeActiveTeam: (team) => changeActiveTeam(team)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserTeamsList);


