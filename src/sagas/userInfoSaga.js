import { put, call } from 'redux-saga/effects';
import { USER_INFO_SELF } from "../constants";
import { withAuth } from '../reducers'
import {setActiveTeam, SET_ACTIVE_TEAM_FINISH} from "../actions/userInfo";

import { USER_INFO_SUCCESS, USER_INFO_FAILURE, SET_ACTIVE_TEAM_START } from '../actions/userInfo';

function formHeader(headers, payload){
    return {...headers, Authorization: 'Bearer ' + payload.payload.access}
}

export function* userInfoSaga(payload=null,){
    try{
        const response = yield call(() => fetch(USER_INFO_SELF, {
            method: 'GET', 
            headers: formHeader({'Content-Type': 'application/json'}, payload), 
            }) 
        );
        const body = yield call([response, response.json])
        const { teams } = body;
        yield put({ type: USER_INFO_SUCCESS, payload: body });
        const activeTeam = yield call(setActiveTeam, teams);
        if(activeTeam !== undefined){
            yield put({type: SET_ACTIVE_TEAM_FINISH, payload: activeTeam.payload.id});
        }
    } catch (error){
        console.log(error);
        yield put({ type: USER_INFO_FAILURE, error })
    }
}