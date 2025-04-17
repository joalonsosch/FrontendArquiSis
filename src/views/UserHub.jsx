import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserHub.module.css';

export default function UserHub() {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (usuario && usuario.username) {
      setNombre(usuario.username);
    } else {
      // Si no hay sesión activa, redirigir a login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h2>Hola {nombre}! ¿Qué movimiento/s quieres hacer hoy?</h2>
      <div className={styles.buttonGroup}>
        <button onClick={() => navigate('/actions')} className={styles.button}>
          Ver lista de acciones
        </button>
        <button onClick={() => navigate('/actions/TSLA')} className={styles.button}>
          Ver detalle de acción
        </button>
        <button onClick={() => navigate('/purchases')} className={styles.button}>
          Ver historial de compras
        </button>
        <button onClick={() => navigate('/wallet')} className={styles.button}>
          Ir a mi billetera
        </button>
      </div>
    </div>
  );
}
