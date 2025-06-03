import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function WebpayReturn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token_ws = searchParams.get("token_ws");
    if (!token_ws) return;

    fetch(import.meta.env.VITE_BACKEND_DOMAIN + "/transactions/commit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token_ws })
    })
      .then(res => res.json())
      .then(data => {
        // Puedes mostrar feedback según data.status
        navigate("/purchases");
      })
      .catch(err => {
        console.error("Error al confirmar el pago:", err);
        navigate("/error");
      });
  }, [navigate, searchParams]);

  return <div>Validando pago con Webpay...</div>;
}