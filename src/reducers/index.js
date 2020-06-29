import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router';
import auth, * as fromAuth from './auth.js'
import echo, * as fromEcho from "./echo";
import calendar, * as fromCalendar from "./calendar";
import userInfo, * as fromUserInfo from './userInfo';
import teams, * as fromTeams from "./teams";
import teamScrims from "./teamScrims";
import permissions from "./permissions";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import teamData, * as fromTeamData from "./teamData";

const userInfoPersistConfig = {
  key: 'userInfo',
  storage: storage,
  blacklist: ['loading']
}

const teamDataPersistConfig = {
  key: 'data',
  storage: storage,
  blacklist: ['loading', 'error']
}

const permissionsPersistConfig = {
  key: 'permissions',
  storage: storage,
  whitelist: ['team', 'league']
}

export default (history) => combineReducers({
  router: connectRouter(history),
  auth: auth,
  echo: echo,
  calendar: calendar,
  teamScrims: teamScrims,
  teams: teams,
  permissions: persistReducer(permissionsPersistConfig, permissions),
  teamData: persistReducer(teamDataPersistConfig, teamData),
  userInfo: persistReducer(userInfoPersistConfig, userInfo),
})

export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth)
export const accessToken = state => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken = state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors = state => fromAuth.errors(state.auth)
export const registerErrors = state => fromAuth.registerErrors(state.auth)
export const serverMessage = state => fromEcho.serverMessage(state.echo)

export function withAuth(headers={}) {
 
  return (state) => ({
    ...headers,
    'Authorization': `Bearer ${accessToken(state)}`
  })
}
