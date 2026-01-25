# Zineegroup - Financial Services Website

## Project Structure (Next.js)

This is a Next.js application converted from vanilla HTML/CSS/JS for improved maintainability, performance, SEO, and scalability.

```
zineegroup/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Header.tsx       # Header component
│   ├── Hero.tsx         # Hero section
│   ├── Carousel.tsx     # Loan services carousel
│   ├── Features.tsx     # Features section
│   ├── Testimonials.tsx # Testimonials section
│   ├── Partners.tsx     # Partners section
│   └── Footer.tsx       # Footer component
├── public/              # Static assets (served at root)
│   └── assets/
│       └── images/      # Image assets
├── assets/              # Original assets (backup)
└── package.json         # Dependencies and scripts
```

## Features

- ✅ **Modern React/Next.js Framework**: Component-based architecture for better maintainability
- ✅ **Server-Side Rendering (SSR)**: Improved SEO and initial page load performance
- ✅ **TypeScript Support**: Type-safe development
- ✅ **Optimized Images**: Next.js Image component for automatic optimization
- ✅ **Responsive Design**: Mobile-first approach with modern CSS
- ✅ **Smooth Animations**: CSS animations and transitions
- ✅ **Accessibility**: Semantic HTML and ARIA labels

## Services Offered

1. Instant Loans
2. Personal Loans
3. Business Loans
4. Professional Loans
5. Secure Loans
6. Balance Transfer

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Technologies

- **Next.js 14**: React framework with SSR and App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **CSS3**: Modern styling with animations
- **Next.js Image Optimization**: Automatic image optimization

## Improvements Over Vanilla HTML/CSS/JS

1. **Maintainability**: Component-based architecture makes code easier to maintain and reuse
2. **Performance**: Server-side rendering and automatic code splitting improve load times
3. **SEO**: SSR provides better SEO with proper meta tags and server-rendered content
4. **Scalability**: Modular components make it easy to add new features
5. **Developer Experience**: TypeScript, hot reload, and modern tooling
6. **Bundle Optimization**: Automatic code splitting and tree shaking
7. **Image Optimization**: Next.js Image component automatically optimizes images

## Development

The app uses Next.js App Router with:
- Server components by default (components in `app/`)
- Client components where interactivity is needed (marked with `'use client'`)
- Global CSS in `app/globals.css`
- Static assets in `public/` folder

## Original Files

The original vanilla HTML/CSS/JS files are preserved in:
- `index.html` (original HTML)
- `css/main.css` (original CSS)
- `js/main.js` (original JavaScript)

These can be used as reference or removed after migration is complete.
