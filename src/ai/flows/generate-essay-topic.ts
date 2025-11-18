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
  prompt: `Você é um especialista em criar temas de redação para o ENEM. Sua tarefa é gerar um tema aleatório, relevante e desafiador, no exato formato que apareceria na prova. O tema deve ser uma frase concisa que aborde um problema social, cultural ou científico pertinente ao Brasil.

Exemplos de temas no formato correto:
- "O estigma associado às doenças mentais na sociedade brasileira"
- "Desafios para a valorização de comunidades e povos tradicionais no Brasil"
- "Democratização do acesso ao cinema no Brasil"

Gere um novo tema nesse padrão.`,
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
