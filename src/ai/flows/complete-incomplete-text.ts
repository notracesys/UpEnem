'use server';

/**
 * @fileOverview This file defines a Genkit flow for completing incomplete essays.
 *
 * - completeIncompleteText - A function that takes an incomplete essay and generates a completion.
 * - CompleteIncompleteTextInput - The input type for the completeIncompleteText function.
 * - CompleteIncompleteTextOutput - The return type for the completeIncompleteText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompleteIncompleteTextInputSchema = z.object({
  incompleteText: z
    .string()
    .describe('The incomplete essay to be completed.'),
});

export type CompleteIncompleteTextInput = z.infer<
  typeof CompleteIncompleteTextInputSchema
>;

const CompleteIncompleteTextOutputSchema = z.object({
  completedText: z
    .string()
    .describe('The completed essay.'),
});

export type CompleteIncompleteTextOutput = z.infer<
  typeof CompleteIncompleteTextOutputSchema
>;

export async function completeIncompleteText(
  input: CompleteIncompleteTextInput
): Promise<CompleteIncompleteTextOutput> {
  return completeIncompleteTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'completeIncompleteTextPrompt',
  input: {schema: CompleteIncompleteTextInputSchema},
  output: {schema: CompleteIncompleteTextOutputSchema},
  prompt: `You are an expert essay writer. Please complete the following essay:

{{{incompleteText}}}`,
});

const completeIncompleteTextFlow = ai.defineFlow(
  {
    name: 'completeIncompleteTextFlow',
    inputSchema: CompleteIncompleteTextInputSchema,
    outputSchema: CompleteIncompleteTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
