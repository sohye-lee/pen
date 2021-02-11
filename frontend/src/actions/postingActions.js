import Axios from 'axios';
import { 
    POSTING_CREATE_FAIL, 
    POSTING_CREATE_REQUEST, 
    POSTING_CREATE_SUCCESS, 
    POSTING_DELETE_FAIL, 
    POSTING_DELETE_REQUEST, 
    POSTING_DELETE_SUCCESS, 
    POSTING_DETAILS_FAIL, 
    POSTING_DETAILS_REQUEST, 
    POSTING_DETAILS_SUCCESS, 
    POSTING_LIKE_FAIL, 
    POSTING_LIKE_REQUEST, 
    POSTING_LIKE_SUCCESS, 
    POSTING_LIST_FAIL, 
    POSTING_LIST_REQUEST, 
    POSTING_LIST_SUCCESS, 
    POSTING_UNLIKE_REQUEST, 
    POSTING_UNLIKE_SUCCESS,
    POSTING_UNLIKE_FAIL,
    POSTING_UPDATE_FAIL, 
    POSTING_UPDATE_REQUEST, 
    POSTING_UPDATE_SUCCESS 
} from '../constants/postingConstants';

export const postingGetList = () => async(dispatch) => {
    dispatch({ type: POSTING_LIST_REQUEST });
    try {
        const { data } = await Axios.get('/postings');
        dispatch({ type: POSTING_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: POSTING_LIST_FAIL, payload: error.message });
    }
};

export const getPostingDetails = (postingId) => async(dispatch) => {
    dispatch({ type: POSTING_DETAILS_REQUEST, payload: postingId });
    try {
        const { data } = await Axios.get(`/postings/${postingId}`);
        dispatch({ type: POSTING_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: POSTING_DETAILS_FAIL, payload: error.message });
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

export const updatePosting = (posting) => async(dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    dispatch({ type: POSTING_UPDATE_REQUEST, payload: posting });
    try {
        const { data } = await Axios.put(`/postings/${posting._id}`, posting, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: POSTING_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: POSTING_UPDATE_FAIL, payload: error.message });
    }
}

export const deletePosting = (postingId) => async(dispatch, getState)=> {
    const { userLogin: { userInfo } } = getState();
    dispatch({ type: POSTING_DELETE_REQUEST });
    try {
        const { data } = await Axios.delete(`/postings/${postingId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: POSTING_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: POSTING_DELETE_FAIL, payload: error.message });
    }
};

export const likePosting = (postingId, userId) => async(dispatch, getState) => {
    // const { userLogin: { userInfo } } = getState();
    dispatch({ type: POSTING_LIKE_REQUEST, payload: { userId} });
    try {
        const { data } = await Axios.put(`/postings/${postingId}/liked`, {
             userId
        });
        dispatch({ type: POSTING_LIKE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: POSTING_LIKE_FAIL, payload: error.message });
    }
};


