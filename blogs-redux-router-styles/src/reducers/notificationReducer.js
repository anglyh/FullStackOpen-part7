import { createSlice, current } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    isSuccessful: true,
  },
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },

    clearNotification(state, action) {
      return { ...state, message: '' };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setMessage = (message, isSuccessful, seconds) => {
  return (dispatch) => {
    dispatch(setNotification({ message, isSuccessful }));

    setTimeout(() => dispatch(clearNotification()), seconds * 1000);
  };
};

export default notificationSlice.reducer;
