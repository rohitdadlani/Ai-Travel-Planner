// ============================================================
// TripForge - Enhance Content API Route
// ============================================================

import { NextResponse } from 'next/server';
import { enhanceWithHuggingFace } from '@/lib/huggingface';
import { buildEnhancePrompt } from '@/lib/prompts';
import { EnhanceContentRequest } from '@/types';

export async function POST(request: Request) {
  try {
    const body: EnhanceContentRequest = await request.json();
    const { content, type } = body;

    if (!content || !type) {
      return NextResponse.json(
        { success: false, error: 'Content and type are required' },
        { status: 400 }
      );
    }

    const prompt = buildEnhancePrompt(content, type);
    const enhanced = await enhanceWithHuggingFace(prompt);

    return NextResponse.json({ success: true, enhanced });
  } catch (error) {
    console.error('Enhance content error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to enhance content',
      },
      { status: 500 }
    );
  }
}
