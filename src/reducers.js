import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router';
//import auth, * as fromAuth from './auth.js'
import auth, {authSelectors} from "./app/Auth/ducks";
import notifications from "./app/Notifications/ducks";
import teams from "./app/Teams/ducks";
import teamSettings from "./app/TeamSettings/ducks";
import userInfo, {userSelectors} from "./app/User/ducks";
//import calendar, * as fromCalendar from "./calendar";
//import userInfo, * as fromUserInfo from './userInfo';
//import teams, * as fromTeams from "./teams";
//import teamView, * as teamViewInfo from './teamView';
//import teamScrims from "./teamScrims";
//import teamRoles from "./teamRoles";
//import invitations from "./invitations";
//import permissions from "./permissions";

import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
//import teamData, * as fromTeamData from "./teamData";

const userInfoPersistConfig = {
    key: 'userInfo',
    storage: storage,
    whitelist: ['userInfo', 'teamPermissions'],
    blacklist: ['userInfo.loading']
}

const teamsPersistConfig = {
    key: 'teams',
    storage: storage,
    whitelist: ['teamData'],
}

export default (history) => combineReducers({
    router: connectRouter(history),
    auth: auth,
    notifications: notifications,
    teams: teams,
    teamSettings: teamSettings,
    user: persistReducer(userInfoPersistConfig, userInfo),
    //teamView: teamView,

})

export const isAuthenticated = state => authSelectors.isAuthenticated(state.auth)
export const accessToken = state => authSelectors.accessToken(state.auth)
export const isAccessTokenExpired = state => authSelectors.isAccessTokenExpired(state.auth)
export const refreshToken = state => authSelectors.refreshToken(state.auth)
export const isRefreshTokenExpired = state => authSelectors.isRefreshTokenExpired(state.auth)
export const authErrors = state => authSelectors.errors(state.auth)
export const registerErrors = state => authSelectors.registerErrors(state.auth)
export const activeTeam = state => userSelectors.activeTeam(state.user);
export const userTeams = state => userSelectors.userTeams(state.user)
export const userId = state => userSelectors.userId(state.user)

export function withAuth(headers = {}) {
    return (state) => ({
        ...headers,
        'Authorization': `Bearer ${accessToken(state)}`
    })
}

export function withTeam(url) {
    return (state) => (url.replace("<IDENTIFIER>", activeTeam(state)));
}

export function getActiveTeam() {
    return (state) => activeTeam(state);
}

export function asViewer(url, append = false) {
    if (append) {
        return (state) => `${url}&viewer=${activeTeam(state)}`
    } else {
        return (state) => `${url}?viewer=${activeTeam(state)}`
    }
}
