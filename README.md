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

## 🐳 Cómo correr el Frontend con Docker (Desarrollo)

### 1. Requisitos

- Tener instalado **Docker** y **Docker Compose**.

### 2. Clonar el repositorio

```bash
git clone [URL-del-repo-en-GitHub]
cd FrontendArquiSis
```

*(Reemplazar `[URL-del-repo-en-GitHub]` por el enlace real de tu repositorio.)*

### 3. Levantar la aplicación

```bash
docker compose up --build
```

Esto construirá y levantará el contenedor de desarrollo del frontend.

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
├── package.json             # Definición de dependencias y scripts
├── vite.config.js           # Configuración de Vite
└── README.md                # Documentación principal del proyecto
```

---
