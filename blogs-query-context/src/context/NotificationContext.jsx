import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload;
  case 'CLEAR':
    return { message: '', isSuccessful: true };
  default:
    return { ...state, message: '' };
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: '',
    isSuccessful: true,
  });

  const setNotification = (message, isSuccessful, seconds) => {
    notificationDispatch({
      type: 'SET',
      payload: { message, isSuccessful }
    });

    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), seconds * 1000);
  };

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notification = useContext(NotificationContext);
  return notification[0];
};

export const useNotificationDispatch = () => {
  const notification = useContext(NotificationContext);
  return notification[1];
};

export const useSetNotification = () => {
  const notification = useContext(NotificationContext);
  return notification[2];
};

export default NotificationContext;