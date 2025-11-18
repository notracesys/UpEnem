'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a random motivational quote.
 *
 * It exports:
 *   - generateMotivationalQuote: The function to call to generate a new quote.
 *   - GenerateMotivationalQuoteOutput: The output type of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMotivationalQuoteOutputSchema = z.object({
  quote: z.string().describe('A motivational quote.'),
  author: z.string().describe('The author of the quote.'),
});
export type GenerateMotivationalQuoteOutput = z.infer<typeof GenerateMotivationalQuoteOutputSchema>;

export async function generateMotivationalQuote(): Promise<GenerateMotivationalQuoteOutput> {
  return generateMotivationalQuoteFlow();
}

const generateMotivationalQuotePrompt = ai.definePrompt({
  name: 'generateMotivationalQuotePrompt',
  output: {schema: GenerateMotivationalQuoteOutputSchema},
  prompt: `Você é um especialista em gerar citações motivacionais para estudantes que estão se preparando para o ENEM.
Sua tarefa é gerar uma citação inspiradora e concisa, juntamente com seu autor.
A citação deve ser relevante para o contexto de estudo, superação e perseverança.
Não use citações que já são extremamente conhecidas. Seja um pouco mais original.
Retorne apenas a citação e o autor.`,
});

const generateMotivationalQuoteFlow = ai.defineFlow(
  {
    name: 'generateMotivationalQuoteFlow',
    outputSchema: GenerateMotivationalQuoteOutputSchema,
  },
  async () => {
    const {output} = await generateMotivationalQuotePrompt({});
    return output!;
  }
);
