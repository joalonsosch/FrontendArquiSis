import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_DOMAIN;

export function useApi() {
  const { getAccessTokenSilently } = useAuth0();

  async function callApi(options) {
    const token = await getAccessTokenSilently();
    console.log('Token:', token);
    const response = await axios({
      baseURL: API_BASE,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });
    return response.data;
  }

  return { callApi };
}


// EJEMPLO DE USO:

// export default function StockList() {
//  const [stocks, setStocks] = useState([]);
//
//  useEffect(() => {
//    callApi({ method: 'get', url: '/stocks' })
//      .then(setStocks)
//      .catch(console.error);
//  }, []);
// return (
//  <ul>
//  {stocks.map(s => (
//    <li key={s.symbol}>
//      {s.symbol} – ${s.price}
//    </li>
//  ))}
//</ul>
//);
//}
