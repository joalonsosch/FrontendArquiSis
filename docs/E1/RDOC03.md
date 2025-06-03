# Documentación de Backend --- LegitBusiness

## ✈️ Cómo correr el Backend en Ambiente No-Local (Producción)

El backend de LegitBusiness fue desplegado utilizando **NGINX** y corre sobre un servidor **EC2** de AWS.

El acceso se realiza a través del siguiente dominio:

- [http://DOMINIO/](http://DOMINIO/) → redirecciona automáticamente a HTTPS
- [https://DOMINIO/](https://DOMINIO/)

> ⚠️ Nota importante:
> - Para acceder a las rutas de la API, debes anteponer `/api`.
> - Ejemplo: `[https://DOMINIO/api/stocks](https://DOMINIO/api/stocks)`.

✅ No es necesario correr nada localmente para consumir la API en producción.

---

## 💻 Cómo correr el Backend en Ambiente Local (Desarrollo)

Para levantar la aplicación de backend en forma local, seguir los siguientes pasos:

### 1. Requisitos

- **Node.js** versión 18 o superior.
- **npm** o **yarn** para gestión de dependencias.
- **Docker** y **Docker Compose** instalados (para levantar Postgres fácilmente).

### 2. Clonar el repositorio

```bash
git clone [URL-del-repo-en-GitHub]
cd BackendArquiSis
```

*(Reemplazar `[URL-del-repo-en-GitHub]` por el enlace real de tu repositorio.)*

### 3. Instalar dependencias

```bash
npm install
```

Esto instalará todos los paquetes necesarios del backend.

### 4. Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
#Api configuration
API_PORT_0=3000
API_PORT_1=3001
API_PORT_2=3002
API_PORT_3=3003
API_APP_URL=http://api:3000/

#Frontend configuration
FRONTEND_APP_URL=http://frontend:3004/

#Auth0 configuration
AUTH0_DOMAIN=dev-b0sco3vgffwtqupv.us.auth0.com
AUTH0_CLIENT_ID=64fna5gIxldoHISZpzhK9nxCOoNzU6Pb
AUTH0_AUDIENCE=https://api.nacevedom.me/

#Postgres Database Configuration
POSTGRES_HOST=postgres
POSTGRES_USER=iic2173
POSTGRES_PASSWORD=ArquiSis2173
POSTGRES_NAME=iic2173_db_2025_1

#Broker configuration
BROKER_UPDATE_TOPIC =stocks/updates
BROKER_REQUEST_TOPIC =stocks/requests
GROUP_ID=19
BROKER_HOST=broker.iic2173.org
BROKER_PORT=9000
BROKER_USER=students
BROKER_PASSWORD=iic2173-2025-1-students
```

> ⚡ Notas:
> - `POSTGRES_HOST` se conecta a un contenedor llamado `postgres`, por lo que debe levantarse vía Docker.
> - `BROKER_HOST` conecta al broker oficial del curso.

### 5. Preparar la Base de Datos

1. Asegúrate de tener **Docker** corriendo.
2. Levanta una instancia de Postgres usando:

```bash
docker run --name postgres -e POSTGRES_USER=iic2173 -e POSTGRES_PASSWORD=ArquiSis2173 -e POSTGRES_DB=iic2173_db_2025_1 -p 5432:5432 -d postgres
```

✅ Esto crea la base de datos necesaria escuchando en el puerto 5432.

3. Crea manualmente dos tablas en tu base de datos:

```sql
CREATE TABLE Stocks (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    shortName VARCHAR(50) NOT NULL,
    longName VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    quantity INT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

CREATE TABLE Events (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    eventType VARCHAR(20) NOT NULL,
    amount INT NOT NULL,
    price FLOAT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);
```

Estas tablas son esenciales para almacenar información de acciones y eventos de compra/venta.

### 6. Levantar el Backend

Una vez todo esté listo:

```bash
npm run dev
```

✅ Esto levanta el servidor de backend en modo desarrollo.

Normalmente, el backend local quedará accesible en:

- [http://localhost:3000/api](http://localhost:3000/api)

(Además de en otros puertos para instancias paralelas, según las variables de entorno.)

---

## 📦 Notas Técnicas

- **Backend construido en ExpressJS**.
- **Sequelize ORM** para conexión a PostgreSQL.
- **Manejo de brokers MQTT** implementado en `src/broker.js`.
- **NGINX** usado como proxy reverso en producción.
- **Docker** recomendado para levantar la base de datos localmente.

---

## 🧹 Estructura General del Proyecto Backend

```
BackendArquiSis/
├── docker/              # Configuraciones para Docker y Docker Compose
├── pages/               # Archivos HTML usados por NGINX
├── server/              # Configuraciones de NGINX
├── src/
│   ├── controllers/     # Lógica de controladores
│   ├── database/        # Configuración de base de datos y Sequelize
│   ├── hooks/           # Funciones auxiliares (axios, broker)
│   ├── models/          # Modelos de datos
│   ├── routes/          # Rutas de la API
│   ├── services/        # Lógica de negocio de las rutas
│   ├── utils/           # Utilidades varias
│   ├── app.js           # Aplicación principal
│   ├── index.js         # Punto de entrada para levantar servidor
│   └── broker.js        # Lógica de conexión con el broker MQTT
├── .env                 # Variables de entorno
├── package.json         # Dependencias y scripts
└── README.md            # Documentación principal del proyecto
```

---

# Documentación de Frontend --- LegitBusiness

Este frontend implementa la interfaz de usuario para el sistema de compra de acciones de LegitBusiness. El proyecto fue desarrollado usando **React** + **Vite**, **JavaScript** + **SWC**, estilizado mediante **CSS Modules** + **Open Props**.

## ✈️ Cómo correr el Frontend en Ambiente No-Local (Producción)

El frontend de LegitBusiness fue desplegado utilizando **AWS S3** + **AWS CloudFront**.

Para acceder a la aplicación en ambiente de producción:

- **URL pública**:  
  [https://d2o8rj45ls9yf5.cloudfront.net/](https://d2o8rj45ls9yf5.cloudfront.net/)

No es necesario instalar nada localmente.  
El sitio web está disponible de manera segura utilizando HTTPS a través de CloudFront.

---

## 💻 Cómo correr el Frontend en Ambiente Local (Desarrollo)

Para levantar la aplicación de forma local, seguir los siguientes pasos:

### 1. Requisitos

- Tener instalado **Node.js** (versión 18 o superior recomendada).
- Tener instalado **npm** (v10 o superior).

### 2. Clonar el repositorio

```bash
git clone [URL-del-repo-en-GitHub]
cd FrontendArquiSis
```

*(Reemplazar `[URL-del-repo-en-GitHub]` por el enlace real de tu repositorio.)*

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_BACKEND_DOMAIN=https://nacevedom.me/
VITE_AUTH0_DOMAIN=dev-b0sco3vgffwtqupv.us.auth0.com
VITE_AUTH0_CLIENT_ID=64fna5gIxldoHISZpzhK9nxCOoNzU6Pb
VITE_AUTH0_AUDIENCE=https://dev-b0sco3vgffwtqupv.us.auth0.com/api/v2/
```

> ⚡ Nota:
> - `BACKEND_DOMAIN` apunta al backend desplegado en producción.
> - `VITE_BACKEND_DOMAIN` es utilizado para pruebas locales apuntando a un backend corriendo en `localhost:3000`.

### 5. Correr la aplicación

```bash
npm run dev
```

Esto levantará el servidor de desarrollo de Vite.  
La aplicación quedará disponible en:

- [http://localhost:5173/](http://localhost:5173/)

---

## 🧹 Estructura General del Proyecto

La estructura general del proyecto frontend es la siguiente:

```
FrontendArquiSis/
├── public/                  # Archivos públicos
├── src/
│   ├── assets/              # Imágenes, íconos y recursos estáticos
│   ├── components/          # Componentes reutilizables (Navbar, botones, etc.)
│   ├── router/              # Configuración de rutas (AppRouter.jsx)
│   ├── views/               # Vistas principales (LandingPage, LogIn, SignIn, etc.)
│   └── data/                # Mock data (por ejemplo, stocks de prueba)
├── .env                     # Variables de entorno para configuración local
├── package.json             # Definición de dependencias y scripts
├── vite.config.js           # Configuración de Vite
└── README.md                # Documentación principal del proyecto
```

---
