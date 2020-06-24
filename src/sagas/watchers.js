import { takeLatest } from 'redux-saga/effects';
import { loginSaga, logoutSaga } from './authSaga';
import { LOGIN_REQUEST, USER_LOGOUT_START } from '../actions/auth';
import { USER_INFO_REQUEST, SET_ACTIVE_TEAM_START, CHANGE_ACTIVE_TEAM_SUCCESS } from '../actions/userInfo';
import { userInfoSaga } from './userInfoSaga';
import {activeTeamChangeSaga} from "./activeTeamSaga";

//import * as types from '../actions/auth';


export default function* watchUserAuthentication() {
  //yield takeLatest(types.REGISTER_USER, registerSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(USER_INFO_REQUEST, userInfoSaga);
  yield takeLatest(USER_LOGOUT_START, logoutSaga);
  yield takeLatest(CHANGE_ACTIVE_TEAM_SUCCESS, activeTeamChangeSaga);
}

