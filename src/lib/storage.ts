// ============================================================
// TripForge - Local Storage Utilities
// ============================================================

import { SavedTrip, Itinerary, TripPreferences } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'tripforge_saved_trips';

export function getSavedTrips(): SavedTrip[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    console.error('Failed to read saved trips from localStorage');
    return [];
  }
}

export function saveTrip(itinerary: Itinerary, preferences: TripPreferences): SavedTrip {
  const trips = getSavedTrips();
  const newTrip: SavedTrip = {
    id: uuidv4(),
    itinerary,
    preferences,
    savedAt: new Date().toISOString(),
  };

  trips.unshift(newTrip);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  return newTrip;
}

export function deleteSavedTrip(id: string): void {
  const trips = getSavedTrips();
  const filtered = trips.filter((trip) => trip.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getSavedTripById(id: string): SavedTrip | undefined {
  const trips = getSavedTrips();
  return trips.find((trip) => trip.id === id);
}
