import * as teams from "../actions/teams";

const initialState = {
    team: null,
    created: false,
    loading: false,
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case teams.CREATE_TEAM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case teams.CREATE_TEAM_SUCCESS:
            return {
                error: {},
                team: action.payload,
                created: true,
                loading: false
            }
        case teams.CREATE_TEAM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                created: false
            }
        default:
            return state;
    }
}
