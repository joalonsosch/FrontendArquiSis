import { useEffect, useState, useRef } from "react";
import { useApi } from "../services/callApi";

export default function EstimationStatus({ jobId, symbol , onTotalGlobalValue }) {
  const { callApi } = useApi();
  const [status, setStatus] = useState("checking...");
  const [estimationResult, setEstimationResult] = useState(null);

  const intervalIdRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false; 
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!jobId) {
      setStatus("no-job-id");
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      return;
    }

    const fetchEstimationStatus = async () => {
      if (!isMountedRef.current) return;

      try {
        const data = await callApi({
          method: "get",
          url: `/estimations/${jobId}`,
        });

        if (!isMountedRef.current) return;

        setStatus(data.status);

        if (data.status === "completed") {
          const foundEstimation = data.estimations.find(
            (e) => e.symbol.toUpperCase() === symbol.toUpperCase()
          );
          setEstimationResult(foundEstimation || null);

          if (onTotalGlobalValue && data.totalGlobalValue !== undefined) {
            onTotalGlobalValue(data.totalGlobalValue);
          }

          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
        } else if (data.status === "error" || data.status === "failed") {
          setEstimationResult(null);
          localStorage.removeItem("jobId");

          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
        }
      } catch (error) {
        console.error(`Error fetching estimation status for ${symbol} (Job ID: ${jobId}):`, error);
        if (isMountedRef.current) {
          setStatus("error");
          setEstimationResult(null);
          localStorage.removeItem("jobId");
        }
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
      }
    };

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    fetchEstimationStatus();

    intervalIdRef.current = setInterval(fetchEstimationStatus, 5000);


  }, []);

  if (status === "no-job-id") {
    return <p>No se encontró Job ID para la estimación de {symbol}.</p>;
  }
  if (status === "error" || status === "failed") {
    return <p>Error: El cálculo de estimación para {symbol} falló.</p>;
  }
  if (status === "completed" && estimationResult) {
    return (
      <div>
        <p>
          <strong>Estimación Futura ({estimationResult.symbol}):</strong> ${estimationResult.predictNext.toFixed(2)}
        </p>
      </div>
    );
  }
  if (status === "completed" && !estimationResult) {
    return <p>No hay estimación disponible para {symbol} en este momento.</p>;
  }

  return <p><strong>Estado de estimación para {symbol}:</strong> {status}...</p>;
}