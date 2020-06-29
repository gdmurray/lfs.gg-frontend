import {put, call, select} from 'redux-saga/effects';
import {TEAM_USER_PERMISSIONS_URL, USER_INFO_SELF} from "../constants";
import {withAuth, accessToken} from '../reducers'
import {setActiveTeam, SET_ACTIVE_TEAM_FINISH} from "../actions/userInfo";

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

export function* userInfoSaga(payload = null,) {
    try {
        const response = yield call(() => fetch(USER_INFO_SELF, {
                method: 'GET',
                headers: formHeader({'Content-Type': 'application/json'}, payload),
            })
        );
        const body = yield call([response, response.json])
        const {teams} = body;
        yield put({type: USER_INFO_SUCCESS, payload: body});
        const activeTeam = yield call(setActiveTeam, teams);
        if (activeTeam !== undefined) {
            yield put({type: SET_ACTIVE_TEAM_FINISH, payload: activeTeam.payload.id});
            yield put({
                type: FETCH_USER_TEAM_PERMISSIONS_REQUEST,
                payload: {team: activeTeam.payload.id, auth: payload}
            });
        }
    } catch (error) {
        console.log(error);
        yield put({type: USER_INFO_FAILURE, error})
    }
}

export function* teamPermissionSaga(payload) {
    try {
        console.log(payload);
        const response = yield call(() => fetch(TEAM_USER_PERMISSIONS_URL.replace("<IDENTIFIER>", payload.payload.team),
            {
                method: 'GET',
                headers: formHeader({'Content-Type': 'application/json'}, payload.payload.auth)
            }
        ))
        const body = yield call([response, response.json])
        yield put({type: FETCH_USER_TEAM_PERMISSIONS_SUCCESS, payload: body})
    } catch (error) {
        yield put({type: FETCH_USER_TEAM_PERMISSIONS_FAILURE, error})
    }
}

export function* userCreateTeamSaga(teamId = null) {
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
        yield put({type: SET_ACTIVE_TEAM_FINISH, payload: teamId})
    } catch (error) {
        console.log(error);
        yield put({type: USER_INFO_FAILURE, error})
    }
}
