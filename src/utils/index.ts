// ============================================================
// TripForge - Utility Functions
// ============================================================

/**
 * Format a date string (YYYY-MM-DD) to a readable format
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Calculate number of days between two date strings
 */
export function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Get emoji for activity category
 */
export function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    sightseeing: '🏛️',
    food: '🍽️',
    adventure: '🏔️',
    culture: '🎭',
    relaxation: '🧘',
    transport: '🚌',
    shopping: '🛍️',
  };
  return emojis[category] || '📍';
}

/**
 * Get color class for activity category
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    sightseeing: 'from-blue-500 to-blue-600',
    food: 'from-orange-500 to-red-500',
    adventure: 'from-emerald-500 to-teal-600',
    culture: 'from-purple-500 to-indigo-600',
    relaxation: 'from-pink-400 to-rose-500',
    transport: 'from-gray-500 to-slate-600',
    shopping: 'from-amber-400 to-yellow-500',
  };
  return colors[category] || 'from-gray-500 to-gray-600';
}

/**
 * Generate a gradient class for a day card
 */
export function getDayGradient(dayIndex: number): string {
  const gradients = [
    'from-violet-600 to-indigo-600',
    'from-cyan-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
    'from-amber-500 to-orange-600',
    'from-fuchsia-500 to-purple-600',
  ];
  return gradients[dayIndex % gradients.length];
}

/**
 * Available interest options for trip planning
 */
export const INTEREST_OPTIONS = [
  { label: 'History & Heritage', value: 'history', emoji: '🏛️' },
  { label: 'Food & Cuisine', value: 'food', emoji: '🍜' },
  { label: 'Nature & Outdoors', value: 'nature', emoji: '🌿' },
  { label: 'Art & Museums', value: 'art', emoji: '🎨' },
  { label: 'Adventure & Sports', value: 'adventure', emoji: '🧗' },
  { label: 'Nightlife & Entertainment', value: 'nightlife', emoji: '🎶' },
  { label: 'Shopping', value: 'shopping', emoji: '🛍️' },
  { label: 'Photography', value: 'photography', emoji: '📸' },
  { label: 'Architecture', value: 'architecture', emoji: '🏗️' },
  { label: 'Local Experiences', value: 'local', emoji: '🤝' },
  { label: 'Wellness & Spa', value: 'wellness', emoji: '💆' },
  { label: 'Beach & Water', value: 'beach', emoji: '🏖️' },
] as const;
