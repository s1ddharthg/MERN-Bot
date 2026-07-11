# Chatbox — backend

Express + TypeScript + MongoDB API for an AI chatbot. JWT auth via signed httpOnly cookies, chat history stored per user, OpenAI `gpt-3.5-turbo` for completions.

## Local setup

```
npm install
cp .env.example .env   # fill in the values, see below
npm run dev
```

Server starts on `http://localhost:5000` (or `PORT` if set).

## Required environment variables

See `.env.example` for the full list with descriptions. At minimum you need:

- `MONGODB_URL` — a MongoDB connection string (local `mongod` or [Atlas](https://www.mongodb.com/cloud/atlas) free tier)
- `JWT_SECRET` / `COOKIE_SECRET` — random strings, e.g. `openssl rand -hex 32`
- `OPEN_AI_SECRET` — an [OpenAI API key](https://platform.openai.com/api-keys)

The server refuses to start if any required var is missing (see `src/utils/env.ts`).

## Deploying (Render)

1. Push this repo to GitHub
2. Render dashboard → New → Web Service → point at the repo, root directory `backend`
3. Build command: `npm run build` — Start command: `npm run start`
4. Add every var from `.env.example` in Render's Environment tab. Set `NODE_ENV=production` and `CLIENT_ORIGIN` to your deployed frontend's URL (needed for CORS and cookie `sameSite=none` to work cross-origin)
5. Deploy, then confirm `GET /api/v1/user/auth-status` responds (401 with no cookie is correct — means it's up)

## Scripts

- `npm run dev` — tsc watch + nodemon
- `npm run build` — compile to `dist/`
- `npm run start` — run compiled output (used in production)
