# RNF06 - Pipeline de CI/CD para FrontendArquiSis

## Objetivo

Implementar un pipeline de integración continua (CI) y despliegue continuo (CD) que suba los cambios del repositorio **FrontendArquiSis** a un bucket de S3 y posteriormente limpie la caché de la distribución asociada en CloudFront. Esto permite que cada vez que se sube contenido nuevo, los usuarios vean los cambios actualizados sin tener que esperar a que expire el caché.

---

## CI - Integración Continua (`ci.yml`)

El archivo `ci.yml` realiza los siguientes pasos cada vez que se hace push a la rama `main`:

1. Usa la imagen de Node.js 20 en Ubuntu.
2. Instala dependencias con `npm ci`.
3. Ejecuta `npm run build` para compilar la aplicación de React.
4. Verifica que la build se realice correctamente.

**Ubicación**: `.github/workflows/ci.yml`

---

## CD - Despliegue Continuo (`cd.yml`)

El archivo `cd.yml` se ejecuta después del `ci.yml` y realiza los siguientes pasos:

1. Usa la misma versión de Node.js.
2. Vuelve a hacer la build para asegurar que esté actualizada.
3. Sincroniza la carpeta `dist` con el bucket S3 `SECRET`.
4. Invalida la caché de la distribución CloudFront `SECRET`.

**Ubicación**: `.github/workflows/cd.yml`

### Secrets usados:

- `AWS_ACCESS_KEY_ID`: `SECRET`
- `AWS_SECRET_ACCESS_KEY`: `SECRET`
- `S3_BUCKET_NAME`: `SECRET`
- `DISTRIBUTION_ID`: `SECRET`

**Estos secretos fueron configurados en GitHub > Repositorio > Settings > Secrets and variables > Actions.**

---

## Cumplimiento del requisito

Este pipeline cumple plenamente con **RNF06**, ya que:

- Se realiza build automática.
- Se sube la nueva versión al bucket de S3.
- Se limpia la caché de CloudFront para asegurar visibilidad inmediata.
- Está automatizado y se ejecuta en cada push al main.

