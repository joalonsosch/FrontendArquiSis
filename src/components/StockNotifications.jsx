import { useEffect, useState } from 'react';
import styles from './StockNotifications.module.css';

export default function StockNotifications({ stockUpdates, onDismiss }) {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    if (stockUpdates.length > 0) {
      const latestUpdate = stockUpdates[stockUpdates.length - 1];
      
      setVisibleNotifications(prev => [...prev, {
        ...latestUpdate,
        id: Date.now() + Math.random(),
        show: true
      }]);

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setVisibleNotifications(prev => 
          prev.map(notif => 
            notif.timestamp === latestUpdate.timestamp 
              ? { ...notif, show: false }
              : notif
          )
        );
      }, 5000);

      // Remove from DOM after animation
      setTimeout(() => {
        setVisibleNotifications(prev => 
          prev.filter(notif => notif.timestamp !== latestUpdate.timestamp)
        );
      }, 5500);
    }
  }, [stockUpdates]);

  const handleDismiss = (notificationId) => {
    setVisibleNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, show: false }
          : notif
      )
    );

    setTimeout(() => {
      setVisibleNotifications(prev => 
        prev.filter(notif => notif.id !== notificationId)
      );
    }, 500);
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className={styles.notificationsContainer}>
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`${styles.notification} ${styles[notification.type]} ${
            notification.show ? styles.show : styles.hide
          }`}
        >
          <div className={styles.content}>
            <div className={styles.title}>
              📈 {notification.symbol}
            </div>
            <div className={styles.message}>
              {notification.message}
            </div>
            {notification.quantity && (
              <div className={styles.details}>
                Cantidad disponible: {notification.quantity}
              </div>
            )}
          </div>
          <button
            className={styles.dismissButton}
            onClick={() => handleDismiss(notification.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}