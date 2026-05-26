# Backend - Payload CMS

Backend del proyecto Calendario Académico Interactivo UNAH.

## Instalación

```bash
cd Backend
npm install
npm run dev -- -p 3001
```

Luego abre:

```txt
http://localhost:3001/admin
```

## Variables de entorno

Crea o revisa el archivo `.env` con valores similares a:

```env
PAYLOAD_SECRET=coloca_una_clave_larga_y_segura
DATABASE_URL=file:./payload.db
```

## Colección principal

La colección de eventos académicos se encuentra en:

```txt
src/collections/EventosAcademicos.ts
```

Campos principales:

- title
- date
- type
- description
