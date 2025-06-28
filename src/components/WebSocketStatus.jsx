import styles from './WebSocketStatus.module.css';

const WebSocketStatus = ({ isConnected, retryCount }) => {
  if (isConnected) {
    return (
      <div className={`${styles.status} ${styles.connected}`}>
        <span className={styles.indicator}></span>
        Conectado en tiempo real
      </div>
    );
  }

  return (
    <div className={`${styles.status} ${styles.disconnected}`}>
      <span className={styles.indicator}></span>
      {retryCount > 0 ? (
        <span>Reintentando conexión... ({retryCount}/5)</span>
      ) : (
        <span>Desconectado</span>
      )}
    </div>
  );
};

export default WebSocketStatus;
