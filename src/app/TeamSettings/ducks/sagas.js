import {put, call, select, takeLatest} from 'redux-saga/effects';
import {activeTeam, accessToken} from "../../../reducers";
import {fetchTeamSettings} from "./actions";
import {SET_TEAM_SETTINGS_SUCCESS} from "./types";

export default function* watchTeamSettings() {
    yield takeLatest(SET_TEAM_SETTINGS_SUCCESS, refreshRoleSettingsSaga);
}

export function* refreshRoleSettingsSaga(payload) {
    try {
        const active_team = yield select(activeTeam);
        yield put(fetchTeamSettings(active_team, "roles"))
    } catch (error) {
        console.log(error)
    }
    //yield put()
}
