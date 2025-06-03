import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function WebpayForm() {
    const location = useLocation();
    const navigate = useNavigate();

    const { token, url, request_id } = location.state || {};

        useEffect(() => {
        if (!token || !url || !request_id) {
            alert('Información de pago no disponible.');
            navigate('/');
        } else {
            // Simula el auto-submit con redirección personalizada
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = url;

            const tokenInput = document.createElement('input');
            tokenInput.type = 'hidden';
            tokenInput.name = 'token_ws';
            tokenInput.value = token;
            form.appendChild(tokenInput);

            document.body.appendChild(form);

            // Guarda el request_id temporalmente para usarlo luego
            sessionStorage.setItem('request_id', request_id);

            form.submit();
        }
        }, []);

    return (
        <div>
        <h2>Redirigiendo a WebPay...</h2>

        <form
            id="webpay-form"
            method="POST"
            action={url}
            style={{ display: 'none' }}
        >
            <input type="hidden" name="token_ws" value={token} />
        </form>
        </div>
    );
}
