import { RSAA } from 'redux-api-middleware';
import { withAuth, withTeam, asViewer } from '../reducers'
import { TEAM_VIEW_SCRIMS_URL, TEAM_VIEW_INFO_URL, TEAM_KEY } from '../constants';

export const TEAM_VIEW_INFO_REQUEST = '@@teamView/TEAM_VIEW_INFO_REQUEST';
export const TEAM_VIEW_INFO_SUCCESS = '@@teamView/TEAM_VIEW_INFO_SUCCESS';
export const TEAM_VIEW_INFO_FAILURE = '@@teamView/TEAM_VIEW_INFO_FAILURE';

export const TEAM_VIEW_SCRIMS_REQUEST = '@@teamView/TEAM_VIEW_SCRIMS_REQUEST';
export const TEAM_VIEW_SCRIMS_SUCCESS = '@@teamView/TEAM_VIEW_SCRIMS_SUCCESS';
export const TEAM_VIEW_SCRIMS_FAILURE = '@@teamView/TEAM_VIEW_SCRIMS_FAILURE';

export const fetchTeamInfo = (team) => ({
    [RSAA]: {
        endpoint: TEAM_VIEW_INFO_URL.replace(TEAM_KEY, team),
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            TEAM_VIEW_INFO_REQUEST, TEAM_VIEW_INFO_SUCCESS, TEAM_VIEW_INFO_FAILURE
        ]
    }
})
export const fetchTeamScrims = (team) => ({
    [RSAA]: {
        endpoint: asViewer(TEAM_VIEW_SCRIMS_URL.replace(TEAM_KEY, team)),
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            TEAM_VIEW_SCRIMS_REQUEST, TEAM_VIEW_SCRIMS_SUCCESS, TEAM_VIEW_SCRIMS_FAILURE
        ]
    }
  })
