import {createUrl, TEAM_INVITE_URL} from "../constants";
import {withAuth} from "../reducers";
import {RSAA} from 'redux-api-middleware';

export const INVITE_TEAM_USER_REQUEST = "@@teamRoles/INVITE_TEAM_USER_REQUEST";
export const INVITE_TEAM_USER_SUCCESS = "@@teamRoles/INVITE_TEAM_USER_SUCCESS";
export const INVITE_TEAM_USER_FAILURE = "@@teamRoles/INVITE_TEAM_USER_FAILURE";


export const createTeamInvite = (team, data) => ({
    [RSAA]: {
        endpoint: createUrl(TEAM_INVITE_URL, team),
        method: 'POST',
        body: JSON.stringify(data),
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            INVITE_TEAM_USER_REQUEST, INVITE_TEAM_USER_SUCCESS, INVITE_TEAM_USER_FAILURE
        ]
    }
})
