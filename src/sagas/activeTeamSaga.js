import {put, call, select} from 'redux-saga/effects';
import {push} from "connected-react-router"
import {fetchTeamScrims} from "../actions/teamScrims";
import {fetchTeamHomeData} from "../actions/teamData";
import {fetchUserTeamPermissions} from "../actions/permissions";
import {activeTeam, accessToken} from "../reducers";

// Things that get refreshed when active team is changed
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
