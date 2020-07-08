import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {bindActionCreators} from 'redux'
import AppWrapper from "../Nav/AppWrapper";
import TeamsComponent from "../../components/Team/TeamsComponent";
import {changeActiveTeam} from "../../actions/userInfo";
import "./team.css";

const Teams = (props) => {
    return (
        <AppWrapper>
            <TeamsComponent {...props} />
        </AppWrapper>
    )
}

const mapStateToProps = (state) => ({
    teams: state.userInfo.data.teams,
    activeTeam: state.userInfo.activeTeam
})

const mapDispatchToProps = dispatch => bindActionCreators({
    goTo: (url) => push(url),
    changeActiveTeam: (team) => changeActiveTeam(team)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
