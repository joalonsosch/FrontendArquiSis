import styles from './LandingPage.module.css';
import image from '../assets/LandingPageGPT.png';
import { useAuth0 } from '@auth0/auth0-react';

export default function LandingPage() {

  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido a LegitBusiness</h1>
      <img src={image} alt="Fintech gráfico" className={styles.image} />
      <div className={styles.buttonGroup}>
        <button onClick={loginWithRedirect} className={styles.button}>Iniciar sesión</button>
        <button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                screen_hint: 'signup'
              }
            })
          }
          className={styles.button}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}
