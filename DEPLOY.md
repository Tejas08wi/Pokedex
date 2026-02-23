# Deploy Pokedex on Vercel (with Neon PostgreSQL)

SQLite (`file:./dev.db`) **does not work** on Vercel because the serverless filesystem is read-only. Use a hosted database instead.

This project is set up for **Neon** (free PostgreSQL). Follow these steps.

---

## 1. Create a Neon database

1. Go to **[neon.tech](https://neon.tech)** and sign up (GitHub is fine).
2. Create a new project (e.g. name: `pokedex`).
3. Copy the **connection string** (looks like):
   ```txt
   postgresql://USER:PASSWORD@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
   Use the **pooled** connection string if Neon shows one (better for serverless).

---

## 2. Configure locally

1. In your project root, create or edit `.env`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   ```
   Paste your real Neon connection string.

2. Apply migrations and seed the database:
   ```bash
   npx prisma migrate deploy
   npm run prisma:seed
   ```
   (Or `npx prisma migrate dev` once, then `npm run prisma:seed`.)

3. Run the app locally to confirm:
   ```bash
   npm run dev
   ```
   Test Part 1 / Part 2 / Part 3.

---

## 3. Deploy on Vercel

1. Open your project on **[vercel.com](https://vercel.com)**.
2. Go to **Settings → Environment Variables**.
3. Add:
   - **Name:** `DATABASE_URL`
   - **Value:** the same Neon connection string as in `.env`
   - **Environment:** Production (and Preview if you want).
4. Save, then go to **Deployments** and trigger a **Redeploy** (or push a new commit).

The build runs `prisma generate`, `prisma migrate deploy`, then `next build`, so the Neon database is used in production.

---

## 4. Summary

| Before (broken on Vercel) | After (works on Vercel) |
|---------------------------|-------------------------|
| SQLite `file:./dev.db`    | Neon PostgreSQL (hosted) |
| DB file on disk           | `DATABASE_URL` from env  |

Keep `.env` out of git; only set `DATABASE_URL` in Vercel’s Environment Variables.
