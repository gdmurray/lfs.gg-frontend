import * as permissions from "../actions/permissions";

const initialState = {
    team: {
        error: false,
        data: {},
        loading: false
    },
    league: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case permissions.FETCH_USER_TEAM_PERMISSIONS_REQUEST:
            return {
                ...state,
                team: {
                    data: {},
                    loading: true,
                    error: false
                }
            }
        case permissions.FETCH_USER_TEAM_PERMISSIONS_SUCCESS:
            return {
                ...state,
                team: {
                    data: action.payload,
                    loading: false,
                    error: false
                },
            }
        case permissions.FETCH_USER_TEAM_PERMISSIONS_FAILURE:
            return {
                ...state,
                team: {
                    error: action.payload,
                    data: {},
                    loading: false
                }
            }
        default:
            return state;
    }
}

