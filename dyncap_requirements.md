# WEBSITE REQUIREMENTS DOCUMENT

**dyncap Landing Page**

Version 1.0  
October 29, 2025

---

## Table of Contents

1. [Document Overview](#1-document-overview)
2. [Functional Requirements](#2-functional-requirements)
3. [Non-Functional Requirements](#3-non-functional-requirements)
4. [Technical Architecture](#4-technical-architecture)
5. [Design Specifications](#5-design-specifications)
6. [Testing & Validation Requirements](#6-testing--validation-requirements)
7. [Deliverables](#7-deliverables)
8. [Out of Scope](#8-out-of-scope)
9. [Assumptions & Dependencies](#9-assumptions--dependencies)
10. [Risk Assessment](#10-risk-assessment)
11. [Appendix A: Client Input Required](#appendix-a-client-input-required)
12. [Appendix B: Reference Links](#appendix-b-reference-links)

---

## 1. DOCUMENT OVERVIEW

### 1.1 Purpose

This document defines the complete functional, technical, and design requirements for the dyncap single-page landing website. It establishes acceptance criteria for all deliverables and ensures zero-bloat implementation.

### 1.2 Scope

A minimal, performance-optimized single-page website featuring:

- Custom logo with dynamic chromatic aberration effect
- Email contact functionality
- Legal compliance pages (Impressum, Privacy Policy)
- Zero dependencies (no frameworks, no JavaScript libraries)

### 1.3 Design Philosophy

**ZERO BLOAT** - Pure HTML5, CSS3, and minimal Vanilla JavaScript only. No frameworks, no libraries, no external dependencies beyond Google Fonts.

---

## 2. FUNCTIONAL REQUIREMENTS

### 2.1 FR-001: Logo Display

#### Description

Display the text 'dyncap' as a logo using TASA Orbiter Variable font with precise typographic alignment.

#### Technical Specifications

- **Font:** TASA Orbiter Variable
- **Source:** Google Fonts
- **Layout:** Two-line arrangement
  - Line 1: 'dyn'
  - Line 2: 'cap'
- **Alignment:** Vertical stroke of 'p' in 'cap' must be precisely aligned (flush) with the right vertical stroke of 'n' in 'dyn'

#### Acceptance Criteria

| AC-ID | Acceptance Criterion |
|-------|---------------------|
| AC-001.1 | TASA Orbiter Variable font loads successfully from Google Fonts CDN |
| AC-001.2 | Text 'dyn' displays on first line, 'cap' on second line |
| AC-001.3 | Vertical alignment: right edge of 'p' stem aligns with right edge of 'n' stem (±1px tolerance) |
| AC-001.4 | Logo remains readable across all target browsers and device sizes |

---

### 2.2 FR-002: Dynamic Chromatic Aberration Effect

#### Description

Mouse-tracking RGB-split effect that dynamically calculates and applies chromatic aberration to the logo based on cursor position and distance.

#### Technical Specifications

- **Trigger:** Mouse movement within viewport
- **Effect Type:** RGB channel separation (Red/Cyan split)
- **Calculation Method:**
  - Calculate Euclidean distance from cursor to logo center
  - Calculate angle/direction vector from cursor to logo
  - Map distance to aberration intensity (closer = stronger effect)
- **Implementation:** CSS text-shadow or drop-shadow filter, dynamically updated via CSS Custom Properties
- **Performance:** requestAnimationFrame for smooth 60fps updates
- **Maximum Effect Distance:** 300-500px from logo center

#### Acceptance Criteria

| AC-ID | Acceptance Criterion |
|-------|---------------------|
| AC-002.1 | Effect activates when cursor enters viewport (no hover requirement on logo itself) |
| AC-002.2 | RGB split intensity increases as cursor approaches logo (inverse distance relationship) |
| AC-002.3 | Effect direction corresponds to cursor-to-logo vector (shifts away from cursor) |
| AC-002.4 | Animation maintains 60fps on desktop browsers (verified via DevTools) |
| AC-002.5 | Effect uses ≤50 lines of Vanilla JavaScript (no libraries) |
| AC-002.6 | Effect gracefully degrades on touch devices (disabled or alternative implementation) |

---

### 2.3 FR-003: Email Contact Button

#### Description

A clickable button/link that opens the user's default email client with a pre-filled recipient address.

#### Technical Specifications

- **Type:** HTML mailto: link styled as button
- **Label:** 'Contact' or 'Get in Touch' (client to confirm)
- **Email Address:** [TO BE PROVIDED BY CLIENT]

#### Acceptance Criteria

| AC-ID | Acceptance Criterion |
|-------|---------------------|
| AC-003.1 | Button opens default email client when clicked |
| AC-003.2 | Recipient email address is pre-filled correctly |
| AC-003.3 | Button has visible hover state (color/opacity change) |
| AC-003.4 | Button is keyboard-accessible (Tab + Enter) |

---

### 2.4 FR-004: Legal Compliance Pages

#### Description

Separate HTML pages for Impressum (Legal Notice) and Privacy Policy (Datenschutzerklärung) as required by German law.

#### Technical Specifications

- **Files:** impressum.html, datenschutz.html
- **Location:** Footer links on main page
- **Content:** [TO BE PROVIDED BY CLIENT - legal text must be client-supplied]

#### Acceptance Criteria

| AC-ID | Acceptance Criterion |
|-------|---------------------|
| AC-004.1 | Both pages are accessible via footer links labeled 'Impressum' and 'Datenschutz' |
| AC-004.2 | Links open in same tab (not new window) per GDPR/accessibility best practices |
| AC-004.3 | Pages use same minimal CSS styling as main page (consistent design) |
| AC-004.4 | Legal pages include back link to main page |

---

## 3. NON-FUNCTIONAL REQUIREMENTS

### 3.1 NFR-001: Performance

#### Acceptance Criteria

| AC-ID | Acceptance Criterion |
|-------|---------------------|
| AC-P.1 | Total page weight (HTML + CSS + JS + Font) < 100KB (excluding font if cached) |
| AC-P.2 | First Contentful Paint (FCP) < 1.0s on 3G connection |
| AC-P.3 | Lighthouse Performance Score ≥ 95 |
| AC-P.4 | Zero external JavaScript libraries (verified via network tab) |
| AC-P.5 | JavaScript bundle size < 2KB (minified) |

---

### 3.2 NFR-002: Browser Compatibility

#### Acceptance Criteria

| AC-ID | Acceptance Criterion |
|-------|---------------------|
| AC-B.1 | Fully functional on Chrome 120+, Firefox 121+, Safari 17.2+, Edge 120+ |
| AC-B.2 | Graceful degradation on older browsers (logo visible, effect disabled if CSS/JS unsupported) |
| AC-B.3 | Mobile responsive on iOS Safari and Chrome/Samsung Browser (Android) |

---

### 3.3 NFR-003: Accessibility (WCAG 2.1 Level AA)

#### Acceptance Criteria

| AC-ID | Acceptance Criterion |
|-------|---------------------|
| AC-A.1 | All interactive elements keyboard-accessible (Tab, Enter, Escape) |
| AC-A.2 | Color contrast ratio ≥ 4.5:1 for all text (verified via contrast checker) |
| AC-A.3 | Semantic HTML5 (header, main, footer, nav elements) |
| AC-A.4 | Valid HTML5 (W3C validator passes with 0 errors) |
| AC-A.5 | Proper ARIA labels where needed (buttons, links) |

---

### 3.4 NFR-004: SEO & Meta Tags

#### Acceptance Criteria

| AC-ID | Acceptance Criterion |
|-------|---------------------|
| AC-S.1 | Complete meta tags: title, description, viewport, charset UTF-8 |
| AC-S.2 | Open Graph tags for social media sharing (og:title, og:description, og:image) |
| AC-S.3 | Favicon (16x16, 32x32, 180x180 for Apple) [TO BE PROVIDED BY CLIENT] |

---

## 4. TECHNICAL ARCHITECTURE

### 4.1 Technology Stack

**ZERO-BLOAT MANDATE:** No frameworks, no build tools, no npm packages, no dependencies beyond Google Fonts.

| Component | Technology |
|-----------|-----------|
| **Markup** | HTML5 (semantic elements, valid W3C) |
| **Styling** | CSS3 (inline or single external .css file, no preprocessors) |
| **Interactivity** | Vanilla JavaScript ES6+ (no jQuery, no React, no libraries) |
| **Font** | Google Fonts CDN (TASA Orbiter Variable) - ONLY external dependency |
| **Hosting** | Static files (any CDN/host - Netlify, Vercel, GitHub Pages compatible) |

---

### 4.2 File Structure

Minimal file hierarchy:

```
/
├── index.html
├── impressum.html
├── datenschutz.html
├── style.css (optional - can inline)
└── script.js (optional - can inline)
```

---

### 4.3 Implementation Approach: Chromatic Aberration Algorithm

Pseudocode for the RGB-split effect:

```
1. On mousemove event:
   a. Get cursor coordinates (x, y)
   b. Get logo center coordinates (logoX, logoY)
   c. Calculate distance = √((x - logoX)² + (y - logoY)²)
   d. Calculate angle = atan2(y - logoY, x - logoX)
   e. intensity = max(0, (maxDistance - distance) / maxDistance)
   f. offsetX = cos(angle + π) * intensity * maxOffset
   g. offsetY = sin(angle + π) * intensity * maxOffset
   h. Apply: text-shadow: Rpx 0 0 cyan, -Rpx 0 0 red (via CSS vars)

2. Use requestAnimationFrame for smooth 60fps updates

3. On touch devices: disable effect or use alternative static state
```

---

## 5. DESIGN SPECIFICATIONS

### 5.1 Visual Design

| Element | Specification |
|---------|--------------|
| **Color Scheme** | [TO BE PROVIDED - suggest: monochrome black/white/gray for minimal aesthetic] |
| **Logo Size** | 72-120px font-size (responsive - larger on desktop, smaller on mobile) |
| **Layout** | Centered vertically and horizontally on viewport |
| **Button Style** | Minimal border/outline style, positioned below logo |
| **Footer** | Fixed bottom, 12px font-size, links separated by ' \| ' |

---

### 5.2 Responsive Breakpoints

| Breakpoint | Adjustments |
|------------|-------------|
| **Desktop (>1024px)** | Full effect, logo 96-120px |
| **Tablet (768-1023px)** | Reduced effect intensity, logo 72-96px |
| **Mobile (<768px)** | Effect disabled (touch device), logo 64-72px |

---

## 6. TESTING & VALIDATION REQUIREMENTS

### 6.1 Test Cases

| Test ID | Test Case | Expected Result |
|---------|-----------|-----------------|
| **T-001** | Logo typography alignment check | 'p' and 'n' stems vertically aligned (visual inspection + DevTools) |
| **T-002** | Effect intensity at logo center vs. edge | Maximum aberration at 0px distance, zero at 500px+ |
| **T-003** | Frame rate during effect | Consistent 60fps (Chrome DevTools Performance tab) |
| **T-004** | Email button functionality | Launches default email client with correct recipient |
| **T-005** | Legal page accessibility | Both pages load, contain client-provided text, back link works |
| **T-006** | W3C HTML validation | 0 errors on validator.w3.org |
| **T-007** | Lighthouse audit | Performance ≥95, Accessibility ≥95, Best Practices ≥95, SEO ≥90 |
| **T-008** | Cross-browser visual consistency | Tested on Chrome, Firefox, Safari, Edge - no major visual differences |
| **T-009** | Mobile responsive layout | All elements visible and functional on 320px-wide screen |
| **T-010** | Page weight verification | Total size < 100KB (DevTools Network tab) |

---

### 6.2 Validation Tools

- **W3C HTML Validator:** validator.w3.org
- **Chrome DevTools:** Performance, Network, Lighthouse audits
- **WebAIM Contrast Checker:** webaim.org/resources/contrastchecker
- **BrowserStack:** Cross-browser testing (optional but recommended)

---

## 7. DELIVERABLES

### 7.1 Required Deliverables

| Deliverable | Description | Acceptance |
|-------------|-------------|------------|
| **Source Code** | Complete HTML/CSS/JS files, properly commented | All files present, code clean and readable |
| **Deployed Site** | Live website accessible via URL | All functional requirements met |
| **Test Report** | Test results for all test cases (T-001 through T-010) | All tests pass |
| **Performance Report** | Lighthouse audit screenshots showing scores | All scores meet thresholds |
| **Documentation** | Brief README with setup/deployment instructions | Clear, actionable instructions |

---

## 8. OUT OF SCOPE

The following items are explicitly NOT included in this project:

- Backend functionality (contact forms, databases, server-side processing)
- CMS integration
- Analytics integration (Google Analytics, Matomo, etc.)
- Cookie consent banners (unless legally required - to be determined)
- Multi-language support
- Blog or content pages beyond legal pages
- Custom font hosting (will use Google Fonts CDN)

---

## 9. ASSUMPTIONS & DEPENDENCIES

### 9.1 Assumptions

- Client will provide email address for contact button
- Client will provide legally compliant Impressum and Privacy Policy text
- Client will provide favicon assets (or approve generated ones)
- Target audience has modern browsers (2023-2025 versions)

### 9.2 Dependencies

- Google Fonts API availability (for TASA Orbiter Variable)
- Client approval on final design/colors before deployment

---

## 10. RISK ASSESSMENT

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Font loading failure | Logo displays in fallback font | Implement font-display: swap; test fallback |
| Performance on older devices | Choppy animation, poor UX | Feature detection, disable effect if FPS drops |
| Typography alignment precision | Logo looks misaligned | Use CSS transforms with sub-pixel precision |
| Client legal text delay | Cannot deploy without Impressum/Privacy | Use placeholder text for dev, finalize pre-launch |

---

## APPENDIX A: CLIENT INPUT REQUIRED

The following information must be provided by the client before development can be finalized:

| Item | Status |
|------|--------|
| **Contact Email Address** | ⚠ PENDING |
| **Color Scheme Preferences** | ⚠ PENDING (suggest: monochrome for minimal aesthetic) |
| **Impressum Content** | ⚠ PENDING (legally required - must be client-provided) |
| **Privacy Policy Content** | ⚠ PENDING (legally required - must be client-provided) |
| **Favicon Assets** | ⚠ PENDING (can generate from logo if approved) |
| **Button Label Text** | ⚠ PENDING (suggest: 'Contact' or 'Get in Touch') |

---

## APPENDIX B: REFERENCE LINKS

Relevant external resources:

- **TASA Orbiter Font:** https://fonts.google.com/specimen/TASA+Orbiter
- **Chromatic Aberration Reference GIF:** https://wifflegif.com/gifs/606661-chromatic-aberration-op-art-gif
- **W3C HTML Validator:** https://validator.w3.org
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref
- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker

---

**— END OF DOCUMENT —**
