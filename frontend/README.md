# Chatbox — frontend

React + TypeScript + Vite client for the Chatbox AI chatbot. Neobrutalist UI, no component library — plain CSS.

## Local setup

```
npm install
cp .env.example .env   # set VITE_API_URL, see below
npm run dev
```

Requires the [backend](../backend) running and reachable at `VITE_API_URL`.

## Environment variables

- `VITE_API_URL` — base URL of the backend API, including `/api/v1` (e.g. `http://localhost:5000/api/v1` locally, `https://your-api.onrender.com/api/v1` in production)

## Deploying (Vercel)

1. Push this repo to GitHub
2. Vercel dashboard → New Project → point at the repo, root directory `frontend`
3. Framework preset: Vite. Build command `npm run build`, output directory `dist`
4. Add `VITE_API_URL` in Vercel's Environment Variables, pointing at your deployed backend
5. Deploy. On the backend, set `CLIENT_ORIGIN` to this Vercel URL so CORS/cookies work

## Scripts

- `npm run dev` — start dev server
- `npm run build` — type-check and build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — ESLint
