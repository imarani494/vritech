# E-Commerce Dashboard (Next.js App Router & TypeScript)

A production-ready, accessible e-commerce application built with Next.js (App Router), React 19, strict TypeScript, and Tailwind CSS. Powered by the [Fake Store API](https://fakestoreapi.com).

## 🚀 Key Features

- **Server-Side Data Fetching**: Utilizes Next.js Server Components for initial product data fetching and server-side sorting (`GET /products?sort=asc|desc`).
- **Interactive Client Filtering**: Case-insensitive title/description search, category filtering, and validated price range controls.
- **Dynamic URL Synchronization**: Synchronizes category, sort, search, price, and pagination state with URL search parameters for shareable links and seamless browser navigation.
- **Persistent Shopping Cart**: Implemented using React Context API & `useReducer` with `localStorage` sync and SSR hydration protection.
- **Product Details & SEO**: Dynamic metadata generation (`generateMetadata`), OpenGraph tags, and Schema.org `JSON-LD` Product structured data.
- **Authentication**: Integrated authentication flow using FakeStore API (`POST /auth/login`) with persistent session management.
- **Accessibility & UX**: Built with semantic HTML5, accessible keyboard focus rings, skeleton loaders to prevent layout shifts (CLS), and error boundaries.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Native Fetch API (Zero external HTTP dependencies)
- **State Management**: React Context API + `useReducer`

---

## 📁 Project Architecture

```
src/
├── app/                      # Next.js App Router pages & metadata
│   ├── cart/                 # Shopping cart route
│   ├── login/                # Authentication page
│   └── products/             # Product catalog & dynamic details [id]
├── components/               # UI Components
│   ├── cart/                 # Cart list, summary & item rows
│   ├── common/               # Navbar, Footer, StarRating, Pagination, Skeletons
│   └── products/             # Product card, grid, filters, client view
├── context/                  # State management (Cart, Auth, Toast)
├── lib/
│   └── api/client.ts         # Centralized native fetch client with error handling
├── services/                 # API domain service abstractions
└── types/                    # Strongly typed interfaces (Product, Cart, Auth)
```

---

## ⚙️ Architecture & Design Decisions

1. **Centralized Fetch Abstraction (`apiClient`)**:
   - Custom `ApiError` class extending native `Error` to normalize HTTP status codes, network errors, and JSON responses.
   - Built-in request timeout support via `AbortController` and Next.js revalidation options.

2. **Server vs. Client Boundaries**:
   - Data fetching and sorting are handled on the server to keep JavaScript bundle sizes minimal.
   - Client components (`ProductClientView`) are scoped strictly to interactive user controls (filtering, search inputs, pagination slice).

3. **Hydration Protection**:
   - To prevent React hydration mismatches when reading `localStorage` for cart and auth state, state initialization is safely guarded until post-mount hydration.

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Install project dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building & Linting

```bash
# Run ESLint validation
npm run lint

# Create production build and run TypeScript checks
npm run build

# Start production server
npm run start
```

---

## 📝 API Limitations & Trade-offs

- **Pagination**: FakeStore API does not provide native limit/offset parameters combined with sorting or category filters. To maintain a realistic e-commerce experience, the server fetches the dataset and pagination is sliced cleanly across the received data on the client.
- **Authentication**: FakeStore API authentication returns a static JWT token for demo credentials (`mor_2314` / `83r5^_`). Session management is isolated from product and cart state.
