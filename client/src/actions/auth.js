import {
    AUTH_FAIL,
    CLEAR_PROFILE,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";
import setAuthToken from "../util/setAuthToken";


export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_FAIL
        })
    }

}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password})
    try {
        const res = await axios.post('/api/auth/', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors
            errors.forEach(
                error => dispatch(setAlert(error.msg, 'danger')))

        } else if (err.request) {
            console.log(err.request)
        } else if (err.message) {
            console.log(err.message)
        }

        dispatch({type: LOGIN_FAIL})
    }
}

export const registerUser = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password})
    try {
        const res = await axios.post('/api/user/', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors
            errors.forEach(
                error => dispatch(setAlert(error.msg, 'danger')))

        } else if (err.request) {
            console.log(err.request)
        } else if (err.message) {
            console.log(err.message)
        }

        dispatch({type: REGISTER_FAIL})
    }
}

export const logout = () => dispatch => {
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})
}