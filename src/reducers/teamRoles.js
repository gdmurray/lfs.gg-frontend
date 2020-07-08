import * as teamRoles from "../actions/teamRoles";

const initialState = {
    loading: false,
    error: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case teamRoles.DELETE_TEAM_ROLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case teamRoles.DELETE_TEAM_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            }
        case teamRoles.DELETE_TEAM_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

