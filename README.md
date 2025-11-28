**Proyecto**

- **Nombre**: `cliente-byte`
- **Framework**: Next.js
- **Versiones relevantes**: `next@16.0.5`, `react@19.2.0` (ver `package.json`).

**Descripción**: Este repositorio es una aplicación Next.js con Tailwind CSS v3 ya instalado y configurado para usarse en la carpeta `app` (App Router).

**Estado actual**
- Tailwind CSS v3: instalado como dependencia de desarrollo.
- Archivos añadidos/actualizados: `tailwind.config.js`, `postcss.config.js`, `app/globals.css`.
- `app/layout.tsx` ya importa `app/globals.css`, por lo que las clases de Tailwind están disponibles en toda la app.

**Instrucciones rápidas**
- Instalar dependencias (si aún no lo has hecho):
  ```powershell
  npm install
  ```
- Iniciar servidor de desarrollo:
  ```powershell
  npm run dev
  ```
- Construir para producción:
  ```powershell
  npm run build
  npm run start
  ```

**Uso de Tailwind**
- Archivo con directivas: `app/globals.css` contiene al principio:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Configuración de contenido: `tailwind.config.js` incluye las rutas donde Tailwind buscará clases para purgar en producción:
  ```js
  // tailwind.config.js
  module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: { extend: {} },
    plugins: [],
  }
  ```
- Ejemplo de uso en un componente React/TSX:
  ```tsx
  export default function Example() {
    return <div className="bg-blue-600 text-white p-4 rounded">Hola Tailwind</div>
  }
  ```

**Notas y recomendaciones**
- Si creas carpetas o archivos con JSX/TSX fuera de `app`, `pages` o `components`, añade esas rutas al array `content` de `tailwind.config.js` para que Tailwind incluya esas clases en la compilación.
- Para usar plugins oficiales (por ejemplo `@tailwindcss/forms`) instala el paquete y añádelo a `plugins` en `tailwind.config.js`.
- Si quieres integrar variantes de tema (dark mode) con clases de Tailwind, revisa la opción `darkMode` en `tailwind.config.js`.

**Cómo commitear los cambios**
- Añadir y commitear cambios:
  ```powershell
  git add -A
  git commit -m "chore: add Tailwind CSS v3 configuration and README"
  git push
  ```

Si quieres que haga el commit y push por ti, dímelo y lo ejecutaré.

--
Documentación generada automáticamente por el asistente. Si quieres que añada secciones (ej. guía de estilos, variables de Tailwind, ejemplos de componentes), dime qué prefieres y lo incorporo.

**Archivo `.env`**

- Usa ` .env.local` para variables de entorno locales (no versionadas). Asegúrate de que `.gitignore` incluya los archivos de entorno.
- Variables típicas que puedes usar:
  ```env
  # URL pública de la API (cliente y server)
  NEXT_PUBLIC_API_URL=https://api.example.com

  # Keycloak (issuer apunta al realm)
  KEYCLOAK_ISSUER=https://auth.example.com/auth/realms/myrealm
  KEYCLOAK_REALM=myrealm
  NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=mi-client-id

  # SOLO en el servidor (confidencial). No poner en archivos públicos.
  KEYCLOAK_CLIENT_SECRET=mi-secret
  ```
- Buenas prácticas: nunca subas secretos al repositorio; usa `env.local` para desarrollo y secretos gestionados (Azure Key Vault, AWS Secrets Manager, etc.) en producción.

**Conexión a Keycloak**

- Requisitos en Keycloak:
  - Crear un *realm* (por ejemplo `myrealm`).
  - Crear un *client* (tipo `public` para aplicaciones SPA o `confidential` para backends). Configurar `Valid Redirect URIs` para Next.js (ej. `http://localhost:3000/*`).

- Flujo de ejemplo (Client Credentials, para llamadas servidor-servidor):
  ```bash
  curl -X POST "${KEYCLOAK_ISSUER}/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials&client_id=${KEYCLOAK_CLIENT_ID}&client_secret=${KEYCLOAK_CLIENT_SECRET}"
  ```

- Flujo de ejemplo (Authorization Code, para aplicaciones web):
  1. Redirige al usuario a: `${KEYCLOAK_ISSUER}/protocol/openid-connect/auth?client_id=...&response_type=code&redirect_uri=...&scope=openid profile email`
  2. Intercambia el `code` por tokens en `/protocol/openid-connect/token`.

- Ejemplo breve para obtener token desde Node (client credentials):
  ```js
  import fetch from 'node-fetch';

  async function getToken() {
    const res = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      }),
    });
    return res.json(); // { access_token, expires_in, ... }
  }
  ```

**Consumo de endpoints (API protegida)**

- Ejemplo: consumir un endpoint protegido con Bearer token desde el cliente o servidor.
  ```js
  // Cliente o servidor (si tienes el token)
  const token = '...';
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mi-endpoint`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await resp.json();
  ```

- Si tu aplicación usa Keycloak en el cliente (SPA), obtén el token mediante la librería de tu preferencia (p. ej. `keycloak-js`) o mediante tu lógica de autenticación y pásalo en el header `Authorization`.

**Pruebas unitarias**

- Recomendación: usar `Jest` junto con `@testing-library/react` para componentes React/Next.
- Instalar dependencias de desarrollo (PowerShell):
  ```powershell
  npm install -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
  ```

- Añadir scripts al `package.json` (ejemplo):
  ```json
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
  ```

- Configuración mínima de `jest.config.cjs`:
  ```cjs
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  };
  ```

- Ejemplo de prueba para un componente simple (`__tests__/Example.test.tsx`):
  ```tsx
  import { render, screen } from '@testing-library/react';
  import Example from '../app/components/Example';

  test('muestra el texto correcto', () => {
    render(<Example />);
    expect(screen.getByText(/Hola Tailwind/i)).toBeInTheDocument();
  });
  ```

- Notas:
  - Si tu código usa APIs de `next/*` o características del servidor, considera pruebas de integración o mocks adecuados.
  - Alternativa moderna: `vitest` ofrece un flujo parecido y arranca más rápido; si lo prefieres, dime y añado instrucciones.

Si quieres, puedo además:
- Crear un archivo de ejemplo de test (`__tests__/Example.test.tsx`) en el repo.
- Añadir `jest.config.cjs` y el script `test` en `package.json` y hacer el commit.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
