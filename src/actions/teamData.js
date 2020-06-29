import { RSAA } from 'redux-api-middleware';
import { TEAM_HOME_DATA_URL } from "../constants";
import { withAuth } from "../reducers";

export const FETCH_TEAM_REQUEST = "@@teamData/FETCH_TEAM_REQUEST";
export const FETCH_TEAM_SUCCESS = "@@teamData/FETCH_TEAM_SUCCESS";
export const FETCH_TEAM_FAILURE = "@@teamData/FETCH_TEAM_FAILURE";

export const fetchTeamHomeData = (team) => ({
    [RSAA]: {
        endpoint: TEAM_HOME_DATA_URL.replace("<IDENTIFIER>", team),
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
            FETCH_TEAM_REQUEST, FETCH_TEAM_SUCCESS, FETCH_TEAM_FAILURE
        ]
    }
})
