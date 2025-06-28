import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../services/callApi';
import { useNavigate } from 'react-router-dom';
import styles from './AdminBuyPage.module.css';
import Navbar from '../components/Navbar';

export default function AdminBuyPage() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const { callApi } = useApi();
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const token = await getAccessTokenSilently();
        const payload = JSON.parse(atob(token.split('.')[1]));
        const roles = payload['https://api.arquisis.com/roles'] || [];
        setIsAdmin(roles.includes('admin'));
      } catch (err) {
        console.error('Error verificando roles:', err);
      }
    };

    if (isAuthenticated) {
      checkRole();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: '/admin-buy' } });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  const handleBuy = async () => {
    setFeedback('');
    try {
      const response = await callApi({
        method: 'post',
        url: '/admin/stocks/buy',
        data: { symbol, quantity: parseInt(quantity) },
      });
      setFeedback(`✅ Compra realizada. ID de solicitud: ${response.request_id}`);
    } catch (error) {
      console.error(error);
      setFeedback('❌ Error al enviar la solicitud. Verifica los datos.');
    }
  };

  if (isLoading || !isAuthenticated) {
    return <div>Cargando...</div>;
  }

  if (!isAdmin) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <div className={styles.container}>
          <h2 className={styles.welcome}>⚠️ Acceso denegado</h2>
          <p>Solo los administradores pueden acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.welcome}>Compra de Acciones para el Grupo</h2>

        <label className={styles.question}>Símbolo:</label>
        <input
          className={styles.input}
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Ej: TSLA"
        />

        <label className={styles.question}>Cantidad:</label>
        <input
          className={styles.input}
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button onClick={handleBuy} className={styles.button}>
          Comprar al Broker
        </button>

        {feedback && <p className={styles.question}>{feedback}</p>}

        <button onClick={() => navigate('/home')} className={styles.button}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
