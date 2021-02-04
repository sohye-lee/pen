import { POSTING_CREATE_FAIL, POSTING_CREATE_REQUEST, POSTING_CREATE_RESET, POSTING_CREATE_SUCCESS, POSTING_LIST_FAIL, POSTING_LIST_REQUEST, POSTING_LIST_SUCCESS } from "../constants/postingConstants";

export const postingListReducer = (state = {}, action) => {
    switch(action.type) {
        case POSTING_LIST_REQUEST:
            return { loading: true };
        case POSTING_LIST_SUCCESS:
            return { loading: false, postings: action.payload };
        case POSTING_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const postingCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case POSTING_CREATE_REQUEST:
            return { loading: true };
        case POSTING_CREATE_SUCCESS:
            return { loading: false, success: true, posting: action.payload };
        case POSTING_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case POSTING_CREATE_RESET:
            return {}; 
        default:
            return state;
    }
};