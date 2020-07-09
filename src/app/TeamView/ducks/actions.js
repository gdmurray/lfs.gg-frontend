import {RSAA} from "redux-api-middleware";
import {TEAM_KEY, TEAM_VIEW_INFO_URL, TEAM_VIEW_SCRIMS_URL} from "../../../utils/constants";
import {asViewer, withAuth} from "../../../reducers";

import * as types from "./types";

export const fetchTeamInfo = (team) => ({
    [RSAA]: {
        endpoint: TEAM_VIEW_INFO_URL.replace(TEAM_KEY, team),
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            types.TEAM_VIEW_INFO_REQUEST,
            types.TEAM_VIEW_INFO_SUCCESS,
            types.TEAM_VIEW_INFO_FAILURE
        ]
    }
})

export const fetchTeamScrims = (team) => ({
    [RSAA]: {
        endpoint: asViewer(TEAM_VIEW_SCRIMS_URL.replace(TEAM_KEY, team)),
        method: 'GET',
        headers: withAuth({'Content-Type': 'application/json'}),
        types: [
            types.TEAM_VIEW_SCRIMS_REQUEST,
            types.TEAM_VIEW_SCRIMS_SUCCESS,
            types.TEAM_VIEW_SCRIMS_FAILURE
        ]
    }
})

//export default {
//    fetchTeamInfo,
//    fetchTeamScrims
//};
