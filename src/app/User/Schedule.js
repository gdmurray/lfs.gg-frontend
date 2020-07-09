import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import AppWrapper from "../Nav/AppWrapper";
import ScheduleComponent from "../Scheduling/ScheduleComponent";

const Schedule = (props) => {
    return (
        <AppWrapper>
            <ScheduleComponent {...props}/>
        </AppWrapper>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
