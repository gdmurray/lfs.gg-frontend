import {RSAA} from "redux-api-middleware";
import {createUrl, TEAM_INVITE_URL} from "../../../utils/constants";
import {withAuth} from "../../../reducers";

import * as types from "./types";

export const createTeamInvite = (team, data) => ({
    [RSAA]: {
        endpoint: createUrl(TEAM_INVITE_URL, team),
        method: 'POST',
        body: JSON.stringify(data),
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            types.INVITE_TEAM_USER_REQUEST, types.INVITE_TEAM_USER_SUCCESS, types.INVITE_TEAM_USER_FAILURE
        ]
    }
})

export const generateTeamInviteURL = (team, data) => ({
    [RSAA]: {
        endpoint: createUrl(TEAM_INVITE_URL, team, `?role=${data.role}`),
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
             types.GENERATE_TEAM_INVITE_LINK_REQUEST,  types.GENERATE_TEAM_INVITE_LINK_SUCCESS,  types.GENERATE_TEAM_INVITE_LINK_FAILURE
        ]
    }
})

export const acceptInvitation = (url) => ({
    [RSAA]: {
        endpoint: url + '/',
        method: 'POST',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
             types.ACCEPT_INVITATION_REQUEST,  types.ACCEPT_INVITATION_SUCCESS,  types.ACCEPT_INVITATION_FAILURE
        ]
    }
});

export const checkInvitation = (url) => ({
    [RSAA]: {
        endpoint: url,
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
             types.INVITATION_DETAIL_REQUEST,  types.INVITATION_DETAIL_SUCCESS,  types.INVITATION_DETAIL_FAILURE
        ]
    }
});
