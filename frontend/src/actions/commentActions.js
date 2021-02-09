import { COMMENT_CREATE_FAIL, COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS, COMMENT_DELETE_FAIL, COMMENT_DELETE_REQUEST, COMMENT_DELETE_SUCCESS, COMMENT_EDIT_FAIL, COMMENT_EDIT_REQUEST, COMMENT_EDIT_SUCCESS } from "../constants/commentConstants";

import Axios from 'axios';

export const createComment = (postingId, text) => async(dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    dispatch({ type: COMMENT_CREATE_REQUEST, payload: { postingId, text } });
    try {
        const { data } = await Axios.post(`/postings/${postingId}/comments`, {
            text
        }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: COMMENT_CREATE_FAIL, payload: error.message });
    }
}; 

export const editComment = (postingId, commentId, text) => async(dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    dispatch({ type: COMMENT_EDIT_REQUEST, payload: text });
    try {
        const { data } = await Axios.put(`/postings/${postingId}/comments/${commentId}`, {text}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: COMMENT_EDIT_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ type: COMMENT_EDIT_FAIL, payload: error.message });
    }
};

export const deleteComment = (postingId, commentId) => async(dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    dispatch({ type: COMMENT_DELETE_REQUEST, payload: { postingId, commentId } });
    try {
        const { data } = await Axios.delete(`/postings/${postingId}/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: COMMENT_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: COMMENT_DELETE_FAIL, payload: error.message });
    }
};
