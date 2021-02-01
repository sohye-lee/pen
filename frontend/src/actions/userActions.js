import Axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from '../constants/userConstants';


export const signup = (username, email, password) => async(dispatch) => {
    dispatch({ 
        type: USER_SIGNUP_REQUEST, 
        payload: { 
            username,
            email,
            password
        }
    });

    try {
        const { data } = await Axios.post('/users/signup', {
            username, email, password
        });

        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.message
        })
    }
};

export const login = (email, password) =>  async(dispatch)  => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password }});

    try {
        const { data } = await Axios.post('/users/login', {
            email, password
        });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
    }
};

export const logout = () => async(dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT })
};

export const profile = (userId) => async(dispatch, getState) => {
    dispatch({ type: USER_PROFILE_REQUEST, payload: userId });
    const { userLogin: { userInfo } } = getState();
    try {
        const { data } = await Axios.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_PROFILE_FAIL, payload: error.message });
    }
};

export const profileUpdate = (user) => async(dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user});
    const { userLogin: { userInfo } } = getState();
    try {
        const { data } = await Axios.put(`/users/${user._id}`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
};