
# RDOC02: Documentación de Instalación y Monitoreo - LegitBusiness

## 1. Monitoreo de Infraestructura (New Relic Infrastructure)

### Paso 1: Creación de cuenta en New Relic
- Se creó una cuenta gratuita de New Relic usando el plan **Free Tier**.
- Región seleccionada: **US**.

### Paso 2: Instalación manual del New Relic Infrastructure Agent en EC2
Dado que la instalación automática falló, se procedió a instalar el agente manualmente:

1. Acceder al servidor EC2 vía SSH.
2. Ejecutar:

```bash
# Agregar License Key correcta
echo "license_key: ****************************" | sudo tee /etc/newrelic-infra.yml

# Agregar repositorio oficial
curl -o- https://download.newrelic.com/infrastructure_agent/gpg/newrelic-infra.gpg | sudo gpg --dearmor -o /usr/share/keyrings/newrelic-infra-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/newrelic-infra-archive-keyring.gpg] https://download.newrelic.com/infrastructure_agent/linux/apt $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/newrelic-infra.list

# Actualizar paquetes e instalar agente
sudo apt-get update
sudo apt-get install newrelic-infra -y

# Reiniciar servicio de agente
sudo systemctl restart newrelic-infra
```

### Paso 3: Verificación
- Se verificó que el servicio `newrelic-infra` quedó activo (`active (running)`).
- El host EC2 comenzó a aparecer en el Dashboard de **Infrastructure > Hosts** de New Relic mostrando métricas como:
  - CPU usage
  - Memory usage
  - Disk I/O
  - Network throughput

---

## 2. Monitoreo de Aplicación (New Relic APM para Backend Node.js)

### Paso 1: Instalación del agente APM de New Relic en Backend

Dentro del proyecto `BackendArquiSis`:

```bash
# Acceder al directorio del backend
cd ~/Downloads/uc/arqui/LegitBusiness/BackendArquiSis

# Instalar paquete de New Relic
npm install newrelic

# Crear archivo newrelic.js en raíz del proyecto
cat <<EOF > newrelic.js
'use strict'
exports.config = {
  app_name: ['LegitBusiness Backend'],
  license_key: '**************************',
  logging: {
    level: 'info',
  },
  allow_all_headers: true,
  attributes: {
    enabled: true,
  },
}
EOF

# Insertar require de newrelic en primera línea de index.js
cp src/index.js src/index.js.bak
sed -i '1i require("newrelic");' src/index.js

# Reiniciar servidor backend
npm run dev
```

### Paso 2: Verificación
- En el Dashboard de **APM & Services** de New Relic, se verificó que apareciera la aplicación:
  - **Nombre de app**: `LegitBusiness Backend`
  - Se recibieron métricas como throughput, tiempos de respuesta, número de requests, errores.

---

## 3. Resumen Visual

| Componente | Métricas visibles en New Relic |
|------------|---------------------------------|
| EC2 (Infraestructura) | CPU, Memoria, Disco, Red |
| Backend (Aplicación Node.js) | Throughput, Tiempos de respuesta, Errores, Transacciones |

---
