# OctoFit Tracker — Instrucciones rápidas

Proyecto multi-tier: frontend (React + Vite) y backend (Node.js + Express + TypeScript + Mongoose).

Puertos por defecto
- Frontend (Vite): `5173`
- Backend (Express): `8000`
- MongoDB: `27017`

Prerequisitos
- Node.js (LTS) y npm
- MongoDB (`mongod`) en ejecución en el host o contenedor

Frontend — iniciar en desarrollo

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

El servidor de desarrollo por defecto escucha en `5173`. En algunos entornos puede enlazarse en la interfaz IPv6 `::1`; si `http://localhost:5173/` falla, prueba:

```bash
curl -sS http://[::1]:5173/
```

Backend — iniciar en desarrollo

Variables de entorno
- `MONGO_URL` (opcional): URL de MongoDB. Por defecto `mongodb://127.0.0.1:27017/octofit`
- `PORT` (opcional): puerto del servidor. Por defecto `8000`

Comandos
```bash
cd octofit-tracker/backend
npm install
npm run dev
```

Comprobación rápida

- Backend:
```bash
curl -sS http://127.0.0.1:8000/
# => {"status":"ok","service":"octofit-backend"}
```

- Frontend (HTML):
```bash
curl -sS http://[::1]:5173/
```

Notas
- Asegúrate de que `mongod` está corriendo: `ps aux | grep mongod`.
- Los puertos públicos a usar en despliegue deben ser: `5173`, `8000` y `27017`.
