'use server';
/**
 * @fileOverview A Genkit flow that generates suggested compliance questions for the user.
 *
 * - suggestComplianceQuestions - A function that returns a list of suggested queries.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestQuestionsInputSchema = z.object({
  context: z.string().optional().describe('Optional context to tailor suggestions (e.g., "factory", "logistics").'),
});
export type SuggestQuestionsInput = z.infer<typeof SuggestQuestionsInputSchema>;

const SuggestQuestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of 3-4 natural language questions.'),
});
export type SuggestQuestionsOutput = z.infer<typeof SuggestQuestionsOutputSchema>;

const prompt = ai.definePrompt({
  name: 'suggestQuestionsPrompt',
  input: { schema: SuggestQuestionsInputSchema },
  output: { schema: SuggestQuestionsOutputSchema },
  prompt: `
    You are an expert environmental regulatory auditor. 
    Generate 4 concise, intelligent, and highly relevant questions a user might ask an AI compliance assistant.
    
    Context: {{#if context}}{{context}}{{else}}General Environmental Compliance{{/if}}

    The questions should focus on:
    1. Specific emission limits (PM2.5, CO2, etc.)
    2. Vehicle fuel efficiency standards.
    3. Latest Ministry of Environment notifications.
    4. Compliance verification for specific IDs like "Shipment-45" or "Factory-21".

    Provide only the questions in the structured output.
  `,
});

const suggestQuestionsFlow = ai.defineFlow(
  {
    name: 'suggestQuestionsFlow',
    inputSchema: SuggestQuestionsInputSchema,
    outputSchema: SuggestQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function suggestComplianceQuestions(
  input: SuggestQuestionsInput = {}
): Promise<SuggestQuestionsOutput> {
  return suggestQuestionsFlow(input);
}
