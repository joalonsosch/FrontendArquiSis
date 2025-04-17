import { useEffect, useState } from 'react';
import styles from './Wallet.module.css';

export default function Wallet() {
  const [usuario, setUsuario] = useState(null);
  const [saldo, setSaldo] = useState(0);
  const [monto, setMonto] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (!user) return;

    setUsuario(user.username);

    const saldoGuardado = localStorage.getItem(`saldo_${user.username}`);
    setSaldo(saldoGuardado ? parseFloat(saldoGuardado) : 0);
  }, []);

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

  if (!usuario) {
    return <div className={styles.container}><p>Debes iniciar sesión.</p></div>;
  }

  return (
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
  );
}
