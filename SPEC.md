# Dream Board — SPEC.md

## 1. Concept & Vision

**Dream Board** — a mobile-first vision boarding app built for iPhone 17 (vertical only). The vibe is clean, focused, and aspirational. You open it in the morning, see your goals staring back at you with motivational quotes from the greats — athletes, CEOs, achievers — and it sets the tone for your day. Think: a minimal white journal meets a premium goal tracker.

**Tagline:** "Focus Daily"
**Header:** "Dream Board"

---

## 2. Design Language

**Aesthetic:** Clean, minimal, premium — white space dominant, content-forward. Inspired by high-end journal apps and luxury productivity tools.

**Color Palette:**
- Background: `#FFFFFF`
- Card background: `#F9F9F9`
- Primary text: `#1A1A1A`
- Secondary text: `#666666`
- Accent (quote strip): `#F5F0E8` (warm cream)
- Card border: `#E8E8E8`

**Typography:**
- Title: `Cormorant Garamond` (elegant serif — Google Fonts) — 700 weight
- Subtitle/tagline: `Cormorant Garamond` — 400 italic
- Body/card text: `DM Sans` — 400/500
- Quotes: `Cormorant Garamond` — 400 italic

**Spatial System:**
- Full viewport width, no horizontal scroll for main views
- Card padding: 16px
- Card border-radius: 20px (rounded corners)
- Card gap: 16px vertical
- Section padding: 24px horizontal

**Motion Philosophy:**
- Swipe transitions: smooth horizontal snap (CSS scroll-snap)
- Card hover/tap: subtle scale 0.98 on press
- Quote rotation: gentle fade-slide transition (300ms)
- Mosaic view: CSS grid with fade-in on view change

**Visual Assets:**
- Emoji as category markers (📍 🏆 💪 🌊 🏔️ 🎯)
- User-uploaded images (stored in localStorage as base64)
- Video thumbnails shown as rounded cards (poster frame or first-frame placeholder)

---

## 3. Layout & Structure

**Mobile-only, vertical orientation. No responsive desktop — locked to ~393px width (iPhone 17).**

### Views:

**View 1 — Main (Single Card Swipe)**
```
┌─────────────────────────────┐
│  Dream Board                 │ ← sticky header
│  Focus Daily                 │
├─────────────────────────────┤
│                             │
│  "Quote strip" (rotating)   │ ← warm cream bg, italic Cormorant
│  — Kobe Bryant              │
│                             │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐    │
│  │  [IMAGE/VIDEO]       │    │ ← rounded 20px card, 16:22 aspect
│  │  Rounded top         │    │
│  ├─────────────────────┤    │
│  │  Title               │    │
│  │  Subtext             │    │
│  └─────────────────────┘    │
│                             │
│  ← swipe left/right to see  │
│    other cards              │
│                             │
│  ● ○ ○ ○  (dot indicator)  │
│                             │
└─────────────────────────────┘
```

**View 2 — Vertical Stack (Scroll)**
Same cards, vertical scroll — one after another. Swipe between this and View 1.

**View 3 — Mosaic View**
All cards shown as a tiled grid (2 columns). Tap card to return to single-card view focused on that card.

**Navigation:**
- Bottom tab bar: Single | Stack | Mosaic
- All tabs are icon + label

---

## 4. Features & Interactions

### Quote Rotator
- Cycles through motivational quotes every 8 seconds
- Auto-advances OR tap to manually advance
- Source: `quotes.js` — 20+ quotes from: Michael Jordan, Kobe Bryant, Elon Musk, Jeff Bezos, Denzel Washington, Will Smith, David Goggins, Arnold Schwarzenegger, Tom Brady, etc.
- Format: `"Quote text" — Name, Title`

### Card Management
- **Add Card:** Floating `+` button (bottom right, above nav bar)
- **Add Card Modal:**
  - Image upload (camera or gallery) — required
  - Video upload (optional, replaces image display)
  - Title field (max 60 chars)
  - Subtext field (max 120 chars)
- **Edit Card:** Long-press on card → edit modal
- **Delete Card:** Swipe left in stack view → delete button
- **Reorder:** Drag handle in stack view

### Views
- **Single View:** Horizontal swipe (scroll-snap). Dot indicator shows position.
- **Stack View:** Vertical scroll. Full-width cards.
- **Mosaic View:** 2-column grid. Tap card to focus.

### Empty State
- When no cards: Full-screen illustration area + "Add your first dream" CTA + `+` button

### Data Persistence
- All cards stored in `localStorage`
- Images/videos stored as base64 (warn user if approaching 5MB localStorage limit)
- No backend — fully offline-capable

---

## 5. Component Inventory

### Header
- Title: "Dream Board" — Cormorant Garamond 700, 22px
- Subtitle: "Focus Daily" — Cormorant Garamond 400 italic, 13px, warm-gray
- Sticky at top, white bg with subtle bottom border

### Quote Strip
- Warm cream background (#F5F0E8)
- Quote text — Cormorant Garamond italic 15px, centered
- Attribution — DM Sans 11px, right-aligned
- Tap to advance, auto-advance every 8s
- Transition: fade (opacity 0→1, 300ms)

### Dream Card
- Max-width: ~93vw (constrained)
- Rounded top (20px radius), square-ish overall card
- Image/video: fills top ~65% of card, object-fit cover
- Title: DM Sans 600 16px, max 2 lines
- Subtext: DM Sans 400 13px, warm-gray, max 3 lines
- States: default, pressed (scale 0.98), editing (blue border)

### Navigation Bar
- Fixed bottom, white bg, top border
- 3 tabs: Single (◇), Stack (≡), Mosaic (⊞)
- Active tab: primary color + filled icon
- Inactive: warm-gray

### Add Button
- Floating, bottom-right, above nav bar
- 52px circle, charcoal bg, white `+` icon
- Shadow: 0 4px 16px rgba(0,0,0,0.15)
- Press: scale 0.95

### Add/Edit Modal
- Full-screen modal sliding up from bottom
- White bg, rounded top corners (24px)
- Close X button top right
- Image upload zone: dashed border box, tap to upload
- Video toggle: switch to enable video instead
- Title input: single line, border-bottom style
- Subtext: multi-line textarea
- Save button: full-width, charcoal bg

---

## 6. Technical Approach

**Stack:** React 18 + Vite, plain CSS (no Tailwind), localStorage persistence

**Architecture:**
```
src/
  components/
    Header.jsx
    QuoteStrip.jsx
    Card.jsx
    CardModal.jsx
    NavBar.jsx
    AddButton.jsx
  views/
    SingleView.jsx
    StackView.jsx
    MosaicView.jsx
  data/
    quotes.js
  hooks/
    useLocalStorage.js
    useQuoteRotator.js
  App.jsx
  main.jsx
  index.css
```

**Key Implementation Details:**
- Horizontal scroll in Single View: `scroll-snap-type: x mandatory` + JS for dot tracking
- Vertical scroll in Stack View: standard overflow-y scroll
- Mosaic: CSS grid `grid-template-columns: 1fr 1fr`, gap 12px
- Video: `<video>` element with `controls`, muted by default
- Image upload: FileReader API → base64 → stored in card object
- Quote rotator: `setInterval` with index cycling, pauses on manual tap

**External Resources:**
- Google Fonts: Cormorant Garamond (400, 400i, 700), DM Sans (400, 500, 600)
- No external component libraries
- No backend
