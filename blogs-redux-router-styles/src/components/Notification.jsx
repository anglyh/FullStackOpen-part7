import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

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
