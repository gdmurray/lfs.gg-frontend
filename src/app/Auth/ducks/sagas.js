import {put, call, select, takeLatest} from 'redux-saga/effects';
//import {AUTH_OBTAIN_TOKEN, TEAM_USER_PERMISSIONS_URL} from "../constants";
import {AUTH_OBTAIN_TOKEN, TEAM_USER_PERMISSIONS_URL} from "../../../utils/constants";
import {push} from 'connected-react-router';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    USER_LOGOUT_FINISH,
    LOGIN_REQUEST,
    USER_LOGOUT_START
} from './types';
import {USER_INFO_REQUEST} from "../../User/ducks/types";
import {withAuth} from "../../../reducers";
import {persistor} from "../../../index";
import {TOKEN_FAILURE} from "./types";

import {FETCH_USER_TEAM_PERMISSIONS_SUCCESS} from "./types";

const purgePersistor = persistor => persistor.purge();

export default function* watchAuth() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(USER_LOGOUT_START, logoutSaga);
    yield takeLatest(TOKEN_FAILURE, logoutSaga);
}

export function* logoutSaga() {
    yield call(purgePersistor, persistor);
    yield put({type: USER_LOGOUT_FINISH});
    yield put(push('/login'));
}

export function* refreshFailedSaga(payload) {
    yield call(logoutSaga);
}

export function* loginSaga(payload) {
    try {
        const response = yield call(() => fetch(AUTH_OBTAIN_TOKEN, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload.user)
            })
        );
        const body = yield call([response, response.json])
        yield put({type: USER_INFO_REQUEST, payload: body})
        yield put({type: LOGIN_SUCCESS, payload: body});
    } catch (error) {
        yield put({type: LOGIN_FAILURE, error})
    }
}


