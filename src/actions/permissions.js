import {RSAA} from 'redux-api-middleware';
import {TEAM_USER_PERMISSIONS_URL} from "../constants";
import {withAuth, accessToken} from "../reducers";

export const FETCH_USER_TEAM_PERMISSIONS_REQUEST = "@@permissions/FETCH_USER_TEAM_PERMISSIONS_REQUEST";
export const FETCH_USER_TEAM_PERMISSIONS_SUCCESS = "@@permissions/FETCH_USER_TEAM_PERMISSIONS_SUCCESS";
export const FETCH_USER_TEAM_PERMISSIONS_FAILURE = "@@permissions/FETCH_USER_TEAM_PERMISSIONS_FAILURE";

/*
export const refreshPermissions = (team) => ({
    type: FETCH_USER_TEAM_PERMISSIONS_REQUEST,
    payload: {
        team: team,
        auth: null
    }
})*/

export const fetchUserTeamPermissions = (team) => ({
    [RSAA]: {
        endpoint: TEAM_USER_PERMISSIONS_URL.replace("<IDENTIFIER>", team),
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            FETCH_USER_TEAM_PERMISSIONS_REQUEST, FETCH_USER_TEAM_PERMISSIONS_SUCCESS, FETCH_USER_TEAM_PERMISSIONS_FAILURE
        ]
    }
})
