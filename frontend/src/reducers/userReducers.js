import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../constants/userConstants";

export const userSignupReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true };
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true };
        case USER_PROFILE_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, user: action.payload };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const userListReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};