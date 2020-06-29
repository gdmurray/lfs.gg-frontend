import * as teamData from "../actions/teamData";

const initialState = {
    data: {},
    loading: false,
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case teamData.FETCH_TEAM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case teamData.FETCH_TEAM_SUCCESS:
            return {
                error: {},
                loading: false,
                data: action.payload
            }
        case teamData.FETCH_TEAM_FAILURE:
            return {
                error: action.payload,
                loading: false,
                data: {}
            }
        default:
            return state;
    }
}
