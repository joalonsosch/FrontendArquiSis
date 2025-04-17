# LegitBusiness — Frontend

Este frontend implementa la interfaz de usuario para el sistema de compra de acciones de LegitBusiness. El proyecto fue desarrollado usando **React** + **Vite**, **JavaScript** + **SWC**, estilizado mediante **CSS Modules** + **Open Props**.

---

## 🚀 Versión actual

- Navegación completa con **React Router**
- **Navbar reutilizable** con acceso a todas las vistas del sistema
- Vistas protegidas: acceso restringido si no hay sesión activa
- Persistencia y simulación de usuarios, saldos, acciones y compras usando `localStorage`
- Layouts completamente modulares
- **Las vistas son minimalistas porque se trata del esqueleto funcional del frontend, podemos cambiar el estilo si es muy simple**

### ✅ Vistas implementadas

- `LandingPage`: bienvenida con acceso a login y registro
- `SignIn`: registro con validación
- `LogIn`: login con redirección y verificación de credenciales
- `UserHub`: panel principal del usuario autenticado
- `Wallet`: simulación de saldo y recarga
- `ActionList`: listado de acciones disponibles
- `ActionDetail`: detalle individual de cada acción y botón de compra
- `ActionPurchases`: historial de compras
- `ErrorPage`: redirección a 404 (falta mayor implementación)

---

## 🛠️ Instalación paso a paso

1. **Clonar el repositorio**:

```bash
git clone <URL-del-repo>
cd FrontendArquiSis
```

2. **Instalar las dependencias**:

```bash
npm install
```

3. **Correr el entorno de desarrollo**:

```bash
npm run dev
```

Esto abrirá el proyecto en `http://localhost:5173/`

---

## 🧪 Testeo local usando `localStorage`

Puedes testear toda la app **sin necesidad de backend** gracias al uso de `localStorage`. Acá ejemplos que puedes ingresar en la consola del navegador (`F12` > pestaña Console):

### 🔐 Simular usuario registrado

```js
localStorage.setItem('registro', JSON.stringify([
  {
    username: 'napoleon',
    email: 'napoleon@francia.fr',
    password: 'emperor123'
  }
]));
```

### ✅ Simular usuario logeado

```js
localStorage.setItem('usuarioActivo', JSON.stringify({
  username: 'napoleon',
  email: 'napoleon@francia.fr',
  password: 'emperor123'
}));
```

### 💰 Simular saldo en wallet

```js
localStorage.setItem('saldo_napoleon', '20000');
```

### 📈 Simular compras realizadas

```js
localStorage.setItem('compras', JSON.stringify([
  {
    username: 'napoleon',
    symbol: 'GOOGL',
    price: 2800,
    quantity: 1,
    status: 'ACEPTADA',
    timestamp: new Date().toISOString()
  },
  {
    username: 'napoleon',
    symbol: 'TSLA',
    price: 750,
    quantity: 1,
    status: 'EN',
    timestamp: new Date().toISOString()
  }
]));
```

### 🔄 Resetear todo el `localStorage`

```js
localStorage.clear();
```

---

**Todo esto se puede testear desde la propia página como si uno fuera un usuario final también**

## ✅ Navegación protegida

Las siguientes rutas solo están disponibles si hay un usuario activo. Si no hay sesión iniciada, serás redirigido automáticamente a `/login`:

- `/home`
- `/wallet`
- `/actions`
- `/actions/:symbol`
- `/purchases`

---

## 📁 Estructura general del proyecto

```
FrontendArquiSis/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.module.css
│   │   └── ProtectedRoute.jsx
│   ├── data/
│   │   └── mockStocks.json
│   ├── router/
│   │   └── AppRouter.jsx
│   ├── styles/
│   │   └── global.css
│   └── views/
│       ├── ActionDetail.jsx
│       ├── ActionList.jsx
│       ├── ActionPurchases.jsx
│       ├── ErrorPage.jsx
│       ├── LandingPage.jsx
│       ├── LogIn.jsx
│       ├── SignIn.jsx
│       ├── UserHub.jsx
│       └── Wallet.jsx
├── public/
├── package.json
└── README.md
```

---
