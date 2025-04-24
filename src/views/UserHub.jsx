import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // ✓ Usar Auth0 en lugar de localStorage
import { useNavigate } from 'react-router-dom';
import styles from './UserHub.module.css';
import Navbar from '../components/Navbar';

export default function UserHub() {
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: '/home' } }); // ✓ Dispara login de Auth0
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return <div>Cargando...</div>; // ✓ Mostrar carga hasta autenticar
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.welcome}>Bienvenido/a</h2>
        <h2 className={styles.username}>
          <span className={styles.userIcon}>👤</span>
          {user.name || user.email} {/* ✓ Mostrar nombre o email de Auth0 */}
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
