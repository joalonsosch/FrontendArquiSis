import { useEffect, useState } from "react";
import { checkJobMasterStatus } from "../services/callApi";
import styles from "./Navbar.module.css";

export function JobMasterStatus() {
  const [isAlive, setIsAlive] = useState(null);

  useEffect(() => {
    const check = async () => {
      const status = await checkJobMasterStatus();
      setIsAlive(status);
    };
    check();
  }, []);

  return (
    <div className={styles.navButton}>
      JobMaster:{" "}
      {isAlive === null ? (
        <span style={{ color: "gray" }}>Cargando...</span>
      ) : isAlive ? (
        <span style={{ color: "lightgreen" }}>Activo ✅</span>
      ) : (
        <span style={{ color: "red" }}>Inactivo ❌</span>
      )}
    </div>
  );
}
