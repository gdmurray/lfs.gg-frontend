import * as userInfo from '../actions/userInfo';

const initialState = {
    data: undefined,
    loading: true,
    activeTeam: null,
    teamError: {}
}

export default (state=initialState, action) => {
    switch(action.type){
        case 'PURGE':
            return {
                ...initialState
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
                data: undefined,
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
                teamError: action.payload,
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
                teamError: action.payload
            }
        default:
            return state;
    }
}

export const activeTeam = (state) => state.activeTeam;

