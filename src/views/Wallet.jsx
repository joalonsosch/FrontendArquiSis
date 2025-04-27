import { useEffect, useState, useCallback } from 'react';
import styles from './Wallet.module.css';
import Navbar from '../components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../services/callApi';

export default function Wallet() {
  const { callApi } = useApi();
  const [saldo, setSaldo] = useState(0);
  const [monto, setMonto] = useState('');

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  const handleBalanceWallet = useCallback(async () => {
    try {
      console.log('Getting wallet for user:', user.sub);
      const balance = await callApi({
        method: 'get',
        url: `/wallet/${user.sub}`,
      });

      setSaldo(balance ? parseFloat(balance) : 0);

    } catch (error) {
      console.error(error);
    }
  }, [callApi, user?.sub]);

  useEffect(() => {
    console.log('isLoading:', isLoading);
    if (!isLoading && isAuthenticated && user) {
      handleBalanceWallet();
    }
  }, [isLoading, isAuthenticated, user, handleBalanceWallet]);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: '/wallet' } });
      return;
    }

  }, [isLoading, isAuthenticated, user, loginWithRedirect]);

  const agregarFondos = async () => {
    try {
      if (!monto || isNaN(monto) || parseFloat(monto) <= 0) {
        alert('Ingresa un monto válido.');
        return;
      }

      console.log('Adding funds to wallet for user:', user.sub, "amount:", monto);
      await callApi({
        method: 'patch',
        url: `/wallet/${user.sub}?amount=${monto}`
      });

      await handleBalanceWallet();
      setMonto('');
      
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className={styles.container}><p>Cargando billetera…</p></div>;
  }
  if (!isAuthenticated) {
    return <div className={styles.container}><p>Debes iniciar sesión.</p></div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h2>Billetera de {user.name}</h2>
        <p><strong>Saldo actual:</strong> ${saldo.toLocaleString()}</p>

        <div className={styles.form}>
          <input
            type="number"
            placeholder="Monto a agregar"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className={styles.input}
          />
          <button onClick={agregarFondos} className={styles.button}>
            Agregar fondos
          </button>
        </div>
      </div>
    </div>
  );
}
