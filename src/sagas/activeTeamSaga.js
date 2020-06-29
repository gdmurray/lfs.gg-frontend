import { put, call } from 'redux-saga/effects';
import {push} from "connected-react-router"
import {fetchTeamScrims} from "../actions/teamScrims";

export function* activeTeamChangeSaga(payload=null,){
    const {active_team} = payload.payload;
    //yield put(fetchTeamScrims(active_team));
    yield put(push("/team"));
}