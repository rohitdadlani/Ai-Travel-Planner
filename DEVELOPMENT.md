# 🛠️ TripForge - Developer Documentation

Welcome to the development guide for TripForge. This document provides a deep dive into the technical architecture, design decisions, and AI implementation of the platform.

---

## 🏗️ Architecture Overview

TripForge is built on **Next.js 14** using the **App Router** for optimized routing and server-side rendering (SSR) where appropriate.

### Core Folder Structure
-   `src/app/`: Contains the application routes and modern layouts (Next.js App Router).
    -   `api/`: Backend serverless functions for handling AI generation and content enhancement.
-   `src/components/`: Modular UI units (Navbar, TripForm, ItineraryView, etc.).
-   `src/lib/`: Custom SDK handlers and library wrappers (Gemini, HuggingFace, Prompt templates).
-   `src/types/`: Unified TypeScript definitions shared across the frontend and backend.
-   `src/utils/`: General utility functions (date formatting, cost calculation).

---

## 🤖 AI Orchestration Layer

TripForge uses a dual-AI approach to achieve premium output quality.

### 1. Primary Engine: Google Gemini 3.1 Flash Lite
Located in `src/lib/gemini.ts`, this engine handles the core itinerary logic.
-   **Prompt Engineering**: See `src/lib/prompts.ts`. We use a "Strict JSON Structure" prompt to ensure the AI always returns valid TypeScript-compatible objects.
-   **Model Selection**: We specifically use `gemini-3.1-flash-lite-preview` as it provides the best balance of speed and quota-friendly limits for standard API keys.

### 2. Enhancement Engine: HuggingFace Inference
Located in `src/lib/huggingface.ts`, this engine is used for secondary content enrichment, such as generating localized travel tips or enhancing activity descriptions.

---

## 🎨 UI/UX Design System

TripForge features a **Glassmorphism** design system, defined primarily in `src/app/globals.css` and `tailwind.config.ts`.

### Key Design Tokens
-   **Transparency**: Heavy use of `bg-white/10` and `backdrop-blur-xl` for a layered, premium look.
-   **Color Palette**: Custom gradients and smooth transitions to simulate a modern, "floating" UI.
-   **Animations**: Minimalist framer-like micro-animations for card entries and loading states.

---

## 📊 Data Models

The entire application state follows the `Itinerary` interface defined in `src/types/index.ts`. Any developer modifying the data structure should start here to ensure type safety remains intact throughout the API and UI.

```typescript
export interface Itinerary {
  id: string;
  destination: string;
  title: string;
  summary: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  budget: string;
  currency: string;
  days: DayPlan[];
  packingList: string[];
  travelTips: string[];
  estimatedTotalCost: string;
  createdAt: string;
}
```

---

## 🔧 Troubleshooting & Known Gotchas

-   **API Quotas (429 Errors)**: If you hit a 429 error, check your Google AI Studio dashboard. The current project is optimized for the **Flash** models; switching to **Pro** without a high-tier key may cause an immediate quota block.
-   **Model 404s**: If the API returns a 404, it's likely that the specific model name is not yet available in your region. Use the diagnostic `REST` call to list available models for your specific key.
-   **JSON Parsing**: Large itineraries can sometimes cause a truncated response. We've implemented a robust regex-based parser in `gemini.ts` to recover valid JSON from truncated strings.

---

## 🛤️ Roadmap & Future Enhancements

1.  **Google Maps Integration**: Adding map pins for the generated activities.
2.  **Export to PDF**: Allowing users to download their itineraries for offline use.
3.  **Social Auth**: Saving itineraries to user profiles via Firebase or Supabase.
4.  **Multi-Language Support**: AI-driven translations for global users.

---

*This documentation was last updated on April 3rd, 2026. For further questions, please reach out to the core development team.*
