'use client';

import React, { useState } from 'react';
import { TripPreferences } from '@/types';
import { INTEREST_OPTIONS, calculateDays } from '@/utils';

interface TripFormProps {
  onSubmit: (preferences: TripPreferences) => void;
  isLoading: boolean;
}

export default function TripForm({ onSubmit, isLoading }: TripFormProps) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 'moderate',
    interests: [],
    travelStyle: 'balanced',
    travelers: 2,
    specialRequirements: '',
  });

  const totalSteps = 3;

  const updateField = <K extends keyof TripPreferences>(
    field: K,
    value: TripPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return preferences.destination && preferences.startDate && preferences.endDate;
      case 2:
        return preferences.interests.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    if (canProceed()) {
      onSubmit(preferences);
    }
  };

  const tripDays =
    preferences.startDate && preferences.endDate
      ? calculateDays(preferences.startDate, preferences.endDate)
      : 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => s < step && setStep(s)}
              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 ${
                s === step
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg shadow-primary-600/30 scale-110'
                  : s < step
                  ? 'bg-primary-600/20 text-primary-300 cursor-pointer hover:bg-primary-600/30'
                  : 'bg-white/5 text-gray-500'
              }`}
            >
              {s < step ? '✓' : s}
            </button>
          ))}
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Destination & Dates */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-display font-bold mb-2">
              Where are you headed? ✈️
            </h2>
            <p className="text-gray-400 text-sm">
              Tell us your dream destination and travel dates
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Destination
            </label>
            <input
              id="destination-input"
              data-testid="destination-input"
              type="text"
              className="input-field text-lg"
              placeholder="e.g., Tokyo, Japan"
              value={preferences.destination}
              onChange={(e) => updateField('destination', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Date
              </label>
              <input
                id="start-date-input"
                data-testid="start-date-input"
                type="date"
                className="input-field"
                value={preferences.startDate}
                onChange={(e) => updateField('startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Date
              </label>
              <input
                id="end-date-input"
                data-testid="end-date-input"
                type="date"
                className="input-field"
                value={preferences.endDate}
                onChange={(e) => updateField('endDate', e.target.value)}
              />
            </div>
          </div>

          {tripDays > 0 && (
            <div className="glass-subtle p-4 flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-semibold text-white">
                  {tripDays} {tripDays === 1 ? 'Day' : 'Days'} Trip
                </p>
                <p className="text-sm text-gray-400">
                  {preferences.startDate} → {preferences.endDate}
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Travelers
            </label>
            <div className="flex items-center gap-4">
              <button
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg hover:bg-white/10 transition-colors"
                onClick={() =>
                  updateField('travelers', Math.max(1, preferences.travelers - 1))
                }
              >
                −
              </button>
              <span className="text-2xl font-bold text-white w-8 text-center">
                {preferences.travelers}
              </span>
              <button
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg hover:bg-white/10 transition-colors"
                onClick={() =>
                  updateField('travelers', Math.min(20, preferences.travelers + 1))
                }
              >
                +
              </button>
              <span className="text-gray-400 text-sm">
                {preferences.travelers === 1 ? 'Solo traveler' : 'travelers'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Interests */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-display font-bold mb-2">
              What excites you? 🎯
            </h2>
            <p className="text-gray-400 text-sm">
              Pick your interests to personalize the itinerary
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {INTEREST_OPTIONS.map((interest) => (
              <button
                key={interest.value}
                data-testid={`interest-${interest.value}`}
                onClick={() => toggleInterest(interest.value)}
                className={`chip ${
                  preferences.interests.includes(interest.value) ? 'chip-active' : ''
                }`}
              >
                <span>{interest.emoji}</span>
                <span>{interest.label}</span>
              </button>
            ))}
          </div>

          {preferences.interests.length > 0 && (
            <p className="text-sm text-primary-300">
              ✨ {preferences.interests.length} interest
              {preferences.interests.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      )}

      {/* Step 3: Style & Budget */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-display font-bold mb-2">
              Almost there! 🎨
            </h2>
            <p className="text-gray-400 text-sm">
              Set your budget and travel pace
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Budget Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'budget' as const, label: 'Budget', emoji: '🎒', desc: 'Save more, explore smart' },
                { value: 'moderate' as const, label: 'Moderate', emoji: '⭐', desc: 'Best of both worlds' },
                { value: 'luxury' as const, label: 'Luxury', emoji: '💎', desc: 'Premium everything' },
              ].map((option) => (
                <button
                  key={option.value}
                  data-testid={`budget-${option.value}`}
                  onClick={() => updateField('budget', option.value)}
                  className={`glass-subtle p-4 text-center transition-all duration-300 cursor-pointer ${
                    preferences.budget === option.value
                      ? 'border-primary-500/50 bg-primary-600/10 ring-1 ring-primary-500/30'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.emoji}</div>
                  <div className="font-semibold text-white text-sm">{option.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Travel Pace
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'relaxed' as const, label: 'Relaxed', emoji: '🧘', desc: '2-3 activities/day' },
                { value: 'balanced' as const, label: 'Balanced', emoji: '⚖️', desc: '3-4 activities/day' },
                { value: 'packed' as const, label: 'Packed', emoji: '🚀', desc: '5-6 activities/day' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateField('travelStyle', option.value)}
                  className={`glass-subtle p-4 text-center transition-all duration-300 cursor-pointer ${
                    preferences.travelStyle === option.value
                      ? 'border-primary-500/50 bg-primary-600/10 ring-1 ring-primary-500/30'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.emoji}</div>
                  <div className="font-semibold text-white text-sm">{option.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Special Requirements{' '}
              <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              id="special-requirements-input"
              className="input-field resize-none h-24"
              placeholder="e.g., wheelchair accessible, vegetarian food preferences, traveling with kids..."
              value={preferences.specialRequirements}
              onChange={(e) => updateField('specialRequirements', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            className="btn-secondary"
            onClick={() => setStep(step - 1)}
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            className="btn-primary"
            data-testid="continue-button"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
          >
            Continue →
          </button>
        ) : (
          <button
            className="btn-primary flex items-center gap-2"
            data-testid="submit-trip-button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-dots">
                  <span /> <span /> <span />
                </div>
                <span>Forging your trip...</span>
              </>
            ) : (
              <>
                <span>🔥</span>
                <span>Forge My Trip</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
