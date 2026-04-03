'use client';

import React, { useState } from 'react';
import { Itinerary, DayPlan, LegacyActivity as Activity } from '@/types';
import {
  formatDate,
  getCategoryEmoji,
  getCategoryColor,
  getDayGradient,
} from '@/utils';

interface ItineraryViewProps {
  itinerary: Itinerary;
  onReset: () => void;
  onSave: () => void;
}

export default function ItineraryView({
  itinerary,
  onReset,
  onSave,
}: ItineraryViewProps) {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedActivities, setExpandedActivities] = useState<Set<string>>(
    new Set()
  );
  const [activeTab, setActiveTab] = useState<'itinerary' | 'packing' | 'tips'>(
    'itinerary'
  );

  const toggleActivity = (id: string) => {
    setExpandedActivities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up" data-testid="itinerary-view">
      {/* Header */}
      <div className="glass-card mb-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-purple-600/10 to-accent-600/10" />
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-3">
            {itinerary.title}
          </h1>
          <p className="text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            {itinerary.summary}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="glass-subtle p-3 rounded-xl">
              <div className="text-lg font-bold text-white">
                {itinerary.totalDays}
              </div>
              <div className="text-xs text-gray-400">Days</div>
            </div>
            <div className="glass-subtle p-3 rounded-xl">
              <div className="text-lg font-bold text-white">
                {itinerary.destination}
              </div>
              <div className="text-xs text-gray-400">Destination</div>
            </div>
            <div className="glass-subtle p-3 rounded-xl">
              <div className="text-lg font-bold text-white capitalize">
                {itinerary.budget}
              </div>
              <div className="text-xs text-gray-400">Budget</div>
            </div>
            <div className="glass-subtle p-3 rounded-xl">
              <div className="text-lg font-bold text-white">
                {itinerary.estimatedTotalCost}
              </div>
              <div className="text-xs text-gray-400">Est. Cost</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button onClick={onSave} className="btn-primary flex-1 text-center">
          💾 Save Trip
        </button>
        <button onClick={onReset} className="btn-secondary flex-1 text-center">
          ✨ Plan New Trip
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6 p-1 glass-subtle rounded-xl">
        {(
          [
            { key: 'itinerary' as const, label: '📅 Itinerary' },
            { key: 'packing' as const, label: '🎒 Packing List' },
            { key: 'tips' as const, label: '💡 Travel Tips' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Itinerary Tab */}
      {activeTab === 'itinerary' && (
        <div className="space-y-4">
          {/* Day Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {itinerary.days.map((day: DayPlan, index: number) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeDay === index
                    ? `bg-gradient-to-r ${getDayGradient(index)} text-white shadow-lg scale-105`
                    : 'glass-subtle text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>

          {/* Active Day */}
          {itinerary.days[activeDay] && (
            <div className="animate-fade-in">
              <div className="glass-card mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getDayGradient(
                      activeDay
                    )} flex items-center justify-center font-bold text-white`}
                  >
                    {itinerary.days[activeDay].day}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">
                      {itinerary.days[activeDay].theme}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {formatDate(itinerary.days[activeDay].date ?? '')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="space-y-3">
                {itinerary.days[activeDay].activities.map(
                  (activity: Activity, actIndex: number) => (
                    <div
                      key={activity.id || actIndex}
                      className="glass-subtle overflow-hidden transition-all duration-300 cursor-pointer hover:bg-white/[0.04]"
                      onClick={() =>
                        toggleActivity(activity.id || `${activeDay}-${actIndex}`)
                      }
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          {/* Time badge */}
                          <div className="flex-shrink-0 text-center">
                            <div className="text-xs font-semibold text-primary-300 bg-primary-600/10 px-2 py-1 rounded-lg">
                              {activity.time}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">
                                {getCategoryEmoji(activity.category)}
                              </span>
                              <h4 className="font-semibold text-white text-sm truncate">
                                {activity.title}
                              </h4>
                            </div>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              📍 {activity.location}
                            </p>
                          </div>

                          {/* Cost & Duration */}
                          <div className="flex-shrink-0 text-right">
                            <div
                              className={`text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${getCategoryColor(
                                activity.category
                              )} text-white`}
                            >
                              {activity.cost}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {activity.duration}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedActivities.has(
                          activity.id || `${activeDay}-${actIndex}`
                        ) && (
                          <div className="mt-3 pt-3 border-t border-white/5 animate-slide-down">
                            <p className="text-sm text-gray-300 leading-relaxed mb-2">
                              {activity.description}
                            </p>
                            {activity.tips && (
                              <div className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg p-2.5 mt-2">
                                <span className="text-sm">💡</span>
                                <p className="text-xs text-amber-200/80">
                                  {activity.tips}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Packing List Tab */}
      {activeTab === 'packing' && (
        <div className="glass-card animate-fade-in">
          <h3 className="text-xl font-display font-bold text-white mb-4">
            🎒 Packing Essentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {(itinerary.packingList ?? []).map((item: string, index: number) => (
              <label
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-primary-500"
                />
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Travel Tips Tab */}
      {activeTab === 'tips' && (
        <div className="glass-card animate-fade-in">
          <h3 className="text-xl font-display font-bold text-white mb-4">
            💡 Travel Tips
          </h3>
          <div className="space-y-3">
            {(itinerary.travelTips ?? []).map((tip: string, index: number) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg glass-subtle"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
