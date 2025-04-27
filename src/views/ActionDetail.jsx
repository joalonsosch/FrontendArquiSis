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
        console.log('Action data:', data);
      } catch (error) {
        console.error(error);
      }
    }

    if (!isLoading && isAuthenticated) {
      fetchStocks();
    }
  }, [isLoading, isAuthenticated, callApi, symbol]);

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
          userid: user.sub
        }
      });
      console.log('Action data:', data);

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
