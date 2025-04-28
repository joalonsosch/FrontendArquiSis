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
VITE_BACKEND_DOMAIN=https://api.nacevedom.me/
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
