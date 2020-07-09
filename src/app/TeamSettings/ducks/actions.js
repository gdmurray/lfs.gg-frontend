import {
    createUrl,
    SETTINGS_URLS,
    TEAM_ROLE_URL,
    TEAM_SET_LOGO_URL,
    TEAM_SETTINGS_BASE_URL
} from "../../../utils/constants";
import {RSAA} from "redux-api-middleware";
import {withAuth} from "../../../reducers";
import * as types from "./types";

export const fetchTeamSettings = (team, path) => {
    const query = SETTINGS_URLS[path]
    return {
        [RSAA]: {
            endpoint: createUrl(TEAM_SETTINGS_BASE_URL, team, query),
            method: 'GET',
            headers: withAuth({'Content-Type': 'application/json'}),
            types: [
                types.FETCH_TEAM_SETTINGS_REQUEST,
                types.FETCH_TEAM_SETTINGS_SUCCESS,
                types.FETCH_TEAM_SETTINGS_FAILURE
            ]

        }
    }
}

export const updateTeamSettings = (team, data, path) => {
    const query = SETTINGS_URLS[path]
    return {
        [RSAA]: {
            endpoint: createUrl(TEAM_SETTINGS_BASE_URL, team, query),
            method: 'POST',
            body: JSON.stringify(data),
            headers: withAuth({'Content-Type': 'application/json'}),
            types: [
                types.SET_TEAM_SETTINGS_REQUEST,
                types.SET_TEAM_SETTINGS_SUCCESS,
                types.SET_TEAM_SETTINGS_FAILURE
            ]
        }
    }
}

export const uploadTeamLogo = (team, logo) => {
    const data = new FormData();
    data.append('file', logo);
    return {
        [RSAA]: {
            endpoint: createUrl(TEAM_SET_LOGO_URL, team),
            headers: withAuth({}),
            method: 'POST',
            body: data,
            types: [
                types.SET_TEAM_LOGO_REQUEST,
                types.SET_TEAM_LOGO_SUCCESS,
                types.SET_TEAM_LOGO_FAILURE
            ]
        }
    }
}

export const deleteTeamRole = (team, role) => ({
    [RSAA]: {
        endpoint: createUrl(TEAM_ROLE_URL, team) + `${role}`,
        method: 'DELETE',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            types.DELETE_TEAM_ROLE_REQUEST,
            types.DELETE_TEAM_ROLE_SUCCESS,
            types.DELETE_TEAM_ROLE_FAILURE
        ]
    }
})
