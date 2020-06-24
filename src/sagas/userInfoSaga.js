import { put, call } from 'redux-saga/effects';
import { USER_INFO_SELF } from "../constants";
import { withAuth } from '../reducers'
import {setActiveTeam, SET_ACTIVE_TEAM_SUCCESS, SET_ACTIVE_TEAM_FAILURE, setActiveTeamInDb} from "../actions/userInfo";

import { USER_INFO_SUCCESS, USER_INFO_FAILURE, SET_ACTIVE_TEAM_START } from '../actions/userInfo';

function formHeader(headers, payload){
    return {...headers, Authorization: 'Bearer ' + payload.payload.access}
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
    } catch (error){
        console.log(error);
        yield put({ type: USER_INFO_FAILURE, error })
    }
}
