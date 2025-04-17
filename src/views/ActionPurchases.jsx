import { useEffect, useState } from 'react';
import styles from './ActionPurchases.module.css';
import Navbar from '../components/Navbar';

export default function ActionPurchases() {
  const [compras, setCompras] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioActivo'));
    const allPurchases = JSON.parse(localStorage.getItem('compras')) || [];

    if (user) {
      setUsuario(user.username);
      const comprasDelUsuario = allPurchases.filter(p => p.username === user.username);
      setCompras(comprasDelUsuario);
    }
  }, []);

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
                <p><strong>Estado:</strong> <span className={styles[compra.status.toLowerCase()]}>{compra.status}</span></p>
                <p><strong>Fecha:</strong> {new Date(compra.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
