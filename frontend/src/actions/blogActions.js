import axios from "axios"
import { BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS } from "../constants/blogConstants"

import Axios from 'axios';

export const blogGetList = () => async(dispatch) => {
    dispatch({ type: BLOG_LIST_REQUEST });

    try {
        const { data } = await Axios('/blogs');
        dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
    } catch(error) {
        dispatch({ type: BLOG_LIST_FAIL, payload: error.message });
    }
};