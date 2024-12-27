import { createSlice, current } from '@reduxjs/toolkit';
import { setMessage } from './notificationReducer';
import loginService from '../services/login';
import blogService from '../services/blogs';

const authSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(login(user));

      localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      console.error('Login failed', exception.response.data.error);
      dispatch(setMessage('wrong username or password', false, 5));
    }
  };
};

export default authSlice.reducer;
