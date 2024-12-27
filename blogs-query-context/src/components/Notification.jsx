import React from 'react';
import { useNotificationValue } from '../context/NotificationContext';

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification.message) {
    return null;
  }

  return (
    <div className={`box ${notification.isSuccessful ? 'success' : 'error'}`}>
      {notification.message}
    </div>
  );
};

export default Notification;