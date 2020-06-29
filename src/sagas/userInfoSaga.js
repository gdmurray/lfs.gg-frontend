import { put, call, select } from 'redux-saga/effects';
import { USER_INFO_SELF } from "../constants";
import { withAuth } from '../reducers'
import {setActiveTeam, SET_ACTIVE_TEAM_SUCCESS, SET_ACTIVE_TEAM_FAILURE, setActiveTeamInDb} from "../actions/userInfo";

import {USER_INFO_SUCCESS, USER_INFO_FAILURE, SET_ACTIVE_TEAM_START} from '../actions/userInfo';

import {
    FETCH_USER_TEAM_PERMISSIONS_REQUEST,
    FETCH_USER_TEAM_PERMISSIONS_SUCCESS,
    FETCH_USER_TEAM_PERMISSIONS_FAILURE
} from "../actions/permissions";

import {USER_INFO_REQUEST} from '../actions/userInfo';
import auth from "../reducers/auth";

function formHeader(headers, payload) {
    return {...headers, Authorization: 'Bearer ' + payload.payload.access}
}

function formAuthHeader(headers, token) {
    return {...headers, Authorization: 'Bearer ' + token}
}

export function* userInfoSaga(payload=null,){
    try{
        var response;
        if(payload !== null){
            response = yield call(() => fetch(USER_INFO_SELF, {
                method: 'GET', 
                headers: formHeader({'Content-Type': 'application/json'}, payload), 
                }) 
            );
        }else{
            response = yield call(() => fetch(USER_INFO_SELF, {
                method: 'GET', 
                headers: withAuth({'Content-Type': 'application/json'}), 
                }) 
            );
        }
        console.log(response);
        const body = yield call([response, response.json])
        const {active_team} = body;
        const { teams } = body;

        yield put({ type: USER_INFO_SUCCESS, payload: body });
        
        // No Active Team Has been Set... Set In Database
        if(active_team == null){
            const activeTeam = yield call(setActiveTeam, teams);
            if(activeTeam !== undefined){
                try{
                    const actResponse = yield call(() => fetch(USER_INFO_SELF, {
                        method: 'PUT',
                        headers: formHeader({'Content-Type': 'application/json'}, payload),
                        body: JSON.stringify({active_team: activeTeam.payload.id})
                    }))
                    const actBody = yield call([actResponse, actResponse.json()])
                    console.log(actBody);
                    yield put({type: SET_ACTIVE_TEAM_SUCCESS, payload: actBody.active_team })
                } catch (teamError){
                    console.log(teamError);
                    yield put({type: SET_ACTIVE_TEAM_FAILURE, payload: teamError})
                }
            }
        }else if(payload !== null){
            yield put({type: SET_ACTIVE_TEAM_SUCCESS, payload: active_team})

        }
    } catch (error) {
        console.log(error);
        yield put({type: USER_INFO_FAILURE, error})
    }
}

export function* teamPermissionSaga(payload) {
    try {
        console.log(payload);
        const response = yield call(() => fetch(TEAM_USER_PERMISSIONS_URL.replace("<IDENTIFIER>", payload.payload.team),
            {
                method: 'GET',
                headers: formHeader({'Content-Type': 'application/json'}, payload.payload.auth)
            }
        ))
        const body = yield call([response, response.json])
        yield put({type: FETCH_USER_TEAM_PERMISSIONS_SUCCESS, payload: body})
    } catch (error) {
        yield put({type: FETCH_USER_TEAM_PERMISSIONS_FAILURE, error})
    }
}

export function* userCreateTeamSaga(teamId = null) {
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
        yield put({type: SET_ACTIVE_TEAM_FINISH, payload: teamId})
    } catch (error) {
        console.log(error);
        yield put({type: USER_INFO_FAILURE, error})
    }
}
