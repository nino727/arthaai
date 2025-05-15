import React, { createContext, useState, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create the context
const NotificationContext = createContext();

// Types of notifications
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

// Provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add a notification
  const addNotification = useCallback((message, type = NOTIFICATION_TYPES.INFO, timeout = 3000) => {
    const id = uuidv4();
    setNotifications(prev => [...prev, { id, message, type, timeout }]);
    return id;
  }, []);

  // Remove a notification
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Helper methods for specific notification types
  const notifySuccess = useCallback((message, timeout) => {
    return addNotification(message, NOTIFICATION_TYPES.SUCCESS, timeout);
  }, [addNotification]);

  const notifyError = useCallback((message, timeout) => {
    return addNotification(message, NOTIFICATION_TYPES.ERROR, timeout);
  }, [addNotification]);

  const notifyInfo = useCallback((message, timeout) => {
    return addNotification(message, NOTIFICATION_TYPES.INFO, timeout);
  }, [addNotification]);

  const notifyWarning = useCallback((message, timeout) => {
    return addNotification(message, NOTIFICATION_TYPES.WARNING, timeout);
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      notifySuccess,
      notifyError,
      notifyInfo,
      notifyWarning
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
