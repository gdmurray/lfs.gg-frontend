import {RSAA} from 'redux-api-middleware';
import {TEAM_HOME_DATA_URL, TEAM_SETTINGS_BASE_URL, createUrl, TEAM_SET_LOGO_URL, SETTINGS_URLS} from "../constants";
import {withAuth} from "../reducers";

export const FETCH_TEAM_REQUEST = "@@teamData/FETCH_TEAM_REQUEST";
export const FETCH_TEAM_SUCCESS = "@@teamData/FETCH_TEAM_SUCCESS";
export const FETCH_TEAM_FAILURE = "@@teamData/FETCH_TEAM_FAILURE";

export const FETCH_TEAM_SETTINGS_REQUEST = "@@teamData/FETCH_TEAM_SETTINGS_REQUEST";
export const FETCH_TEAM_SETTINGS_SUCCESS = "@@teamData/FETCH_TEAM_SETTINGS_SUCCESS";
export const FETCH_TEAM_SETTINGS_FAILURE = "@@teamData/FETCH_TEAM_SETTINGS_FAILURE";

export const SET_TEAM_LOGO_REQUEST = "@@teamData/SET_TEAM_LOGO_REQUEST";
export const SET_TEAM_LOGO_SUCCESS = "@@teamData/SET_TEAM_LOGO_SUCCESS";
export const SET_TEAM_LOGO_FAILURE = "@@teamData/SET_TEAM_LOGO_FAILURE";

export const SET_TEAM_SETTINGS_REQUEST = "@@teamData/SET_TEAM_SETTINGS_REQUEST";
export const SET_TEAM_SETTINGS_SUCCESS = "@@teamData/SET_TEAM_SETTINGS_SUCCESS";
export const SET_TEAM_SETTINGS_FAILURE = "@@teamData/SET_TEAM_SETTINGS_FAILURE";

export const fetchTeamHomeData = (team) => ({
    [RSAA]: {
        endpoint: TEAM_HOME_DATA_URL.replace("<IDENTIFIER>", team),
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            FETCH_TEAM_REQUEST, FETCH_TEAM_SUCCESS, FETCH_TEAM_FAILURE
        ]
    }
})

export const fetchTeamSettings = (team, path) => {
    const query = SETTINGS_URLS[path]
    return {
        [RSAA]: {
            endpoint: createUrl(TEAM_SETTINGS_BASE_URL, team, query),
            method: 'GET',
            headers: withAuth({'Content-Type': 'application/json'}),
            types: [
                FETCH_TEAM_SETTINGS_REQUEST, FETCH_TEAM_SETTINGS_SUCCESS, FETCH_TEAM_SETTINGS_FAILURE
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
                SET_TEAM_SETTINGS_REQUEST, SET_TEAM_SETTINGS_SUCCESS, SET_TEAM_SETTINGS_FAILURE
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
                SET_TEAM_LOGO_REQUEST, SET_TEAM_LOGO_SUCCESS, SET_TEAM_LOGO_FAILURE
            ]
        }
    }
}
