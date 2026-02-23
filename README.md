```md
# 🧩 Pokedex – Next.js + tRPC + Prisma + MUI

A small **Pokedex web app** built using modern full-stack TypeScript tools.

It demonstrates:
- 🔎 Fetching a **single Pokémon**
- 📋 Fetching **multiple Pokémon**
- 📊 A **filterable Pokedex table** by type with pagination

Built with **Next.js**, **tRPC**, **Prisma (SQLite)**, **React Query**, and **Material UI**.

---
```
# 🚀 1. Tech Stack

- **Next.js** (Pages Router, TypeScript)
- **tRPC** (v11 with React Query)
- **Prisma ORM** + **SQLite**
- **Material UI (MUI)** for UI
- **Zod** for runtime validation

---

# 📁 2. Project Structure

### Root Files
```

package.json
tsconfig.json
next.config.mjs
.env

```

### Prisma
```

prisma/
├── schema.prisma      # Prisma schema (Pokemon model)
└── seed.ts            # Seeds mock Pokemon data

```

### Source Folder
```

src/
├── server/
│   ├── db.ts          # Prisma client
│   └── api/
│       ├── trpc.ts    # tRPC setup
│       ├── root.ts    # Root router
│       └── routers/
│           └── pokemon.ts   # Pokemon procedures
│
├── utils/
│   └── trpc.ts        # tRPC React client
│
└── components/
├── PokemonRow.tsx
├── PokedexTable.tsx
├── PokemonTypeSelection.tsx
└── FilterablePokedexTable.tsx

```

### Pages
```

pages/
├── _app.tsx           # MUI + tRPC + React Query providers
├── index.tsx          # Home menu
├── part1.tsx          # Single Pokemon
├── part2.tsx          # Multiple Pokemon
├── part3.tsx          # Filterable Pokedex
└── api/trpc/[trpc].ts # tRPC API handler

````

---

# ⚙️ 3. Prerequisites

Make sure you have installed:

- **Node.js** v18+
- **npm**
- **Git**
---
# 🛠️ 4. Setup & Installation

From the project root:

```bash
npm install
````

Create a `.env` file in root:

```env
DATABASE_URL="file:./dev.db"
```

---

# 🗄️ 5. Database & Prisma

## 5.1 Run Migrations (Create SQLite DB)

```bash
npx prisma migrate dev --name init
```

This also runs Prisma generate automatically.

## 5.2 Generate Prisma Client Manually (Optional)

```bash
npx prisma generate
```

## 5.3 Seed Mock Pokemon Data

```bash
npm run prisma:seed
```

or

```bash
npx ts-node prisma/seed.ts
```

Seeds Pokémon like:

* Bulbasaur
* Charmander
* Squirtle
* Pikachu
* and more...

---

# ▶️ 6. Running the App

Start development server:

```bash
npm run dev
```

Open browser:

```
http://localhost:3000
```

### Routes

| Route    | Description                            |
| -------- | -------------------------------------- |
| `/`      | Home page with navigation              |
| `/part1` | Fetch **single Pokémon** by name       |
| `/part2` | Fetch **multiple Pokémon**             |
| `/part3` | **Filterable Pokedex** with pagination |

---

# 🔌 7. tRPC API Overview

All procedures exist under the **pokemon router**.

## Get Pokemon by Name

```ts
pokemon.getByName(name: string)
```

Returns:

```ts
{
  id: number;
  name: string;
  types: string[];
  sprite: string;
}
```

## Get Multiple Pokemon

```ts
pokemon.getManyByNames(names: string[])
```

Returns array of Pokemon.

## Get Pokemon by Type (Paginated)

```ts
pokemon.getByType({
  type?: string;
  page?: number;
  pageSize?: number;
})
```

Returns:

```ts
{
  items: Pokemon[];
  total: number;
}
```

---

# 📝 8. Notes

* Pokémon types are stored in DB as CSV (`typesCsv`)
* Converted to `string[]` in tRPC layer
* Do **NOT commit** these files:

  * `.env`
  * `dev.db`
  * `node_modules`
* tRPC + React Query automatically handle:

  * Caching
  * Request deduplication
  * Data syncing

---


```
```
