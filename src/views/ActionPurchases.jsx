import { useEffect, useState } from 'react';
import styles from './ActionPurchases.module.css';
import Navbar from '../components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';

export default function ActionPurchases() {
  const [compras, setCompras] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    const username = user.name || user.email;
    const allPurchases = JSON.parse(localStorage.getItem('compras')) || [];
    setUsuario(username);
    const comprasDelUsuario = allPurchases.filter(p => p.username === username);
    setCompras(comprasDelUsuario);
  }, [isLoading, isAuthenticated, user]);

  if (isLoading) {
    return <div>Cargando historial de compras…</div>;
  }
  if (!isAuthenticated) {
    return <div>No estás autenticado.</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h2>Historial de compras de {usuario}</h2>
        {compras.length === 0 ? (
          <p>No hay compras registradas.</p>
        ) : (
          <ul className={styles.list}>
            {compras.map((compra, index) => (
              <li key={index} className={styles.item}>
                <p><strong>Acción:</strong> {compra.symbol}</p>
                <p><strong>Precio:</strong> ${compra.price.toLocaleString()}</p>
                <p><strong>Cantidad:</strong> {compra.quantity}</p>
                <p>
                  <strong>Estado:</strong>{' '}
                  <span className={styles[compra.status.toLowerCase()]}>
                    {compra.status}
                  </span>
                </p>
                <p><strong>Fecha:</strong> {new Date(compra.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
