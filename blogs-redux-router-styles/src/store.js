import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer,
    auth: authReducer,
    notification: notificationReducer
  },
});

export default store;
