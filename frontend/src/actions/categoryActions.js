import Axios from 'axios';
import { 
    CATEGORY_ADD_FAIL, 
    CATEGORY_ADD_REQUEST, 
    CATEGORY_ADD_SUCCESS, 
    CATEGORY_DELETE_FAIL, 
    CATEGORY_DELETE_REQUEST, 
    CATEGORY_DELETE_SUCCESS, 
    CATEGORY_GET_FAIL, 
    CATEGORY_GET_REQUEST, 
    CATEGORY_GET_SUCCESS 
} from '../constants/categoryConstants';

export const getCategoryList = () => async(dispatch) => {
    dispatch({ type: CATEGORY_GET_REQUEST });
    try {
        const { data } = await Axios.get('/categories');
        dispatch({ type: CATEGORY_GET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORY_GET_FAIL, payload: error.message });
    }
};

export const addCategory = (name) => async(dispatch) => {
    dispatch({ type: CATEGORY_ADD_REQUEST, payload: name });
    try {
        const { data } = await Axios.post('/categories', 
        { name: name });
        dispatch({ type: CATEGORY_ADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORY_ADD_FAIL, payload: error.message });
    }
};

export const deleteCategory = (categoryId) => async(dispatch) => {
    dispatch({ type: CATEGORY_DELETE_REQUEST });
    try {
        const { data } = await Axios.post(`'/categories/${categoryId}`);
        dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
    }
};