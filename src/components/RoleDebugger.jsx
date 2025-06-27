// src/components/RoleDebugger.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const RoleDebugger = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        const payload = JSON.parse(atob(token.split(".")[1]));
        const roles = payload["https://api.arquisis.com/roles"];
        console.log("Roles del usuario:", roles);
      } catch (err) {
        console.error("Error obteniendo el token:", err);
      }
    };

    fetchToken();
  }, []);

  return null;
};

export default RoleDebugger;
