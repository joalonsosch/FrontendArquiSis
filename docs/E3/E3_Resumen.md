# E3 - Resumen

**Fecha de entrega:** 28/06/2024 - 23:59  

## 🧩 Objetivo

Conectar el sistema de compras asíncronas de acciones con el sistema de pagos síncrono, permitiendo:
- Compra de acciones para su grupo.
- Subastas e intercambios entre grupos vía MQTT (`stocks/auctions`).
- Administración segura de usuarios.
- Incorporación de IaaC y monitoreo.

---

## ✅ Requisitos Funcionales (RF) – 21 ptos (máx. 8.0)

> ⚠️ RF01–RF05 son **esenciales**. Si no se cumplen, nota máxima 4.0.

### RF01 – (3 ptos) Esencial  
Implementar tipo de usuario **administrador**.

### RF02 – (2 ptos) Esencial  
Usuarios normales deben ver acciones disponibles para compra (propias del grupo).  
Puede aplicarse hasta **10% de descuento** si se desea.

### RF03 – (2 ptos) Esencial  
Administrador puede comprar acciones.  
Usuarios normales deben recibir **error** si lo intentan.

### RF04 – (3 ptos) Esencial  
Administrador puede subastar acciones.  
Usuarios normales deben recibir **error** si lo intentan.

### RF05 – (3 ptos) Esencial  
Administrador puede:
- Proponer intercambios a otros grupos.
- Aceptar o rechazar intercambios entrantes.  
Usuarios normales deben recibir **error** si lo intentan.

### RF06 – (4 ptos)  
Disponibilidad de acciones debe **actualizarse** según compras/subastas hechas por su grupo o por otros.

### RF07 – (3 ptos)  
**Websockets** para actualizar en tiempo real las compras.

### RF08 – (1 pto)  
Administrador puede activar descuento en acciones de su grupo.  
Usuarios normales deben recibir **error** si lo intentan.

---

## 🧪 Requisitos No Funcionales (RNF) – 34 ptos

> ⚠️ RNF04–RNF06 son **esenciales**

### RNF01 – (5 ptos) Monitoreo  
- 2 trazas funcionales monitoreadas (ej: flujo de transacción completa).
- 1 alarma de disponibilidad.
- Herramientas sugeridas: **New Relic**, **Prometheus/Grafana**.

### RNF02 – (10 ptos) IaaC  
- Levantar backend con **Terraform** o **AWS CDK**.  
- BONUS: +5 ptos si también levantan el frontend con IaaC.

### RNF03 – (3 ptos) Semantic Versioning  
Deploys deben usar **versión semántica** (ej: v1.2.0).  
Debe reflejarse en pushes a `master` o `releases`.

### RNF04 – (5 ptos) Esencial  
Su app debe **leer** subastas de otros grupos desde `stocks/auctions` y guardar las propuestas realizadas.

### RNF05 – (5 ptos) Esencial  
Su app debe **publicar** subastas e intercambios en `stocks/auctions`.  
**BONUS:** +2 ptos si coordinan con otro grupo para **aceptar** una propuesta en la demo.

### RNF06 – (1 pto) Esencial  
Si un usuario normal accede a endpoint de administrador vía **API**, debe recibir mensaje de error (distinto de front).

### RNF07 – (5 ptos) CI/CD con tests  
Push a GitHub debe:
- Correr linters y tests:
  - Backend: linter + 2 tests unitarios.
  - Frontend: linter + análisis Lighthouse.
- Si fallan los tests, **no se debe hacer deploy automático**.

---

## 📚 Documentación (5 ptos)

Todos los documentos deben ir en `/docs` en el repositorio.

### RDOC1 – (2 ptos)  
Actualizar diagrama **UML de componentes**, con explicaciones.

### RDOC2 – (2 ptos)  
Documentar la configuración **IaaC**.

### RDOC3 – (1 pto)  
Documentación de **endpoints** usando estándar (Postman, Swagger, etc).

---

## 🎨 Bonus

- +0.5 ptos por frontend con diseño y estilos **destacables** (a criterio del ayudante).

---

## ⏰ Política de Atraso

Penalización por horas de atraso (con Fibonacci):

| Horas de atraso       | Nota máxima |
|-----------------------|-------------|
| 0:01 – 5:59           | 6.5         |
| 6:00 – 11:59          | 6.0         |
| 12:00 – 23:59         | 5.0         |
| 24:00 – 41:59         | 4.5         |
| 42:00 – 71:59         | 4.0         |
| 72:00+                | 1.0         |

---

## 🧮 Cálculo de Notas

### Grupal  
`E3_grupal = 1 + E3_RF + E3_RNF + E3_RDOC`

### Individual  
`E3_individual = 1 + ((E3_grupal - 1) * F)`  
`F` es el **factor de coevaluación** (entre 0 y 1.2).  
Solo se puede dar **nota máxima (5)** a un solo compañero.

---

## ⚙️ Consideraciones Técnicas

- Solo se permiten servicios de **AWS Free Tier** (EC2, S3, RDS, API Gateway, Lambda, SES, etc).
- **No se aceptan** despliegues en Heroku, Netlify, Firebase, Elastic Beanstalk, etc.
- Lenguajes permitidos incluyen: **Python (FastAPI/Django)**, **JS (Express/Koa)**, **Ruby (Rails)**, **C#**, **Go**, **Rust**.

---

## 📢 Rechazo automático de entrega si:

- No está desplegada en la **nube AWS**.
- No tiene los **requisitos esenciales** de E2.
- No tiene documentación.
