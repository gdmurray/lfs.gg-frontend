import {put, call, select} from 'redux-saga/effects';
import {push} from "connected-react-router";
import {USER_INFO_SELF, TEAM_USER_PERMISSIONS_URL} from "../constants";
import {withAuth, accessToken} from '../reducers'
import {
    setActiveTeam,
    SET_ACTIVE_TEAM_SUCCESS,
    SET_ACTIVE_TEAM_FAILURE,
    setActiveTeamInDb,
    SET_
} from "../actions/userInfo";
import {ROUTES} from "../routes";
import {USER_INFO_SUCCESS, USER_INFO_FAILURE, SET_ACTIVE_TEAM_START} from '../actions/userInfo';

import {
    FETCH_USER_TEAM_PERMISSIONS_REQUEST,
    FETCH_USER_TEAM_PERMISSIONS_SUCCESS,
    FETCH_USER_TEAM_PERMISSIONS_FAILURE
} from "../actions/permissions";

import {USER_INFO_REQUEST} from '../actions/userInfo';
import auth from "../reducers/auth";

function formHeader(headers, payload) {
    return {...headers, Authorization: 'Bearer ' + payload.payload.access}
}

function formAuthHeader(headers, token) {
    return {...headers, Authorization: 'Bearer ' + token}
}

// TODO: AUTH HEADER SENDING OBJECT BRO FUCK THISSSS
export function* userInfoSaga(payload = null,) {
    try {
        var authToken;
        var response;
        console.log(payload);
        if (payload.payload !== undefined) {
            response = yield call(() => fetch(USER_INFO_SELF, {
                    method: 'GET',
                    headers: formAuthHeader({'Content-Type': 'application/json'}, payload.payload.access),
                })
            );
        } else {
            const authToken = yield select(accessToken);
            response = yield call(() => fetch(USER_INFO_SELF, {
                    method: 'GET',
                    headers: formAuthHeader({'Content-Type': 'application/json'}, authToken),
                })
            );
        }
        const body = yield call([response, response.json])
        const {active_team} = body;
        const {teams} = body;

        yield put({type: USER_INFO_SUCCESS, payload: body});

        // No Active Team Has been Set... Set In Database
        if (active_team == null) {
            const activeTeam = yield call(setActiveTeam, teams);
            console.log("ACTIVE TEAM == NULL");
            if (activeTeam !== undefined) {
                console.log("dispatching perm");
                yield put({
                    type: FETCH_USER_TEAM_PERMISSIONS_REQUEST,
                    payload: {team: activeTeam.payload.id, auth: payload !== null ? payload : authToken}
                });
                try {
                    const actResponse = yield call(() => fetch(USER_INFO_SELF, {
                        method: 'PUT',
                        headers: formAuthHeader({'Content-Type': 'application/json'}, authToken ? authToken : payload.payload.access),
                        body: JSON.stringify({active_team: activeTeam.payload.id})
                    }))
                    const actBody = yield call([actResponse, actResponse.json()])
                    console.log(actBody);
                    yield put({type: SET_ACTIVE_TEAM_SUCCESS, payload: actBody.active_team})
                } catch (teamError) {
                    console.log(teamError);
                    yield put({type: SET_ACTIVE_TEAM_FAILURE, payload: teamError})
                }
            }
        } else if (payload !== null) {
            yield put({type: SET_ACTIVE_TEAM_SUCCESS, payload: active_team})
            console.log("dispatching perm", payload);
            yield put({
                type: FETCH_USER_TEAM_PERMISSIONS_REQUEST,
                payload: {
                    team: active_team,
                    auth: (payload !== null || payload.payload !== undefined) ? payload.payload.access : authToken
                }
            });

        }
    } catch (error) {
        console.log(error);
        yield put({type: USER_INFO_FAILURE, error})
    }
}

export function* teamPermissionSaga(payload) {
    console.log(payload);
    if (payload.payload !== undefined) {
        try {
            const response = yield call(() => fetch(TEAM_USER_PERMISSIONS_URL.replace("<IDENTIFIER>", payload.payload.team),
                {
                    method: 'GET',
                    headers: formAuthHeader({'Content-Type': 'application/json'}, payload.payload.auth)
                }
            ))
            const body = yield call([response, response.json])
            yield put({type: FETCH_USER_TEAM_PERMISSIONS_SUCCESS, payload: body})
        } catch (error) {
            console.log("PERMISSIONS FAILED: ", error);
            yield put({type: FETCH_USER_TEAM_PERMISSIONS_FAILURE, error})
        }
    }
}

export function* userCreateTeamSaga(payload = null) {
    try {
        const authToken = yield select(accessToken);
        const response = yield call(() => fetch(USER_INFO_SELF, {
                method: 'GET',
                headers: formAuthHeader({'Content-Type': 'application/json'}, authToken),
            })
        );
        const body = yield call([response, response.json])
        const {teams} = body;
        yield put({type: USER_INFO_SUCCESS, payload: body});
        yield put({type: SET_ACTIVE_TEAM_SUCCESS, payload: payload.payload.id})
        yield put({
            type: FETCH_USER_TEAM_PERMISSIONS_REQUEST,
            payload: {team: payload.payload.id, auth: authToken}
        });
        yield put(push("/team/settings")) // todo: TEAM_SETTINGS ROUTE
    } catch (error) {
        console.log(error);
        yield put({type: USER_INFO_FAILURE, error})
    }
}

export function* userAcceptInviteSaga(payload = null) {
    try {
        yield put({type: USER_INFO_REQUEST})
        yield put(push("/"))
    } catch (error) {
        console.log(error);
    }
}
