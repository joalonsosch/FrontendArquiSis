import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './Navbar.module.css';
import { JobMasterStatus } from "./JobMasterStatus";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const handleLogout = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });

  return (
    <nav className={styles.navbar}>
      <button onClick={handleLogout} className={styles.brand}>
        LegitBusiness
      </button>
      <div className={styles.navLinks}>
        <button onClick={() => navigate('/home')} className={styles.navButton}>
          Hub
        </button>
        <button onClick={() => navigate('/wallet')} className={styles.navButton}>
          Billetera
        </button>
        <button onClick={() => navigate('/actions')} className={styles.navButton}>
          Acciones
        </button>
        <button onClick={() => navigate('/purchases')} className={styles.navButton}>
          Historial
        </button>
        <button onClick={handleLogout} className={styles.navButton}>
          Cerrar sesión
        </button>
        <JobMasterStatus />
      </div>
    </nav>
  );
}
