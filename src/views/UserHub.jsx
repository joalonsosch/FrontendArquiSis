import { useEffect, useCallback, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../services/callApi';
import styles from './UserHub.module.css';
import Navbar from '../components/Navbar';

export default function UserHub() {
  const { callApi } = useApi();
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    getAccessTokenSilently
  } = useAuth0();
  const walletCreated = useRef(false);
  const navigate = useNavigate();

  const handleWallet = useCallback(async () => {
    if (walletCreated.current) {
      console.log('🔁 Wallet ya fue creada o intento previo.');
      return;
    }

    walletCreated.current = true;

    if (!user?.sub) {
      console.warn('🚨 No se encontró user.sub. No se puede crear wallet.');
      return;
    }

    try {
      console.log('🪪 Usuario autenticado. Creando wallet para:', user.sub);

      const response = await callApi({
        method: 'post',
        url: '/wallet',
        data: {
          userid: user.sub,
          balance: 0
        }
      });

      console.log('✅ Wallet creada:', response);
    } catch (error) {
      console.error('❌ Error al crear la wallet:', error);
    }
  }, [callApi, user?.sub]);

  useEffect(() => {
    console.log('📌 useEffect 1 - Estado de Auth:', { isLoading, isAuthenticated, user });

    if (!isLoading && isAuthenticated && user) {
      handleWallet();
    }
  }, [isLoading, isAuthenticated, user, handleWallet]);

  useEffect(() => {
    console.log('📌 useEffect 2 - Verificando si redirigir al login');
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: '/home' } });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    const inspectToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        const payload = JSON.parse(atob(token.split('.')[1]));
        const roles = payload['https://arquisis-back.com/roles'];
        console.log('🎭 Roles del usuario:', roles);
      } catch (error) {
        console.error('❌ Error obteniendo token o roles:', error);
      }
    };

    if (!isLoading && isAuthenticated) {
      inspectToken();
    }
  }, [isLoading, isAuthenticated, getAccessTokenSilently]);

  if (isLoading || !isAuthenticated) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.welcome}>Bienvenido/a</h2>
        <h2 className={styles.username}>
          <span className={styles.userIcon}>👤</span>
          {user.name || user.email}
        </h2>
        <p className={styles.question}>¿Qué movimiento/s quieres hacer hoy?</p>

        <div className={styles.buttonGroup}>
          <button onClick={() => navigate('/wallet')} className={styles.button}>
            Ver billetera
          </button>
          <button onClick={() => navigate('/actions')} className={styles.button}>
            Ver lista de acciones
          </button>
          <button onClick={() => navigate('/purchases')} className={styles.button}>
            Ver historial de compras
          </button>
        </div>
      </div>
    </div>
  );
}