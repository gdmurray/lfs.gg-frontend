import * as invitations from "../actions/invitations";

const initialState = {
    loading: false,
    inviteLink: null,
    error: false,
    invitation: {
        loading: true,
        data: {},
        error: false
    }
}


export default (state = initialState, action) => {
    switch (action.type) {
        case invitations.GENERATE_TEAM_INVITE_LINK_REQUEST:
        case invitations.INVITE_TEAM_USER_REQUEST:
            return {
                ...state,
                error: {},
                loading: true
            }
        case invitations.GENERATE_TEAM_INVITE_LINK_SUCCESS:
            return {
                ...state,
                error: false,
                inviteLink: action.payload,
                loading: false
            }

        case invitations.INVITE_TEAM_USER_SUCCESS:
            return {
                ...state,
                error: {},
                loading: false
            }
        case invitations.GENERATE_TEAM_INVITE_LINK_FAILURE:
        case invitations.INVITE_TEAM_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }


        case invitations.INVITATION_DETAIL_REQUEST:
            return {
                ...state,
                invitation: {
                    ...state.invitation,
                    error: false,
                    data: {}
                }
            }
        case invitations.INVITATION_DETAIL_SUCCESS:
            return {
                ...state,
                invitation: {
                    loading: false,
                    data: action.payload,
                    error: false
                }
            }
        case invitations.INVITATION_DETAIL_FAILURE:
            return {
                ...state,
                invitation: {
                    loading: false,
                    data: {},
                    error: action.payload
                }
            }
        case invitations.ACCEPT_INVITATION_REQUEST:
            return {
                ...state,
                invitation: {
                    ...state.invitation,
                    loading: true,
                    error: false
                }
            }
        case invitations.ACCEPT_INVITATION_SUCCESS:
            return {
                ...state,
                invitation: {
                    ...state.invitation,
                    error: false,
                    loading: false
                }
            }
        case invitations.ACCEPT_INVITATION_FAILURE:
            return {
                ...state,
                invitation: {
                    ...state.invitation,
                    error: action.payload,
                    loading: false
                }
            }
        default:
            return state;
    }
}

