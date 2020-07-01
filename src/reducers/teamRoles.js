import * as teamRoles from "../actions/teamRoles";

const initialState = {
    loading: false,
    inviteLink: null,
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case teamRoles.INVITE_TEAM_USER_REQUEST:
            return {
                ...state,
                error: {},
                loading: true
            }
        case teamRoles.INVITE_TEAM_USER_SUCCESS:
            return {
                ...state,
                error: {},
                inviteLink: action.payload,
                loading: false
            }
        case teamRoles.INVITE_TEAM_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

