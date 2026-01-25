# ფენიქსი - საგანმანათლებლო ცენტრის CMS

মডერული, რესპონსიული CMS ფენიქსის საგანმანათლებლო ცენტრისთვის, რომელი აშენებული React, TypeScript და Tailwind CSS-ით.

## Project Structure

```
cms-project/
├── frontend/
│   ├── src/ (components, pages, modals, hooks, utils, types)
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig*.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/
│   ├── src/index.ts (Express API entry)
│   ├── package.json
│   └── tsconfig.json
├── vercel.json        (build/install commands for Vercel)
├── render.yaml        (Render static site + backend service)
├── .gitignore
└── README.md
```

## Frontend (Vite)

1) Change into the app folder
```bash
cd frontend
```

2) Install deps
```bash
npm install
```

3) Dev server
```bash
npm run dev
```
App runs at `http://localhost:3000`.

## Build & Preview

```bash
cd frontend
npm run build
npm run preview
```

## Backend (Express)

1) Install deps
```bash
cd backend
npm install
```

2) Dev server
```bash
npm run dev
```
Runs on port 4000 by default; health check at `/health`.

3) Build & start
```bash
npm run build
npm run start
```

## Deployment

**Live URLs**:
- Frontend (Vercel): [https://cms-project-opal.vercel.app/](https://cms-project-opal.vercel.app/)
- Backend (Render): [https://cms-project-mh3w.onrender.com/](https://cms-project-mh3w.onrender.com/)

- **Vercel** (frontend): `vercel.json` installs/builds in `frontend` and serves `frontend/dist`. In the dashboard, set Root Directory to `frontend`, Build Command `npm run build`, Output Directory `dist`.
- **Vercel** (backend): not configured here; deploy separately as serverless functions or another hosted service.
- **Render (frontend static)**: `render.yaml` uses `rootDir: frontend`, `buildCommand: npm run build`, `staticPublishPath: dist`.
- **Render (backend web service)**: `render.yaml` includes a `web` service at `rootDir: backend` with `npm run build` and `npm run start`.

## Admin Panel Usage

- Default admin password: `admin123`
- Access Admin via the navigation; once logged in you can create, edit, and delete posts.

## Customization

- Change admin password: update `DEFAULT_ADMIN_PASSWORD` in `frontend/src/utils/constants.ts`.
- Rename the site: edit the heading in `frontend/src/components/Navigation.tsx`.
- Tailwind theme: adjust `frontend/tailwind.config.js`.

## Storage

Data persists in `localStorage`:
- `cms-posts`: posts array
- `cms-admin-session`: admin session flag
- `cms-admin-password`: custom password (optional)

## License

MIT
