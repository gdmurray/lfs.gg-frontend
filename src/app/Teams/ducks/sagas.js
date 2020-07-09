import {call, put, select, takeLatest} from "redux-saga/effects";
import {accessToken} from "../../../reducers";
import {TEAM_USER_PERMISSIONS_URL, USER_INFO_SELF} from "../../../utils/constants";
import {
    FETCH_USER_TEAM_PERMISSIONS_REQUEST,
    FETCH_USER_TEAM_PERMISSIONS_SUCCESS,
    FETCH_USER_TEAM_PERMISSIONS_FAILURE,
    USER_INFO_SUCCESS,
    USER_INFO_FAILURE,
    SET_ACTIVE_TEAM_SUCCESS,
} from "../../User/ducks/types";

import {push} from "connected-react-router";
import {CREATE_TEAM_SUCCESS} from "./types";

export default function* watchTeams() {
    yield takeLatest(CREATE_TEAM_SUCCESS, userCreateTeamSaga);
}

function formAuthHeader(headers, token) {
    return {...headers, Authorization: 'Bearer ' + token}
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
