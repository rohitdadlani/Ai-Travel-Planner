# 🌍 TripForge - AI Travel Itinerary Planner

TripForge is a premium AI-powered travel itinerary planner that crafts personalized travel experiences in seconds. Leveraging the power of Google's latest **Gemini 3.1 Flash Lite Preview** and HuggingFace's Inference API, it creates dynamic, data-driven plans tailored to your unique preferences.

![TripForge Screenshot](https://raw.githubusercontent.com/rohitdadlani/Ai-Travel-Planner/main/public/screenshot.png) *(Note: Add your actual screenshot to public/ folder later)*

## ✨ Features

- **AI-Powered Itineraries**: Intelligent day-by-day plans generated specifically for your destination and budget.
- **Content Enhancement**: Seamlessly integrates HuggingFace APIs to enrich itinerary descriptions and tips.
- **Interactive Timeline**: A modern, glassmorphic UI to visualize your trip from morning to night.
- **Smart Packing Lists**: Automatically generated packing suggestions based on your destination.
- **Budget Categorization**: Tracks estimated costs across sightseeing, dining, and more.
- **Local Persistence**: Saves your generated trips to your browser's local storage for easy access.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Core**: [Google Gemini 3.1 Flash Lite Preview](https://ai.google.dev/)
- **AI Enhancement**: [HuggingFace Inference API](https://huggingface.co/docs/api-inference/index)
- **Testing**: [Cypress v13+](https://www.cypress.io/)
- **State Management**: React Hooks & Local Storage

---

## 🚀 How This Project Was Built (Step-by-Step)

The development of TripForge followed a meticulous, iterative process to ensure both functionality and premium design:

1.  **Project Initialization**: Set up the core architecture using Next.js 14 with TypeScript and Tailwind CSS.
2.  **Architecture Design**: Established a clean folder structure prioritizing separation of concerns (API routes, utility libraries, and modular components).
3.  **UI/UX Development**: Implemented a "Glassmorphism" design system in `globals.css` to provide a modern, transparent look with subtle gradients and micro-animations.
4.  **AI Integration Logic**:
    *   Created a robust `gemini.ts` handler using the `@google/generative-ai` SDK.
    *   Developed complex prompt templates to ensure the AI returns strictly formatted JSON.
    *   Integrated HuggingFace models for content secondary enrichment.
5.  **Form & Validation**: Built a multi-step user preference form with real-time validation for destination, dates, and budget.
6.  **API Orchestration**: Developed `/api/generate-itinerary` to handle the handshake between the frontend and Google’s servers, including post-processing of AI responses.
7.  **Diagnostic & Debugging**: Performed extensive "live" troubleshooting to identify and fix 404 and 429 quota errors, ultimately identifying `gemini-3.1-flash-lite-preview` as the most compatible model for standard API keys.
8.  **Testing Strategy**: Integrated Cypress for automated end-to-end testing to verify form flows, AI rendering, and data persistence.
9.  **Type Refactoring**: Implemented a comprehensive TypeScript architecture with granular models for Activities, TimeBlocks, and Days.

---

## 💻 Local Setup & Running Guide

Want to run TripForge on your own machine? Follow these steps:

### 1. Prerequisites
- [Node.js 18.x](https://nodejs.org/) or higher installed.
- A Google Gemini API Key (get it from [Google AI Studio](https://aistudio.google.com/)).
- A HuggingFace Access Token (get it from [HuggingFace Settings](https://huggingface.co/settings/tokens)).

### 2. Fork and Clone
1.  **Fork** this repository to your own GitHub account.
2.  **Clone** your fork locally:
    ```bash
    git clone https://github.com/YOUR_USERNAME/Ai-Travel-Planner.git
    cd Ai-Travel-Planner
    cd tripforge
    ```

### 3. Setup Environment Variables
Create a file named `.env.local` in the root of the `tripforge` directory and add your keys:

```bash
# Obtain from https://aistudio.google.com/
GOOGLE_GEMINI_API_KEY=your_gemini_key_here

# Obtain from https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=your_huggingface_token_here
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the app!

### 6. Running Automated Tests
To run the E2E smoke tests:
```bash
# In a separate terminal while the dev server is running
npm run cypress:run
```

---

## 🤝 Contributing
Contributions are welcome! If you have suggestions for improvement or find a bug, feel free to open an issue or submit a pull request.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
