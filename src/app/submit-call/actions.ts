'use server';

import { suggestCallDescription } from '@/app/ai/flows/suggest-call-description';

export async function getSuggestions(description: string) {
  try {
    const result = await suggestCallDescription({ description });
    return result;
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return null;
  }
}
