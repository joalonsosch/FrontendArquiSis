import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../services/callApi';
import styles from './ActionDetail.module.css';
import Navbar from '../components/Navbar';

export default function ActionDetail() {
  const [action, setAction] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { callApi } = useApi();
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [quantityToBuy, setQuantityToBuy] = useState(1);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const data = await callApi({
          method: 'get',
          url: `/stocks/${symbol}`
        });
        setAction(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (!isLoading && isAuthenticated) {
      fetchStocks();
    }
  }, []);

  if (!action) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <div className={styles.notFound}>
          <h2>Acción no encontrada</h2>
          <p>No hay información disponible para el símbolo: {symbol}</p>
        </div>
      </div>
    );
  }

  const handleBuy = async () => {
    if (quantityToBuy <= 0) {
      alert('La cantidad a comprar debe ser mayor que cero.');
      return;
    }

    if (quantityToBuy > action.quantity) {
      alert('No puedes comprar más acciones de las disponibles.');
      return;
    }

    try {
      const data = await callApi({
        method: 'post',
        url: `/buy`,
        data: {
          symbol: action.symbol,
          quantity: quantityToBuy,
          userid: user.sub,
          user_name: user.name,
          user_email: user.email
        }
      });

      const { request_id } = data;

      // Esperar a que se confirme la compra
      let buyConfirmed = false;
      for (let i = 0; i < 10; i++) { // intentos durante ~10 segundos
        const buys = await callApi({ method: 'get', url: `/buy/${user.sub}` });

        const match = buys.find(b => b.request_id === request_id);
        if (match?.status === 'ACCEPTED') {
          buyConfirmed = true;
          break;
        }

        await new Promise(res => setTimeout(res, 1000)); // esperar 1 segundo
      }

      if (!buyConfirmed) {
        alert("La compra aún no fue aceptada. Intenta más tarde.");
        return;
      }

      // Lanzar el job de estimación
    const response = await callApi({
      method: 'post',
      url: '/estimations',
      data: { userId: user.sub },
    });

    // Check if the response actually contains a jobId
    if (response && response.jobId) {
      const newJobId = response.jobId;
      const currentStoredJobId = localStorage.getItem("jobId");

      // Only update localStorage if the new jobId is different or if there's no jobId stored yet
      if (currentStoredJobId !== newJobId) {
        localStorage.setItem("jobId", newJobId);
      }
    }

    } catch (error) {
      console.error('Error al comprar la acción:', error);
    }

    navigate('/purchases');
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h2>{action.longName} ({action.symbol})</h2>

        <p><strong>ID:</strong> {action.id}</p>
        <p><strong>Symbol:</strong> {action.symbol}</p>
        <p><strong>Nombre corto:</strong> {action.shortName}</p>
        <p><strong>Nombre largo:</strong> {action.longName}</p>
        <p><strong>Precio actual:</strong> ${action.price}</p>
        <p><strong>Cantidad disponible:</strong> {action.quantity}</p>
        <p><strong>Última actualización:</strong> {new Date(action.timestamp).toLocaleString()}</p>

        <div className={styles.buySection}>
          <input
            type="number"
            min="1"
            max={action.quantity}
            value={quantityToBuy}
            onChange={(e) => setQuantityToBuy(Number(e.target.value))}
            className={styles.input}
          />
          <button onClick={handleBuy} className={styles.button}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
