import { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

export default function useWebSocket(userId) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [buyUpdates, setBuyUpdates] = useState([]);
  const [stockUpdates, setStockUpdates] = useState([]);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const connectSocket = () => {
      try {
        const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:3001', {
          transports: ['websocket'],
          upgrade: true,
          rememberUpgrade: true,
        });

        newSocket.on('connect', () => {
          console.log('✅ WebSocket conectado');
          setIsConnected(true);
          setRetryCount(0);
          
          newSocket.emit('join_user_room', userId);
        });

        newSocket.on('buy_update', (data) => {
          console.log('📦 Buy update recibido:', data);
          setBuyUpdates(prev => [...prev, { ...data, timestamp: Date.now() }]);
        });

        newSocket.on('new_buy', (data) => {
          console.log('🆕 Nueva compra recibida:', data);
          setBuyUpdates(prev => [...prev, { ...data, type: 'new', timestamp: Date.now() }]);
        });

        // Nuevo listener para actualizaciones de stock
        newSocket.on('stock_update', (data) => {
          console.log('📈 Stock update recibido:', data);
          setStockUpdates(prev => [...prev, { ...data, timestamp: Date.now() }]);
        });

        newSocket.on('disconnect', () => {
          console.log('❌ WebSocket desconectado');
          setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
          console.error('❌ Error de conexión WebSocket:', error);
          setIsConnected(false);
          setRetryCount(prev => prev + 1);
        });

        setSocket(newSocket);

      } catch (error) {
        console.error('❌ Error creando socket:', error);
        setRetryCount(prev => prev + 1);
      }
    };

    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userId, retryCount]);

  const clearBuyUpdates = useCallback(() => {
    setBuyUpdates([]);
  }, []);

  const clearStockUpdates = useCallback(() => {
    setStockUpdates([]);
  }, []);

  const getLatestBuyUpdate = useCallback((requestId) => {
    return buyUpdates
      .filter(update => update.request_id === requestId)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
  }, [buyUpdates]);

  const getLatestStockUpdate = useCallback((symbol) => {
    return stockUpdates
      .filter(update => update.symbol === symbol)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
  }, [stockUpdates]);

  return {
    isConnected,
    buyUpdates,
    stockUpdates,
    clearUpdates: clearBuyUpdates,
    clearStockUpdates,
    getLatestUpdate: getLatestBuyUpdate,
    getLatestStockUpdate,
    retryCount
  };
}
