import Axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from '../constants/userConstants';


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