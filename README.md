# Horizon — Personal Banking Dashboard

A full-stack personal banking web application that allows users to securely connect their bank accounts, view real-time balances and transactions, and send money to other users.

---

## What It Does

- Sign up and sign in securely with session-based authentication
- Connect real US bank accounts via Plaid Link
- View live account balances and synced transaction history across multiple banks
- Send funds to other users via Dwolla ACH transfers
- Visualise spending by category with charts and analytics

---

## Tech Stack

| Area | Technologies |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, tailwindcss-animate, tw-animate-css |
| UI Components | Radix UI, shadcn/ui, Lucide icons |
| Forms & Validation | react-hook-form, Zod |
| Charts & Animations | Chart.js, react-chartjs-2, react-countup |
| Auth & Database | Appwrite (Auth, Databases) |
| Bank Linking | Plaid (Link, Auth, Transactions) |
| Payments | Dwolla v2 (Customers, Funding Sources, Transfers) |
| Error Monitoring | Sentry (client, server, edge) |
| Build Tools | ESLint, React Compiler (babel-plugin-react-compiler) |

---

## Project Structure

```
app/                   # Next.js App Router pages and layouts
  (auth)/              # Sign-in and sign-up pages
  (root)/              # Protected pages (dashboard, banks, history, transfer)
  api/                 # API routes (Sentry example)
components/            # Reusable UI components
  ui/                  # Base UI primitives (shadcn-style)
lib/
  actions/             # Server actions (user, bank, transaction, dwolla)
  appwrite.ts          # Appwrite client setup
  plaid.ts             # Plaid client setup
  utils.ts             # Shared utilities (sharable ID encode/decode, etc.)
constants/             # App-wide constants and nav config
types/                 # Shared TypeScript type declarations
```

---

## Key Features & How They Work

### Authentication
- Email/password sign-up and sign-in via **Appwrite**
- Session stored in an **httpOnly cookie** (`appwrite-session`) for security
- Protected routes redirect unauthenticated users to `/sign-in` server-side

### Bank Account Linking (Plaid)
- **Plaid Link** widget launched from the frontend via `react-plaid-link`
- Server action creates a Plaid **link token**, user completes the flow, public token is exchanged server-side
- Account metadata and access tokens are stored in Appwrite

### Fund Transfers (Dwolla)
- On sign-up, a **Dwolla customer** is provisioned automatically (with rollback if it fails)
- When a bank is linked, a **Plaid processor token** is generated and used to create a **Dwolla funding source**
- Transfers are initiated between funding source URLs stored per bank document
- Transfer records are saved to Appwrite for audit history

### Dashboard
- Aggregates accounts from both Appwrite and Plaid
- Merges Plaid-synced transactions with in-app transfer records
- Displays spending breakdown by category with Chart.js
- Tabs per linked bank, with server-side pagination

### Transfer Form
- Validated with **react-hook-form + Zod**
- Receiver identified by a **sharable ID** (Base64 encoded from their Appwrite user ID)

---

## Environment Variables

See `.env.example` for all required keys:

```
# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT
NEXT_PUBLIC_APPWRITE_PROJECT
APPWRITE_DATABASE_ID
APPWRITE_USER_COLLECTION_ID
APPWRITE_BANK_COLLECTION_ID
APPWRITE_TRANSACTION_COLLECTION_ID
NEXT_APPWRITE_KEY

# Plaid
PLAID_CLIENT_ID
PLAID_SECRET
PLAID_ENV

# Dwolla
DWOLLA_KEY
DWOLLA_SECRET
DWOLLA_BASE_URL
DWOLLA_ENV

# Sentry
SENTRY_AUTH_TOKEN
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** Plaid and Dwolla are configured for **sandbox** environments. Use Plaid's sandbox credentials when linking a bank account during testing.

---

## Architecture Notes

- **Server Actions** (`"use server"`) handle all data fetching and mutations — no separate REST API is needed for core flows
- **Dual data model**: Appwrite stores users, banks, and transfer records; Plaid provides live balance and transaction data via `transactionsSync`
- **`force-dynamic`** is set on the root layout to ensure fresh server data on every request
- **Sentry** is configured across client, server, and edge runtimes via `withSentryConfig` in `next.config.ts`
- **React Compiler** is enabled in Next config for optimised component rendering
