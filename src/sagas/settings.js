import {put, call, select} from 'redux-saga/effects';
import {activeTeam, accessToken} from "../reducers";
import {fetchTeamSettings} from "../actions/teamData";

export function* refreshRoleSettingsSaga(payload) {
    try {
        const active_team = yield select(activeTeam);
        yield put(fetchTeamSettings(active_team, "roles"))
    } catch (error) {
        console.log(error)
    }
    //yield put()
}
