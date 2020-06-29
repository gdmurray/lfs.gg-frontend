import { RSAA } from 'redux-api-middleware';
import { CREATE_TEAM_URL } from "../constants";
import { withAuth } from "../reducers";

export const CREATE_TEAM_REQUEST = "@@teams/CREATE_TEAM_REQUEST";
export const CREATE_TEAM_SUCCESS = "@@teams/CREATE_TEAM_SUCCESS";
export const CREATE_TEAM_FAILURE = "@@teams/CREATE_TEAM_FAILURE";


/*
export const teamRequest = () => ({
    type: CREATE_TEAM_REQUEST
})

export const teamSuccess = team => ({
    type: CREATE_TEAM_SUCCESS,
    team
})

export const teamFailure = error => ({
    type: CREATE_TEAM_FAILURE,
    error
})*/

export const createTeam = (data) => ({
    [RSAA]: {
        endpoint: CREATE_TEAM_URL,
        method: 'POST',
        body: JSON.stringify(data),
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            CREATE_TEAM_REQUEST, CREATE_TEAM_SUCCESS, CREATE_TEAM_FAILURE
        ]
    }
})
