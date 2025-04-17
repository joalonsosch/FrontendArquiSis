import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuarioActivo');
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <button onClick={handleLogout} className={styles.brand}>LegitBusiness</button>
      <div className={styles.navLinks}>
        <button onClick={() => navigate('/home')} className={styles.navButton}>Hub</button>
        <button onClick={() => navigate('/wallet')} className={styles.navButton}>Billetera</button>
        <button onClick={() => navigate('/actions')} className={styles.navButton}>Acciones</button>
        <button onClick={() => navigate('/purchases')} className={styles.navButton}>Historial</button>
        <button onClick={handleLogout} className={styles.navButton}>Cerrar sesión</button>
      </div>
    </nav>
  );
}
