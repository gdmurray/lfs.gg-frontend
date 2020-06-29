import { RSAA } from 'redux-api-middleware';
import { TEAM_SCRIMS_LIST_URL } from '../constants';

import { withAuth } from '../reducers'

export const FETCH_TEAM_SCRIM_REQUEST = "@@teamScrims/FETCH_TEAM_SCRIM_REQUEST"
export const FETCH_TEAM_SCRIM_SUCCESS = "@@teamScrims/FETCH_TEAM_SCRIM_SUCCESS"
export const FETCH_TEAM_SCRIM_FAILURE = "@@teamScrims/FETCH_TEAM_SCRIM_FAILURE"

export const fetchTeamScrims = (team, query='') => (console.log('FETCH SCRIMS'), {
    [RSAA]: {
        endpoint: TEAM_SCRIMS_LIST_URL.replace("<IDENTIFIER>", team) + query,
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            FETCH_TEAM_SCRIM_REQUEST, FETCH_TEAM_SCRIM_SUCCESS, FETCH_TEAM_SCRIM_FAILURE
        ]
    }
})