import * as teamData from "../actions/teamData";
import {SET_TEAM_SETTINGS_REQUEST} from "../actions/teamData";

const initialState = {
    data: {},
    logo: {
        loading: false,
        error: {}
    },
    settings: {
        loading: false,
        data: {},
        error: {}
    },
    loading: false,
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case teamData.FETCH_TEAM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case teamData.FETCH_TEAM_SUCCESS:
            return {
                ...state,
                error: {},
                loading: false,
                data: action.payload
            }
        case teamData.FETCH_TEAM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                data: {}
            }

        case teamData.FETCH_TEAM_SETTINGS_REQUEST:
            return {
                ...state,
                settings: {
                    data: {},
                    error: {},
                    loading: true
                }
            }
        case teamData.FETCH_TEAM_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: {
                    error: {},
                    data: action.payload,
                    loading: false
                }
            }

        case teamData.FETCH_TEAM_SETTINGS_FAILURE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    data: {},
                    loading: false,
                    error: action.payload
                }
            }

        case teamData.SET_TEAM_LOGO_REQUEST:
            return {
                ...state,
                logo: {
                    error: {},
                    loading: true
                }
            }

        case teamData.SET_TEAM_LOGO_SUCCESS:
            return {
                ...state,
                logo: {
                    error: {},
                    loading: false
                }
            }

        case teamData.SET_TEAM_LOGO_FAILURE:
            return {
                ...state,
                logo: {
                    error: action.payload,
                    loading: false
                }
            }

        case teamData.SET_TEAM_SETTINGS_REQUEST:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    loading: true
                }
            }
        case teamData.SET_TEAM_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    loading: false,
                    data: action.payload,
                    error: {}
                }
            }
        case teamData.SET_TEAM_SETTINGS_FAILURE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    loading: false,
                    error: action.payload
                }
            }

        default:
            return state;
    }
}
