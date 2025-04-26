import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './ActionDetail.module.css';
import mockStocks from '../data/mockStocks.json';
import Navbar from '../components/Navbar';

export default function ActionDetail() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const action = mockStocks.find(stock => stock.symbol === symbol);

  const [quantityToBuy, setQuantityToBuy] = useState(1);

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

  const handleBuy = () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));

    if (!usuario) {
      alert('Debes iniciar sesión para comprar.');
      navigate('/login');
      return;
    }

    if (quantityToBuy <= 0) {
      alert('La cantidad a comprar debe ser mayor que cero.');
      return;
    }

    if (quantityToBuy > action.quantity) {
      alert('No puedes comprar más acciones de las disponibles.');
      return;
    }

    const comprasPrevias = JSON.parse(localStorage.getItem('compras')) || [];

    const nuevaCompra = {
      username: usuario.username,
      symbol: action.symbol,
      price: action.price,
      quantity: quantityToBuy,
      status: "ACEPTADA",
      timestamp: new Date().toISOString()
    };

    const nuevasCompras = [...comprasPrevias, nuevaCompra];
    localStorage.setItem('compras', JSON.stringify(nuevasCompras));

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
        <p><strong>Precio actual:</strong> ${action.price.toLocaleString()}</p>
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
