import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { AppSidebar, Navbar } from '../Nav';
import {asViewer, withAuth} from "../../reducers";
import {fetchTeamInfo, fetchTeamScrims} from "../../actions/teamView";
import TeamPageComponent from '../../components/Team/TeamPageComponent';
import "./team.css";
import {getActiveTeam} from "../../reducers/";


class TeamPage extends Component {
    state = {
        team: null
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        if ( id === this.props.activeTeam){
            this.props.goToMyTeam();
        }
        this.props.fetchTeamInfo(id);
        this.props.fetchTeamScrims(id);
    }

    render() {
        return (
            <div className="app-content">
                <AppSidebar />
                <div className="core-content">
                    <Navbar />
                    <div className="page-content">
                        <TeamPageComponent {...this.props}/>
                    </div>
                </div>
            </div>
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