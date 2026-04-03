// ============================================================
// TripForge - Google Gemini AI Client
// ============================================================

import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GOOGLE_GEMINI_API_KEY) {
  console.warn('⚠️  GOOGLE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function generateWithGemini(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite-preview',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 8192,
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error(
      `Failed to generate content with Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export function parseItineraryJSON(rawText: string): Record<string, unknown> {
  // Strip markdown code fences if present
  let cleaned = rawText.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // Attempt to extract JSON object from surrounding text
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        throw new Error('Failed to parse itinerary JSON from Gemini response');
      }
    }
    throw new Error('No valid JSON found in Gemini response');
  }
}
