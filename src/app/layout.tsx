import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripForge — AI Travel Itinerary Planner",
  description:
    "Plan your perfect trip with AI-powered itinerary generation. Get personalized day-by-day travel plans, local recommendations, and insider tips powered by Google Gemini.",
  keywords: [
    "travel planner",
    "AI itinerary",
    "trip planning",
    "travel AI",
    "vacation planner",
  ],
  authors: [{ name: "TripForge" }],
  openGraph: {
    title: "TripForge — AI Travel Itinerary Planner",
    description:
      "Plan your perfect trip with AI-powered itinerary generation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased custom-scrollbar">
        {/* Ambient Background Glow */}
        <div className="ambient-bg" aria-hidden="true" />

        {/* Main Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
