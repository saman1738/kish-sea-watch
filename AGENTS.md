# Project Guidance

## User Preferences

- English is the default language with a Persian switcher and full right-to-left layout
- Mobile-friendly, Android-responsive interface
- Never invent measurements, coordinates or safety claims; show data timestamps and mark forecast estimates
- Vibrant turquoise, aqua, deep ocean blue, sunset pink, hot magenta, purple and warm orange palette on dark navy surfaces
- Bold retro 1980s typography for headings with clean readable fonts for data
- Dark navy neon tropical theme with turquoise, aqua, magenta and sunset orange accents
- Bold retro 1980s display headings with clean readable data type

## Accepted Requirements

- Four seeded beaches: Marjan Beach, Simorgh Beach, Mir Mahna Coastal Park, Fisherman Beach Park with verified coordinates
- Live marine and weather data from Open-Meteo marine and forecast APIs with timestamps and forecast labelling
- Dashboard with current conditions, swimming suitability, 24-hour and seven-day forecasts and charts for waves, wind, temperature and UV
- UV index categories with practical sun protection advice kept separate from sea safety
- Beach comparison with separate rankings for swimming, fishing, surfing and water sports, kayaking and paddleboarding, with explained statuses
- Interactive Kish Island map of monitored beaches with current conditions
- Community reports with beach, submission time and unverified labelling
- Admin dashboard to manage beaches, review reports and publish official warnings
- English default with Persian language switcher and full RTL support
- Complete visual redesign to a 1980s Miami Vice / GTA Vice City tropical neon aesthetic
- Large tropical hero section on the homepage
- Current sea conditions shown prominently
- Distinctive indicators for Favorable, Caution, Unfavorable and Insufficient Data
- Glowing cyan and pink markers on the interactive beach map
- Preserve all existing features, API connections, data logic, beach locations and admin functionality
- English default with Persian secondary language and proper RTL layout
- Excellent mobile responsiveness, especially on Android

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- TanStack Router: export the router from src/router.tsx and render RouterProvider in App.tsx to avoid circular imports
- Biome rejects role=listbox on ul and role=group on div; use plain ul and fieldset with border-0 for chip groups
- Mobile comparison rows must own their own useConditions query in a child component; a page-level map of hooks breaks the rules of hooks
- Guard decorative Tailwind animations with motion-safe: so prefers-reduced-motion is honored
- Recharts gradient ids must come from useId() so url(#id) references stay valid
- i18n lives in lib/i18n.tsx with en and fa dictionaries; I18nProvider sets documentElement lang/dir and persists the choice in localStorage key kish-seawatch-lang
- index.css is the single source of design tokens; the .dark block is never activated, so dark surfaces must be set on :root
- data-ocid attributes across pages and components are load-bearing for browser tests and must be preserved during restyling
- The design system ships surface-glass, surface-neon-edge, bg-gradient-primary, text-gradient-accent, shadow-neon, shadow-neon-pink and hero-vice (inline SVG palm art) utilities; reuse them instead of new tokens
- Tailwind opacity modifiers like bg-primary/8 are not generated; use /10 or another standard step so the class emits CSS
- Recharts axis and grid colors accept oklch(var(--token)) strings directly, so chart ticks match the theme without new tokens
- The i18n dictionary in lib/i18n.tsx is typed and now holds 242 keys in both en and fa; add new keys to both dictionaries in the same edit
- CompareMatrix is a per-beach card list rather than a table so narrow Android viewports never overflow horizontally
- Hero content must sit in a z-10 wrapper so the hero-vice palm and horizon pseudo-layers stay behind the text
- The hero headline is a single i18n key hero.headline consumed only by HeroSection.tsx:104; changing it requires updating both en and fa dictionaries in lib/i18n.tsx
- src/frontend/env.json ships literal "undefined" placeholders on purpose; Caffeine injects the real backend canister id and host at deploy time, so never edit env.json with real values
- Backend actor state in src/backend/main.mo must be initialized in the actor body and seeded there, because the stable migration only runs when upgrading an existing canister
- Seeding must stay idempotent: only insert the predefined beaches when the beach map is empty so admin edits are never overwritten
- With --enhanced-migration, stable actor fields in src/backend/main.mo cannot carry initializers; a fresh install needs an explicit Seed.ensureSeeded call in the actor body because the migration only runs on upgrade
- Open-Meteo marine rejects water_temperature with HTTP 400; the sea temperature variable is sea_surface_temperature and ocean_current_velocity is in km/h
- useActor returns null until its async actor query resolves, so backend queries must stay enabled on actor presence and refetch themselves
- IslandMap's map.empty state shows whenever listBeaches() is empty, so backend seeding failures surface as a map empty state
- useBeaches must throw when the actor is null, not return [], so an unreachable backend shows BackendError instead of a misleading empty beach list
- IslandMap takes showEmpty so MapPage can own the no-coordinates message and never show map.empty during loading or backend failure
- Fresh installs replay the migration chain from an empty actor, so main.mo must still call Seed.ensureSeeded in the actor body; the migration alone does not seed a new canister
