import { useState, useMemo, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../services/callApi';
import styles from './ActionList.module.css';
import Navbar from '../components/Navbar';

export default function ActionList() {
  const { callApi } = useApi();
  const { isAuthenticated, isLoading } = useAuth0();
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 9;


  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    id: '',
    symbol: '',
    shortName: '',
    longName: '',
    priceCondition: '',
    priceValue: '',
    quantityCondition: '',
    quantityValue: '',
    timestamp: ''
  });

  useEffect(() => {
    async function fetchStocks() {
      try {
        const data = await callApi({ method: 'get', url: '/stocks' });
        setStocks(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (!isLoading && isAuthenticated) {
      fetchStocks();
    }
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset a página 1 al cambiar filtro
  };

  const applyFilters = (stocks) => {
    return stocks.filter((stock) => {
      const matchesId = filters.id === '' || stock.id.toString().includes(filters.id);
      const matchesSymbol = filters.symbol === '' || stock.symbol.toLowerCase().includes(filters.symbol.toLowerCase());
      const matchesShortName = filters.shortName === '' || stock.shortName.toLowerCase().includes(filters.shortName.toLowerCase());
      const matchesLongName = filters.longName === '' || stock.longName.toLowerCase().includes(filters.longName.toLowerCase());
      const matchesTimestamp = filters.timestamp === '' || stock.timestamp.toLowerCase().includes(filters.timestamp.toLowerCase());

      const matchesPrice = filters.priceValue === '' || (
        (filters.priceCondition === 'less' && stock.price < parseFloat(filters.priceValue)) ||
        (filters.priceCondition === 'equal' && stock.price === parseFloat(filters.priceValue)) ||
        (filters.priceCondition === 'greater' && stock.price > parseFloat(filters.priceValue))
      );

      const matchesQuantity = filters.quantityValue === '' || (
        (filters.quantityCondition === 'less' && stock.quantity < parseInt(filters.quantityValue)) ||
        (filters.quantityCondition === 'equal' && stock.quantity === parseInt(filters.quantityValue)) ||
        (filters.quantityCondition === 'greater' && stock.quantity > parseInt(filters.quantityValue))
      );

      return matchesId && matchesSymbol && matchesShortName && matchesLongName && matchesPrice && matchesQuantity && matchesTimestamp;
    });
  };

  const filteredStocks = useMemo(() => {
    return applyFilters(stocks, filters);
  }, [stocks, filters]);


  // const filteredStocks = useMemo(() => applyFilters(mockStocks), [filters]);
  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const paginatedStocks = filteredStocks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Acciones Disponibles</h2>

        <div className={styles.filters}>
          <input name="id" value={filters.id} onChange={handleFilterChange} placeholder="ID" />
          <input name="symbol" value={filters.symbol} onChange={handleFilterChange} placeholder="Symbol" />
          <input name="shortName" value={filters.shortName} onChange={handleFilterChange} placeholder="ShortName" />
          <input name="longName" value={filters.longName} onChange={handleFilterChange} placeholder="LongName" />

          <div className={styles.rangeFilter}>
            <select name="priceCondition" value={filters.priceCondition} onChange={handleFilterChange}>
              <option value="">Precio...</option>
              <option value="less">Menor que</option>
              <option value="equal">Igual a</option>
              <option value="greater">Mayor que</option>
            </select>
            <input type="number" name="priceValue" value={filters.priceValue} onChange={handleFilterChange} placeholder="Precio" />
          </div>

          <div className={styles.rangeFilter}>
            <select name="quantityCondition" value={filters.quantityCondition} onChange={handleFilterChange}>
              <option value="">Cantidad...</option>
              <option value="less">Menor que</option>
              <option value="equal">Igual a</option>
              <option value="greater">Mayor que</option>
            </select>
            <input type="number" name="quantityValue" value={filters.quantityValue} onChange={handleFilterChange} placeholder="Cantidad" />
          </div>

          <input name="timestamp" value={filters.timestamp} onChange={handleFilterChange} placeholder="Timestamp" />
        </div>

        <div className={styles.grid}>
          {paginatedStocks.map((stock) => (
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

        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
