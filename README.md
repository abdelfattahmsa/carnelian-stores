# Carnelian Stores

> **Wear what endures.** — A Peridot Holdings company.

Advanced multi-brand e-commerce platform for Carnelian Stores and its five sub-brands.

---

## Sub-brands

| Brand | Emoji | Tagline | Focus |
|---|---|---|---|
| **Carnelian Basics** | 🔴 | Wear what endures. | Premium anti-trend essentials |
| **Nerds Assemble** | 🎲 | Gear up. Geek out. | Anime, board games, trading cards, collectibles |
| **Clutch Nation** | 🏎️ | Drive the culture. | Automotive culture, racing guides, diecast models |
| **Field Notes** | 🏔️ | Built for the journey. | Outdoor gear, trail apparel, exploration accessories |
| **The Vault** | 🏺 | Objects worth keeping. | Premium collectibles, art prints, handcrafted objects |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | Clerk v7 |
| Database | Supabase (PostgreSQL + RLS) |
| Payments | Stripe (Checkout + Webhooks) |
| Email | Resend |
| State | Zustand v5 |
| Validation | Zod v4 |

---

## Features

### Storefront
- Multi-brand routing — `/collections/[brand]`
- Advanced filtering (brand, category, price, size, color, rating, stock status)
- Full-text search
- Product detail with variant selector (size + color)
- Real-time stock indicators

### Cart & Checkout
- Persistent cart (Zustand + localStorage)
- Cart drawer with quick-add
- Promo code validation
- Free shipping threshold indicator
- Stripe Checkout (hosted) with webhooks

### Accounts (Clerk)
- User dashboard with order stats and loyalty points
- Order history and tracking
- Wishlist
- Price drop & back-in-stock alerts
- Notification centre with email preferences

### Power E-commerce
- Upselling + related products
- Abandoned cart email reminders (Resend)
- Discount codes — percentage or fixed, expiry, usage limits
- Loyalty points on purchases
- Back-in-stock and price-drop alerts
- Verified purchase reviews & star ratings
- Product badges (New, Sale, % off)

### Admin Dashboard (`/admin`)
- Revenue analytics by sub-brand
- Product CRUD + variant management
- Order management with status updates
- Customer list
- Discount code manager
- Role-based access via `ADMIN_EMAILS`

---

## Project Structure

```
src/
├── app/
│   ├── (store)/              # Public storefront
│   │   ├── page.tsx          # Homepage
│   │   ├── collections/[brand]/
│   │   ├── products/[slug]/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── search/
│   │   └── account/
│   ├── admin/                # Protected admin dashboard
│   └── api/                  # Route handlers
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── store/                # ProductCard, CartDrawer, Filters, Actions
│   └── ui/                   # Button, Badge, Input, StarRating
├── lib/
│   ├── brands.ts             # Brand + category definitions
│   ├── utils.ts              # Helpers (formatPrice, slugify, …)
│   ├── stripe.ts             # Stripe client
│   ├── email.ts              # Resend templates
│   └── supabase/             # Browser + server clients
├── store/cart.ts             # Zustand cart (persisted)
└── types/index.ts            # Shared TypeScript types
```

---

## Setup

### 1. Install
```bash
npm install
```

### 2. Environment variables
```bash
cp .env.example .env.local
# Fill in all values
```

Required:
- **Supabase** → run `supabase/schema.sql` in your project's SQL editor
- **Clerk** → create an app, copy keys
- **Stripe** → create account, add webhook pointing to `/api/webhooks/stripe`
- **Resend** → create account, add sending domain

### 3. Run
```bash
npm run dev
```

### 4. Stripe local webhook
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Admin Access

```bash
# .env.local
ADMIN_EMAILS=admin@peridot.holdings,you@email.com
```

Access at `/admin`.

---

*Part of the Peridot Holdings ecosystem. Built by Kyberia Tech.*
