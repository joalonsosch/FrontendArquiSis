import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function WebpayForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { token, url, request_id } = location.state || {};

  useEffect(() => {
    if (!token || !url || !request_id) {
      alert("Información de pago no disponible.");
      navigate("/");
    } else {
      // Limpiar cualquier estado de procesamiento anterior
      const oldRequestId = localStorage.getItem("request_id");
      if (oldRequestId) {
        localStorage.removeItem(`processing_${oldRequestId}`);
      }

      // Limpiar estado de pago anterior
      localStorage.removeItem("payment_status");

      // Guardar el nuevo request_id
      localStorage.setItem("request_id", request_id);

      // Crear y enviar el formulario
      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;

      const tokenInput = document.createElement("input");
      tokenInput.type = "hidden";
      tokenInput.name = "token_ws";
      tokenInput.value = token;
      form.appendChild(tokenInput);

      document.body.appendChild(form);
      form.submit();
    }
  }, [token, url, request_id, navigate]);

  return (
    <div>
      <h2>Redirigiendo a WebPay...</h2>
      <p>Por favor espere, está siendo redirigido al sistema de pago...</p>
    </div>
  );
}
