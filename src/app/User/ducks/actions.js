import {RSAA} from "redux-api-middleware";
import {TEAM_USER_PERMISSIONS_URL, USER_INFO_SELF} from "../../../utils/constants";
import {USER_INFO_REQUEST} from "./types";
import {withAuth} from "../../../reducers";

import * as types from "./types";

export const fetchUserInfo = () => ({
    type: USER_INFO_REQUEST
})

export const changeActiveTeam = (team) => ({
    [RSAA]: {
        endpoint: USER_INFO_SELF,
        method: 'PUT',
        headers: withAuth({'Content-Type': 'application/json'}),
        body: JSON.stringify({active_team: team}),
        types: [
            types.CHANGE_ACTIVE_TEAM_REQUEST, types.CHANGE_ACTIVE_TEAM_SUCCESS, types.CHANGE_ACTIVE_TEAM_FAILURE
        ]
    }
})

export const setActiveTeamStart = (teamId) => {
    return {
        type: types.SET_ACTIVE_TEAM_START,
        teamId
    }
}

export function setActiveTeam(teams, id = null) {
    if (teams) {
        if (teams.length > 0) {
            if (id) {
                const team = teams.filter((item) => item.id === id);
                return {
                    type: types.SET_ACTIVE_TEAM_START, payload: {id: team[0].team.id}
                }
            } else {
                if (teams.length > 0) {
                    return {
                        type: types.SET_ACTIVE_TEAM_START, payload: {id: teams[0].team.id}
                    }
                }
            }
        }
    }
}

export const fetchUserTeamPermissions = (team) => ({
    [RSAA]: {
        endpoint: TEAM_USER_PERMISSIONS_URL.replace("<IDENTIFIER>", team),
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            types.FETCH_USER_TEAM_PERMISSIONS_REQUEST,
            types.FETCH_USER_TEAM_PERMISSIONS_SUCCESS,
            types.FETCH_USER_TEAM_PERMISSIONS_FAILURE
        ]
    }
})
