import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApi } from '../services/callApi';
import Navbar from '../components/Navbar';

export default function PaymentResponse() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('pending'); // pending, success, fail
    const navigate = useNavigate();
    const { callApi } = useApi();

    useEffect(() => {
        let alreadyConfirmed = false;

        const token = searchParams.get('token_ws');
        const request_id = sessionStorage.getItem('request_id');

        console.log('[FRONT] token_ws recibido:', token);
        console.log('[FRONT] request_id recuperado:', request_id);

        if (!token || !request_id) {
            console.warn('[FRONT] Faltan datos para confirmar transacción.');
            setStatus('fail');
            return;
        }

        const confirmTransaction = async () => {
            if (alreadyConfirmed) return;
            alreadyConfirmed = true;

            try {
                console.log('[FRONT] Enviando confirmación a backend...');
                const response = await callApi({
                    method: 'post',
                    url: '/webpay/commitTransaction',
                    data: { token_ws: token, request_id }
                });

                console.log('[FRONT] Respuesta del backend:', response);

                if (response.response_code === 0) {
                    setStatus('success');
                    sessionStorage.removeItem('request_id');
                    setTimeout(() => {
                        navigate('/purchases');
                    }, 3000);
                } else {
                    console.warn('[FRONT] Transacción fallida (response_code !== 0).');
                    setStatus('fail');
                }
            } catch (error) {
                console.error('[FRONT] Error al confirmar transacción:', error);
                setStatus('fail');
            }
        };
        console.log('[FRONT] ------------------------------------------------------');
        confirmTransaction();
    }, []);


    return (
        <div>
            <Navbar />
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                {status === 'pending' && <p>Confirmando transacción con WebPay...</p>}
                {status === 'success' && (
                    <>
                        <h2>¡Pago exitoso!</h2>
                        <p>Redirigiendo a tus compras...</p>
                    </>
                )}
                {status === 'fail' && (
                    <>
                        <h2>Error en el pago</h2>
                        <p>La transacción fue rechazada o cancelada.</p>
                        <button onClick={() => navigate('/purchases')}>Volver al inicio</button>
                    </>
                )}
            </div>
        </div>
    );
}
