import React from 'react';
import {fetchCalendarScrims} from "../../actions/calendar"
import TeamCalendarComponent from "../../components/Team/TeamCalendarComponent";
import { connect } from 'react-redux'

const TeamCalendar = (props) => {
        return (
            <TeamCalendarComponent {...props} />
        )
}


const mapStateToProps = state => ({
    scrims: state.calendar.scrims,
    activeTeam: state.userInfo.activeTeam,
    permissions: state.permissions.team
})
const mapDispatchToProps = (dispatch) => ({
    fetchScrims: (teamId, query='') => {
        dispatch(fetchCalendarScrims(teamId, query))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamCalendar);
