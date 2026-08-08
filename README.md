# 💳 Subscription Manager (SubTrack)

A full-stack subscription tracking application built to demonstrate backend architecture, secure authentication, relational database design, and time-based automation logic.

---

## ✅ What's Actually Built (Current State)

### Backend
- **Secure Auth Flow**: Register → Login → JWT in HttpOnly cookies → Protected routes
- **Password security**: bcrypt hashing (10 salt rounds)
- **Input validation**: Zod schemas on all request bodies
- **Subscription CRUD API**: Create, Read (all & by ID), Update, Delete subscriptions — all protected by auth middleware
- **HTTP logging**: morgan request logger
- **CORS + Cookie handling**: cors + cookie-parser configured for cross-origin frontend calls
- **Environment config**: dotenv for secrets management

### Frontend
- **Page routing**: React Router DOM v7 (Landing → Login → Register → Dashboard)
- **Global auth state**: Redux Toolkit + React Redux
- **API communication**: Axios (with credentials)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React + React Icons
- **Landing page**: Full dark fintech UI — animated hero, feature bento grid, wallet card with 3D tilt, animated stats, CTA, footer

### Advanced Features (Newly Added)
- **Banking Auto-Sync**: Plaid integration to pull transactions and upsert detected subscriptions to the database automatically.
- **In-Memory Caching**: Cache-aside pattern using Redis to store and serve the user's dashboard data, bypassing PostgreSQL for instant loads.
- **Background Scheduler**: Node-Cron job running daily to calculate expiring subscriptions and generate notification records.
- **Real-Time Engine**: Socket.io WebSockets to instantly push cron job notification alerts to online users.

---

## 🚧 What's Planned Next (Priority Order)

### Phase 1: Security & Quick Wins *(1–2 hours each)*

| # | Feature | Description |
|---|---|---|
| 18 | **Rate Limiting** | Install `express-rate-limit` on `/login` and `/register` to prevent brute-force attacks (max 10 attempts per 15 min per IP) |
| 19 | **Autopay Toggle** | Add `autopay` Boolean field to Prisma schema. Add toggle switch on each subscription card. Cron job uses this to customize notification message ("autopay ON — you'll be charged automatically" vs "autopay OFF — don't forget to pay") |
| 20 | **Edit Subscription UI** | Build a frontend form for the existing `PUT /api/subscriptions/:id` endpoint. Pre-fill with current data, allow user to update any field |

### Phase 2: India-Centric Features *(1–2 days)*

| # | Feature | Description |
|---|---|---|
| 21 | **Bank Statement CSV Upload & Auto-Detection** | User uploads their bank statement CSV (from HDFC, SBI, ICICI NetBanking, etc.). Backend parses the file, detects recurring charges (same merchant + same amount + monthly pattern), and auto-creates subscriptions. Replaces Plaid for Indian users |
| 22 | **INR Currency & UPI Payment Methods** | Add INR as default currency, add UPI payment methods (PhonePe, GPay, Paytm) to the form dropdowns |

### Phase 3: DevOps & Deployment *(2–3 hours)*

| # | Feature | Description |
|---|---|---|
| 23 | **CI/CD Pipeline** | Create `.github/workflows/test.yml` — GitHub Actions automatically runs `npm test` on every push. Proves DevOps awareness on resume |
| 24 | **Production Deployment** | Deploy backend to Render/Railway (free tier), frontend to Vercel/Netlify, Redis to Upstash (free tier). A live URL is 10x more impressive than just a GitHub link |

### Phase 4: Feature Depth *(Medium effort)*

| # | Feature | Description |
|---|---|---|
| 25 | **Analytics Dashboard** | Spending charts using Recharts — monthly breakdown, category pie chart, spending trends over time |
| 26 | **Email Notifications** | Use Nodemailer + Gmail/SendGrid to actually email users when subscriptions are about to renew |
| 27 | **Profile & Settings Page** | Let users change name, password, default reminder days, and preferred currency |

---

## 🛠️ Tech Stack

### Frontend
| Package | Purpose |
|---|---|
| React 19 | Core UI library |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Redux Toolkit + React Redux | Global auth state management |
| Axios | HTTP client for API calls |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Lucide React + React Icons | Icon sets |
| Socket.io-client | Real-time WebSocket connection |

### Backend
| Package | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express v5 | REST API framework |
| Prisma ORM + `@prisma/client` | Type-safe DB queries & migrations |
| PostgreSQL (via `pg`) | Relational database |
| `jsonwebtoken` | JWT creation & verification |
| `bcrypt` | Password hashing |
| `zod` | Request schema validation |
| `cookie-parser` | Read HttpOnly cookies from requests |
| `cors` | Cross-origin request handling |
| `morgan` | HTTP request logging |
| `dotenv` | Environment variable management |
| `nodemon` | Dev auto-restart |
| `plaid` | Bank account auto-sync |
| `redis` | In-memory cache client |
| `node-cron` | Background job scheduling |
| `socket.io` | WebSocket server for real-time alerts |

---

## 🗺️ Project Structure

```text
Subscription Manager/
├── client/                   # React Frontend
│   └── src/
│       ├── api/              # Axios client config
│       ├── components/       # Reusable UI components
│       ├── context/          # React context providers
│       ├── hooks/            # Custom React hooks
│       ├── layouts/          # Page layout shells (DashboardLayout)
│       ├── pages/            # Route-level page components
│       ├── redux/            # Redux store, slices
│       ├── routes/           # Route protection logic
│       ├── services/         # API call functions
│       └── utils/            # Helper utilities
│
└── server/                   # Express Backend
    └── src/
        ├── config/           # Prisma client, env setup
        ├── controllers/      # Route handlers (auth, subscription)
        ├── middleware/        # Auth guard, error handler
        ├── routes/           # API path definitions
        ├── services/         # Business logic layer
        ├── utils/            # Token helpers, date utilities
        └── validations/      # Zod schemas
```

---

## 📊 Database Schema (Actual)

```mermaid
erDiagram
    User ||--o{ Subscription : "owns"

    User {
        String id PK
        String email UK
        String password
        String name
        DateTime createdAt
        DateTime updatedAt
    }

    Subscription {
        String id PK
        String userId FK
        String platformName
        Float price
        String currency
        String billingCycle
        String paymentMethod
        String paymentProvider
        DateTime startDate
        DateTime renewalDate
        Int reminderDaysBefore
        String category
        String status
        String subscriptionSource
        DateTime createdAt
        DateTime updatedAt
    }
```

---

## 🔌 API Endpoints

### Authentication
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create account, hash password, return JWT cookie |
| `POST` | `/api/auth/login` | Verify credentials, issue HttpOnly JWT cookie |
| `POST` | `/api/auth/logout` | Clear session cookie |
| `GET` | `/api/auth/me` | Return current user profile (protected) |

### Subscriptions (all protected by auth middleware)
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/subscriptions` | Fetch all subscriptions for current user |
| `POST` | `/api/subscriptions` | Create a new subscription record |
| `PUT` | `/api/subscriptions/:id` | Update a subscription |
| `DELETE` | `/api/subscriptions/:id` | Delete a subscription |

---

## 📈 Progression Log

| # | Task | Status |
|---|---|---|
| 1 | Project setup, folder structure, Git init | ✅ Done |
| 2 | Express server, health routes, Postman validation | ✅ Done |
| 3 | Prisma + PostgreSQL setup, User schema, migrations | ✅ Done |
| 4 | Zod validation, bcrypt hashing, DB registration | ✅ Done |
| 5 | JWT login, HttpOnly cookies, auth middleware | ✅ Done |
| 6 | Subscription schema design & migration | ✅ Done |
| 7 | Subscription CRUD API (Create, Read, Update, Delete) | ✅ Done |
| 8 | React client boilerplate, Tailwind, routing | ✅ Done |
| 9 | Full landing page UI (animated, dark fintech theme) | ✅ Done |
| 10 | Auth pages (Login/Register) + Redux state | ✅ Done |
| 11 | Dashboard UI + subscription list display | ✅ Done |
| 12 | Delete subscription feature | ✅ Done |
| 13 | Plaid auto-import and database UPSERT deduplication | ✅ Done |
| 14 | Redis cache-aside implementation for Dashboard API | ✅ Done |
| 15 | Notification schema & Node-Cron background scheduler | ✅ Done |
| 16 | Socket.io real-time WebSocket alert system | ✅ Done |
| 17 | Test suite (Jest + Supertest) — auth & CRUD coverage | ✅ Done |
| 18 | Rate limiting on auth routes (`express-rate-limit`) | 🔲 Phase 1 |
| 19 | Autopay toggle (schema + UI + cron integration) | 🔲 Phase 1 |
| 20 | Edit Subscription frontend form | 🔲 Phase 1 |
| 21 | Bank Statement CSV upload & auto-detection (India) | 🔲 Phase 2 |
| 22 | INR currency & UPI payment method support | 🔲 Phase 2 |
| 23 | CI/CD pipeline (GitHub Actions) | 🔲 Phase 3 |
| 24 | Production deployment (Render + Vercel + Upstash) | 🔲 Phase 3 |
| 25 | Analytics dashboard with spending charts | 🔲 Phase 4 |
| 26 | Email notifications (Nodemailer) | 🔲 Phase 4 |
| 27 | Profile & Settings page | 🔲 Phase 4 |