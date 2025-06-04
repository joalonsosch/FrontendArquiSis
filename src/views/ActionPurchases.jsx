import { useEffect, useState } from 'react';
import styles from './ActionPurchases.module.css';
import Navbar from '../components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../services/callApi';
import { useNavigate } from 'react-router-dom';
import EstimationStatus from '../components/EstimationStatus';

export default function ActionPurchases() {
  const { callApi } = useApi();
  const [compras, setCompras] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

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

const handlePagar = async (compra) => {
  try {
    console.log('[Paso 2] Iniciando pago con datos:');
    console.log('→ request_id (buyOrder):', compra.request_id);
    console.log('→ sessionId (user.sub):', user.sub);
    console.log('→ amount (totalcost):', compra.totalcost);

    // Paso 2: Crear transacción WebPay
    const { token, url } = await callApi({
      method: 'post',
      url: '/webpay/create',
      data: {
        buyOrder: compra.request_id,
        sessionId: user.sub,
        amount: compra.totalcost,
      }
    });

    console.log('[Paso 2] WebPay transaction creada exitosamente:');
    console.log('→ token:', token);
    console.log('→ url:', url);

    // Paso 3: Redirigir a WebPay Form
    console.log('[Paso 3] Redirigiendo a /webpay/form con:');
    console.log({
      token,
      url,
      request_id: compra.request_id
    });

    navigate('/webpay/form', {
      state: {
        token,
        url,
        request_id: compra.request_id
      }
    });
  } catch (error) {
    console.error('Error al iniciar pago WebPay:', error);
    alert('No se pudo iniciar el pago. Intenta nuevamente.');
  }
};


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
                  <span className={styles[compra.status.toLowerCase()]}> {compra.status} </span>
                </p>

                <EstimationStatus
                  jobId={localStorage.getItem("jobId")}
                  symbol={compra.symbol}
                  onTotalGlobalValue={index === 0 ? handleTotalGlobalValue : undefined}
                />

                {compra.status === 'RESERVED' && (
                  <button onClick={() => handlePagar(compra)} className={styles.button}>Ir a pagar</button>
                )}

                {compra.status === 'ACCEPTED' && (
                  <a href={compra.receipt_url} target="_blank" rel="noopener noreferrer">
                    Ver recibo
                  </a>
                )}

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
