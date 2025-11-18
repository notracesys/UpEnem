'use server';
/**
 * @fileOverview An AI agent that provides feedback on an essay.
 *
 * - provideAiFeedbackOnEssay - A function that provides feedback on an essay.
 * - ProvideAiFeedbackOnEssayInput - The input type for the provideAiFeedbackOnEssay function.
 * - ProvideAiFeedbackOnEssayOutput - The return type for the provideAiFeedbackOnEssay function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideAiFeedbackOnEssayInputSchema = z.object({
  essay: z.string().describe('The essay to provide feedback on.'),
});
export type ProvideAiFeedbackOnEssayInput = z.infer<typeof ProvideAiFeedbackOnEssayInputSchema>;

const ProvideAiFeedbackOnEssayOutputSchema = z.object({
  feedback: z.string().describe('The feedback on the essay.'),
});
export type ProvideAiFeedbackOnEssayOutput = z.infer<typeof ProvideAiFeedbackOnEssayOutputSchema>;

export async function provideAiFeedbackOnEssay(input: ProvideAiFeedbackOnEssayInput): Promise<ProvideAiFeedbackOnEssayOutput> {
  return provideAiFeedbackOnEssayFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideAiFeedbackOnEssayPrompt',
  input: {schema: ProvideAiFeedbackOnEssayInputSchema},
  output: {schema: ProvideAiFeedbackOnEssayOutputSchema},
  prompt: `You are an AI assistant that provides feedback on essays. Please provide feedback on the following essay, including grammar, spelling, and overall quality, so that the student can improve their writing skills.\n\nEssay: {{{essay}}}`,
});

const provideAiFeedbackOnEssayFlow = ai.defineFlow(
  {
    name: 'provideAiFeedbackOnEssayFlow',
    inputSchema: ProvideAiFeedbackOnEssayInputSchema,
    outputSchema: ProvideAiFeedbackOnEssayOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
