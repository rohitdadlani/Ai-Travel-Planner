'use client';

import React from 'react';

interface LoadingScreenProps {
  destination: string;
}

const LOADING_MESSAGES = [
  'Scanning flight routes and local transit...',
  'Discovering hidden gems and local favorites...',
  'Crafting the perfect daily schedule...',
  'Finding the best restaurants and cafes...',
  'Checking weather patterns and seasonal events...',
  'Optimizing your route for maximum adventure...',
  'Adding finishing touches to your itinerary...',
];

export default function LoadingScreen({ destination }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto text-center animate-fade-in">
      <div className="glass-card p-10">
        {/* Animated Globe */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 animate-pulse-soft" />
          <div className="absolute inset-1 rounded-full bg-surface-950 flex items-center justify-center">
            <span className="text-5xl animate-float">🌍</span>
          </div>
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary-400" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-400" />
          </div>
        </div>

        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Forging Your Trip
        </h2>
        <p className="text-lg text-primary-300 font-medium mb-6">
          to {destination}
        </p>

        {/* Rotating Messages */}
        <div className="h-8 relative overflow-hidden">
          <p
            key={messageIndex}
            className="text-sm text-gray-400 animate-slide-up absolute inset-x-0"
          >
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 rounded-full animate-shimmer"
            style={{
              backgroundSize: '200% 100%',
              width: '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
}
