import {RSAA} from "redux-api-middleware";
import {CREATE_TEAM_URL, TEAM_HOME_DATA_URL, TEAM_SCRIMS_LIST_URL} from "../../../utils/constants";
import {withAuth} from "../../../reducers";

import * as types from "./types";

export const createTeam = (data) => ({
    [RSAA]: {
        endpoint: CREATE_TEAM_URL,
        method: 'POST',
        body: JSON.stringify(data),
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            types.CREATE_TEAM_REQUEST,
            types.CREATE_TEAM_SUCCESS,
            types.CREATE_TEAM_FAILURE
        ]
    }
})

export const fetchTeamHomeData = (team) => ({
    [RSAA]: {
        endpoint: TEAM_HOME_DATA_URL.replace("<IDENTIFIER>", team),
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            types.FETCH_TEAM_REQUEST,
            types.FETCH_TEAM_SUCCESS,
            types.FETCH_TEAM_FAILURE
        ]
    }
})
