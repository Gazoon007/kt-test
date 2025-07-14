# User Management App

A Vue 3 application for managing users, built with clean architecture, strict TypeScript typing, and modern UI practices.

## Features

- 🔍 **User Search & Filtering**: Find users by name or email with instant feedback.
- 📊 **Sorting & Pagination**: Sort users by name, registration date, gender, or country; supports both server-side and client-side pagination.
- 🧑‍💼 **User Details Modal**: View detailed user info in a modal dialog.
- 🛠️ **Strict Typing**: All components and stores use explicit TypeScript interfaces for props, emits, and state.
- 🎨 **Modern UI**: Responsive design with Tailwind CSS and Font Awesome icons.
- 🗃️ **Centralized Types**: Shared interfaces organized in `/src/types` for maintainability.
- ⚡ **State Management**: Pinia store with @pinia/colada for reactive data fetching and advanced caching.
- 🧩 **Component Organization**: Modular structure with containers, tables, and modals.

## Tech Stack

- **Vue 3** & Composition API
- **TypeScript**
- **Pinia** + **@pinia/colada**
- **Tailwind CSS**
- **Font Awesome** (icon plugin)
- **@vueuse/core** (utilities)
- **Vite** (build tool)
- **ESLint** with **@antfu/eslint-config**

## Project Structure

```
kiratech-test/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── containers/      # Main UI containers (UserMainCard, UserHeader, etc.)
│   │   ├── tables/          # Table, search, sort, pagination components
│   │   ├── modals/          # User detail modal
│   │   └── LoadingSpinner.vue
│   ├── composables/         # Custom Vue composables (e.g., useBreakpoints)
│   ├── services/            # API and repository implementations
│   ├── stores/              # Pinia stores
│   ├── types/               # Centralized TypeScript interfaces
│   ├── utils/               # Utility functions
│   ├── App.vue
│   ├── main.ts
│   └── plugins/             # FontAwesome plugin
├── public/
├── index.html
├── package.json
├── tailwind.config.cjs
├── vite.config.ts
├── README.md
```

## Coding Standards

- **TypeScript-first**: All logic, props, emits, and stores are strictly typed.
- **Composition API + `<script setup>`**: Modern Vue best practices.
- **Centralized types**: Shared types/interfaces live in `/src/types`.
- **ESLint**: Enforced with @antfu/eslint-config for code consistency.

## Development & Setup

### Prerequisites

- Node.js v20+
- pnpm (preferred)
- Recommended IDE: WebStorm or VSCode with Vue, TypeScript, ESLint plugins

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
# App runs at http://localhost:5173
```

### Linting & Formatting

```bash
pnpm lint
pnpm format
```

### Build

```bash
pnpm build
```

## Data Fetching & Caching Strategy

This project uses **@pinia/colada** for advanced query caching and efficient data fetching.

### Pagination & Caching Behavior

- **Sort: None (Default Pagination Mode)**
  - Uses @pinia/colada’s caching: when you visit a page (e.g., page 1), the result is cached.
  - Navigating back to a previously visited page (e.g., from page 3 to page 1) does not trigger a new API request; data is served from cache.
  - Visiting a new page (e.g., page 4 for the first time) triggers an API request and then caches the result.
  - This demonstrates efficient, per-page caching and avoids redundant network requests.

- **Other Sort Modes**
  - When sorting is enabled, the app fetches up to 100 users in a single request (client-side mode).
  - All filtering, sorting, and pagination are handled client-side, making the search bar fully functional across all users and pages.
  - This enables instant, cross-page searching and sorting.

### Search Bar Behavior & Current Limitation

- **Sort: None**
  - The search bar only filters the users on the first page. If you are on any page other than page 1, searching will not return results—even if the user exists elsewhere. This is because only the first page's data is available for searching in this mode. Full cross-page search would require fetching all users at once (potential future improvement).

- **Other Sort Modes**
  - The search bar works globally across all loaded users (up to 100), regardless of the current page.
  - This is because all user data is available client-side for filtering.

#### ⚠️ Known Issue
> In **"Sort: None"** mode, the search bar only works for users on the first page. If you are on any page other than page 1, searching will not return results—even if the user exists elsewhere. This is because only the first page's data is available for searching in this mode. Full cross-page search would require fetching all users at once (potential future improvement).

## Other Known Issues & Limitations

- **Gender Filtering Not Supported with Seed**
  - The backend/mock API uses a fixed seed for user data. When a seed is specified, the `gender` parameter does not work as expected. This means filtering users by gender is not possible in this demo, and therefore a gender filter UI is not provided.

- **Client-side User Cap**
  - In client-side mode (any sort selected), only up to 100 users are fetched and available for searching/sorting. For larger datasets, this would need to be increased or paginated.

## Acknowledgments

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)
- [@pinia/colada](https://github.com/antfu/pinia-colada)
- [@vueuse/core](https://vueuse.org/)

---

_Made with ❤️ by Gazoon007_
