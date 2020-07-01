import {RSAA} from 'redux-api-middleware';
import {AUTH_OBTAIN_TOKEN, AUTH_REFRESH_TOKEN, REGISTER_USER_URL} from '../constants';

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';

export const REGISTER_USER_REQUEST = '@@auth/REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = '@@auth/REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = '@@auth/REGISTER_USER_FAILURE';

export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';

export const USER_LOGOUT_START = "@@auth/USER_LOGOUT_START";
export const USER_LOGOUT_FINISH = "@@auth/USER_LOGOUT_FINISH"

export const logout = () => {
    return {
        type: USER_LOGOUT_START
    }
}

export const logInUserAction = (user) => {
    return {
        type: LOGIN_REQUEST,
        user
    }
}

export const registerUser = (values, query = null) => ({
    [RSAA]: {
        endpoint: REGISTER_USER_URL + query,
        method: 'POST',
        body: JSON.stringify(values),
        headers: {'Content-Type': 'application/json'},
        types: [
            REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE
        ]
    }
})

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: AUTH_REFRESH_TOKEN,
        method: 'POST',
        body: JSON.stringify({refresh: token}),
        headers: {'Content-Type': 'application/json'},
        types: [
            TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
        ]
    }
})
