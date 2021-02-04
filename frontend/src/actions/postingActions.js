import Axios from 'axios';
import { POSTING_CREATE_FAIL, POSTING_CREATE_REQUEST, POSTING_CREATE_SUCCESS, POSTING_LIST_FAIL, POSTING_LIST_REQUEST, POSTING_LIST_SUCCESS } from '../constants/postingConstants';

export const postingGetList = () => async(dispatch) => {
    dispatch({ type: POSTING_LIST_REQUEST });
    try {
        const { data } = await Axios.get('/postings');
        dispatch({ type: POSTING_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: POSTING_LIST_FAIL, payload: error.message });
    }
};

export const createPosting = (title, blog, category, text, image, hashtags) => async(dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    dispatch({ type: POSTING_CREATE_REQUEST, payload: {
        author: userInfo._id, title, blog, category, text, image, hashtags
    }});
    try {
        const { data } = await Axios.post('/postings', {
            author: userInfo._id, title, blog, category, text, image, hashtags
        }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: POSTING_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: POSTING_CREATE_FAIL, payload: error.message });
    }
};