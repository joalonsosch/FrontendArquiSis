# Frontend - LegitBusiness

Este repositorio contiene la interfaz de usuario para la plataforma de compra y venta de acciones **LegitBusiness**.

El frontend fue construido utilizando **React** + **Vite**, con estilos en **CSS Modules** y **Open Props**.

---

## 🌐 Producción

El sitio se encuentra desplegado públicamente usando **AWS S3** y **AWS CloudFront**.

- **URL pública**: [https://d2o8rj45ls9yf5.cloudfront.net/](https://d2o8rj45ls9yf5.cloudfront.net/)

Este sitio es estático, accesible desde cualquier navegador moderno, sin necesidad de instalación local.

---

## 🧪 Desarrollo local con Docker

### Requisitos

- Tener instalado Docker y Docker Compose

### Pasos

```bash
git clone [URL-del-repo-en-GitHub]
cd FrontendArquiSis
docker compose up --build
```

Esto levantará la aplicación de desarrollo en:

- [http://localhost:5173/](http://localhost:5173/)

---

## 🧾 Requisitos cumplidos

Este frontend cumple con los siguientes requisitos de la entrega E2:

| Tipo   | Código   | Descripción                                      |
|--------|----------|--------------------------------------------------|
| ✅ RF03 | Flujo WebPay            | Inicia pago, redirige según resultado             |
| ✅ RNF02 | UI de estados WebPay    | Muestra mensaje claro según resultado            |
| ✅ RNF06 | CI/CD Frontend          | Sync a S3 + invalidación de CloudFront           |

---

## 📁 Estructura del Proyecto

```
FrontendArquiSis/
├── public/                  # Archivos públicos
├── src/
│   ├── assets/              # Imágenes e íconos
│   ├── components/          # Componentes reutilizables
│   ├── router/              # Definición de rutas
│   ├── views/               # Páginas principales
│   └── data/                # Datos simulados (mock)
├── package.json             # Dependencias
├── vite.config.js           # Configuración de Vite
└── README.md                # Este archivo
```

---

## 🛠️ Notas adicionales

- Las vistas se conectan con el backend mediante endpoints REST y simulan respuestas con mock data hasta completar la integración.
- Las credenciales y secretos no se encuentran en este repositorio. Usamos variables de entorno para producción.