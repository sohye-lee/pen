import Axios from 'axios';
import { 
    FOLLOW_ADD_FAIL,
    FOLLOW_ADD_REQUEST,
    FOLLOW_ADD_SUCCESS,
    FOLLOW_LIST_FAIL, 
    FOLLOW_LIST_REQUEST, 
    FOLLOW_LIST_SUCCESS 
} from '../constants/followConstants';

export const getFollows = () => async(dispatch) => {
    dispatch({ type: FOLLOW_LIST_REQUEST });
    try {
        const { data } = await Axios.get('/follows');
        dispatch({ type: FOLLOW_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FOLLOW_LIST_FAIL, payload: error.message });
    }
};

export const addFollow = (blogId) => async(dispatch, getState) => {
    const { userLogin: { userInfo }} = getState();
    dispatch({ 
        type: FOLLOW_ADD_REQUEST, 
        payload: { user: userInfo._id, blog: blogId }
    });
    try {
        const { data } = await Axios.post(`/follows`, {
            user: userInfo._id, blog: blogId
        }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: FOLLOW_ADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FOLLOW_ADD_FAIL, payload: error.message });
    }
};

