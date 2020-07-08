import {createUrl, TEAM_INVITE_URL, INVITE_METHODS} from "../constants";
import {withAuth} from "../reducers";
import {RSAA} from 'redux-api-middleware';

export const INVITE_TEAM_USER_REQUEST = "@@invitations/INVITE_TEAM_USER_REQUEST";
export const INVITE_TEAM_USER_SUCCESS = "@@invitations/INVITE_TEAM_USER_SUCCESS";
export const INVITE_TEAM_USER_FAILURE = "@@invitations/INVITE_TEAM_USER_FAILURE";

export const GENERATE_TEAM_INVITE_LINK_REQUEST = "@@invitations/GENERATE_TEAM_INVITE_LINK_REQUEST";
export const GENERATE_TEAM_INVITE_LINK_SUCCESS = "@@invitations/GENERATE_TEAM_INVITE_LINK_SUCCESS";
export const GENERATE_TEAM_INVITE_LINK_FAILURE = "@@invitations/GENERATE_TEAM_INVITE_LINK_FAILURE";

export const INVITATION_DETAIL_REQUEST = "@@invitations/INVITATION_DETAIL_REQUEST";
export const INVITATION_DETAIL_SUCCESS = "@@invitations/INVITATION_DETAIL_SUCCESS";
export const INVITATION_DETAIL_FAILURE = "@@invitations/INVITATION_DETAIL_FAILURE";

export const ACCEPT_INVITATION_REQUEST = "@@invitations/ACCEPT_INVITATION_REQUEST";
export const ACCEPT_INVITATION_SUCCESS = "@@invitations/ACCEPT_INVITATION_SUCCESS";
export const ACCEPT_INVITATION_FAILURE = "@@invitations/ACCEPT_INVITATION_FAILURE";


export const createTeamInvite = (team, data) => ({
    [RSAA]: {
        endpoint: createUrl(TEAM_INVITE_URL, team),
        method: 'POST',
        body: JSON.stringify(data),
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            INVITE_TEAM_USER_REQUEST, INVITE_TEAM_USER_SUCCESS, INVITE_TEAM_USER_FAILURE
        ]
    }
})

export const generateTeamInviteURL = (team, data) => ({
    [RSAA]: {
        endpoint: createUrl(TEAM_INVITE_URL, team, `?role=${data.role}`),
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            GENERATE_TEAM_INVITE_LINK_REQUEST, GENERATE_TEAM_INVITE_LINK_SUCCESS, GENERATE_TEAM_INVITE_LINK_FAILURE
        ]
    }
})

export const acceptInvitation = (url) => ({
    [RSAA]: {
        endpoint: url + '/',
        method: 'POST',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, ACCEPT_INVITATION_FAILURE
        ]
    }
});

export const checkInvitation = (url) => ({
    [RSAA]: {
        endpoint: url,
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            INVITATION_DETAIL_REQUEST, INVITATION_DETAIL_SUCCESS, INVITATION_DETAIL_FAILURE
        ]
    }
});
