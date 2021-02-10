import { FOLLOW_ADD_FAIL, FOLLOW_ADD_REQUEST, FOLLOW_ADD_RESET, FOLLOW_ADD_SUCCESS, FOLLOW_DELETE_FAIL, FOLLOW_DELETE_REQUEST, FOLLOW_DELETE_SUCCESS, FOLLOW_LIST_FAIL, FOLLOW_LIST_FOR_BLOG_FAIL, FOLLOW_LIST_FOR_BLOG_REQUEST, FOLLOW_LIST_FOR_BLOG_SUCCESS, FOLLOW_LIST_REQUEST, FOLLOW_LIST_SUCCESS 
} from "../constants/followConstants";

export const followListReducer = (state = {}, action) => {
    switch(action.type) {
        case FOLLOW_LIST_REQUEST:
            return { loading: true };
        case FOLLOW_LIST_SUCCESS:
            return { loading: false, follows: action.payload };
        case FOLLOW_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const followAddReducer = (state = {}, action) => {
    switch(action.type) {
        case FOLLOW_ADD_REQUEST:
            return { loading: true };
        case FOLLOW_ADD_SUCCESS:
            return { loading: false, success: true };
        case FOLLOW_ADD_FAIL:
            return { loading: false, error: action.payload };
        case FOLLOW_ADD_RESET:
            return {};
        default:
            return state;
    }
};

export const followDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case FOLLOW_DELETE_REQUEST:
            return { loading: true };
        case FOLLOW_DELETE_SUCCESS:
            return { loading: false, success: true };
        case FOLLOW_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

