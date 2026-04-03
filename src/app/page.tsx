'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import TripForm from '@/components/TripForm';
import ItineraryView from '@/components/ItineraryView';
import LoadingScreen from '@/components/LoadingScreen';
import { TripPreferences, Itinerary } from '@/types';
import { saveTrip } from '@/lib/storage';

type AppState = 'form' | 'loading' | 'result';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('form');
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [destination, setDestination] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (preferences: TripPreferences) => {
    setDestination(preferences.destination);
    setAppState('loading');
    setError(null);

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate itinerary');
      }

      setItinerary(data.itinerary);
      setAppState('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setAppState('form');
    }
  };

  const handleReset = () => {
    setItinerary(null);
    setAppState('form');
    setError(null);
  };

  const handleSave = () => {
    if (itinerary) {
      saveTrip(itinerary, {
        destination: itinerary.destination,
        startDate: itinerary.startDate,
        endDate: itinerary.endDate,
        budget: itinerary.budget as TripPreferences['budget'],
        interests: [],
        travelStyle: 'balanced',
        travelers: 1,
      });
      alert('Trip saved! 🎉');
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-4rem)] flex flex-col">
        {/* Hero section (only visible on form state) */}
        {appState === 'form' && (
          <div className="text-center pt-12 pb-8 px-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-subtle rounded-full text-xs text-gray-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI-Powered Itinerary Planning
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-4">
              <span className="gradient-text">Forge Your</span>
              <br />
              <span className="text-white">Perfect Trip</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
              Let AI craft a personalized day-by-day itinerary tailored to your
              interests, budget, and travel style.
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 px-4 pb-12">
          {/* Error Banner */}
          {error && (
            <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm animate-slide-down">
              <div className="flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
                <button
                  className="ml-auto text-red-400 hover:text-red-200"
                  onClick={() => setError(null)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          {appState === 'form' && (
            <TripForm
              onSubmit={handleSubmit}
              isLoading={false}
            />
          )}

          {/* Loading */}
          {appState === 'loading' && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <LoadingScreen destination={destination} />
            </div>
          )}

          {/* Result */}
          {appState === 'result' && itinerary && (
            <ItineraryView
              itinerary={itinerary}
              onReset={handleReset}
              onSave={handleSave}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-white/5">
          <p className="text-xs text-gray-600">
            Built with 🔥 by TripForge • Powered by Google Gemini &
            HuggingFace
          </p>
        </footer>
      </main>
    </>
  );
}
