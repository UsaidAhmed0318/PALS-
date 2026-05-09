# RBS Frontend - Project Guide

## Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Auth:** iron-session 8 (encrypted cookies) + ERPNext OAuth2/Password login
- **Validation:** Zod 4 + react-hook-form 7
- **Data Fetching:** @tanstack/react-query 5 + axios
- **Styling:** Tailwind CSS 4 + CSS Modules

## Project Structure
```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/auth/           # Auth endpoints (login, callback, session, logout)
│   ├── api/proxy/          # ERPNext API proxy
│   ├── auth/               # Login/Signup UI
│   ├── dashboard/          # Protected: profile, orders
│   └── products/           # Product listing & detail
├── components/             # Shared UI (navBar, cart, ProductGrid)
├── lib/
│   ├── actions/            # Server Actions (auth form handling)
│   ├── auth/oauth.ts       # OAuth helpers (token exchange, profile)
│   ├── session/            # iron-session config & helpers
│   ├── hooks/              # React Query hooks (useProducts, useLogin, etc.)
│   ├── validations/        # Zod schemas
│   └── api/client.ts       # Axios API client
└── types/session.ts        # Session, OAuth, UserProfile types
```

## Auth Architecture
- **Password Login:** POST `/api/auth/login` → ERPNext `/api/method/login` → extract cookies → fetch user profile → save to iron-session
- **OAuth Flow:** GET `/api/auth/login` → ERPNext OAuth authorize → callback → exchange code for tokens → save to iron-session
- **Session:** iron-session with encrypted HTTPOnly cookies (config in `lib/session/config.ts`)

## Key Conventions
- API route handlers must use uppercase HTTP methods: `POST`, `GET`, `PUT`, `DELETE`
- Server Actions use `'use server'` directive and return `{ errors, enteredValues, success }` shape
- Path alias: `@/*` maps to `./src/*`
- ERPNext backend runs at `ERPNEXT_URL` (default: `http://127.0.0.1:8000`)
- Use `fetch()` to call internal API routes from Server Actions (not direct imports)

## Commands
- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — Run ESLint

## Environment Variables (`.env.local`)
- `ERPNEXT_URL` — ERPNext backend URL
- `NEXTAUTH_URL` — Next.js app URL (e.g., http://localhost:3000)
- `OAUTH_CLIENT_ID` / `OAUTH_CLIENT_SECRET` — ERPNext OAuth credentials
- `SESSION_SECRET` — iron-session encryption key (min 32 chars)
- `ERPNEXT_API_KEY` / `ERPNEXT_API_SECRET` — Service account API keys
