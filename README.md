# EnterCircles

This project contains the landing page for the **Circles** application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and add your API keys.
3. Start the development server:
   ```bash
   npm run dev
   ```

Detailed environment configuration and optional scripts are documented in
[docs/SETUP_INSTRUCTIONS.md](docs/SETUP_INSTRUCTIONS.md).

## Scripts

- `npm run dev` – start Vite in development mode
- `npm run build` – create a production build
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint
- `npm run test` – run unit tests with Vitest

# Circles: Ultra-Detailed DevOps Copilot Optimization

## 🧠 Circles Optimization + Code Quality Audit

This project uses a world-class optimization and audit workflow:

- **No unused or duplicate files/components**
- **All code is performant, clean, and modular**
- **All UI/animation/visuals are preserved**
- **All scrolling and transitions are buttery smooth**
- **All features work as intended on all screen sizes**

### 🛠️ Automated Build Optimizations

- **Manual chunking** for React, animation, UI, admin, and project code
- **CSS code splitting** and optimized asset naming
- **Console/debugger removal** in production
- **Modern browser targeting**
- **Pre-bundling and dependency optimization**
- **Brotli and gzip compression** for production builds
- **Bundle analyzer** for visualizing and optimizing bundle size

### 🚀 How to Use

1. **Build the project:**
   ```sh
   npm run build
   ```
   This will generate compressed `.br` and `.gz` assets in `dist/`.

2. **Analyze the bundle:**
   ```sh
   npm run build
   # Then open dist/bundle-analysis.html in your browser
   ```
   The analyzer will show a visual breakdown of your bundle.

3. **Audit/optimize:**
   - Run `npm run lint` for code quality
   - Use the audit prompt in this README to guide further improvements

---

## 🔍 Ultra-Detailed DevOps Copilot Prompt

```
[Paste your full prompt here for future automation]
```

---

## Golden Rule

> **Do NOT downgrade or remove any of the following:**
> Gradients, Poster quality, Canvas/3D effects, Glitch text, Floating orbs, Confetti, cube effects, animated numbers, Typewriter effects, Dark/light themes

The goal is to **optimize, not sterilize.**

# Project Catalog Data Format & Mock Data

## Overview
The Project Catalog in this app displays a list of projects (films, music, webseries, etc.) with rich metadata. The data is currently mocked in `src/data/projects.ts`, but in production, it should be fetched from an API.

---

## Data Source
- **Mock Data:** `src/data/projects.ts`
- **Type Definition:** `src/types/index.ts` (interface `Project`)
- **Production:** Replace mock data with API response in the same format.

---

## Project Data Format

| Field            | Type                | Required | Description                                                      |
|------------------|---------------------|----------|------------------------------------------------------------------|
| id               | string              | Yes      | Unique project identifier                                        |
| title            | string              | Yes      | Project title                                                    |
| type             | 'film'\|'music'\|'webseries' | Yes | Project type/category                                            |
| category         | string              | Yes      | Main category (e.g., Bollywood, Hollywood, Regional, etc.)       |
| language         | string              | Yes      | Language of the project                                          |
| poster           | string (URL)        | Yes      | Poster image URL                                                 |
| fundedPercentage | number              | Yes      | % of funding achieved                                            |
| targetAmount     | number              | Yes      | Target funding amount (in INR)                                   |
| raisedAmount     | number              | Yes      | Amount raised so far (in INR)                                    |
| timeLeft         | string (optional)   | No       | Time left for funding (e.g., '12 days')                          |
| tags             | string[]            | Yes      | List of tags/keywords                                            |
| description      | string              | Yes      | Short project description                                        |
| director         | string (optional)   | No       | Director's name (for films)                                      |
| artist           | string (optional)   | No       | Artist's name (for music)                                        |
| genre            | string              | Yes      | Genre (e.g., Action, Drama, etc.)                                |
| perks            | string[]            | Yes      | List of perks for investors                                      |
| rating           | number (optional)   | No       | Project rating (1-5 scale)                                       |
| investorCount    | number (optional)   | No       | Number of investors                                              |
| trailer          | string (optional)   | No       | Trailer video URL                                                |
| imageValidated   | boolean (optional)  | No       | Whether the image is validated                                   |
| imageSource      | string (optional)   | No       | Source of the image (e.g., 'verified')                           |

---

## Example Project Object
```json
{
  "id": "3",
  "title": "Brahmastra Part Two: Dev",
  "type": "film",
  "category": "Bollywood",
  "language": "Hindi",
  "poster": "https://m.media-amazon.com/images/M/MV5BN2I4ZWY2NGYtZWFkZS00N2Y4LWJkZWEtN2YzM2ZlYjcyZWJjXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
  "fundedPercentage": 78,
  "targetAmount": 25000000,
  "raisedAmount": 19500000,
  "timeLeft": "12 days",
  "tags": ["Fantasy", "VFX", "Mythology", "Ranbir Kapoor"],
  "description": "The second installment of the Astraverse mythology",
  "director": "Ayan Mukerji",
  "genre": "Fantasy Adventure",
  "perks": ["VFX Studio Tour", "Concept Art", "Digital Assets", "Premiere"],
  "rating": 4.7,
  "imageValidated": true,
  "imageSource": "verified"
}
```

---

## Feeding Real Data
- **API Integration:**
  - Replace the mock data import in your code with an API call that returns an array of objects in the above format.
  - All required fields must be present; optional fields can be omitted or set to `null`/`undefined`.
- **Validation:**
  - Ensure your backend or API returns data matching the `Project` interface.
  - Images should be optimized for web (ideally via CDN).

---

## Notes
- The UI expects all fields to be present for best results, but will gracefully handle missing optional fields.
- Perks, tags, and images are displayed prominently in the UI.
- For best performance, use `loading="lazy"` and serve images in modern formats (WebP, AVIF).

---

For more details, see `src/types/index.ts` and `src/data/projects.ts`.
