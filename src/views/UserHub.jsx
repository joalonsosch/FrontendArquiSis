import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserHub.module.css';
import Navbar from '../components/Navbar';

export default function UserHub() {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (usuario && usuario.username) {
      setNombre(usuario.username);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.welcome}>Bienvenido/a</h2>
        <h2 className={styles.username}><span className={styles.userIcon}>👤</span>{nombre}</h2>
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
