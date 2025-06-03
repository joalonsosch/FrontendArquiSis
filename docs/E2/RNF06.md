# RNF06 - CI/CD Pipeline para FrontendArquiSis

## Objetivo

Automatizar el proceso de integración y despliegue continuo del frontend de la aplicación. Cada vez que se hace un push a la rama `main`, el sistema compila el proyecto, sube los archivos generados al bucket S3 correspondiente y limpia la caché de CloudFront. Esto garantiza que los cambios estén disponibles para los usuarios de forma inmediata y confiable.

---

## CI - Integración Continua (`ci.yml`)

El pipeline de CI verifica que el frontend se construya correctamente antes de ser desplegado.

**Pasos realizados:**

1. Se ejecuta en Ubuntu con Node.js 20.
2. Instala dependencias con `npm ci`.
3. Ejecuta `npm run build` para generar la aplicación en producción.
4. Verifica que la build se complete sin errores.

**Ubicación del archivo:** `.github/workflows/ci.yml`

---

## CD - Despliegue Continuo (`cd.yml`)

Una vez validada la build, se ejecuta el despliegue automático.

**Pasos realizados:**

1. Se recompila la aplicación para asegurar que esté actualizada.
2. Se sincroniza la carpeta `dist/` con un bucket de Amazon S3.
3. Se invalida la caché de la distribución de CloudFront vinculada.

**Ubicación del archivo:** `.github/workflows/cd.yml`

---

## Secrets utilizados

Los secretos necesarios para autenticar con AWS están almacenados en:

**GitHub > Settings > Secrets and variables > Actions**

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`
- `DISTRIBUTION_ID`

---

## Cumplimiento de RNF06

Este pipeline cumple con todos los aspectos del requisito **RNF06**:

- Automatiza la construcción y despliegue del frontend.
- Asegura que los cambios estén visibles inmediatamente al usuario.
- Utiliza buenas prácticas de seguridad mediante secretos.
- Está conectado a la rama principal (`main`), lo que permite integración continua real.
