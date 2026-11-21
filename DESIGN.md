# Design Brief

## Direction

Vice Tide — a Miami Vice / GTA Vice City tropical neon paradise: Kish Island sea conditions rendered as a premium 1980s beach club at dusk, dark navy glass panels washed in turquoise, magenta and sunset orange.

## Tone

Maximalist retro-futurist glamour with disciplined data: cinematic hero atmosphere and neon edges, but every reading stays crisp, labeled and timestamped.

## Differentiation

A retro synthwave horizon (sun disc, palm silhouettes, scanline sea) sits directly above an instrument-grade conditions panel, so the app feels like a neon beach club whose dashboard is trustworthy.

## Color Palette

| Token       | OKLCH             | Role                                          |
| ----------- | ----------------- | --------------------------------------------- |
| background  | 0.155 0.055 268   | deep navy-violet night canvas                 |
| foreground  | 0.96 0.012 250    | warm off-white text                           |
| card        | 0.205 0.06 270    | translucent navy glass panels                 |
| primary     | 0.8 0.14 195      | aqua/turquoise neon — CTAs, active nav, links |
| accent      | 0.68 0.24 345     | hot magenta — highlights, map markers, focus  |
| secondary   | 0.27 0.06 272     | raised navy surfaces, chips                   |
| muted       | 0.265 0.055 272   | section bands, table stripes                  |
| success     | 0.8 0.16 172      | Favorable status (aqua-green)                 |
| warning     | 0.8 0.16 62       | Caution status, UV high band (sunset orange)  |
| destructive | 0.63 0.24 12      | Unfavorable status, official warnings         |

## Typography

- Display: Bricolage Grotesque — hero, section headings, wordmark; heavy weight, tight tracking, occasional uppercase.
- Body: Satoshi — paragraphs, labels, tables, forms, Persian fallback slot.
- Mono: JetBrains Mono — coordinates, timestamps, tabular numerals (falls back to body in RTL).
- Scale: hero `text-5xl md:text-7xl font-extrabold tracking-tight`, h2 `text-3xl md:text-4xl font-bold`, label `label-caps`, body `text-base leading-relaxed`.
- Persian mode: body slot carries Arabic-script fallback; numerals stay tabular, RTL flips chart axes and table order.

## Elevation & Depth

Layered night: body carries three fixed radial glows (violet top-left, magenta top-right, aqua bottom). Cards use `surface-glass` (translucent navy + blur + inset highlight); hero and key panels use `surface-neon-edge` for a gradient cyan→violet→magenta hairline. Only the hero and current-conditions panel take `shadow-elevated`.

## Structural Zones

| Zone    | Background                                | Border              | Notes                                                       |
| ------- | ----------------------------------------- | ------------------- | ----------------------------------------------------------- |
| Header  | `bg-card/70` + backdrop blur, sticky      | `border-b`          | wordmark, nav tabs, EN/فارسی pill; aqua active underline     |
| Hero    | `hero-vice` synthwave gradient            | none                | sun disc, palm silhouettes, scanline sea, neon-edged overlay |
| Content | `bg-background`                           | —                   | alternate `bg-muted/30` bands between sections               |
| Footer  | `bg-sidebar/80`                           | `border-t`          | data-source credits, forecast disclaimer, neon top rule      |

## Spacing & Rhythm

Sections `py-12 md:py-20`; cards `p-5 md:p-7` with `gap-5`; metric clusters use tight `gap-2` inside a card so each panel reads as one instrument cluster; generous outer margins keep the neon from crowding text.

## Component Patterns

- Buttons: `bg-gradient-primary` aqua→magenta for primary, `surface-glass` outline secondary, pill language toggle, `transition-smooth` hover lift.
- Cards: `surface-glass rounded-2xl`; immersive beach cards full-bleed gradient (ocean/sunset) with dark bottom overlay for legible name + metrics.
- Status chips: pill — Favorable (`bg-success/15 text-success` + aqua dot), Caution (`bg-warning/15 text-warning`), Unfavorable (`bg-destructive/15 text-destructive`), Insufficient Data (`border-border text-muted-foreground` outline).
- Map markers: glowing cyan (`shadow-neon`) for live, magenta (`shadow-neon-pink`) for flagged; low-contrast grid map so markers pop.

## Motion

- Entrance: `animate-fade-up` staggered 60ms across cards; hero text fades in once.
- Hover: border brightens toward accent, shadow rises to `elevated`, 300ms via `transition-smooth`.
- Decorative (always `motion-safe:`): `animate-swell` on wave glyph, `animate-pulse-soft` on live dot, `animate-neon-drift` on hero gradient, `animate-sheen` on primary CTA.

## Constraints

- Never fabricate a value — missing data renders "No data" in muted text, never a placeholder number.
- Every metric shows its timestamp and a "forecast estimate" marker where applicable.
- UV sun-protection advice lives in a card visually distinct from sea-safety content.
- Data text never sits on raw saturated gradient: use dark overlay or glass panel behind it.
- Full RTL: logical spacing utilities (`ps-`/`pe-`), mirrored icons, charts reversed in Persian.
- Mobile-first: single column under `md`, metric strip scrolls horizontally with `scrollbar-slim`, tap targets ≥44px.

## Signature Detail

A retro neon "horizon rule" — a hairline cyan→magenta gradient line with a faint glow that underlines section headings and separates the hero from the dashboard, echoing the Vice City sunset line.
