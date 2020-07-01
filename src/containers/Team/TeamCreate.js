import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {push} from 'connected-react-router'
import AppWrapper from "../Nav/AppWrapper";
import CreateTeamComponent from "../../components/Team/CreateTeamComponent";
import {createTeam} from "../../actions/teams";
import {setActiveTeamCreated} from "../../actions/userInfo";

const TeamCreate = (props) => {
    return (
        <AppWrapper>
            Create Team
            <CreateTeamComponent {...props}/>
        </AppWrapper>
    )
}

const mapStateToProps = state => ({
    team: state.teams,
    activeTeam: state.userInfo.activeTeam,
    loading: state.teams.loading
})
const mapDispatchToProps = dispatch => bindActionCreators({
    goToRoute: (url) => push(url),
    createTeam: (data) => createTeam(data)
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(TeamCreate);
