import Axios from "axios"
import { 
    BLOG_CREATE_FAIL, BLOG_CREATE_REQUEST, BLOG_CREATE_SUCCESS, 
    BLOG_DELETE_FAIL, BLOG_DELETE_REQUEST, BLOG_DELETE_SUCCESS, 
    BLOG_DETAILS_FAIL, 
    BLOG_DETAILS_REQUEST, 
    BLOG_DETAILS_SUCCESS, 
    BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS, BLOG_UPDATE_FAIL, BLOG_UPDATE_REQUEST, BLOG_UPDATE_SUCCESS } from "../constants/blogConstants";

export const blogGetList = () => async(dispatch) => {
    dispatch({ type: BLOG_LIST_REQUEST });
    try {
        const { data } = await Axios.get('/blogs');
        dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ type: BLOG_LIST_FAIL, payload: error.message });
    }
};

export const getBlogDetails = (blogId) => async(dispatch) => {
    dispatch({ type: BLOG_DETAILS_REQUEST, payload: blogId });
    try {
        const { data } = await Axios.get(`/blogs/${blogId}`);
        dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BLOG_DETAILS_FAIL, payload: error.message });
    }
};

export const createBlog = (title, category, description, image) => async(dispatch, getState) => {
    const { userLogin: { userInfo }} = getState();
    dispatch({ type: BLOG_CREATE_REQUEST, payload: { 
        author: userInfo._id, title, category, description, image 
    }});
    try {
        const { data } = await Axios.post('/blogs', {
            author: userInfo._id, title, category, description, image
        }, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: BLOG_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BLOG_CREATE_FAIL, payload: error.message });
    }
};

export const updateBlog = (blogId, title, category, description, image) => async(dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    dispatch({ type: BLOG_UPDATE_REQUEST, payload: {
        title, category, description, image
    }});
    try {
        const { data } = await Axios.put(`/blogs/${blogId}`, {
            title, category, description, image
        }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: BLOG_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BLOG_UPDATE_FAIL, paylaod: error.message });
    }
};

export const deleteBlog = (blogId) => async(dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    dispatch({ type: BLOG_DELETE_REQUEST, payload: blogId});
    try {
        const { data } = await Axios.delete(`/blogs/${blogId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: BLOG_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BLOG_DELETE_FAIL, payload: error.message });
    }
};