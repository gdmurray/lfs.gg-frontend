import {createUrl, TEAM_INVITE_URL, INVITE_METHODS, TEAM_ROLE_URL} from "../constants";
import {withAuth} from "../reducers";
import {RSAA} from 'redux-api-middleware';


export const DELETE_TEAM_ROLE_REQUEST = "@@teamRoles/DELETE_TEAM_ROLE_REQUEST";
export const DELETE_TEAM_ROLE_SUCCESS = "@@teamRoles/DELETE_TEAM_ROLE_SUCCESS";
export const DELETE_TEAM_ROLE_FAILURE = "@@teamRoles/DELETE_TEAM_ROLE_FAILURE";

export const deleteTeamRole = (team, role) => ({
    [RSAA]: {
        endpoint: createUrl(TEAM_ROLE_URL, team) + `${role}`,
        method: 'DELETE',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            DELETE_TEAM_ROLE_REQUEST, DELETE_TEAM_ROLE_SUCCESS, DELETE_TEAM_ROLE_FAILURE
        ]
    }
})
