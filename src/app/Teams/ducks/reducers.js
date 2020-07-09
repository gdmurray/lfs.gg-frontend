import {combineReducers} from "redux";
import * as teams from "./types";

const initialTeamDataState = {
    data: {},
    loading: false,
    error: false
}

const teamDataReducer = (state = initialTeamDataState, action) => {
    switch (action.type) {
        case teams.FETCH_TEAM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case teams.FETCH_TEAM_SUCCESS:
            return {
                ...state,
                error: {},
                loading: false,
                data: action.payload
            }
        case teams.FETCH_TEAM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                data: {}
            }
        default:
            return state;
    }
}

const initialScrimState = {
    scrims: [],
    loading: false,
    error: false
}

const teamScrimsReducer = (state = initialScrimState, action) => {
    switch (action.type) {
        case teams.FETCH_TEAM_SCRIM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case teams.FETCH_TEAM_SCRIM_SUCCESS:
            return {
                error: false,
                loading: false,
                scrims: action.payload
            }
        case teams.FETCH_TEAM_SCRIM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state
    }
}

const initialCreateTeamState = {
    team: null,
    created: false,
    loading: false,
    error: {}
}

const createTeamReducer = (state = initialCreateTeamState, action) => {
    switch (action.type) {
        case teams.CREATE_TEAM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case teams.CREATE_TEAM_SUCCESS:
            return {
                error: {},
                team: action.payload,
                created: true,
                loading: false
            }
        case teams.CREATE_TEAM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                created: false
            }
        default:
            return state;
    }
}

const reducer = combineReducers({
    teamScrims: teamScrimsReducer,
    createTeam: createTeamReducer,
    teamData: teamDataReducer
})

export default reducer;

/*
import * as calendar from "../actions/calendar";

const initialState = {
    scrims: [],
    loading: false,
    error: {}
  }
export default (state=initialState, action) => {
    switch(action.type){
        case calendar.GET_CALENDAR_SCRIMS_REQUEST:
            return {
                loading: true
            }
        case calendar.GET_CALENDAR_SCRIMS_FAILURE:
            return {
                loading: false,
                error: action.payload.response
            }
        case calendar.GET_CALENDAR_SCRIMS_SUCCESS:
            //console.log(action.payload.response);
            return {
                loading: false,
                scrims: action.payload
            }
        default:
            return state
    }
}*/
