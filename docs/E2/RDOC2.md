# RDOC2 - Guía paso a paso integración WebPay

Este documento detalla cómo integrar WebPay en el sistema para procesamiento de pagos. Se describe la instalación, configuración y flujo básico para operar WebPay correctamente.

---

## Requisitos previos

- Tener una cuenta en Transbank con credenciales de integración o producción.
- Tener configurado un backend en Node.js.
- Tener configurado un frontend donde se iniciará el proceso de pago.
- Conexión HTTPS (obligatoria en producción).

---

## 1. Instalación del SDK de Transbank

En el backend:

```bash
npm install transbank-sdk
```

---

## 2. Configuración del comercio

Crea una instancia del `WebpayPlus.Transaction` en tu archivo de backend responsable del pago.

```js
const { WebpayPlus } = require('transbank-sdk');

WebpayPlus.configureForTesting(); // En producción usar configureForProduction(commerceCode, apiKey)
```

---

## 3. Crear una transacción

Desde el backend, crea la transacción al recibir una solicitud de pago desde el frontend.

```js
const response = await WebpayPlus.Transaction.create(
  'orden1234',              // buyOrder
  'sesion1234',             // sessionId
  10000,                    // amount
  'https://tusitio.cl/return-url' // returnUrl
);

res.json({ url: response.url, token: response.token });
```

---

## 4. Redirigir al usuario a WebPay

Desde el frontend, redirige al usuario al formulario WebPay:

```html
<form method="POST" action="https://webpay3g.transbank.cl/webpayserver/initTransaction">
  <input type="hidden" name="token_ws" value="TOKEN_DEL_BACKEND" />
  <input type="submit" value="Pagar con WebPay" />
</form>
```

---

## 5. Confirmar la transacción

Después del pago, Transbank redirige a `returnUrl`. En tu backend, valida el resultado:

```js
const result = await WebpayPlus.Transaction.commit(token_ws);
```

---

## 6. Flujo completo

1. Frontend solicita iniciar pago.
2. Backend genera `token_ws` y URL.
3. Frontend redirige a WebPay.
4. Usuario paga y vuelve a `returnUrl`.
5. Backend confirma transacción (`commit`).
6. Se informa resultado final al usuario.

---

## 7. Enlaces útiles

- [Documentación oficial](https://transbankdevelopers.cl/)
- [SDK Node.js GitHub](https://github.com/TransbankDevelopers/transbank-sdk-nodejs)

---

## 8. Ambiente de pruebas

En desarrollo, usa:

```js
WebpayPlus.configureForTesting();
```

Usa los datos de tarjeta entregados por Transbank para pruebas.

---

## 9. Consideraciones de seguridad

- Nunca expongas tu `apiKey` en el frontend.
- Usa HTTPS en producción.
- Valida siempre el token al retornar de WebPay.
