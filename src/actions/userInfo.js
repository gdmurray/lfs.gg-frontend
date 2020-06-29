export const USER_INFO_REQUEST = '@@userInfo/USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = '@@userInfo/USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = '@@userInfo/USER_INFO_FAILURE';
export const SET_ACTIVE_TEAM_START = '@@userInfo/SET_ACTIVE_TEAM_START';
export const SET_ACTIVE_TEAM_FINISH = '@@userInfo/SET_ACTIVE_TEAM_FINISH';

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
