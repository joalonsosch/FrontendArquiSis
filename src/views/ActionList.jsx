import { useNavigate } from 'react-router-dom';
import styles from './ActionList.module.css';
import mockStocks from '../data/mockStocks.json';
import Navbar from '../components/Navbar';

export default function ActionList() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Acciones disponibles</h2>
        <div className={styles.grid}>
          {mockStocks.map((stock) => (
            <div key={stock.id} className={styles.card}>
              <h3>{stock.symbol} — {stock.shortName}</h3>
              <p><strong>Precio:</strong> ${stock.price.toLocaleString()}</p>
              <p><strong>Cantidad disponible:</strong> {stock.quantity}</p>
              <button
                className={styles.button}
                onClick={() => navigate(`/actions/${stock.symbol}`)}
              >
                Ver más
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
