import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido a PPE Stock Market</h1>
      <div className={styles.buttonGroup}>
        <Link to="/login" className={styles.button}>Iniciar sesión</Link>
        <Link to="/register" className={styles.button}>Registrarse</Link>
      </div>
    </div>
  );
}
