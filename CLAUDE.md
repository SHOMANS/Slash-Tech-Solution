# Slash Tech Solution — CLAUDE.md

## Project Overview

**Slash Tech Solution** is a marketing + CMS website for a Cape Town-based software studio. It serves as the public landing page and includes a custom CMS admin panel. The site ships two completely separate designs that coexist at the `/` route.

**Stack:** Next.js 15 App Router · TypeScript · Tailwind CSS v4 · Prisma ORM · PostgreSQL · Framer Motion · React Hook Form + Zod

**Deploy target:** Vercel (geo-headers available: `x-vercel-ip-country`, `x-vercel-ip-city`)

---

## Dual-Design System

Both V1 and V2 are rendered server-side in the same HTML at `/`. CSS + inline styles control visibility.

### How It Works

| Layer | Mechanism |
|---|---|
| Default | V2 wrapper has `style={{ display: 'none' }}` (inline, server-rendered) |
| Switch | `html[data-design="v2"]` CSS attribute set by `localStorage` |
| Show V2 | `html[data-design="v2"] [data-design-v2] { display: block !important; }` |
| Hide V1 | `html[data-design="v2"] [data-design-v1] { display: none !important; }` |
| FOUC prevention | Inline `<script>` in `<head>` reads localStorage synchronously before paint |

### Key Files

- `src/app/layout.tsx` — inline script in `<head>` reads localStorage and sets `data-design`
- `src/app/globals.css` — design switcher CSS rules (bottom of file)
- `src/app/page.tsx` — renders both V1 (`data-design-v1=""`) and V2 (`data-design-v2=""`)
- `src/components/version-toggle.tsx` — `'use client'` button that switches designs via localStorage + DOM attr

### VersionToggle

```tsx
// To switch V1 → V2:
<VersionToggle label="✦ New Design →" target="v2" variant="v1" />

// To switch V2 → V1:
<VersionToggle label="← Classic Design" target="v1" variant="v2" />
```

Prop `target="v2"` sets localStorage + `data-design` attr. `target="v1"` clears both. If the user is not at `/`, it navigates there via `window.location.href`.

---

## V1 Design (Classic)

Blue/purple gradient, light/dark theme via `next-themes`.

**Components:** `src/components/sections/`
- `hero-section.tsx` — animated hero with gradient text
- `about-section.tsx` — company info
- `services-section.tsx` — CMS-driven service cards
- `products-section.tsx` — CMS-driven product cards
- `portfolio-section.tsx` — CMS-driven portfolio grid
- `clients-section.tsx` — testimonials carousel + client logos
- `contact-section.tsx` — contact form with React Hook Form + Zod

**Shared UI:** `src/components/ui/`
- `button.tsx` — gradient button with Framer Motion ripple effect
- `input.tsx` — controlled input with proper light/dark colors (`text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800`)
- `textarea.tsx` — same color treatment as input
- `section.tsx` — `<Section>` and `<SectionHeader>` wrappers
- `card.tsx` — base card component
- `star-rating.tsx` — 1–5 star display

**Fonts:** Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) loaded in `src/app/layout.tsx`.

**Theme:** `next-themes` ThemeProvider with `storageKey="slash-tech-theme"`, persists to localStorage. `html.dark` class driven.

---

## V2 Design (Editorial)

Dark (#070707 bg), lime accent (`#c6ff3d`), editorial aesthetic. Custom cursor. No light/dark toggle — always dark.

**Root class:** `.v2` on the wrapper div. All V2-specific CSS scoped under `.v2` in `globals.css`.

**CSS Variables:**
```css
.v2 {
  --bg: #070707;       /* page background */
  --ink: #f5f5f1;      /* primary text */
  --ink-dim: #8d8d83;  /* secondary text */
  --line: #1f1f1d;     /* borders/dividers */
  --accent: #c6ff3d;   /* lime highlight */
  --accent-2: #ff4d2e; /* error/red accent */
}
```

**Fonts (all defined in `src/app/page.tsx`, scoped via CSS variables):**
- `--v2-display` → Anton (headlines)
- `--v2-display-alt` → Bebas Neue (alt headlines)
- `--v2-sans` → Space Grotesk (body)
- `--v2-mono` → JetBrains Mono (labels, code, UI)
- `--v2-serif` → Instrument Serif (italic accents)

**Components:** `src/components/v2/`
- `layout.tsx` — wraps all V2 sections + effects
- `navbar.tsx` — fixed top nav with live Cape Town time (CAT timezone)
- `hero.tsx` — monumental headline with SlashField canvas background
- `marquee-strip.tsx` — scrolling service names
- `about.tsx` — two-column layout with feature cards (hover fill effect)
- `services.tsx` — 3×2 grid with hover-revealed descriptions
- `products.tsx` — alternating rows with browser/phone mockups
- `work.tsx` — table of portfolio projects (or REDACTED placeholders)
- `clients.tsx` — large quote + testimonial cards + client logos
- `contact.tsx` — terminal-style form (`$ ./start-project.sh`)
- `footer.tsx` — 4-column + massive wordmark

**Effects:** `src/components/v2/effects/`
- `cursor.tsx` — custom dot cursor (hidden on touch devices)
- `grain-scanlines.tsx` — CSS noise + scanline overlay
- `loader.tsx` — initial page loader for V2 (dark "/" symbol)
- `magnetic.tsx` — magnetic pull on hover
- `scramble-text.tsx` — character scramble animation
- `slash-field.tsx` — canvas-based animated "/" characters background
- `ticker.tsx` — animated number counter
- `marquee.tsx` — horizontal scroll loop
- `glitch-text.tsx` — CSS glitch text effect
- `reveal.tsx` — scroll-triggered fade-in

**Custom cursor rule:** `.v2, .v2 *, .v2 a, .v2 button { cursor: none; }`. On `pointer: coarse` (touch), `cursor: auto` is restored.

**V2 form placeholder fix:** `.v2 input::placeholder, .v2 textarea::placeholder { color: var(--ink-dim); opacity: 1; }` — prevents browser default (dark) placeholder on dark backgrounds.

---

## Database Models (Prisma / PostgreSQL)

Schema at `prisma/schema.prisma`. All models use CUID primary keys.

| Model | Table | Key Fields |
|---|---|---|
| `Contact` | `contacts` | name, email, subject, message, read |
| `Service` | `services` | title, description, icon (lucide name), order, active |
| `Product` | `products` | slug (unique, optional), title, subtitle, description, image, heroImage, productType (web/mobile), features[], benefits[], price, order, featured, active |
| `Portfolio` | `portfolio` | title, description, image, technologies[], liveUrl, githubUrl, order, featured, active |
| `Client` | `clients` | name, logo (URL), order, active |
| `Testimonial` | `testimonials` | quote, author, email, role, company, rating (1–5), avatar, approved, active |
| `Admin` | `admins` | email (unique), password (bcrypt), name, active |
| `Visit` | `visits` | ip, userAgent, page, referrer, country, city |

**Important:** `Testimonial.approved` must be `true` for it to appear on the public site. Auto-approved on submission (see `submitTestimonial` in `src/lib/actions.ts`).

---

## Data Fetching

### Public Actions (`src/lib/actions.ts`)
Server actions that power the landing page. All return empty arrays on error (never throw).

| Function | Filters |
|---|---|
| `getServices()` | `active: true`, ordered by `order` |
| `getPortfolioProjects()` | `active: true`, ordered by `order` |
| `getProducts()` | `active: true`, ordered by `order` |
| `getClients()` | `active: true`, ordered by `order` |
| `getTestimonials()` | `active: true, approved: true`, newest 3 only |
| `submitContact(data)` | Creates `Contact` record |
| `submitTestimonial(data)` | Creates `Testimonial` (auto-approved), revalidates `/reviews` |

**Note:** `getTestimonials()` returns objects with both Prisma fields (`quote`, `author`) AND mapped aliases (`message`, `name`). V1 uses `name`/`message`, V2 uses `quote`/`author` directly — both work since both exist.

### Admin CRUD (`src/lib/admin-crud.ts`)
Paginated server actions for all models. All call `revalidatePath('/')` after mutations. All are `'use server'` functions.

---

## Authentication

**File:** `src/lib/auth.ts`

- JWT via `jose` library, HS256, 24h expiry
- Session stored in `httpOnly` cookie named `session`
- Secret from `process.env.JWT_SECRET` (falls back to a dev value — **must set in production**)
- Admin login: `/login`, logout: form action calling `logout()` server action
- All `/admin/*` routes protected by `AdminLayout` which calls `getSession()` and redirects to `/login` if null

---

## Routes

| Route | Type | Description |
|---|---|---|
| `/` | Server + Client | Both designs. V1 default, V2 via localStorage |
| `/new` | Server | V2 standalone (legacy, still works) |
| `/product/[id]` | Server | Product detail page. Accepts both `slug` AND `id` (CUID) |
| `/reviews` | Client | Public review submission form |
| `/login` | Client | Admin login |
| `/admin` | Server | Dashboard with content counts |
| `/admin/services` | Server + Client | CRUD for services |
| `/admin/portfolio` | Server + Client | CRUD for portfolio |
| `/admin/products` | Server + Client | CRUD for products |
| `/admin/clients` | Server + Client | CRUD for clients |
| `/admin/testimonials` | Server | View + approve/delete testimonials |
| `/admin/contacts` | Server | View + mark-read + delete contact messages |
| `/admin/analytics` | Server | Visit statistics |
| `/api/track` | API Route | Records page visits (POST, skips localhost) |
| `/sitemap.xml` | Sitemap | Static pages + active products (uses slug when available) |
| `/robots.txt` | Static | SEO crawl rules |

---

## Product Pages

`/product/[id]` supports both slugs (e.g., `slash-pos`) and CUID IDs for backward compat:

```ts
const product = await prisma.product.findFirst({
  where: { OR: [{ slug: id }, { id }] },
})
```

Products with `productType: 'mobile'` render `MobileProductPage`; `'web'` renders `WebProductPage`.

**Image hosting:** Only `placehold.co` is in `next.config.ts` `remotePatterns`. Add additional hostnames there if using Cloudinary, S3, etc.

---

## Visit Tracking

`src/components/visit-tracker.tsx` — client component that calls `POST /api/track` on mount with `window.location.pathname` and `document.referrer`. Skips localhost IPs server-side. Tracks only `/` and `/product/*` pages. Geo data from Vercel/Cloudflare headers.

---

## Admin Navigation (`src/components/admin/admin-nav.tsx`)

Links: Services · Portfolio · Clients · Products · Testimonials · Contacts · Analytics

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes (prod) | JWT signing secret (min 32 chars) |
| `NEXT_PUBLIC_BASE_URL` | Yes (prod) | Full domain for sitemap (e.g., `https://slashsolution.com`) |

---

## Key Patterns

### Adding a New V2 Section
1. Create `src/components/v2/my-section.tsx` (server component by default)
2. Import and add it in `src/components/v2/layout.tsx`
3. Follow the numbering convention: `<span style={{ color: 'var(--accent)' }}>08 /</span> SectionName`
4. Use `padding: '120px clamp(20px, 4vw, 64px)'` for consistent spacing
5. Add responsive class + `globals.css` media query if grid layout

### Adding a New CMS Entity
1. Add model to `prisma/schema.prisma`, run `prisma migrate dev`
2. Add public fetch function to `src/lib/actions.ts`
3. Add admin CRUD to `src/lib/admin-crud.ts`
4. Create admin pages under `src/app/admin/[entity]/`
5. Add nav link to `src/components/admin/admin-nav.tsx`
6. Add `revalidatePath('/admin/[entity]')` and `revalidatePath('/')` in all mutations

### Revalidation
After every CMS mutation, call `revalidatePath('/')` to bust the landing page cache and `revalidatePath('/admin/[section]')` for the admin list. Product changes should also call `revalidatePath('/product/[slug]')` if needed.

---

## Known Bugs Fixed (2025-05)

1. **Product page slug lookup** (`src/app/product/[id]/page.tsx`) — was only querying by `id`, now uses `OR: [{ slug }, { id }]` so slug-based URLs from V2 work correctly
2. **V1 footer slug links** (`src/components/footer.tsx`) — was linking to `/product/${id}`, now uses `slug || id`; also added `slug` to the select query
3. **Sitemap product URLs** (`src/app/sitemap.ts`) — was using `id`, now uses `slug || id`
4. **Input/textarea readability** (`src/components/ui/input.tsx`, `textarea.tsx`) — added explicit `text-gray-900` (light) and changed dark bg from `gray-900` (same as section) to `gray-800` for visible contrast
5. **V2 contact form placeholder** (`src/app/globals.css`) — added `.v2 input::placeholder, .v2 textarea::placeholder { color: var(--ink-dim); }` so placeholder text is visible on dark backgrounds
6. **Both designs visible simultaneously** — fixed by adding `display: 'none'` inline to V2 wrapper in `page.tsx` and using `!important` CSS overrides

---

## Common Mistakes to Avoid

- **Do not** add a new design route under `/v3` or similar — follow the dual-design pattern at `/` using `data-design-*` attributes
- **Do not** remove `suppressHydrationWarning` from `<html>` — the inline script sets attributes server cannot predict
- **Do not** use `display: none` in CSS alone to hide a design — use inline `style={{ display: 'none' }}` on the server-rendered wrapper for FOUC prevention
- **Do not** link products with bare `/product/${id}` — always prefer slug: `/product/${slug || id}`
- **Do not** add image hostnames to `next/image` without adding them to `remotePatterns` in `next.config.ts`
- **Do not** commit with a weak `JWT_SECRET` — ensure production env has a strong secret
