import { 
    BLOG_CREATE_FAIL,
    BLOG_CREATE_REQUEST,
    BLOG_CREATE_RESET,
    BLOG_CREATE_SUCCESS,
    BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS
} from "../constants/blogConstants";

export const blogListReducer = (state = {}, action) => {
    switch(action.type) {
        case BLOG_LIST_REQUEST:
            return { loading: true };
        case BLOG_LIST_SUCCESS:
            return { loading: false, blogs: action.payload };
        case BLOG_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const blogCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case BLOG_CREATE_REQUEST:
            return { loading: true };
        case BLOG_CREATE_SUCCESS:
            return { loading: false, success: true, blog: action.payload };
        case BLOG_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case BLOG_CREATE_RESET:
            return {};
        default:
            return state;
    }
};