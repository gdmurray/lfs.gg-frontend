import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
import { USER_INFO_SELF } from '../constants';

export const USER_INFO_REQUEST = '@@userInfo/USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = '@@userInfo/USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = '@@userInfo/USER_INFO_FAILURE';

export const echo = () => ({
    [RSAA]: {
        endpoint: USER_INFO_SELF,
        method: 'GET',
        headers: withAuth({ 'Content-Type': 'application/json' }),
        types: [
          USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAILURE
        ]
    }
  })