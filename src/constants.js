export const BACKEND_API = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'https://api.r6pl.com';

export const AUTH_OBTAIN_TOKEN = BACKEND_API + '/api/auth/token/obtain/';
export const AUTH_REFRESH_TOKEN = BACKEND_API + '/api/auth/token/refresh/';
export const USER_INFO_SELF = BACKEND_API + '/api/user/';
export const TEMP_SCHEDULE_URL = BACKEND_API + "/api/team/8916f502-f5dc-11e9-b2b9-469ea25f7e20/calendar/scrims";

export const UPDATE_SCRIM_URL = BACKEND_API + '/api/team/scrim/'