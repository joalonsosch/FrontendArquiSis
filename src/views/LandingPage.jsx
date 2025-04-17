import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import image from '../assets/LandingPageGPT.png';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido a LegitBusiness</h1>
      <img src={image} alt="Fintech gráfico" className={styles.image} />
      <div className={styles.buttonGroup}>
        <Link to="/login" className={styles.button}>Iniciar sesión</Link>
        <Link to="/register" className={styles.button}>Registrarse</Link>
      </div>
    </div>
  );
}
