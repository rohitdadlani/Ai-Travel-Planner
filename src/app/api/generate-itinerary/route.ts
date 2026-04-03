// ============================================================
// TripForge - Generate Itinerary API Route
// ============================================================

import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { generateWithGemini, parseItineraryJSON } from '@/lib/gemini';
import { buildItineraryPrompt } from '@/lib/prompts';
import { GenerateItineraryRequest, Itinerary, LegacyActivity as Activity, DayPlan } from '@/types';

export async function POST(request: Request) {
  try {
    const body: GenerateItineraryRequest = await request.json();
    const { preferences } = body;

    // Validate required fields
    if (!preferences.destination || !preferences.startDate || !preferences.endDate) {
      return NextResponse.json(
        { success: false, error: 'Destination, start date, and end date are required' },
        { status: 400 }
      );
    }

    // Build the prompt
    const prompt = buildItineraryPrompt(preferences);

    // Generate itinerary with Gemini
    const rawResponse = await generateWithGemini(prompt);

    // Parse the JSON response
    const parsed = parseItineraryJSON(rawResponse);

    // Calculate total days
    const start = new Date(preferences.startDate);
    const end = new Date(preferences.endDate);
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // Build the itinerary object
    const itinerary: Itinerary = {
      id: uuidv4(),
      destination: preferences.destination,
      title: (parsed.title as string) || `Trip to ${preferences.destination}`,
      summary: (parsed.summary as string) || '',
      startDate: preferences.startDate,
      endDate: preferences.endDate,
      totalDays,
      budget: preferences.budget,
      currency: (parsed.currency as string) || 'USD',
      days: ((parsed.days as Record<string, unknown>[]) || []).map(
        (day: Record<string, unknown>, index: number) => ({
          day: (day.day as number) || index + 1,
          date: (day.date as string) || '',
          theme: (day.theme as string) || '',
          activities: ((day.activities as Record<string, unknown>[]) || []).map(
            (activity: Record<string, unknown>) => ({
              id: uuidv4(),
              time: (activity.time as string) || '',
              title: (activity.title as string) || '',
              description: (activity.description as string) || '',
              location: (activity.location as string) || '',
              duration: (activity.duration as string) || '',
              cost: (activity.cost as string) || '',
              category: (activity.category as Activity['category']) || 'sightseeing',
              tips: (activity.tips as string) || undefined,
            })
          ),
        })
      ) as DayPlan[],
      packingList: (parsed.packingList as string[]) || [],
      travelTips: (parsed.travelTips as string[]) || [],
      estimatedTotalCost: (parsed.estimatedTotalCost as string) || 'Not estimated',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, itinerary });
  } catch (error) {
    console.error('Generate itinerary error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate itinerary',
      },
      { status: 500 }
    );
  }
}
