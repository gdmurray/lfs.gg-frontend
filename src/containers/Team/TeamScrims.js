import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { TeamScrimsComponent } from "../../components/Team/";

import {fetchTeamScrims} from "../../actions/teamScrims";

class TeamScrims extends Component{
    
    render(){
        return ( <TeamScrimsComponent {...this.props} />)
    }
}
const mapStateToProps = state => ({
    activeTeam: state.userInfo.activeTeam,
    scrims: state.teamScrims.scrims,
    loading: state.teamScrims.loading
})
const mapDispatchToProps = dispatch => ({
    getScrims: (team, query='') => {
        dispatch(fetchTeamScrims(team, query))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(TeamScrims);