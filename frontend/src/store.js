import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { 
  blogCreateReducer, 
  blogDeleteReducer, 
  blogDetailsReducer, 
  blogListReducer 
} from './reducers/blogReducers';
import { 
  followAddReducer,
  followListReducer 
} from './reducers/followReducers';
import { 
  postingCreateReducer, 
  postingDeleteReducer, 
  postingListReducer 
} from './reducers/postingReducers';
import { 
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
    blogList: blogListReducer,
    blogDetails: blogDetailsReducer,
    blogCreate: blogCreateReducer,
    blogDelete: blogDeleteReducer,
    postingList: postingListReducer,
    postingCreate: postingCreateReducer,
    postingDelete: postingDeleteReducer,
    followList: followListReducer,
    followAdd: followAddReducer,
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;