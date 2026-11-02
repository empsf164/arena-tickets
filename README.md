# ARENA — Premium Sports Ticketing Platform
> **“Feel the Game. Be There.”**

ARENA is an international multi-sport event discovery, interactive stadium seating, and digital ticket booking platform engineered for professional sporting fixtures, championships, and stadium experiences.

---

## 🏆 Key Features

- **Cinematic Event Discovery**:
  - Multi-sport coverage: Football, Cricket, Basketball, Tennis, Rugby, Badminton, Formula Racing, Volleyball.
  - Asymmetric spotlight hero cards and live tournament schedules.
  - Multi-criteria real-time filtering: search keywords, sport categories, competitions, venues, price range slider ($50 – $1000+), and availability.
  - Instant Grid vs. List layout toggle.

- **Interactive Stadium Seating Map**:
  - Interactive SVG stadium diagram with clickable stands (North Stand, South Stand, East Stand, West Stand, VIP Hospitality).
  - Live stand inspector with capacity stats, view angles, starting prices, and section descriptions.
  - Interactive Seat Grid with rows (A to G) and numbered individual seats (1 to 14) supporting live states: Available, Selected, Reserved/Sold Out, and VIP Premium.
  - Full keyboard accessibility (`Tab`, `Enter`, `Space`) and screen-reader ARIA tags.

- **Multi-Step Ticket Booking Flow**:
  1. **Category Selection**: Compare tiers (General Admission, Lower Tier, Club, VIP Hospitality) and set ticket quantity.
  2. **Seat Selection**: Interactive stadium diagram + seat-by-seat picking with real-time seat tagging.
  3. **Order Summary**: Dynamic itemized calculations (Subtotal, 5% Booking Fee, Stadium Facility Levy, 8% VAT/Tax, Grand Total).
  4. **Customer Info**: Verified form inputs with live validation.
  5. **Payment UI (Demo)**: Credit/Debit card auto-formatting & brand detection (Visa/Mastercard/Amex), simulated UPI with QR scan, and Digital Wallets (Apple Pay & Google Pay).
  6. **Confirmation**: Instant booking generation with unique reference code (e.g. `ARN-84920`) persisted in `localStorage`.

- **Official Digital Match Pass (Ticket Details)**:
  - High-end perforated sports boarding pass with stadium notches and security code.
  - Real-time SVG QR Code turnstile placeholder.
  - Gate, turnstile, stand, row, seat, kickoff, and buyer details.
  - Print optimization (`@media print` stylesheet).
  - RFC 5545 iCalendar (`.ics`) file generator for Apple Calendar, Google Calendar, and Outlook.
  - Dedicated **Booking Reference Lookup** bar for fast ticket retrieval.

- **Dark & Light Theme System**:
  - Default: **Stadium Black & Deep Midnight Navy** with Electric Cobalt Blue (`#0052FF`) accents and Signal Orange badges.
  - Light mode: Clean high-contrast white and slate surfaces with persistent `localStorage` memory and OS system preference detection.

- **Strict Specification Compliance**:
  - **No dashboards** (no admin or customer dashboard); customers access tickets via focused match passes and booking lookups.
  - Fully mobile-first responsive architecture with locked-scroll mobile drawer.
  - No broken links (`href="#"` avoided; all routes connected).

---

## 📁 File Structure

```text
arena-tickets/
├── index.html                   # Cinematic homepage with hero, fixtures, venues, & features
├── events.html                  # Multi-sport discovery with live filters, sorting, & grid/list toggle
├── event-details.html           # Detailed match overview, timeline, & ticket categories
├── venue-details.html           # Stadium overview, stats, interactive SVG seating map, transport
├── booking.html                 # 5-step interactive ticket booking engine with seat picker
├── booking-confirmation.html    # Booking success, reference badge, & match recap
├── ticket-details.html          # Official digital boarding pass, QR placeholder, print/calendar/lookup
├── login.html                   # Sign-in authentication (no dashboard redirect)
├── signup.html                  # Member registration (redirects to discovery)
├── forgot-password.html         # Email recovery with interactive 60s cooldown timer
├── help.html                    # Searchable FAQ accordion & matchday desk contact form (alias)
├── contact.html                 # Contact us & matchday support desk page
├── 404.html                     # Offside sports-themed 404 error page
├── coming-soon.html             # Tournament presale countdown & priority ballot alert
│
├── assets/
│   ├── css/
│   │   ├── theme.css            # Design tokens, CSS variables, dark & light themes
│   │   ├── style.css            # Components, cards, seating SVG, stepper, pass styles
│   │   └── responsive.css       # Mobile drawer, media queries, print stylesheet
│   │
│   └── js/
│       ├── theme.js             # Dark/light theme persistence and toggle
│       ├── events.js            # Multi-sport events database & search/filter methods
│       ├── fixtures.js          # Fixture list renderer & category tabs
│       ├── seating.js           # SVG stadium map & seat selector engine
│       ├── booking.js           # Multi-step booking coordinator & price engine
│       ├── payment.js           # Card formatting, brand detection, UPI/wallet tabs
│       ├── tickets.js           # Digital match pass renderer, ICS calendar export, print
│       ├── auth.js              # Password toggles & authentication flows
│       └── main.js              # Navbar scroll lock, modal search, GSAP animations, toasts
│
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser or serve via any static HTTP server (e.g. VS Code Live Server, Python `python -m http.server 8000`, or Node `npx serve`).

### Dependencies (Loaded via CDN)
- **Bootstrap 5.3.3** (Responsive grid, modal, dropdowns)
- **Bootstrap Icons 1.11.3** (Sports and UI iconography)
- **GSAP 3.12.5** (Subtle micro-animations)
- **Google Fonts**: Barlow Condensed (Headings) & Inter (UI/Body)
