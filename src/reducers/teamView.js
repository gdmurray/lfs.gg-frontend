import * as teamView from "../actions/teamView";

const initialState = {
    teamInfo: {},
    loadingTeam: true,
    loadingScrims: true,
    scrims: [],
    error: {}
}

export default (state=initialState, action) => {
    switch(action.type){
        case teamView.TEAM_VIEW_INFO_REQUEST:
            return {...state, loadingTeam: true}
        case teamView.TEAM_VIEW_INFO_SUCCESS:
            return {...state, teamInfo: action.payload, loadingTeam: false}
        case teamView.TEAM_VIEW_INFO_FAILURE:
            return {...state, error: action.payload, loadingTeam: false}
        
        case teamView.TEAM_VIEW_SCRIMS_REQUEST:
            return {...state, loadingScrims: true}
        case teamView.TEAM_VIEW_SCRIMS_SUCCESS:
            return {...state, scrims: action.payload, loadingScrims: false}
        case teamView.TEAM_VIEW_SCRIMS_FAILURE:
            return {...state, error: action.payload, loadingScrims: false}
        default:
            return state;
    }
}