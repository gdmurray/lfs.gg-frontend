import {combineReducers} from "redux";
import * as userInfo from "./types";


const initialUserInfoState = {
    data: null,
    loading: true,
    activeTeam: null,
    error: null
}

const userInfoReducer = (state = initialUserInfoState, action) => {
    switch (action.type) {
        case 'PURGE':
            return {
                ...initialUserInfoState
            }

        case userInfo.USER_INFO_REQUEST:
            return {
                ...state,
                loading: true
            }

        case userInfo.USER_INFO_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case userInfo.USER_INFO_FAILURE:
            return {
                ...state,
                data: null,
                loading: false
            }

        case userInfo.SET_ACTIVE_TEAM_REQUEST:
            return {
                ...state, loading: true
            }

        case userInfo.SET_ACTIVE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                activeTeam: action.payload
            }

        case userInfo.SET_ACTIVE_TEAM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                activeTeam: null
            }

        case userInfo.CHANGE_ACTIVE_TEAM_REQUEST:
            return {
                ...state,
                loading: true
            }

        case userInfo.CHANGE_ACTIVE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                activeTeam: action.payload.active_team,
                data: action.payload
            }

        case userInfo.CHANGE_ACTIVE_TEAM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

const initialTeamPermissionState = {
    error: false,
    data: {},
    loading: false
}

const teamPermissionReducer = (state = initialTeamPermissionState, action) => {
    switch (action.type) {
        case userInfo.FETCH_USER_TEAM_PERMISSIONS_REQUEST:
            return {
                data: {},
                loading: true,
                error: false
            }
        case userInfo.FETCH_USER_TEAM_PERMISSIONS_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: false
            }
        case userInfo.FETCH_USER_TEAM_PERMISSIONS_FAILURE:
            return {
                error: action.payload,
                data: {},
                loading: false
            }
        default:
            return state;
    }
}

const reducer = combineReducers({
    userInfo: userInfoReducer,
    teamPermissions: teamPermissionReducer
})

export default reducer;
