import { useEffect, useState } from 'react';
import styles from './ActionPurchases.module.css';
import Navbar from '../components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../services/callApi';
import EstimationStatus from '../components/EstimationStatus';

export default function ActionPurchases() {
  const { callApi } = useApi();
  const [compras, setCompras] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [totalGlobalValue, setTotalGlobalValue] = useState(null);


  const handleTotalGlobalValue = (value) => {
    setTotalGlobalValue(value);
  };


  useEffect(() => {
    async function fetchBuys() {
      try {
        const data = await callApi({
          method: 'get',
          url: `/buy/${user.sub}`,
        });
        setCompras(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (!isLoading && isAuthenticated) {
      fetchBuys();
    }
  }, []);

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

        {totalGlobalValue !== null && (
          <h4><strong>Ganancia total estimada:</strong> ${totalGlobalValue.toFixed(2)}</h4>
        )}

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
                <EstimationStatus
                  jobId={localStorage.getItem("jobId")}
                  symbol={compra.symbol}
                  onTotalGlobalValue={index === 0 ? handleTotalGlobalValue : undefined}
                />
                <a href={compra.receipt_url} target="_blank" rel="noopener noreferrer">
                  Ver recibo
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
