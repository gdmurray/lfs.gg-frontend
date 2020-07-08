import {takeLatest} from 'redux-saga/effects';
import {loginSaga, logoutSaga} from './authSaga';
import {LOGIN_REQUEST, USER_LOGOUT_START} from '../actions/auth';
import {USER_INFO_REQUEST, SET_ACTIVE_TEAM_START, CHANGE_ACTIVE_TEAM_SUCCESS} from '../actions/userInfo';
import {
    userInfoSaga,
    setActiveTeamSaga,
    userCreateTeamSaga,
    teamPermissionSaga,
    userAcceptInviteSaga
} from './userInfoSaga';
import {CREATE_TEAM_SUCCESS} from "../actions/teams";
import {FETCH_USER_TEAM_PERMISSIONS_REQUEST} from "../actions/permissions";
import {SET_TEAM_SETTINGS_SUCCESS} from "../actions/teamData";
import {activeTeamChangeSaga, refreshTeamSaga} from "./activeTeamSaga";
import {ACCEPT_INVITATION_SUCCESS} from "../actions/invitations";
import {DELETE_TEAM_ROLE_SUCCESS} from "../actions/teamRoles";

import {refreshRoleSettingsSaga} from "./settings";

//import * as types from '../actions/auth';


export default function* watchUserAuthentication() {
    //yield takeLatest(types.REGISTER_USER, registerSaga);
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(USER_INFO_REQUEST, userInfoSaga);
    yield takeLatest(FETCH_USER_TEAM_PERMISSIONS_REQUEST, teamPermissionSaga);
    yield takeLatest(USER_LOGOUT_START, logoutSaga);
    // After a team is created
    yield takeLatest(CREATE_TEAM_SUCCESS, userCreateTeamSaga);
    yield takeLatest(CHANGE_ACTIVE_TEAM_SUCCESS, activeTeamChangeSaga);
    yield takeLatest(SET_TEAM_SETTINGS_SUCCESS, refreshTeamSaga);

    //Invitations
    yield takeLatest(ACCEPT_INVITATION_SUCCESS, userAcceptInviteSaga);
    yield takeLatest(DELETE_TEAM_ROLE_SUCCESS, refreshRoleSettingsSaga);
}

