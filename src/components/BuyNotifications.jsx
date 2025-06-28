import { useState, useEffect } from 'react';
import styles from './BuyNotifications.module.css';

const BuyNotifications = ({ buyUpdates, onDismiss }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    if (buyUpdates && buyUpdates.length > 0) {
      const latestUpdate = buyUpdates[buyUpdates.length - 1];
      
      // Add timestamp to make each notification unique
      const notification = {
        ...latestUpdate,
        id: `${latestUpdate.request_id}-${Date.now()}`,
        timestamp: latestUpdate.timestamp || new Date().toISOString()
      };

      setVisibleNotifications(prev => [...prev, notification]);

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setVisibleNotifications(prev => 
          prev.filter(notif => notif.id !== notification.id)
        );
      }, 5000);
    }
  }, [buyUpdates]);

  const dismissNotification = (id) => {
    setVisibleNotifications(prev => prev.filter(notif => notif.id !== id));
    if (onDismiss) onDismiss(id);
  };

  const getNotificationIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return '⏳';
      case 'RESERVED':
        return '✅';
      case 'ACCEPTED':
        return '🎉';
      case 'REJECTED':
        return '❌';
      case 'PAYMENT_VALIDATED':
        return '💰';
      default:
        return '📋';
    }
  };

  const getNotificationClass = (status) => {
    switch (status) {
      case 'PENDING':
        return styles.pending;
      case 'RESERVED':
        return styles.reserved;
      case 'ACCEPTED':
        return styles.accepted;
      case 'REJECTED':
        return styles.rejected;
      case 'PAYMENT_VALIDATED':
        return styles.validated;
      default:
        return styles.default;
    }
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className={styles.notificationContainer}>
      {visibleNotifications.map((notification) => (
        <div 
          key={notification.id}
          className={`${styles.notification} ${getNotificationClass(notification.status)}`}
        >
          <div className={styles.notificationContent}>
            <span className={styles.icon}>
              {getNotificationIcon(notification.status)}
            </span>
            <div className={styles.details}>
              <div className={styles.title}>
                {notification.type === 'new' ? 'Nueva compra' : 'Actualización de compra'}
              </div>
              <div className={styles.message}>
                <strong>{notification.symbol}</strong> - {notification.status}
                {notification.message && (
                  <div className={styles.submessage}>{notification.message}</div>
                )}
              </div>
              {notification.amount && (
                <div className={styles.amount}>
                  Cantidad: {notification.amount}
                </div>
              )}
            </div>
          </div>
          <button 
            className={styles.dismissButton}
            onClick={() => dismissNotification(notification.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default BuyNotifications;
