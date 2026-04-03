// ============================================================
// TripForge - Prompt Templates
// ============================================================

import { TripPreferences } from '@/types';

export function buildItineraryPrompt(preferences: TripPreferences): string {
  const {
    destination,
    startDate,
    endDate,
    budget,
    interests,
    travelStyle,
    travelers,
    specialRequirements,
  } = preferences;

  const budgetDescriptions = {
    budget: 'Budget-friendly (hostels, street food, public transport, free activities)',
    moderate: 'Moderate (mid-range hotels, mix of restaurants, some tours)',
    luxury: 'Luxury (premium hotels, fine dining, private tours, VIP experiences)',
  };

  const styleDescriptions = {
    relaxed: 'Relaxed pace with plenty of downtime, 2-3 activities per day',
    balanced: 'Balanced mix of activities and rest, 3-4 activities per day',
    packed: 'Action-packed with maximum activities, 5-6 activities per day',
  };

  return `You are an expert travel planner. Create a detailed day-by-day travel itinerary for the following trip.

TRIP DETAILS:
- Destination: ${destination}
- Travel Dates: ${startDate} to ${endDate}
- Budget Level: ${budgetDescriptions[budget]}
- Interests: ${interests.join(', ')}
- Travel Style: ${styleDescriptions[travelStyle]}
- Number of Travelers: ${travelers}
${specialRequirements ? `- Special Requirements: ${specialRequirements}` : ''}

INSTRUCTIONS:
1. Create a complete day-by-day itinerary
2. Each activity should include specific times, locations, descriptions, duration, and estimated costs
3. Include a mix of activities matching the traveler's interests
4. Consider practical logistics (travel time between locations, opening hours)
5. Include meal recommendations for each day
6. Provide a packing list relevant to the destination and activities
7. Include local travel tips and cultural notes
8. Estimate total trip cost

RESPOND WITH VALID JSON ONLY (no markdown, no code fences). Use this exact structure:
{
  "title": "A catchy title for the trip",
  "summary": "A 2-3 sentence overview of the trip",
  "currency": "Local currency code (e.g., USD, EUR, JPY)",
  "estimatedTotalCost": "Estimated total cost range for ${travelers} traveler(s)",
  "days": [
    {
      "day": 1,
      "date": "${startDate}",
      "theme": "Theme for the day (e.g., 'Historic City Center Exploration')",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity name",
          "description": "Detailed description of the activity",
          "location": "Specific location or address",
          "duration": "Estimated duration (e.g., '2 hours')",
          "cost": "Estimated cost per person",
          "category": "One of: sightseeing, food, adventure, culture, relaxation, transport, shopping",
          "tips": "Any helpful tips for this activity"
        }
      ]
    }
  ],
  "packingList": ["item1", "item2"],
  "travelTips": ["tip1", "tip2"]
}`;
}

export function buildEnhancePrompt(
  content: string,
  type: 'description' | 'tips' | 'summary'
): string {
  const typeInstructions = {
    description:
      'Enhance this travel description to be more vivid, engaging, and informative. Add sensory details and practical information. Keep it concise (2-3 sentences).',
    tips: 'Expand on this travel tip with more specific, actionable advice. Include insider knowledge and practical details. Keep it concise (2-3 sentences).',
    summary:
      'Enhance this trip summary to be more compelling and exciting while remaining accurate. Highlight unique experiences. Keep it to 3-4 sentences.',
  };

  return `${typeInstructions[type]}

Original content: "${content}"

Respond with ONLY the enhanced text, no quotes, no prefixes, no explanations.`;
}
