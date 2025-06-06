# ✅ Checklist de Requisitos E3 por Repositorio

---

## 📦 Backend

| Sigla   | Requisito                                                   | ¿Es esencial? |
|---------|-------------------------------------------------------------|---------------|
| RF01    | Usuario administrador                                       | Sí            |
| RF02    | Visualización de acciones disponibles por usuarios         | Sí            |
| RF03    | Compra de acciones por administrador                       | Sí            |
| RF04    | Subasta de acciones por administrador                      | Sí            |
| RF05    | Intercambios entre grupos (proponer, aceptar, rechazar)    | Sí            |
| RF06    | Actualización de cantidad de acciones disponibles          | No            |
| RF07    | Websockets para compras en tiempo real                     | No            |
| RF08    | Activar descuento desde el administrador                   | No            |
| RNF01   | Monitoreo de trazas y alarmas (API principal)              | No            |
| RNF02   | IaaC para backend (Terraform o AWS CDK)                    | No            |
| RNF03   | Semantic versioning de backend                             | No            |
| RNF04   | Leer subastas y guardar propuestas recibidas               | Sí            |
| RNF05   | Publicar subastas e intercambios en broker                 | Sí            |
| RNF06   | Validación de accesos en la API (mensajes de error)        | Sí            |
| RNF07   | CI con linter y tests unitarios en cada push               | No            |

---

## 💻 Frontend

| Sigla   | Requisito                                                   | ¿Es esencial? |
|---------|-------------------------------------------------------------|---------------|
| RF01    | Usuario administrador                                       | Sí            |
| RF02    | Visualización de acciones disponibles por usuarios         | Sí            |
| RF03    | Compra de acciones por administrador                       | Sí            |
| RF04    | Subasta de acciones por administrador                      | Sí            |
| RF05    | Intercambios entre grupos (proponer, aceptar, rechazar)    | Sí            |
| RF06    | Actualización de cantidad de acciones disponibles          | No            |
| RF07    | Websockets para compras en tiempo real                     | No            |
| RF08    | Activar descuento desde el administrador                   | No            |
| RNF07   | CI con linter y Lighthouse en cada push                    | No            |

---

## 🧠 JobMaster

| Sigla   | Requisito                                                   | ¿Es esencial? |
|---------|-------------------------------------------------------------|---------------|
| RNF01   | Monitoreo de trazas y alarmas (si incluye lógica de backend)| No            |
| RNF03   | Semantic versioning si hace deploy                          | No            |
| RNF07   | CI si ejecuta integración continua o tests                  | No            |

---

## ☁️ Iaac (infraestructura)

| Sigla   | Requisito                                                   | ¿Es esencial? |
|---------|-------------------------------------------------------------|---------------|
| RNF02   | IaaC para levantar backend (Terraform / AWS CDK)            | No            |

---

## 📚 Documentación

| Sigla   | Requisito                                                   | ¿Es esencial? |
|---------|-------------------------------------------------------------|---------------|
| RDOC1   | Actualizar diagrama UML de componentes                      | No            |
| RDOC2   | Documentación de la configuración IaaC                      | No            |
| RDOC3   | Documentación de los endpoints de API (Postman, Swagger…)   | No            |
