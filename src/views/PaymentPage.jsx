import { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentPage({ buyOrder, sessionId, amount }) {
    const [formData, setFormData] = useState(null);

    const handleCreateTransaction = async () => {
        try {
        const response = await axios.post(import.meta.env.VITE_BACKEND_DOMAIN + '/webpay/create', {
            buyOrder,
            sessionId,
            amount
        });

        setFormData(response.data);
        } catch (error) {
        console.error('Error creando transacción:', error);
        }
    };

    useEffect(() => {
        handleCreateTransaction();
    }, []);

    if (!formData) return <p>Creando transacción...</p>;

    return (
        <form method="POST" action={formData.url}>
        <input type="hidden" name="token_ws" value={formData.token} />
        <button type="submit">Ir a pagar</button>
        </form>
    );
}

export default PaymentPage;
