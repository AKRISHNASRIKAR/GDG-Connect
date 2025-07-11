// ai/flows/suggest-call-description.ts
'use server';

import { ai } from '@/app/ai/genkit';
import { z } from 'genkit';

const SuggestCallDescriptionInputSchema = z.object({
  description: z.string().describe('The call description to be improved.'),
});

export type SuggestCallDescriptionInput = z.infer<typeof SuggestCallDescriptionInputSchema>;

const SuggestCallDescriptionOutputSchema = z.object({
  suggestions: z.string().describe('Suggested improvements to the call description.'),
  callType: z.string().describe('The best call type'),
  tags: z.string().describe('Suggested tags for the call'),
});

export type SuggestCallDescriptionOutput = z.infer<typeof SuggestCallDescriptionOutputSchema>;

export async function suggestCallDescription(input: SuggestCallDescriptionInput): Promise<SuggestCallDescriptionOutput> {
  return suggestCallDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCallDescriptionPrompt',
  input: { schema: SuggestCallDescriptionInputSchema },
  output: { schema: SuggestCallDescriptionOutputSchema },
  prompt: `You are an expert in creating engaging and effective call descriptions for GDG events.

Given the following call description, suggest improvements to make it more appealing to potential speakers and volunteers. Also, identify the best call type and suggest a few tags.

Description: {{{description}}}
\nOutput in JSON format adhering to the schema.`,
});

const suggestCallDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestCallDescriptionFlow',
    inputSchema: SuggestCallDescriptionInputSchema,
    outputSchema: SuggestCallDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
