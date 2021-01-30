import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";


export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getProfiles = () => async dispatch => {

    try {
        const res = await axios.get('http://localhost:5000/api/profile')
        dispatch({type: CLEAR_PROFILE})
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response?.statusText, status: err.response?.status}
        })
    }
}

export const getGithubRepos = gitUsername => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/github/${gitUsername}`)
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const createProfile = ({formData, history, edit = false}) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(
            'http://localhost:5000/api/profile',
            formData,
            config)

        console.log(`profile data ${res.data}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(
            setAlert(edit ? 'Profile Updated' : 'Profile Created', "success"))

        history.push('/dashboard')
    } catch (err) {

        handleErrors(err)
    }
}


export const addExperience = ({formData, history}) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(
            'http://localhost:5000/api/profile/experience',
            formData,
            config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(
            setAlert("Experience Added", "success"))

        history.push('/dashboard')
    } catch (err) {
        handleErrors(err)
    }
}

export const addEducation = ({formData, history}) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(
            'http://localhost:5000/api/profile/education',
            formData,
            config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(
            setAlert("Education Added", "success"))

        history.push('/dashboard')
    } catch (err) {
        handleErrors(err)
    }
}

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(
            `http://localhost:5000/api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(
            setAlert("Education Deleted", "success"))

    } catch (err) {
        handleErrors(err)
    }
}

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(
            `http://localhost:5000/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(
            setAlert("Experience Deleted", "success"))

    } catch (err) {
        handleErrors(err)
    }
}

export const deleteAccount = () => async dispatch => {
    console.log("inside delete account")
    if (window.confirm('Are you sure? This can NOT be undone!'))
        try {
            await axios.delete(
                `http://localhost:5000/api/profile`)

            dispatch({type: CLEAR_PROFILE})
            dispatch({type: ACCOUNT_DELETED})

            dispatch(
                setAlert("Profile Deleted", "success"))

        } catch (err) {
            handleErrors(err)
        }
}


const handleErrors = (err) => async dispatch => {
    console.log(err)
    if (err.response) {
        if (err.response.errors) {
            const errors = err.response.errors
            errors.forEach(
                error => dispatch(setAlert(error.msg, 'danger')))
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
        }

        dispatch(setAlert(err.response.error, 'danger'))
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })

        console.log(`response error ${err.response}`)
    } else if (err.request) {
        dispatch(setAlert(err.request, 'danger'))
        console.log(`request error ${err.request}`)
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.request}
        })
    } else {
        dispatch(setAlert(err.msg, 'danger'))
        console.log(`msg error ${err.message}`)
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.msg}
        })
    }
}