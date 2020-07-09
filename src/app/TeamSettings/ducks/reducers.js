import * as teamSettings from "./types";
import {combineReducers} from "redux";

const initialSettingsState = {
    data: {},
    loading: false,
    error: false
}

const settingsReducer = (state = initialSettingsState, action) => {
    switch (action.type) {
        case teamSettings.SET_TEAM_SETTINGS_REQUEST:
        case teamSettings.FETCH_TEAM_SETTINGS_REQUEST:
            return {
                ...state,
                data: {},
                error: false,
                loading: true
            }
        case teamSettings.SET_TEAM_SETTINGS_SUCCESS:
        case teamSettings.FETCH_TEAM_SETTINGS_SUCCESS:
            return {
                ...state,
                error: false,
                data: action.payload,
                loading: false
            }
        case teamSettings.SET_TEAM_SETTINGS_FAILURE:
        case teamSettings.FETCH_TEAM_SETTINGS_FAILURE:
            return {
                ...state,
                data: {},
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

const initialLogoState = {
    loading: false,
    error: false
}

const logoReducer = (state = initialLogoState, action) => {
    switch (action.type) {
        case teamSettings.SET_TEAM_LOGO_REQUEST:
            return {
                ...state,
                error: {},
                loading: true
            }

        case teamSettings.SET_TEAM_LOGO_SUCCESS:
            return {
                ...state,
                error: {},
                loading: false
            }

        case teamSettings.SET_TEAM_LOGO_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return state;
    }
}

const initialActionState = {
    loading: false,
    error: false
}

const actionReducer = (state = initialActionState, action) => {
    switch (action.type) {
        case teamSettings.DELETE_TEAM_ROLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case teamSettings.DELETE_TEAM_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            }
        case teamSettings.DELETE_TEAM_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}


const reducer = combineReducers({
    settings: settingsReducer,
    logo: logoReducer,
    action: actionReducer
})

export default reducer;
