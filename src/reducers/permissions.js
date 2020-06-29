import * as permissions from "../actions/permissions";

const initialState = {
    team: {},
    league: {},
    loading: false,
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case permissions.FETCH_USER_TEAM_PERMISSIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case permissions.FETCH_USER_TEAM_PERMISSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                team: action.payload
            }
        case permissions.FETCH_USER_TEAM_PERMISSIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

