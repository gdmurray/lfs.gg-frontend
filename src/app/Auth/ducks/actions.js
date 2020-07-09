import {RSAA} from 'redux-api-middleware';
import {
    AUTH_OBTAIN_TOKEN,
    AUTH_REFRESH_TOKEN,
    REGISTER_USER_URL,
    TEAM_USER_PERMISSIONS_URL
} from '../../../utils/constants';
import * as types from "./types";
import {withAuth} from "../../../reducers";

export const logout = () => {
    return {
        type: types.USER_LOGOUT_START
    }
}

export const logInUserAction = (user) => {
    return {
        type: types.LOGIN_REQUEST,
        user
    }
}

export const registerUser = (values, query = '') => ({
    [RSAA]: {
        endpoint: REGISTER_USER_URL + query,
        method: 'POST',
        body: JSON.stringify(values),
        headers: {'Content-Type': 'application/json'},
        types: [
            types.REGISTER_USER_REQUEST,
            types.REGISTER_USER_SUCCESS,
            types.REGISTER_USER_FAILURE
        ]
    }
})

export const refreshAccessToken = (token) => {
    return {
        [RSAA]: {
            endpoint: AUTH_REFRESH_TOKEN,
            method: 'POST',
            body: JSON.stringify({refresh: token}),
            headers: {'Content-Type': 'application/json'},
            types: [
                types.TOKEN_REQUEST,
                types.TOKEN_RECEIVED,
                types.TOKEN_FAILURE
            ]
        }
    }
}
