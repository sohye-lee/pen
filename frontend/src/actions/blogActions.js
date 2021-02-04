import Axios from "axios"
import { 
    BLOG_CREATE_FAIL, BLOG_CREATE_REQUEST, BLOG_CREATE_SUCCESS, 
    BLOG_DELETE_FAIL, BLOG_DELETE_REQUEST, BLOG_DELETE_SUCCESS, 
    BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS } from "../constants/blogConstants";

export const blogGetList = () => async(dispatch) => {
    dispatch({ type: BLOG_LIST_REQUEST });

    try {
        const { data } = await Axios.get('/blogs');
        dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ type: BLOG_LIST_FAIL, payload: error.message });
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