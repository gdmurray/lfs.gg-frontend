import { RSAA } from 'redux-api-middleware';
import {USER_INFO_SELF} from '../constants';
import { withAuth } from '../reducers'

export const USER_INFO_REQUEST = '@@userInfo/USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = '@@userInfo/USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = '@@userInfo/USER_INFO_FAILURE';

export const SET_ACTIVE_TEAM_START = '@@userInfo/SET_ACTIVE_TEAM_START';
export const SET_ACTIVE_TEAM_REQUEST = '@@userInfo/SET_ACTIVE_TEAM_REQUEST';
export const SET_ACTIVE_TEAM_SUCCESS = '@@userInfo/SET_ACTIVE_TEAM_SUCCESS';
export const SET_ACTIVE_TEAM_FAILURE = '@@userInfo/SET_ACTIVE_TEAM_FAILURE';

export const CHANGE_ACTIVE_TEAM_REQUEST = '@@userInfo/CHANGE_ACTIVE_TEAM_REQUEST';
export const CHANGE_ACTIVE_TEAM_SUCCESS = '@@userInfo/CHANGE_ACTIVE_TEAM_SUCCESS';
export const CHANGE_ACTIVE_TEAM_FAILURE = '@@userInfo/CHANGE_ACTIVE_TEAM_FAILURE';

export const changeActiveTeam = (team) => ({
  [RSAA]: {
    endpoint: USER_INFO_SELF,
    method: 'PUT',
    headers: withAuth({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({active_team: team}),
    types:[
      CHANGE_ACTIVE_TEAM_REQUEST, CHANGE_ACTIVE_TEAM_SUCCESS, CHANGE_ACTIVE_TEAM_FAILURE
    ]
  }
})

export const setActiveTeamStart = (teamId) => {
  return {
    type: SET_ACTIVE_TEAM_START,
    teamId
  }
}

export function setActiveTeam(teams, id=null){
  if(teams.length > 0){
        if(id){
          const team = teams.filter((item) => item.id === id);
          return{
            type: SET_ACTIVE_TEAM_START, payload: {id: team[0].team.id}
          }
        }else{
          if(teams.length > 0){
            return {
              type: SET_ACTIVE_TEAM_START, payload: {id: teams[0].team.id}
            }
          }
        }
      }
}
