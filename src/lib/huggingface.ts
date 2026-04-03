// ============================================================
// TripForge - HuggingFace Inference Client
// ============================================================

import { HfInference } from '@huggingface/inference';

if (!process.env.HUGGINGFACE_API_KEY) {
  console.warn('⚠️  HUGGINGFACE_API_KEY is not set in environment variables');
}

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || '');

export async function enhanceWithHuggingFace(prompt: string): Promise<string> {
  try {
    const response = await hf.textGeneration({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      inputs: `<s>[INST] ${prompt} [/INST]`,
      parameters: {
        max_new_tokens: 512,
        temperature: 0.7,
        top_p: 0.9,
        return_full_text: false,
      },
    });

    return response.generated_text.trim();
  } catch (error) {
    console.error('HuggingFace API error:', error);
    throw new Error(
      `Failed to enhance content with HuggingFace: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
