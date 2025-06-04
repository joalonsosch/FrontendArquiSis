import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useApi } from "../services/callApi";
import Navbar from "../components/Navbar";

export default function PaymentResponse() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(() => {
    // Intentar recuperar el estado del localStorage
    const savedStatus = localStorage.getItem("payment_status");
    return savedStatus || "pending";
  });
  const navigate = useNavigate();
  const { callApi } = useApi();

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    const processPayment = async () => {
      const token = searchParams.get("token_ws");
      const request_id = localStorage.getItem("request_id");

      console.log("[FRONT] Estado actual:", {
        token,
        request_id,
        currentStatus: status,
      });

      // Si ya tenemos un estado de éxito o fallo, no procesar
      if (status === "success" || status === "fail") {
        console.log("[FRONT] Transacción ya procesada con estado:", status);
        if (status === "success") {
          // Si ya está en éxito, esperar 2 segundos antes de redirigir
          timeoutId = setTimeout(() => {
            if (isMounted) {
              navigate("/purchases");
            }
          }, 2000);
        }
        return;
      }

      // Si no hay token o request_id, no procesar
      if (!token || !request_id) {
        console.warn("[FRONT] Faltan datos para confirmar transacción.");
        if (isMounted) {
          setStatus("fail");
          localStorage.setItem("payment_status", "fail");
        }
        return;
      }

      console.log("[FRONT] Iniciando procesamiento de transacción...");
      console.log("[FRONT] token_ws recibido:", token);
      console.log("[FRONT] request_id recuperado:", request_id);

      try {
        console.log("[FRONT] Enviando confirmación a backend...");

        const response = await callApi({
          method: "post",
          url: "/webpay/commitTransaction",
          data: { token_ws: token, request_id },
        });

        console.log("[FRONT] Respuesta del backend:", response);

        if (!isMounted) return;

        if (response.success) {
          console.log("[FRONT] Transacción exitosa, actualizando estado...");
          setStatus("success");
          localStorage.setItem("payment_status", "success");
          // Limpiar el estado después de una confirmación exitosa
          localStorage.removeItem("request_id");
          // Esperar 2 segundos antes de redirigir
          timeoutId = setTimeout(() => {
            if (isMounted) {
              navigate("/purchases");
            }
          }, 5000);
        } else {
          console.warn("[FRONT] Transacción fallida.");
          setStatus("fail");
          localStorage.setItem("payment_status", "fail");
        }
      } catch (error) {
        console.error("[FRONT] Error al confirmar transacción:", error);
        if (isMounted) {
          setStatus("fail");
          localStorage.setItem("payment_status", "fail");
        }
      }
    };

    processPayment();

    // Cleanup function
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchParams, callApi, navigate, status]);

  // Limpiar el estado cuando se desmonte el componente
  useEffect(() => {
    return () => {
      localStorage.removeItem("payment_status");
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2rem", textAlign: "center" }}>
        {status === "pending" && <p>Confirmando transacción con WebPay...</p>}
        {status === "success" && (
          <>
            <h2>¡Pago exitoso!</h2>
            <p>Redirigiendo a tus compras en unos segundos...</p>
          </>
        )}
        {status === "fail" && (
          <>
            <h2>Error en el pago</h2>
            <p>La transacción fue rechazada o cancelada.</p>
            <button onClick={() => navigate("/purchases")}>
              Volver al inicio
            </button>
          </>
        )}
      </div>
    </div>
  );
}
