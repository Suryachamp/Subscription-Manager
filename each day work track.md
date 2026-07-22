# 📅 Each Day Work Track - Subscription Manager

Here is the log of progress made on the project, tracked by date and completed milestones.

---

### **Day 1: Project Initiation & Backend Architecture (June 16, 2026)**
- Created the project folder structure: `client/` (Frontend boilerplate) and `server/` (Express API).
- Initialized Git and connected the repository to GitHub.
- Setup Node.js backend workspace in the `server/` directory and initialized `package.json`.
- Installed primary backend dependencies: `express`, `cors`, `dotenv`, `cookie-parser`, and `nodemon` (development daemon).
- Designed the system architecture, database schema layout, and overall development roadmap.

---

### **Day 2: Base Server setup & API Validation (June 18, 2026)**
- Created `server.js` and `app.js` to serve as the entry points for the REST API.
- Implemented `/health` routes to serve as server health checks.
- Resolved server crashes and debugged Syntax & TypeError exceptions:
  - Corrected CommonJS `require` module imports (removed `.default` parser conflicts).
  - Mounted the router correctly using `app.use("/health", healthRoutes)` instead of `app.get()`.
- Successfully ran and validated the API server locally on port `5000` via curl and Postman requests.

---

### **Day 3: Database Integration & Authentication Pre-requisites (June 19, 2026) [Today]**
- Initialized Prisma ORM in the backend.
- Configured PostgreSQL connection string using `.env` (`postgresql://subscription_user:***@localhost:5432/subscription_manager`).
- Resolved local PostgreSQL database permission challenges:
  - Authorized schema permissions and ownership for `subscription_user` on the `public` database schema.
  - Granted `CREATEDB` privileges to allow Prisma Migrate to create the shadow database.
- Created the `User` data model in `server/prisma/schema.prisma` with auto-incrementing primary keys, email uniqueness, and timestamp columns.
- Generated and executed the initial schema migration using `npx prisma migrate dev --name init`.
- Installed backend security packages:
  - `bcrypt`: To hash passwords before storing them.
  - `jsonwebtoken` (JWT): To generate secure access tokens for session validation.
- Initialized the global Prisma Client inside `server/src/config/prisma.js` to enable db communication.
- Created `auth.routes.js` and `auth.controller.js` to structure the user session and account creation routing.
- Mounted the authorization sub-router in `app.js` under the `/api/auth` path prefix.
- Written a mock user registration controller returning a JSON success message.
- Troubleshooted and cleared frozen network socket deadlocks on port `5000` by identifying and terminating zombie processes, resolving Postman response delays.

---

### **Day 4: Schema Validation & Database CRUD Implementation (June 20-21, 2026)**
- Installed `zod` library to perform robust server-side schemas and request validation.
- Created schema validators in `server/src/validations/auth.validations.js` to enforce proper validation for registration inputs (email format, minimum password length, and trimmed names).
- Integrated the validator in `auth.controller.js` to parse request payloads cleanly.
- Implemented real database persistence logic in `auth.controller.js` using Prisma client:
  - Checked for pre-existing emails to prevent duplicates (returning `409 Conflict`).
  - Hashed user passwords securely using `bcrypt` (10 salt rounds).
  - Saved new users to the PostgreSQL database.
  - Returned formatted JSON responses with `201 Created` status, omitting the password hash for safety.

---

### **Day 5: User Authentication & Route Protection (June 22-23, 2026)**
- Implemented the login controller (`auth.controller.js`):
  - Validated login inputs (`email`, `password`) using Zod.
  - Verified user password matches the database hash using `bcrypt.compare`.
  - Generated stateless sessions using JSON Web Tokens (JWT).
  - Sent the generated JWT token to the client via secure HTTP-Only cookies (`res.cookie()`).
- Created authentication middleware (`auth.middleware.js`):
  - Extracts and verifies the JWT session token from incoming client request cookies.
  - Populates the request context (`req.user`) with the user's ID upon valid token verification.
- Developed profile query endpoint (`user.controller.js` and `user.routes.js`):
  - Created a protected `/api/users/me` endpoint to fetch authenticated user information.

---

### **Day 6: Subscription Database Modeling (June 27, 2026) [Today]**
- Designed and added the `Subscription` database model inside `server/prisma/schema.prisma` to track:
  - Financial fields: `price`, `currency`, `billingCycle`, `paymentMethod`, and `paymentProvider`.
  - Date fields: `startDate`, `renewalDate`, and `reminderDaysBefore`.
  - Metadata fields: `platformName`, `category`, `status`, and `subscriptionSource`.
  - Relation key: `userId` to map subscriptions back to their owning user account.
- Successfully pushed the new changes to the remote repository.

---

### **Day 7: Subscription Management API (June 28-29, 2026)**
- Refactored `Subscription` database model:
  - Changed the `price` column type from `Decimal` to `Float` in `schema.prisma` for easier calculation handling.
  - Generated and executed a new schema migration (`20260628175245_add_subscriptio`) to apply the schema updates.
- Added input validation rules:
  - Implemented `subscriptionSchema` using Zod inside `subscription.validation.js` to validate pricing, currency formats, start/renewal dates, and enums for billing cycles, payment methods, and statuses.
- Created subscription controller (`subscription.controller.js`):
  - Built the `createSubscription` controller, parsing input data, converting dates, and storing subscriptions associated with the authenticated user (`req.user.userId`).
- Developed subscription routes & routing config:
  - Set up a protected `POST /` endpoint inside `subscription.routes.js` using `authMiddleware`.
  - Mounted the router in `app.js` under the path `/api/subscriptions`.
- Pushed the completed subscription API functionality to GitHub.

---

### **Day 8: Retrieve Subscriptions API Skeleton (July 1, 2026) [Today]**
- Began development of subscription retrieval features:
  - Created the `getSubscription` controller skeleton inside `subscription.controller.js` to prepare for query execution.
  - Registered a protected `GET /` endpoint in `subscription.routes.js` protected by `authMiddleware` to verify requests before database querying.
- Pushed the initial route and controller skeleton to GitHub.

---

### **Day 9: Retrieve Subscriptions API Implementation (July 2, 2026) [Today]**
- Implemented the user subscription retrieval query logic:
  - Updated the `getSubscription` controller inside `subscription.controller.js` to fetch all subscriptions associated with the authenticated user (`req.user.userId`) using Prisma's `findMany` operator.
  - Resolved potential runtime exceptions inside the `catch` block by substituting the undefined reference with a standardized JSON `"Internal server error"` response.
- Successfully pushed the fully functional subscription retrieval API to GitHub.

---

### **Day 10: Root Folder Cleanup & Client Boilerplate Integration (July 4, 2026) [Today]**
- Restructured workspace layout to ensure a clean root directory:
  - Removed duplicate `package.json`, `package-lock.json`, and `node_modules` folders from the root level.
  - Installed the `morgan` package inside the `server/` project so it is managed self-containedly.
  - Set up a clean separation of concerns: `/client` holds React & Vite frontend dependencies, and `/server` holds Express & Prisma backend dependencies.
- Staged, committed, and pushed the new project structure along with the React client boilerplate to GitHub.

---

### **Day 11: Frontend Styling & Page Routing Skeleton Setup (July 5, 2026) [Today]**
- Integrated **Tailwind CSS v4** in `vite.config.js` and imported it in `index.css`.
- Configured project design tokens in `theme.js` and custom CSS variables in `theme.css`.
- Created UI page skeletons for the app:
  - Landing Page (`Landing.jsx`)
  - Auth pages (`Login.jsx`, `Register.jsx`)
  - Dashboard page (`Dashboard.jsx`)
  - Subscription management pages (`AddSubscription.jsx`, `SubscriptionDetails.jsx`)
- Successfully pushed the new frontend setup to GitHub.

---

### **Day 12: Client-Side Routing & Basic Page Structure (July 6, 2026)**
- Installed `react-router-dom` and wrapped `<App />` inside `<BrowserRouter>` in `main.jsx`.
- Configured client-side routes in `App.jsx`:
  - `/` → Landing Page
  - `/login` → Login Page
  - `/register` → Register Page
  - `/dashboard` → Dashboard Page
- Created placeholder `Navbar.jsx` and `Sidebar.jsx` layout components.
- Created `DashboardLayout.jsx` to serve as the shell layout for authenticated pages.
- Pushed basic routing and page structure to GitHub.

---

### **Day 13: Dashboard Layout Refinement (July 7, 2026)**
- Refined `DashboardLayout.jsx` with a proper sidebar and content area structure.
- Created a reusable `Button.jsx` UI component.
- Pushed the updated dashboard layout to GitHub.

---

### **Day 14: Landing Page UI — Full Design & Build (July 8-9, 2026) [Today]**
- Installed **Google Fonts** (Inter + Space Grotesk) and updated `index.html` with SEO meta tags.
- Built a complete dark fintech-themed landing page with custom CSS variables and Tailwind v4:
  - **Navbar**: Floating glassmorphism navbar with animated hover indicator using `layoutId`, mobile hamburger menu with animated dropdown.
  - **Hero Section**: Centered layout with massive animated headline (word-by-word blur-in reveal), multi-color animated gradient text (rose → amber → emerald → violet), CTA buttons with shimmer overlay, and trust indicator row.
  - **WalletCard**: Interactive 3D mouse-follow tilt effect using `useMotionValue` + `useSpring` + `useTransform`, draggable with spring constraints, staggered subscription list reveal, glassmorphism styling.
  - **Features Section**: Bento-grid layout (mixed card widths), 6 feature cards each with unique gradient pair, scroll-triggered entrance animations, animated top-border on hover.
  - **Stats Section**: Animated counting numbers with ease-out cubic interpolation, scroll-triggered via `useInView`.
  - **CTA Section**: Centered call-to-action with animated gradient text and social proof (stacked avatar circles).
  - **Footer**: Multi-column layout with gradient top border, animated social icons, and credits bar.
- Created `Background.jsx` with animated morphing gradient orbs (rose, violet, emerald, amber), subtle grid pattern overlay, and multi-colored floating particles.
- Built animated `Button.jsx` with gradient backgrounds, glow shadows, shimmer overlay, and motion `whileHover`/`whileTap` effects.
- Cleaned up unused files (`theme.css`, `theme.js`, old `Navbar.jsx`) and removed broken CSS mask techniques.
- Made all sections fully responsive with Tailwind breakpoints (`sm`, `md`, `lg`).
- Pushed the complete landing page UI to GitHub.

---

### **Day 15 (onward): Auth & Dashboard Integration (July 10–19, 2026)**
- Built and connected Login/Register pages to the backend auth API via Axios.
- Implemented Redux Toolkit store with `authSlice` for global user state persistence.
- Built the Dashboard page with subscription list, add-subscription form, and delete functionality.
- Auth pages and dashboard are now fully functional end-to-end.
- Pushed all features to GitHub.

---

### **Day 16: Stack Audit & README Overhaul (July 19, 2026) [Today]**
- Performed a full stack audit to identify what is actually built vs. what was planned.
- **Removed** from README: Plaid integration, TanStack Query, Zustand, React Hook Form, TypeScript (none of these are in the actual installed packages).
- **Corrected** the Tech Stack table to match real `package.json` dependencies exactly.
- **Corrected** the DB schema diagram to match the actual Prisma schema (removed fictional `BankAccount` and `Reminder` tables).
- **Added** three concrete upcoming tasks with business justification:
  1. `express-rate-limit` on auth routes (brute-force protection gap)
  2. `node-cron` renewal/expiry scheduler (what makes this a *subscription* manager, not just CRUD)
  3. Jest + Supertest test suite (highest-leverage resume addition)
- Updated the Progression Log table to reflect all 12 completed days accurately.

---

## 🔲 Upcoming Work (Planned)

### **Day 17: Rate Limiting on Auth Routes**
**Goal**: Add brute-force protection — a security gap any interviewer will spot.
- `npm install express-rate-limit`
- Configure a `loginLimiter`: max 10 requests per 15 minutes per IP
- Apply to `POST /api/auth/login` and `POST /api/auth/register`
- Return a clean `429 Too Many Requests` JSON response
- Test with Postman — confirm limit kicks in after threshold

### **Day 18: Cron Job — Renewal & Expiry Status Engine**
**Goal**: Make the app actually do something with time — the whole point of a subscription manager.
- `npm install node-cron`
- Create `server/src/jobs/renewalChecker.js`
- Schedule a daily job (runs at midnight): scan all subscriptions where `renewalDate` is within 7 days
- Transition `status`: `active → expiring_soon` when within 7 days, `expiring_soon → expired` when past date
- Register the job in `server.js` so it runs on startup
- Test by manually setting a `renewalDate` to tomorrow and observing status change

### **Day 19: Test Suite — Auth & Subscription CRUD**
**Goal**: Add the single highest-leverage item missing from this resume project.
- `npm install --save-dev jest supertest`
- Configure Jest in `package.json` (set `testEnvironment: node`)
- Create `server/src/__tests__/auth.test.js`:
  - Test register: valid payload → 201, duplicate email → 409
  - Test login: correct credentials → 200 + cookie, wrong password → 401
  - Test /me: with valid cookie → 200, without cookie → 401
- Create `server/src/__tests__/subscription.test.js`:
  - Test create, read all, read by ID, delete — all with an authenticated test user
- Run `npm test` and confirm all pass before committing