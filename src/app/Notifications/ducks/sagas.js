import {put, takeLatest} from "redux-saga/effects";
import {push} from "connected-react-router";
import {ACCEPT_INVITATION_SUCCESS} from "./types";
import {USER_INFO_REQUEST} from "../../User/ducks/types";
export default function* watchNotifications() {
    yield takeLatest(ACCEPT_INVITATION_SUCCESS, userAcceptInviteSaga)
}

export function* userAcceptInviteSaga(payload = null) {
    try {
        yield put({type: USER_INFO_REQUEST})
        yield put(push("/"))
    } catch (error) {
        console.log(error);
    }
}
