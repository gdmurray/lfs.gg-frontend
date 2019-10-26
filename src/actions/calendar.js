import { RSAA } from 'redux-api-middleware';
import {TEMP_SCHEDULE_URL} from '../constants';
import { withAuth } from '../reducers'

export const GET_CALENDAR_SCRIMS_REQUEST = "@@scrims/GET_CALENDAR_SCRIMS_START"
export const GET_CALENDAR_SCRIMS_SUCCESS = "@@scrims/GET_CALENDAR_SCRIMS_SUCCESS"
export const GET_CALENDAR_SCRIMS_FAILURE = "@@scrims/GET_CALENDAR_SCRIMS_FAILURE"

export const fetchCalendarScrims = (teamId, query='') => ({
    [RSAA]: {
        endpoint: TEMP_SCHEDULE_URL + query,
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            GET_CALENDAR_SCRIMS_REQUEST, GET_CALENDAR_SCRIMS_SUCCESS, GET_CALENDAR_SCRIMS_FAILURE
        ]
    }
})