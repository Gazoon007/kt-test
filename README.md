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

## Acknowledgments

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)
- [@pinia/colada](https://github.com/antfu/pinia-colada)
- [@vueuse/core](https://vueuse.org/)

---

_Made with ❤️ by Gazoon007_
