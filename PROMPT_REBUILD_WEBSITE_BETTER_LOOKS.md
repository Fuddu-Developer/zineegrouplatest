# Detailed Prompt: Rebuild This Website With Better Looks (Functionality Unchanged)

**Purpose:** Give this document to another AI (or developer) so they can recreate this website with improved visual design, UX, and polish. **Every feature and functionality must remain exactly as specified—nothing may be removed or changed in behavior.**

---

## 1. Project Overview

- **Stack:** Next.js 14 (App Router), React 18, TypeScript.
- **Brand:** Zineegroup / Helloans — loan aggregation and financial services (India).
- **Metadata:** Title "Zineegroup - Fastest Way To Get Money"; description about instant loans, personal loans, business loans, etc.
- **Fonts:** Inter (variable `--font-inter`) and Poppins (variable `--font-poppins`), loaded via `next/font/google` with `display: swap`.
- **Viewport:** `width: device-width`, `initialScale: 1`, `maximumScale: 5`.

---

## 2. Global Layout & Providers (Must Keep)

- **Root layout** (`app/layout.tsx`):
  - Wraps app with `DarkModeProvider` then `LanguageProvider`.
  - Renders a **vector background** div: `id="vectorBackground"` (used by header/footer for style-3; can be hidden on specific pages like CIBIL or bank apply).
  - Renders **ChatBot** as a floating widget on all pages.
- **Page shell (most pages):**
  - Structure: `page-container` → `scrollable-content` → `main-body` with `sidebar left-sidebar`, `main-content`, `sidebar right-sidebar` → `Footer`.
  - Header is included per-page (not in root layout) so it can be different (e.g. Axis bank apply page uses `AxisBankHeader` only).
- **Body:** `padding-top` reserved for fixed **Stock Ticker** + **Header** (e.g. ~117px). Light theme default background e.g. `#f0f9ff`; dark mode supported via `.dark` on `html`.

---

## 3. Header (Must Keep All Behavior)

- **Stock Ticker** (above header):
  - Fixed at top, full width. Fetches from **GET `/api/stocks`** (polling e.g. every 30s). Displays bank names and their loan types with ROI. Grouped by bank; duplicate content for seamless horizontal scroll animation. Fallback static data if API fails. Loading state: "Loading bank loan rates...".
- **Main header** (`id="mainHeader"`):
  - On load, force: `vectorBackground` class `style-3`, header `header-style-3`, footer `footer-style-3`.
  - **Logo:** Link to `/`, image `/assets/images/Logo-Helloans.png` (e.g. 200×68), inside a glass-style wrap.
  - **Nav links** (exact hrefs and keys): Home `/`, About us `/about-us`, EMI Calculator `/emi-calculator`, **Apply Now** `/apply-for-loan` (highlight + two-line label with thunder icon + `apply.applyNowLine1` / `apply.applyNowLine2`), Cibil Score `/cibil-score`, Become Partner `/become-partner`, Talk to an Expert `/contact`.
  - **Active state:** Match by pathname; if multiple links share same href (e.g. Contact), support `activeLinkLabel` so the clicked item stays active.
  - **Mobile:** Hamburger; open state class `mobile-open` on nav; body scroll locked when open; close on route change or click outside.
  - **Header actions:** Language switcher (dropdown), Dark mode toggle, ChatBot (header instance with `showWhatsApp={false}` `showLabel={false}`).
- **Language switcher:**
  - Supported: `en`, `hi`, `ta`, `te`, `ml`, `kn`. Labels from `t(getLangLabelKey(lang))`. Dropdown with checkmark on current. Close on outside click.
- **Dark mode:** Toggle persists in `localStorage`; respects `prefers-color-scheme` if no saved value. Apply by adding/removing `dark` on `document.documentElement`.

---

## 4. Home Page (Exact Sections & Order)

1. **Hero** (inside `ScrollRevealSection` with `className="no-blur"`):
   - Title from i18n: `hero.titleLine1` and `hero.titleLine2`, with a **highlight** word (`hero.highlight`) styled (e.g. capitalized, different color).
   - **InstantLoanSlide** component: carousel (auto every 5s) with 4 slides — Instant Personal Loan, Instant Business Loan, Instant Credit Cards, Instant Loan Against Property. Each slide: title (e.g. "INSTANT PERSONAL LOAN"), subtitle text, grid of partner cards (logo + link). If partners > 9, show 8 + "View All" button that opens a modal with all partners. Dots and prev/next buttons. Partner data: name, url, logo (or null); external links `target="_blank" rel="noopener noreferrer"`.

2. **LoanTiles** (scroll reveal):
   - Section title: "Our **Loan** Products" (highlight on "Loan").
   - Grid of 12 tiles. Each: icon (sprite `loan-tiles-icons.png` 4×3 or per-loan image from `/assets/icons/`), label from `carousel.*` keys, link to `/loans/[slug]`. Slugs: personal-loans, business-loans, overdraft, secure-loans, instant-loan, balance-transfer, professional-loans, credit-cards, home-loans, gold-loans, education-loans, insurance. Tiles have top/bottom layer; hover reveals "View →".

3. **OfferCards** (scroll reveal):
   - Title "Our Offers", subtitle "Hover to reveal details". Three cards: (1) ₹1100 CASHBACK, (2) ₹3100 CASHBACK, (3) Helloans Promise. Back content from i18n: `features.offer1BackLine1/2`, `offer1Desc`, same for 2 and 3. On hover: typewriter effect (e.g. 28ms per character) for the back text; cursor while typing.

4. **Testimonials** (scroll reveal):
   - "Happy clients" label, title "**Client** Experiences", link "Read all" to `/reviews`. Horizontal scrolling track (duplicated list for infinite feel). Cards: star rating (5), quote text, divider, avatar (emoji 👤), name. Data: 6 testimonials (e.g. Ajay R, Raunak Batra, Sonia Sharma, Mona, Saurabh Verma, Priya) with fixed text and ratings.

5. **Partners** (scroll reveal):
   - Title "Our **Authorized** Partners". Horizontal slideshow of partner logos (Canara, Axis, HDFC, Kotak, PNB, BOB); duplicated for continuous scroll; pause on hover (aria-label for accessibility).

6. **Footer** (same on all pages except optional CIBIL-specific behavior):
   - Logo, tagline (`footer.tagline`), company description (`footer.description`). Quick links: Home, About us, Apply, Cibil, Contact. Get in touch: phone +91 9540 185 185 (hidden on CIBIL page), email info@zineegroup.com. Social: WhatsApp (wa.me/919540185185), Instagram, LinkedIn, Facebook, YouTube (same URLs as in code). Copyright from `footer.copyright`.

---

## 5. Scroll Reveal

- **ScrollRevealSection:** IntersectionObserver (threshold 0.15, rootMargin bottom -10%). On scroll **down** and entering viewport: reveal with optional `delay` (ms). On scroll **up** and entering: show immediately without transition (`no-reveal-transition`). On leave viewport: hide so it can animate again. Class `is-visible` when visible.

---

## 6. All Routes & Pages (Functionality Checklist)

- **`/`** — Home (above).
- **`/about-us`** — About: title, subtitle, intro paragraphs (intro1/2/3), CTA "Learn more" → `/contact`, "Apply" → `/apply-for-loan`. "Why choose us" with 4 cards (icons + titles: professional service, ultra-fast support, low interest, available 24x7). Bottom CTA section again.
- **`/contact`** — Contact: heading "Get in touch", chatbot intro, email, social links (same as footer).
- **`/apply-for-loan`** — Loan application form. POST to **`/api/loan-application`**. Fields: name, email, phone, city, pincode, message (all required). Validation: email format, phone 10 digits, pincode 6 digits. Success/error message; on success reset form. Benefits list (quick approval, low interest, minimal doc, flexible repayment). Use i18n keys for labels/placeholders.
- **`/become-partner`** — Partner form. POST to **`/api/partner-application`**. Fields: name, companyName, email, phone, city, message. Left column: benefits list (5 items), email block, social links. Right: form sections (Your details, Business, Goals). Success/error message.
- **`/cibil-score`** — CIBIL page. POST to **`/api/cibil-application`**. Fields: name, panNumber (uppercase, max 10), dob, mobileNumber (10 digits), email, city, pincode (6). Hero with badge "OFFICIAL CIBIL PARTNER", headline with "CIBIL Score" highlight, trust badges (100% Secure, Updated Daily). Form card with same fields. Below: "Why check with Helloans" glass section (3 feature bullets). Score range section: 300–549 Poor, 550–649 Average, 650–749 Good, 750–900 Excellent (visual bars/labels). Accordion "Knowledge Hub" (3 items: Golden Rules RBI & CIBIL, New RBI Guidelines 2025, Pro Tips 750+). Uses its own CSS module `cibil.module.css`; no vector background in layout if desired.
- **`/emi-calculator`** — Page title/desc from i18n. Renders **EmiCalculatorWithComparison**: **LoanCalculator** (loanType "EMI", amount/tenure/tenureUnit, sliders, pie chart, EMI result) + **BankLoanComparison** (same amount/tenure/tenureUnit; lists banks/NBFCs from `emiBanks` / `emiNbfcs` with EMI comparison).
- **`/reviews`** — Title and intro from i18n. Grid of all testimonials (same data as home). "Write a review" form: name, email, rating (1–5 dropdown), review text. POST to **`/api/reviews`**. Success/error message.
- **`/loans/[slug]`** — 12 slug pages: personal-loans, business-loans, overdraft, secure-loans, instant-loan, balance-transfer, professional-loans, credit-cards, home-loans, gold-loans, education-loans, insurance. Each: same structure — Header, main with `loan-page-header` (h1 + short description), **BankList** (offers from `bankOffers[category]`, categoryTitle and loanCategory), **LoanCalculator** (loanType, defaultInterestRate, min/max amount, defaultBanks). Loan product pages use data from `data/bankOffers.ts` and `data/loanPartners.ts`; BankList "Apply Now" links to `/apply/[internalApplySlug]?loanType=[category]`.
- **`/apply/[bankId]`** — Dynamic bank application. **bankId** one of: icici, indusind, yes, idfc, kotak, hdfc, axis. Query: `loanType` (e.g. personal-loans), optional `amount`, `tenure`, `tenureUnit`. Bank-specific hero (HDFC can have image banner; Axis uses **AxisBankHeader** only and fixed header layout). Form: mobile (10), DOB (day/month/year), source of income (salaried / self-employed), PAN upload (image, max 5MB), Aadhaar upload (same), consent checkboxes (3). Submit: POST **`/api/bank-application`** with bankId, bankName, loanType, loanLabel, form fields, and base64 PAN/Aadhaar. Success overlay with application details. File validation: type image/jpeg|png|webp|gif, size ≤ 5MB. Dynamic bank theme (primary color) and optional header image for HDFC. Vector background hidden on this page.

---

## 7. API Routes (Exact Contract)

- **POST `/api/loan-application`** — Body: name, email, phone, city, pincode, message. Validate required, email format, phone 10 digits, pincode 6 digits. Send email (e.g. Resend) to LOAN_EMAIL. Return 200 with message or 400/500 with error.
- **POST `/api/partner-application`** — Body: name, companyName, email, phone, city, message. Validate and email; same pattern.
- **POST `/api/cibil-application`** — Body: name, panNumber, dob, mobileNumber, email, city, pincode. Validate and email.
- **POST `/api/contact`** — (If used elsewhere) contact form; same idea.
- **POST `/api/reviews`** — Body: name, email, review, rating. Store/send; return success or error.
- **POST `/api/bank-application`** — Body: bankId, bankName, loanType, loanLabel, mobileNumber, day, month, year, sourceOfIncome, consentPersonalData, consentPersonalizedOffers, consentPerfios, panCard { data, filename, contentType }, aadhaarCard same. Validate and process (email or internal).
- **GET `/api/stocks`** — Return JSON `{ stocks: Array<{ bank, loanType, roi }> }`. Used by Stock Ticker; can be mock or real data.

---

## 8. ChatBot

- **ChatBot** component: chooses between **LoanChatBot** (default) and **ChatBotLegacy** via env `NEXT_PUBLIC_CHATBOT_VERSION` (default "new").
- **LoanChatBot:** Conversational flow. Initial message: "Welcome to Helloans" with options (Personal Loans, Business Loans, Home Loans, Gold/Education/Other, EMI & Repayment, CIBIL & Eligibility, I want to apply, Talk to an expert). Options can lead to sub-flows (e.g. personal → types, eligibility, documents, interest, repayment, amount). "Talk to an expert" leads to contact form (name, phone, message) then submit or WhatsApp link. Support `showWhatsApp`, `showChatToggle`, `showLabel`, `embedded`, `onClose`. Messages support title, text with newlines and bullet (•) lists. Floating UI: toggle button, optional "Talk to an expert" label, optional WhatsApp link.
- **ChatBotLegacy:** Alternative implementation; same props. If you only implement one, implement LoanChatBot and make legacy a thin wrapper.

---

## 9. Contexts (Exact Behavior)

- **LanguageContext:** Languages en, hi, ta, te, ml, kn. `t(key)` returns string for current language. Keys cover nav, hero, features, carousel, loan tiles, testimonials, footer, apply, partner, contact, CIBIL, EMI, reviews, etc. Persist language (e.g. localStorage) and provide `setLanguage`, `supportedLanguages`, `getLangLabelKey(lang)`.
- **DarkModeContext:** `theme` 'light' | 'dark', `toggleTheme`, `isDark`. Persist in localStorage; on init use saved or `prefers-color-scheme`. Apply by class on document root.

---

## 10. Data & Assets

- **data/bankOffers.ts** — `bankOffers`: Record of category → array of { bankName, link, description?, logo?, brandColor?, internalApplySlug? }. Categories: personal-loans, business-loans, instant-loan, credit-cards, home-loans, gold-loans, education-loans, insurance. internalApplySlug used for /apply/[bankId].
- **data/loanPartners.ts** — Used by loan product pages (e.g. personalLoanPartners).
- **data/emiBanks.ts** / **data/emiNbfcs.ts** — Banks and NBFCs for EMI comparison (name, logo?, rate, etc.).
- **Assets:** Logo at `/assets/images/Logo-Helloans.png`, icons under `/assets/icons/` (e.g. personal-loan.png), loan-tiles sprite `/assets/images/loan-tiles-icons.png`, partner logos in `/assets/images/` (CB, AX, HDFC, Kotak-1, PNB, BOB), partner cards in `/assets/images/partners/`, social icons in `/assets/social/`. Bank apply page may use `/assets/images/hdfc_form.png`, etc.

---

## 11. Components to Preserve (Behavior)

- **Header** — As in section 3.
- **Footer** — As in section 4.
- **StockTicker** — API + fallback, grouping, scroll animation.
- **Hero** — Title + highlight + InstantLoanSlide.
- **InstantLoanSlide** — 4 slides, partner grid, View All modal, dots, prev/next.
- **LoanTiles** — 12 tiles, sprite/images, links, hover reveal.
- **OfferCards** — 3 cards, hover typewriter reveal; i18n for back text.
- **Testimonials** — Scroll track, 6 items, link to /reviews.
- **Partners** — Logo strip, duplicate for loop, pause on hover.
- **ScrollRevealSection** — Observer, delay, scroll-direction behavior.
- **EmiCalculatorWithComparison** — LoanCalculator + BankLoanComparison; pass amount/tenure/tenureUnit to comparison.
- **LoanCalculator** — Amount/rate/tenure inputs, tenure unit Yr/Mo, EMI formula, pie chart (principal vs interest), optional `onParamsChange`, i18n.
- **BankLoanComparison** — Uses emiBanks + emiNbfcs; shows EMI per bank/NBFC for given amount/tenure.
- **BankList** — Renders bank offers; "Apply Now" → `/apply/[internalApplySlug]?loanType=[category]`.
- **AxisBankHeader** — Used on /apply/axis only.
- **ChatBot** / **LoanChatBot** / **ChatBotLegacy** — As in section 8.
- **Carousel** — If used elsewhere; current hero uses InstantLoanSlide.

---

## 12. Styling Notes (Improve, Don’t Remove Behavior)

- **Current:** Large global CSS (globals.css), glass/amorph effects on headings, light blue default bg, dark mode variants. CIBIL page has its own module with hero blobs, form card, score ranges, accordion.
- **What to improve:** Typography hierarchy, spacing, color palette, contrast (a11y), card shadows and borders, buttons and form inputs, mobile breakpoints, animation smoothness, consistency between pages (e.g. form styles, section titles). Keep: all class names used by components (or refactor consistently so behavior is unchanged), vector background id and header/footer style hooks, scroll reveal visibility logic, and any ARIA/layout structure.

---

## 13. What “Better Looks” Means (Your Freedom)

- **Visual design:** Modern, clean, professional; trust-building for a financial brand. Consider: stronger typography, consistent radius and shadows, a refined palette (including dark mode), subtle motion, better form UX (focus states, labels, errors).
- **Layout:** Same sections and order; you may change grid/flex, card sizes, and spacing.
- **Assets:** Same URLs and roles; you may replace with higher-quality or SVG where appropriate.
- **Accessibility:** Keep or improve focus management, aria-labels, contrast, and keyboard use (e.g. mobile menu, dropdowns, modal).
- **Performance:** Same data flow and API contracts; you may optimize images (Next Image), lazy load, or reduce CSS size.

---

## 14. Out of Scope (Do Not Add/Change)

- Do not remove or rename routes.
- Do not change API request/response shapes or validation rules.
- Do not remove form fields or add required fields without default.
- Do not change i18n keys or number of languages.
- Do not remove the ChatBot or change its flow structure.
- Do not remove scroll reveal or change when sections show/hide.
- Do not change partner/bank/offer data structure or apply links (internalApplySlug, loanType query).

---

## 15. Checklist for Rebuild

- [ ] All routes listed in section 6 exist and behave as described.
- [ ] Header: ticker, logo, all nav links, active state, mobile menu, language, dark mode, chatbot.
- [ ] Home: Hero, LoanTiles (12), OfferCards (3, hover typewriter), Testimonials, Partners, Footer.
- [ ] Apply-for-loan, Become-partner, CIBIL, Contact, About-us: forms and API calls unchanged.
- [ ] EMI Calculator: calculator + comparison with same inputs and data sources.
- [ ] Reviews: list + submit form and API.
- [ ] All 12 loan product pages: BankList + LoanCalculator with correct category data.
- [ ] Apply/[bankId]: all 7 banks, hero variants, form (mobile, DOB, income, PAN, Aadhaar, consents), file validation, success overlay, API.
- [ ] All 7 API routes: same methods, validation, and response format.
- [ ] Language and dark mode contexts and persistence.
- [ ] ChatBot (LoanChatBot) flow and contact/WhatsApp options.
- [ ] Assets and data files used as specified; no broken links.

Use this document as the single source of truth for functionality. Improve visuals, layout, and UX freely within these constraints.
