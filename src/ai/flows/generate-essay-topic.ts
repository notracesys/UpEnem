'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a random essay topic.
 *
 * The flow uses a language model to create an essay topic based on a variety of themes.
 * It exports:
 *   - generateEssayTopic: The function to call to generate a new essay topic.
 *   - GenerateEssayTopicOutput: The output type of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEssayTopicOutputSchema = z.object({
  topic: z.string().describe('A random essay topic.'),
});
export type GenerateEssayTopicOutput = z.infer<typeof GenerateEssayTopicOutputSchema>;

export async function generateEssayTopic(): Promise<GenerateEssayTopicOutput> {
  return generateEssayTopicFlow();
}

const generateEssayTopicPrompt = ai.definePrompt({
  name: 'generateEssayTopicPrompt',
  output: {schema: GenerateEssayTopicOutputSchema},
  prompt: `You are a creative writing assistant. Generate a random and engaging essay topic that students can use to practice their writing skills. The topic should be suitable for a high school or early college level essay.`,
});

const generateEssayTopicFlow = ai.defineFlow(
  {
    name: 'generateEssayTopicFlow',
    outputSchema: GenerateEssayTopicOutputSchema,
  },
  async () => {
    const {output} = await generateEssayTopicPrompt({});
    return output!;
  }
);
