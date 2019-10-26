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
}