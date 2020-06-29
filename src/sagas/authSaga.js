import {put, call} from 'redux-saga/effects';
import {AUTH_OBTAIN_TOKEN, TEAM_USER_PERMISSIONS_URL} from "../constants";
import { push } from 'connected-react-router';
import {LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, USER_LOGOUT_FINISH} from '../actions/auth';
import {USER_INFO_REQUEST} from '../actions/userInfo';
import {withAuth} from "../reducers";


export function* registerSaga(payload) {
    try {
        //const response = yield call(registerUserService, payload);
        yield [
            //put({ type: REGISTER_SUCCESS, response })
        ];
    } catch (error) {
        //yield put({ type: types.REGISTER_USER_ERROR, error });
    }
}

export function* logoutSaga() {
    yield put({type: 'PURGE'})
    yield put({type: 'PURGE', key: 'root'});
    yield put({type: 'PURGE', key: 'userInfo'});
    yield put({type: USER_LOGOUT_FINISH});
    yield put(push("/"))
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

