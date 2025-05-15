import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications, NOTIFICATION_TYPES } from '../contexts/NotificationContext';

// Map notification types to appropriate styling
const getNotificationStyles = (type) => {
  switch (type) {
    case NOTIFICATION_TYPES.SUCCESS:
      return 'bg-green-500';
    case NOTIFICATION_TYPES.ERROR:
      return 'bg-red-500';
    case NOTIFICATION_TYPES.WARNING:
      return 'bg-yellow-500';
    case NOTIFICATION_TYPES.INFO:
    default:
      return 'bg-orange-500';
  }
};

// Individual notification item
const NotificationItem = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => onClose(notification.id), notification.timeout);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  return (
    <motion.div
      layout
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className={`${getNotificationStyles(notification.type)} text-white px-6 py-3 rounded-lg shadow-lg mb-3 flex items-center justify-between z-50`}
    >
      <div className="flex items-center">
        {notification.type === NOTIFICATION_TYPES.SUCCESS && <span className="mr-2">✅</span>}
        {notification.type === NOTIFICATION_TYPES.ERROR && <span className="mr-2">❌</span>}
        {notification.type === NOTIFICATION_TYPES.WARNING && <span className="mr-2">⚠️</span>}
        {notification.type === NOTIFICATION_TYPES.INFO && <span className="mr-2">ℹ️</span>}
        {notification.message}
      </div>
      <button
        onClick={() => onClose(notification.id)}
        className="ml-4 text-white opacity-70 hover:opacity-100 transition-opacity"
      >
        ×
      </button>
    </motion.div>
  );
};

// NotificationContainer to manage all notifications
const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed bottom-6 right-6 z-50 w-72">
      <AnimatePresence>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
