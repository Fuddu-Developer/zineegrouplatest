# First component placement on each page

All pages sit under **body** (which has `padding-top: 132px` for the fixed header). Below is the **first visible content** on each route.

---

## Shared layout patterns

| Pattern | Wrapper | First content area |
|--------|---------|---------------------|
| **A**  | `page-container` → `Header` → `scrollable-content` → `main` | Content inside `main` |
| **B**  | `<>` → `Header` → `main` (no scrollable wrapper) | Content inside `main` |
| **C**  | Custom container (e.g. CIBIL `pageContainer`) → `Header` → `main` | Content inside `main` |

---

## Page-by-page: first component

### 1. **Home** (`/`)
- **Layout:** Pattern A  
- **Structure:** `page-container` → `Header` → `scrollable-content` → `main.main-body` → `aside` + `section.main-content` → `content-wrapper`
- **First component:** `ScrollRevealSection` wrapping `hero-carousel-wrapper` → **`<Hero />`**
- **File:** `app/page.tsx`

```tsx
<div className="page-container">
  <Header />
  <div className="scrollable-content">
    <main className="main-body">
      <aside className="sidebar left-sidebar"></aside>
      <section className="main-content">
        <div className="content-wrapper">
          <ScrollRevealSection><div className="hero-carousel-wrapper"><Hero /></div></ScrollRevealSection>
          ...
```

---

### 2. **About Us** (`/about-us`)
- **Layout:** Pattern A  
- **First component:** `about-page-container` → **`div.about-header`** (blue block: title, subtitle, “Learn More”)
- **File:** `app/about-us/page.tsx`

```tsx
<div className="page-container">
  <Header />
  <div className="scrollable-content">
    <main className="main-body">
      <aside className="sidebar left-sidebar"></aside>
      <section className="main-content">
        <div className="content-wrapper">
          <div className="about-page-container">
            <div className="about-header">   <!-- FIRST -->
              <h1 className="about-title">About Us</h1>
              ...
```

---

### 3. **Contact** (`/contact`)
- **Layout:** Pattern A  
- **First component:** **`div.contact-us-container`** → `contact-us-grid` → `contact-info-column` (heading “Get in touch”, chatbot intro, email)
- **File:** `app/contact/page.tsx`

```tsx
<div className="page-container">
  <Header />
  <div className="scrollable-content">
    <main className="main-body">
      <aside className="sidebar left-sidebar"></aside>
      <section className="main-content">
        <div className="contact-us-container">   <!-- FIRST (no content-wrapper) -->
          <div className="contact-us-grid">
            <div className="contact-info-column">
              <h1 className="contact-heading">Get in touch</h1>
              ...
```

---

### 4. **Apply for Loan** (`/apply-for-loan`)
- **Layout:** Pattern A  
- **First component:** **`div.contact-header`** (title, intro, benefit chips) inside `contact-page-container apply-for-loan-page-container`
- **File:** `app/apply-for-loan/page.tsx`

```tsx
<div className="page-container">
  <Header />
  <div className="scrollable-content">
    <main className="main-body apply-for-loan-main">
      <aside className="sidebar left-sidebar"></aside>
      <section className="main-content">
        <div className="contact-page-container apply-for-loan-page-container">
          <div className="contact-header">   <!-- FIRST -->
            <h1 className="contact-title">Apply for loan title</h1>
            <p className="contact-intro">...</p>
            <div className="loan-benefits">...</div>
          </div>
          ...
```

---

### 5. **Become Partner** (`/become-partner`)
- **Layout:** Pattern A  
- **First component:** **`header.partner-hero`** (title, tagline, subtitle) inside `become-partner-page`
- **File:** `app/become-partner/page.tsx`

```tsx
<div className="page-container">
  <Header />
  <div className="scrollable-content">
    <main className="main-body become-partner-main">
      <aside className="sidebar left-sidebar"></aside>
      <section className="main-content">
        <div className="become-partner-page">
          <header className="partner-hero">   <!-- FIRST -->
            <h1 className="partner-hero-title">Join our network...</h1>
            <p className="partner-hero-tagline">...</p>
            <p className="partner-hero-subtitle">...</p>
          </header>
          <div className="partner-layout">...
```

---

### 6. **EMI Calculator** (`/emi-calculator`)
- **Layout:** Pattern A (but `main` is `loan-page-main`, not `main-body`)  
- **First component:** **`div.loan-page-header`** (page title + description) then `EmiCalculatorWithComparison`
- **File:** `app/emi-calculator/page.tsx`

```tsx
<div className="page-container">
  <Header />
  <div className="scrollable-content">
    <main className="loan-page-main">
      <div className="loan-page-container">
        <div className="loan-page-header">   <!-- FIRST -->
          <h1>EMI Calculator</h1>
          <p>Enter your loan amount...</p>
        </div>
        <EmiCalculatorWithComparison />
```

---

### 7. **CIBIL Score** (`/cibil-score`)
- **Layout:** Pattern C (custom container, no `page-container` / `scrollable-content`)  
- **First component:** **`section.heroSection`** (badge, “Check Your CIBIL Score”, form) inside `main`
- **File:** `app/cibil-score/page.tsx` + `app/cibil-score/cibil.module.css`

```tsx
<div className={styles.pageContainer}>
  <Header />
  <main style={{ flexGrow: 1, width: '100%' }}>
    <section className={styles.heroSection}>   <!-- FIRST -->
      <div className={styles.heroBackground}>...</div>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>OFFICIAL CIBIL PARTNER</span>
            <h1>Check Your CIBIL Score Instantly</h1>
            ...
```

---

### 8. **Reviews** (`/reviews`)
- **Layout:** Pattern B (no `page-container` or `scrollable-content`)  
- **First component:** **`div.reviews-header`** (title + intro) inside `reviews-page-container`
- **File:** `app/reviews/page.tsx`

```tsx
<>
  <Header />
  <main className="main-body">
    <aside className="sidebar left-sidebar"></aside>
    <section className="main-content">
      <div className="content-wrapper">
        <div className="reviews-page-container">
          <div className="reviews-header">   <!-- FIRST -->
            <h1 className="reviews-title">...</h1>
            <p className="reviews-intro">...</p>
          </div>
          ...
```

---

### 9. **Loans sub-pages** (e.g. `/loans/personal-loans`, `/loans/home-loans`, …)
- **Layout:** Pattern B  
- **First component:** **`div.loan-page-header`** (h1 + p) inside `loan-page-container`
- **File:** e.g. `app/loans/personal-loans/page.tsx`

```tsx
<>
  <Header />
  <main className="loan-page-main">
    <div className="loan-page-container">
      <div className="loan-page-header">   <!-- FIRST -->
        <h1>Personal Loans</h1>
        <p>Whether it's for debt repayment...</p>
      </div>
      <BankList ... />
      <LoanCalculator ... />
```

---

### 10. **Apply (bank)** (`/apply/[bankId]`)
- **Layout:** Bank-specific; often no shared `page-container` / `scrollable-content`; may use `bank-app-page-wrapper` and its own hero/form.
- **First visible block:** Depends on bank (e.g. hero or form card).
- **File:** `app/apply/[bankId]/page.tsx`

---

## Summary table

| Route              | Layout | First component (class or component)     |
|-------------------|--------|------------------------------------------|
| `/`               | A      | `Hero` (inside `hero-carousel-wrapper`)  |
| `/about-us`       | A      | `div.about-header`                       |
| `/contact`        | A      | `div.contact-us-container`               |
| `/apply-for-loan` | A      | `div.contact-header`                     |
| `/become-partner`  | A      | `header.partner-hero`                    |
| `/emi-calculator`  | A      | `div.loan-page-header`                   |
| `/cibil-score`    | C      | `section.heroSection` (CIBIL module)     |
| `/reviews`        | B      | `div.reviews-header`                     |
| `/loans/*`        | B      | `div.loan-page-header`                   |
| `/apply/[bankId]` | custom | Bank-specific hero/form                  |

---

## Notes

- **Pattern A** pages use the same vertical space: body `padding-top: 132px` + `page-container` → `scrollable-content` → content. The first component is always inside that content area.
- **Pattern B** (Reviews, loans) and **Pattern C** (CIBIL) don’t use `scrollable-content`; content still starts after body’s `padding-top: 132px` and the fixed header.
- Contact is the only Pattern A page that skips `content-wrapper` and goes straight to `contact-us-container`.
