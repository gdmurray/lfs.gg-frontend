export const BACKEND_API = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'http://0.0.0.0:8080';

export const REGISTER_USER_URL = BACKEND_API + "/api/user/register/";
export const AUTH_OBTAIN_TOKEN = BACKEND_API + '/api/auth/token/obtain/';
export const AUTH_REFRESH_TOKEN = BACKEND_API + '/api/auth/token/refresh/';
export const USER_INFO_SELF = BACKEND_API + '/api/user/';
export const TEMP_SCHEDULE_URL = BACKEND_API + "/api/team/8916f502-f5dc-11e9-b2b9-469ea25f7e20/calendar/scrims";

export const UPDATE_SCRIM_URL = BACKEND_API + '/api/team/scrim/'
export const CREATE_TEAM_URL = BACKEND_API + '/api/team/';
export const TEAM_SCRIMS_LIST_URL = BACKEND_API + '/api/team/<IDENTIFIER>/scrims/';
export const TEAM_SCHEDULE_URL = BACKEND_API + "/api/team/<IDENTIFIER>/calendar/scrims";
export const TEAM_HOME_DATA_URL = BACKEND_API + '/api/team/<IDENTIFIER>/';
export const TEAM_USER_PERMISSIONS_URL = BACKEND_API + '/api/user/permissions/<IDENTIFIER>/';
export const REGION_OPTIONS = [
    {key: "NA", text: "NA", value: "NA"},
    {key: "EU", text: "EU", value: "EU"},
    {key: "LATAM", text: "LATAM", value: "LATAM"},
    {key: "APAC", text: "APAC", value: "APAC"}
]

export const TEAM_ROLES = {
    OWNER: "OWNER",
    ADMIN: "ADMIN",
    USER: "USER",
    PLAYER: "PLAYER"
}
