import {call, put, select, takeLatest} from "redux-saga/effects";
import {TEAM_USER_PERMISSIONS_URL, USER_INFO_SELF} from "../../../utils/constants";
import {accessToken, activeTeam, refreshToken} from "../../../reducers";
import {
    USER_INFO_SUCCESS,
    USER_INFO_FAILURE,
    CHANGE_ACTIVE_TEAM_SUCCESS,
    FETCH_USER_TEAM_PERMISSIONS_FAILURE,
    FETCH_USER_TEAM_PERMISSIONS_REQUEST,
    FETCH_USER_TEAM_PERMISSIONS_SUCCESS
} from "./types";
import {
    SET_ACTIVE_TEAM_REQUEST,
    SET_ACTIVE_TEAM_SUCCESS,
    SET_ACTIVE_TEAM_FAILURE
} from "./types";

import {setActiveTeam} from "./actions";
import {USER_INFO_REQUEST} from "./types";
import {fetchTeamHomeData} from "../../Teams/ducks/actions";
import {fetchUserTeamPermissions} from "./actions";
import {push} from "connected-react-router";
import {refreshAccessToken} from "../../Auth/ducks/actions";

export default function* watchUser() {
    yield takeLatest(USER_INFO_REQUEST, userInfoSaga);
    yield takeLatest(USER_INFO_SUCCESS, setActiveTeamSaga);
    yield takeLatest(FETCH_USER_TEAM_PERMISSIONS_REQUEST, userTeamPermissionsSaga);
    yield takeLatest(CHANGE_ACTIVE_TEAM_SUCCESS, activeTeamChangeSaga);
}

function formAuthHeader(headers, token) {
    return {...headers, Authorization: 'Bearer ' + token}
}

function fetchUserInfo(token) {
    return fetch(USER_INFO_SELF, {
        'method': 'GET',
        headers: formAuthHeader({'Content-Type': 'application/json'}, token),
    })
        .then(response => ({response}))
        .catch(error => ({error}))
}

const handleError = (response, error, auth) => {
    console.log(response);
    console.log(error);
    console.log(auth);
    if (response.status == 401) {
        if (error.code == "token_not_valid") {
            console.log("refreshing");
            refreshAccessToken(auth.refresh)
        }
    }
}

// TODO: AUTH HEADER SENDING OBJECT BRO FUCK THISSSS
export function* userInfoSaga(payload = null,) {
    try {
        var authToken;
        var refresh_token;
        if (payload.payload === undefined || payload.payload.access == undefined) {
            authToken = yield select(accessToken);
            refresh_token = yield select(refreshToken);
        } else {
            authToken = payload.payload.access;
            refresh_token = payload.payload.refresh;
        }
        var body;
        const {response} = yield call(fetchUserInfo, authToken);
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
            console.log("SUCCESSFUL USER FETCH?");
            body = yield call([response, response.json]);
        } else {
            console.log("refresh access");
            yield put(refreshAccessToken(authToken));
        }
        yield put({type: USER_INFO_SUCCESS, payload: body});
        /*
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

        }*/
    } catch (error) {
        console.log(error);
        yield put({type: USER_INFO_FAILURE, error})
    }
}

export function* setActiveTeamSaga(payload) {
    try {
        console.log(payload);
    } catch (e) {
        console.log(e)
    }
}

export function* userTeamPermissionsSaga(payload) {
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

export function* activeTeamChangeSaga(payload = null,) {
    const {active_team} = payload.payload;
    console.log("changed active team");
    console.log(active_team);
    //yield put(fetchTeamScrims(active_team));
    yield put(fetchTeamHomeData(active_team));
    yield put(fetchUserTeamPermissions(active_team));
    yield put(push("/team"));
}

export function* refreshTeamSaga(payload = null) {
    const active_team = yield select(activeTeam);
    yield put(fetchTeamHomeData(active_team));
    yield put(fetchUserTeamPermissions(active_team));
}
