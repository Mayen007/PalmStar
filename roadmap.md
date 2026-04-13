# PalmStar MERN Migration Roadmap

## Goal

Transition PalmStar from a static site to a simple, maintainable MERN application with clear boundaries:

- `client/` for the React frontend
- `server/` for the Node.js/Express API and MongoDB integration

## Guiding Principles

- Keep each increment small and testable.
- Preserve current site behavior while migrating page by page.
- Favor readability over clever abstractions.
- Ship working checkpoints after every phase.

## Target Structure

```
PalmStar/
├── client/
├── server/
├── index.html
├── src/
├── static/
├── README.md
└── roadmap.md
```

## Incremental Plan

### Phase 0: Baseline and Safety Net

**Objective:** Freeze a known-good starting point.

1. Confirm current static site runs correctly.
2. Snapshot key pages and interactions:
   - Home page
   - Contact form behavior
   - Navigation/menu behavior
3. List all current JS modules in `static/js/` and map each to future React components or API calls.

**Done when:** Current behavior is documented so migration regressions are obvious.

---

### Phase 1: Create MERN Skeleton

**Objective:** Introduce `client/` and `server/` without breaking the current site.

1. Initialize `server/` with:
   - `package.json`
   - `src/app.js`
   - `src/server.js`
   - `src/routes/health.route.js`
   - `src/config/env.js`
2. Install server dependencies:
   - `express`, `cors`, `dotenv`, `mongoose`, `morgan`
3. Add a simple endpoint:
   - `GET /api/health` returns status JSON.
4. Initialize `client/` with Vite + React.
5. Add API proxy in Vite config for `/api` to `http://localhost:5000`.

**Done when:** React app runs in `client/` and Express API runs in `server/` with a working health check.

---

### Phase 2: Shared Configuration and Developer Experience

**Objective:** Make local development easy and consistent.

1. Add root-level scripts to run client and server together (or document two-terminal workflow).
2. Add `.env.example` files for both `client/` and `server/`.
3. Add consistent lint/format setup (ESLint + Prettier) with minimal rules.
4. Update root `README.md` with:
   - install steps
   - run commands
   - environment variables

**Done when:** A new contributor can clone and run both apps quickly.

---

### Phase 3: Frontend Migration (Page by Page)

**Objective:** Move UI from static HTML/JS to React components incrementally.

1. Build base React layout:
   - Navbar
   - Footer
   - Shared page container
2. Add React Router routes for:
   - `/` (home)
   - `/contact`
   - `/blog`
   - `/login`
   - `/admin` (if retained)
3. Migrate one page at a time from existing HTML files.
4. Move reusable JS behavior from `static/js/` into:
   - React components
   - custom hooks
   - utility modules
5. Keep styling simple:
   - start by reusing existing CSS
   - refactor only when needed

**Done when:** Main pages render from React while preserving the existing UX.

---

### Phase 4: Backend API Design and Data Layer

**Objective:** Move dynamic behavior behind Express APIs and MongoDB.

1. Define initial collections based on current site features:
   - `users`
   - `inquiries`
   - `blogPosts`
   - `destinations` (optional, if content should be dynamic)
2. Create Mongoose models and basic validation.
3. Add REST endpoints:
   - `POST /api/inquiries`
   - `GET /api/blog-posts`
   - `POST /api/auth/login` (or placeholder for later auth phase)
4. Add central error middleware and request validation.

**Done when:** Contact/blog/auth workflows no longer depend on static-only behavior.

---

### Phase 5: Connect Client to API

**Objective:** Replace static frontend data flow with API-backed data flow.

1. Create a small API client module in React (`fetch` or `axios`).
2. Wire forms and data views to server endpoints.
3. Add loading/error states on all async views.
4. Keep API responses predictable with a consistent shape.

**Done when:** Frontend interactions operate through Express APIs.

---

### Phase 6: Authentication and Authorization (If Needed)

**Objective:** Secure login/admin workflows.

1. Add password hashing (`bcrypt`).
2. Add JWT-based auth with short-lived access tokens.
3. Add protected routes for admin features.
4. Add frontend route guards.

**Done when:** Admin functionality is protected end-to-end.

---

### Phase 7: Testing, Cleanup, and Cutover

**Objective:** Stabilize and remove legacy dependencies.

1. Add basic tests:
   - server route tests (health + one business route)
   - client component smoke tests
2. Remove dead static scripts replaced by React.
3. Keep legacy files temporarily in a `legacy/` folder if needed.
4. Verify production build and deployment process.

**Done when:** MERN app is primary, and legacy static structure is retired or isolated.

## Suggested Order of Execution (First 3 Working Sessions)

### Session 1

- Complete Phase 1
- Ensure both apps run locally

### Session 2

- Complete Phase 2
- Migrate homepage route in Phase 3

### Session 3

- Add inquiries API in Phase 4
- Connect contact page in Phase 5

## Risks and Mitigations

- **Risk:** Big-bang migration causes regressions.
  - **Mitigation:** Migrate one page/feature per phase.
- **Risk:** Unclear data model early on.
  - **Mitigation:** Start with minimal schemas and evolve.
- **Risk:** Styling regressions.
  - **Mitigation:** Reuse existing CSS first, refactor later.

## Definition of Success

- `client/` and `server/` are the primary application folders.
- Core PalmStar flows run through React + Express + MongoDB.
- Codebase is easier to reason about than the original static implementation.
