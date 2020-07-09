import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {push} from 'connected-react-router'
import {AppWrapper} from "../Nav";
import {asViewer, withAuth} from "../../reducers";
import {fetchTeamInfo} from "../TeamView/ducks/actions";
import {fetchTeamScrims} from "../TeamView/ducks/actions";
import TeamPageComponent from './TeamPageComponent';
import "../TeamSettings/team.css";
import {getActiveTeam} from "../../reducers";


class TeamPage extends Component {
    state = {
        team: null
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        if (id === this.props.activeTeam) {
            this.props.goToMyTeam();
        }
        this.props.fetchTeamInfo(id);
        this.props.fetchTeamScrims(id);
    }

    render() {
        return (
            <AppWrapper>
                <TeamPageComponent {...this.props}/>
            </AppWrapper>
        )
    }
}

const mapStateToProps = state => ({
    teamInfo: state.teamView.teamInfo,
    loadingTeam: state.teamView.loadingTeam,
    loadingScrims: state.teamView.loadingScrims,
    scrims: state.teamView.scrims,
    error: state.teamView.error,
    activeTeam: state.userInfo.activeTeam
})
const mapDispatchToProps = (dispatch) => ({
    fetchTeamInfo: (teamId) => {
        dispatch(fetchTeamInfo(teamId))
    },
    fetchTeamScrims: (teamId) => {
        dispatch(fetchTeamScrims(teamId))
    },
    goToScrim: (scrimId) => {
        dispatch(push(`/scrim/${scrimId}`))
    },
    goToMyTeam: () => {
        dispatch(push('/team/'))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
