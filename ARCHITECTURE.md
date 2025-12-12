# Mini-Games Platform - Architecture

## Project Overview
A React-based modular gaming dashboard hosting multiple interactive mini-games with persistent navigation. Currently features Wheel of Fortune and Time Attack games, designed for scalability.

---

## Directory Structure

```
mini-games/
├── public/                          # Static assets
├── src/
│   ├── @types/                      # Global TypeScript definitions (.d.ts)
│   │   ├── game.d.ts               # Game module types
│   │   ├── wheel-of-fortune.d.ts   # Wheel of Fortune specific types
│   │   ├── time-attack.d.ts        # Time Attack specific types
│   │   ├── user.d.ts               # User and session types
│   │   └── api.d.ts                # API response types
│   │
│   ├── api/                         # API layer (React Query)
│   │   ├── queries/                # React Query hooks
│   │   ├── mutations/              # React Query mutations
│   │   └── client.ts               # API client configuration
│   │
│   ├── components/                  # Shared components
│   │   ├── layout/                 # Layout components
│   │   │   ├── sidebar.tsx         # Main navigation sidebar
│   │   │   ├── navbar.tsx          # Top navigation bar
│   │   │   ├── main-layout.tsx     # App layout wrapper
│   │   │   └── game-layout.tsx     # Game page layout wrapper
│   │   │
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...                 # Other shadcn components
│   │   │
│   │   └── common/                 # Reusable common components
│   │       ├── loading-spinner.tsx
│   │       ├── error-message.tsx
│   │       ├── game-card.tsx       # Game selection card
│   │       └── score-display.tsx   # Score/result display
│   │
│   ├── games/                       # Game modules (isolated)
│   │   ├── wheel-of-fortune/
│   │   │   ├── components/         # Game-specific components
│   │   │   │   ├── wheel-canvas.tsx
│   │   │   │   ├── spin-button.tsx
│   │   │   │   ├── prize-section.tsx
│   │   │   │   └── result-modal.tsx
│   │   │   ├── hooks/              # Game-specific hooks
│   │   │   │   ├── use-wheel-spin.ts
│   │   │   │   └── use-prize-calculation.ts
│   │   │   ├── utils/              # Game-specific utilities
│   │   │   │   ├── physics.ts
│   │   │   │   └── probability.ts
│   │   │   └── index.tsx           # Main game component
│   │   │
│   │   └── time-attack/
│   │       ├── components/         # Game-specific components
│   │       │   ├── chronometer-display.tsx
│   │       │   ├── stop-button.tsx
│   │       │   ├── accuracy-meter.tsx
│   │       │   └── result-panel.tsx
│   │       ├── hooks/              # Game-specific hooks
│   │       │   ├── use-chronometer.ts
│   │       │   └── use-accuracy-check.ts
│   │       ├── utils/              # Game-specific utilities
│   │       │   └── time-calculation.ts
│   │       └── index.tsx           # Main game component
│   │
│   ├── hooks/                       # Global custom hooks
│   │   ├── use-game-state.ts       # Game state management
│   │   ├── use-leaderboard.ts      # Leaderboard data
│   │   └── use-user-score.ts       # User score tracking
│   │
│   ├── lib/                         # Utilities and configurations
│   │   ├── constants/              # Constants and enums
│   │   │   ├── game-constants.ts   # Game-related constants
│   │   │   ├── routes.ts           # Route definitions
│   │   │   └── ui-constants.ts     # UI constants
│   │   ├── utils/                  # Utility functions
│   │   │   ├── cn.ts               # Tailwind class merger
│   │   │   ├── format.ts           # Formatters
│   │   │   └── storage.ts          # LocalStorage helpers
│   │   └── validations/            # Yup schemas
│   │       └── game-validation.ts  # Game input validations
│   │
│   ├── pages/                       # Page components (routes)
│   │   ├── home.tsx                # Dashboard/home page
│   │   ├── wheel-of-fortune-page.tsx
│   │   ├── time-attack-page.tsx
│   │   └── leaderboard.tsx         # Leaderboard page
│   │
│   ├── app.tsx                      # Root app component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles (Tailwind)
│
├── .github/
│   └── copilot-instructions.md     # Development guidelines
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── ARCHITECTURE.md                  # This file
```

---

## Key Architecture Principles

### 1. **Modular Game Design**
- Each game is an **isolated module** under `src/games/[game-name]/`
- Games have their own components, hooks, and utilities
- New games can be added without touching core architecture
- Each game exports a main component from `index.tsx`

### 2. **Type Safety**
- All types in `src/@types/*.d.ts` (global, no imports)
- Use `.d.ts` extension for type files
- Naming: `kebab-case.d.ts` (e.g., `wheel-of-fortune.d.ts`)

### 3. **Component Structure**
- Break pages into logical sections
- Each section = separate component file
- **Never** nest component definitions
- Use kebab-case for file names (e.g., `game-card.tsx`)

### 4. **Styling**
- **Only** shadcn/ui components + Tailwind CSS
- **No** custom CSS files
- **No** inline styles
- All components in `src/components/ui/` from shadcn

### 5. **State Management**
- React Query for all API calls
- Always handle: `data`, `isLoading`, `isError`
- Use early returns for loading/error states

### 6. **Form Validation**
- Always use **yup** for validations
- Schemas in `src/lib/validations/`

### 7. **Constants Over Magic Values**
- All magic strings/numbers → named constants
- Store in `src/lib/constants/`
- Use descriptive constant objects/enums

### 8. **Prop Passing**
- Pass entire objects, not destructured props
- `<Component data={object} />` not `<Component a={obj.a} b={obj.b} />`

---

## Game Module Template

When adding a new game, follow this structure:

```
src/games/[game-name]/
├── components/              # UI components specific to this game
├── hooks/                   # Custom hooks for game logic
├── utils/                   # Helper functions
└── index.tsx               # Main game component (exported)
```

**Example `index.tsx`:**
```tsx
export default function NewGame() {
  return (
    <div>
      {/* Game content */}
    </div>
  );
}
```

---

## Navigation Flow

1. **Main Layout** (`main-layout.tsx`)
   - Contains persistent Sidebar/Navbar
   - Wraps all pages

2. **Home Page** (`pages/home.tsx`)
   - Dashboard with game cards
   - Links to individual games

3. **Game Pages** (`pages/[game]-page.tsx`)
   - Imports game module from `games/[game]/index.tsx`
   - Wraps with `game-layout.tsx` if needed

4. **Leaderboard** (`pages/leaderboard.tsx`)
   - Displays scores across all games

---

## Routing Structure

```
/                           → Home (game selection dashboard)
/wheel-of-fortune          → Wheel of Fortune game
/time-attack               → Time Attack game
/leaderboard               → Global leaderboard
```

---

## Tech Stack

- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** React Query
- **Validation:** Yup
- **Routing:** React Router (to be configured)

---

## Development Guidelines

- Follow rules in `.github/copilot-instructions.md`
- Use kebab-case for all file names
- Keep components small and focused
- Each game is independent and self-contained
- Test games in isolation before integration

---

## Future Scalability

To add a new game:
1. Create folder: `src/games/[new-game]/`
2. Add components, hooks, utils inside
3. Create `index.tsx` as main export
4. Add types to `src/@types/[new-game].d.ts`
5. Create page: `src/pages/[new-game]-page.tsx`
6. Add route to router
7. Add game card to home page

**No core code changes required!**
