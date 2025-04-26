import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Wallet.module.css';
import Navbar from '../components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';

export default function Wallet() {
  const [usuario, setUsuario] = useState(null);
  const [saldo, setSaldo] = useState(0);
  const [monto, setMonto] = useState('');
  
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: '/wallet' } });
      return;
    }

    const username = user.name || user.email;
    setUsuario(username);
    const saldoGuardado = localStorage.getItem(`saldo_${username}`);
    setSaldo(saldoGuardado ? parseFloat(saldoGuardado) : 0);
  }, [isLoading, isAuthenticated, user, loginWithRedirect]);

  const agregarFondos = () => {
    if (!monto || isNaN(monto) || parseFloat(monto) <= 0) {
      alert('Ingresa un monto válido.');
      return;
    }

    const nuevoSaldo = saldo + parseFloat(monto);
    setSaldo(nuevoSaldo);
    localStorage.setItem(`saldo_${usuario}`, nuevoSaldo.toString());
    setMonto('');
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
        <h2>Billetera de {usuario}</h2>
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
