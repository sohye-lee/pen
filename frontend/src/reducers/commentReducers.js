import { 
    COMMENT_CREATE_FAIL, 
    COMMENT_CREATE_REQUEST, 
    COMMENT_CREATE_SUCCESS, 
    COMMENT_DELETE_FAIL, 
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_EDIT_FAIL,
    COMMENT_EDIT_REQUEST,
    COMMENT_EDIT_SUCCESS
} from "../constants/commentConstants";

export const commentCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case COMMENT_CREATE_REQUEST:
            return { loading: true };
        case COMMENT_CREATE_SUCCESS:
            return { loading: false, comment: action.payload };
        case COMMENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const commentEditReducer = (state = {}, action) => {
    switch(action.type) {
        case COMMENT_EDIT_REQUEST:
            return { loading: true };
        case COMMENT_EDIT_SUCCESS:
            return { loading: false, success: true };
        case COMMENT_EDIT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const commentDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case COMMENT_DELETE_REQUEST:
            return { loading: true };
        case COMMENT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case COMMENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}