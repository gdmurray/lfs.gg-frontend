import * as teamScrims from "../actions/teamScrims";

const initialState = {
    scrims: [],
    loading: false,
    error: {}
}

export default (state=initialState, action) => {
    switch(action.type){
        case teamScrims.FETCH_TEAM_SCRIM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case teamScrims.FETCH_TEAM_SCRIM_SUCCESS:
            return {
                error: {},
                loading: false,
                scrims: action.payload
            }
        case teamScrims.FETCH_TEAM_SCRIM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state
    }    
}