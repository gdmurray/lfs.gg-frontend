import * as userInfo from '../actions/userInfo';

const initialState = {
    data: undefined,
    loading: false,
    activeTeam: null,
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
        case userInfo.SET_ACTIVE_TEAM_FINISH:
            return {
                ...state,
                activeTeam: action.payload
            }
        default:
            return state;
    }
}

