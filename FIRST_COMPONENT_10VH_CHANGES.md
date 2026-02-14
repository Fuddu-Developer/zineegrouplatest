# First component pulled up by 10% (10vh) – changes applied

Each page’s first component now has **`margin-top: -10vh`** so it sits **10% of the viewport height** higher (closer to the fixed header).

---

## 1. Home (`/`)

**File:** `app/globals.css`  
**First component:** `Hero` inside `.hero-carousel-wrapper`

**Change:** New rule for `.hero-carousel-wrapper`:

```css
.hero-carousel-wrapper {
    margin-top: -10vh;
}
```

**Location:** After “Hero and Carousel Container”, before `@keyframes gradientRun`.

---

## 2. About Us (`/about-us`)

**File:** `app/globals.css`  
**First component:** `.about-header` (blue block with “About Us” + Learn More)

**Change:** Set `margin-top` from `1rem` to `-10vh`:

```css
.about-header {
    /* ... */
    margin-top: -10vh;   /* was: 1rem */
    /* ... */
}
```

---

## 3. Contact (`/contact`)

**File:** `app/globals.css`  
**First component:** `.contact-us-container` (Get in touch + email + social)

**Change:** Added `margin-top: -10vh` to `.contact-us-container`:

```css
.contact-us-container {
    max-width: 1400px;
    margin: 0 auto;
    margin-top: -10vh;   /* added */
    padding: 0 20px;
}
```

---

## 4. Apply for Loan (`/apply-for-loan`)

**File:** `app/globals.css`  
**First component:** `.contact-header` inside `.apply-for-loan-page-container` (title, intro, benefit chips)

**Change:** Added `margin-top: -10vh` to the Apply-for-Loan-specific header:

```css
.apply-for-loan-page-container .contact-header {
    text-align: center;
    margin-bottom: 2rem;
    margin-top: -10vh;   /* added */
}
```

---

## 5. Become Partner (`/become-partner`)

**File:** `app/globals.css`  
**First component:** `.partner-hero` (“Join our network…”)

**Change:** Added `margin-top: -10vh` to `.partner-hero`:

```css
.partner-hero {
    text-align: center;
    margin-bottom: 40px;
    margin-top: -10vh;   /* added */
    padding: 32px 24px;
    /* ... */
}
```

---

## 6. EMI Calculator (`/emi-calculator`) and Loans sub-pages (`/loans/*`)

**File:** `app/globals.css`  
**First component:** `.loan-page-header` (page title + description)

**Change:** Added `margin-top: -10vh` to `.loan-page-header`:

```css
.loan-page-header {
    text-align: center;
    margin-bottom: 50px;
    margin-top: -10vh;   /* added */
    position: relative;
    /* ... */
}
```

**Affects:** `/emi-calculator`, `/loans/personal-loans`, `/loans/home-loans`, and all other routes that use `.loan-page-header`.

---

## 7. CIBIL Score (`/cibil-score`)

**File:** `app/cibil-score/cibil.module.css`  
**First component:** `.heroSection` (CIBIL hero + form)

**Change:** Added `margin-top: -10vh` to `.heroSection`:

```css
.heroSection {
    position: relative;
    width: 100%;
    background-color: #f8fafc;
    padding: 4rem 1rem;
    overflow: hidden;
    margin-top: -10vh;   /* added */
}
```

---

## 8. Reviews (`/reviews`)

**File:** `app/globals.css`  
**First component:** `.reviews-header` (title + intro)

**Change:** Added `margin-top: -10vh` to `.reviews-header`:

```css
.reviews-header {
    text-align: center;
    margin-bottom: 50px;
    margin-top: -10vh;   /* added */
    padding: 0;
}
```

---

## Summary table

| Page            | Route              | Selector (first component)              | File              |
|-----------------|--------------------|------------------------------------------|-------------------|
| Home            | `/`                | `.hero-carousel-wrapper`                 | globals.css        |
| About Us        | `/about-us`        | `.about-header`                          | globals.css        |
| Contact         | `/contact`         | `.contact-us-container`                  | globals.css        |
| Apply for Loan  | `/apply-for-loan`  | `.apply-for-loan-page-container .contact-header` | globals.css |
| Become Partner  | `/become-partner`  | `.partner-hero`                          | globals.css        |
| EMI Calculator  | `/emi-calculator`  | `.loan-page-header`                      | globals.css        |
| Loans sub-pages | `/loans/*`         | `.loan-page-header`                      | globals.css        |
| CIBIL Score     | `/cibil-score`     | `.heroSection`                           | cibil.module.css   |
| Reviews         | `/reviews`         | `.reviews-header`                        | globals.css        |

All of the above now use **`margin-top: -10vh`** so the first component is moved up by 10% of the viewport height on every page.
