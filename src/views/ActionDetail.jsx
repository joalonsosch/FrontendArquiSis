import { useParams, useNavigate } from 'react-router-dom';
import styles from './ActionDetail.module.css';
import mockStocks from '../data/mockStocks.json';

export default function ActionDetail() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const action = mockStocks.find(stock => stock.symbol === symbol);

  if (!action) {
    return (
      <div className={styles.notFound}>
        <h2>Acción no encontrada</h2>
        <p>No hay información disponible para el símbolo: {symbol}</p>
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

    // Cargar compras existentes o iniciar nueva lista
    const comprasPrevias = JSON.parse(localStorage.getItem('compras')) || [];

    const nuevaCompra = {
      username: usuario.username,
      symbol: action.symbol,
      price: action.price,
      quantity: 1,
      status: "ACEPTADA", // o "EN PROCESO", puedes alternar aleatorio si quieres
      timestamp: new Date().toISOString()
    };

    const nuevasCompras = [...comprasPrevias, nuevaCompra];
    localStorage.setItem('compras', JSON.stringify(nuevasCompras));

    navigate('/purchases');
  };

  return (
    <div className={styles.container}>
      <h2>{action.longName} ({action.symbol})</h2>
      <p><strong>Precio actual:</strong> ${action.price.toLocaleString()}</p>
      <p><strong>Cantidad disponible:</strong> {action.quantity}</p>
      <p><strong>Última actualización:</strong> {new Date(action.timestamp).toLocaleString()}</p>

      <button onClick={handleBuy} className={styles.button}>
        Comprar
      </button>
    </div>
  );
}
