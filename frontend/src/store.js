import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { 
  blogCreateReducer, 
  blogDeleteReducer, 
  blogDetailsReducer, 
  blogListReducer, 
  blogUpdateReducer
} from './reducers/blogReducers';
import { 
  categoryAddReducer, 
  categoryDeleteReducer, 
  categoryEditReducer, 
  categoryListReducer 
} from './reducers/categoryReducers';
import { 
  commentCreateReducer, 
  commentDeleteReducer, 
  commentEditReducer 
} from './reducers/commentReducers';
import { 
  followAddReducer,
  followDeleteReducer,
  followListReducer 
} from './reducers/followReducers';
import { 
  postingCreateReducer, 
  postingDeleteReducer, 
  postingDetailsReducer, 
  postingLikeReducer, 
  postingListReducer, 
  postingUpdateReducer
} from './reducers/postingReducers';
import { 
  userListReducer,
  userLoginReducer, 
  userProfileReducer, 
  userSignupReducer,
  userUpdateReducer 
} from './reducers/userReducers';


const initialState = {
  userLogin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      :null
  }
};

const reducer = combineReducers({
    userSignup: userSignupReducer,
    userLogin: userLoginReducer,
    userProfile: userProfileReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    blogList: blogListReducer,
    blogDetails: blogDetailsReducer,
    blogCreate: blogCreateReducer,
    blogUpdate: blogUpdateReducer,
    blogDelete: blogDeleteReducer,
    followList: followListReducer,
    followAdd: followAddReducer,
    followDelete: followDeleteReducer,
    postingList: postingListReducer,
    postingDetails: postingDetailsReducer,
    postingCreate: postingCreateReducer,
    postingUpdate: postingUpdateReducer,
    postingDelete: postingDeleteReducer,
    postingLike: postingLikeReducer,
    commentCreate: commentCreateReducer,
    commentEdit: commentEditReducer,
    commentDelete: commentDeleteReducer,
    categoryList: categoryListReducer,
    categoryAdd: categoryAddReducer,
    categoryDelete: categoryDeleteReducer,
    categoryEdit: categoryEditReducer,
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;