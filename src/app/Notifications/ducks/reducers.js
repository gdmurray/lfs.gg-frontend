import {combineReducers} from "redux";
import * as notifications from "./types";

const initialInviteState = {
    loading: false,
    data: {},
    error: false
}

const inviteReducer = (state = initialInviteState, action) => {
    switch (action.type) {
        case notifications.GENERATE_TEAM_INVITE_LINK_REQUEST:
        case notifications.INVITE_TEAM_USER_REQUEST:
            return {
                ...state,
                error: {},
                loading: true
            }
        case notifications.GENERATE_TEAM_INVITE_LINK_SUCCESS:
            return {
                ...state,
                error: false,
                inviteLink: action.payload,
                loading: false
            }

        case notifications.INVITE_TEAM_USER_SUCCESS:
            return {
                ...state,
                error: {},
                loading: false
            }
        case notifications.GENERATE_TEAM_INVITE_LINK_FAILURE:
        case notifications.INVITE_TEAM_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

const initialInvitationState = {
    loading: true,
    data: {},
    error: false
}

const invitationReducer = (state = initialInvitationState, action) => {
    switch (action.type) {
        case notifications.INVITATION_DETAIL_REQUEST:
            return {
                ...state,
                error: false,
                data: {}
            }
        case notifications.INVITATION_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: false
            }

        case notifications.ACCEPT_INVITATION_FAILURE:
        case notifications.INVITATION_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
                data: {},
                error: action.payload
            }
        case notifications.ACCEPT_INVITATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }
        case notifications.ACCEPT_INVITATION_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false
            }
        default:
            return state;
    }
}

const initialNotificationState = {}

const notificationReducer = (state = initialInvitationState, action) => {
    switch (action.type) {
        default:
            return state;

    }
}

const reducer = combineReducers({
    invite: inviteReducer,
    invitation: invitationReducer,
    notifications: notificationReducer
})

export default reducer;

