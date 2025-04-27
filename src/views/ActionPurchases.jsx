import { useEffect, useState } from 'react';
import styles from './ActionPurchases.module.css';
import Navbar from '../components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../services/callApi';

export default function ActionPurchases() {
  const { callApi } = useApi();
  const [compras, setCompras] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    async function fetchBuys() {
      try {
        const data = await callApi({
          method: 'get',
          url: `/buy/${user.sub}`,
        });
        setCompras(data);
        console.log('Buys data:', data);
      } catch (error) {
        console.error(error);
      }
    }

    if (!isLoading && isAuthenticated) {
      fetchBuys();
    }
  }, [isLoading, isAuthenticated, callApi, user]);

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
        <h2>Historial de compras de {user.name}</h2>
        {compras.length === 0 ? (
          <p>No hay compras registradas.</p>
        ) : (
          <ul className={styles.list}>
            {compras.map((compra, index) => (
              <li key={index} className={styles.item}>
                <p><strong>Acción:</strong> {compra.symbol}</p>
                <p><strong>Precio:</strong> ${compra.price.toLocaleString()}</p>
                <p><strong>Cantidad:</strong> {compra.amount}</p>
                <p>
                  <strong>Estado:</strong>{' '}
                  <span className={styles[compra.status.toLowerCase()]}>
                    {compra.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
