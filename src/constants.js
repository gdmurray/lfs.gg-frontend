export const BACKEND_API = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'https://api.r6pl.com';
export const TEAM_KEY = "<IDENTIFIER>"
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
export const TEAM_SETTINGS_BASE_URL = BACKEND_API + '/api/team/<IDENTIFIER>/'
export const TEAM_SET_LOGO_URL = BACKEND_API + '/api/team/<IDENTIFIER>/settings/logo';
export const TEAM_VIEW_INFO_URL = BACKEND_API + '/api/team/<IDENTIFIER>/view';
export const TEAM_ROLE_URL = BACKEND_API + '/api/team/<IDENTIFIER>/role/';
export const TEAM_VIEW_SCRIMS_URL = BACKEND_API + '/api/team/<IDENTIFIER>/view/scrims';
export const TEAM_INVITE_URL = BACKEND_API + '/api/team/<IDENTIFIER>/invite';

export const SETTINGS_URLS = {
    settings: "settings",
    roles: "settings/roles",
    privacy: "settings/privacy"
}
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

export const ROLE_HEIRARCHY = {
    OWNER: 1,
    ADMIN: 2,
    USER: 3,
    PLAYER: 4
}

export const INVITE_METHODS = {
    USERNAME: "USERNAME",
    LINK: "LINK"
}

export const ROLE_OPTIONS = [
    {key: "OWNER", text: "Owner", value: "OWNER"},
    {key: "ADMIN", text: "Admin", value: "ADMIN"},
    {key: "USER", text: "User", value: "USER"},
    {key: "PLAYER", text: "Player", value: "PLAYER"}
]

export const PLATFORM_OPTIONS = [
    {key: "PC", text: "PC", value: "PC"},
    {key: "XBOX", text: "XBOX", value: "XBOX"},
    {key: "PLAYSTATION", text: "Playstation", value: "Playstation"}
]

export const createUrl = (url, replacement, query = null) => {
    if (query !== null) {
        return url.replace("<IDENTIFIER>", replacement) + query
    } else {
        return url.replace("<IDENTIFIER>", replacement)
    }

}

export const TEAM_SETTINGS_TITLES = {
    settings: "Edit Team Preferences",
    roles: "Edit Team Roles",
    privacy: "Edit Team Privacy"
}


