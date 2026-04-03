'use client';

import React from 'react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-600/20">
              <span className="text-lg">🔥</span>
            </div>
            <span className="text-xl font-display font-bold gradient-text-primary">
              TripForge
            </span>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 glass-subtle rounded-full text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Powered by Gemini AI</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
