// ============================================================
// TripForge - Type Definitions
// ============================================================

export interface TripPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  budget: 'budget' | 'moderate' | 'luxury';
  interests: string[];
  travelStyle: 'relaxed' | 'balanced' | 'packed';
  travelers: number;
  specialRequirements?: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  cost: string;
  category: 'sightseeing' | 'food' | 'adventure' | 'culture' | 'relaxation' | 'transport' | 'shopping';
  tips?: string;
}

export interface DayPlan {
  day: number;
  date: string;
  theme: string;
  activities: Activity[];
}

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

export interface GenerateItineraryRequest {
  preferences: TripPreferences;
}

export interface GenerateItineraryResponse {
  success: boolean;
  itinerary?: Itinerary;
  error?: string;
}

export interface EnhanceContentRequest {
  content: string;
  type: 'description' | 'tips' | 'summary';
}

export interface EnhanceContentResponse {
  success: boolean;
  enhanced?: string;
  error?: string;
}

export interface SavedTrip {
  id: string;
  itinerary: Itinerary;
  preferences: TripPreferences;
  savedAt: string;
}
