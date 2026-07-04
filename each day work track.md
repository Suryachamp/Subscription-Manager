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