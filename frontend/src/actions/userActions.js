import Axios from 'axios';
import { USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from '../constants/userConstants';


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

        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.message
        })
    }
};