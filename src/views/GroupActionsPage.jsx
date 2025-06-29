import { useEffect, useState } from "react";
import { useApi } from "../services/callApi";
import styles from "./GroupActionsPage.module.css";
import Navbar from "../components/Navbar";

export default function GroupActionsPage() {
  const { callApi } = useApi();
  const [groupStocks, setGroupStocks] = useState([]);

  useEffect(() => {
    const fetchGroupStocks = async () => {
      try {
        const result = await callApi({
          method: "get",
          url: "/admin/stocks/auctions", // reutilizamos esto, o puedes hacer uno dedicado
        });
        setGroupStocks(result || []);
      } catch (error) {
        console.error("Error al obtener acciones del grupo:", error);
      }
    };

    fetchGroupStocks();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h2>Acciones del Grupo</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Precio con descuento</th>
            </tr>
          </thead>
          <tbody>
            {groupStocks.map((stock) => (
              <tr key={stock.auction_id || stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.quantity}</td>
                <td>${stock.price}</td>
                <td>${Math.floor(stock.price * 0.9)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
