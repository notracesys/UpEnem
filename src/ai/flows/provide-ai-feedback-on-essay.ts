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

const CompetencySchema = z.object({
  score: z.number().describe('A score from 0 to 200 for this competency.'),
  feedback: z.string().describe('Detailed feedback for this competency.'),
});

const ProvideAiFeedbackOnEssayOutputSchema = z.object({
    notaGeral: z.number().describe('The overall score for the essay, from 0 to 1000. It is the sum of all competency scores.'),
    competencia1: CompetencySchema,
    competencia2: CompetencySchema,
    competencia3: CompetencySchema,
    competencia4: CompetencySchema,
    competencia5: CompetencySchema,
});

export type ProvideAiFeedbackOnEssayOutput = z.infer<typeof ProvideAiFeedbackOnEssayOutputSchema>;

export async function provideAiFeedbackOnEssay(input: ProvideAiFeedbackOnEssayInput): Promise<ProvideAiFeedbackOnEssayOutput> {
  return provideAiFeedbackOnEssayFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideAiFeedbackOnEssayPrompt',
  input: {schema: ProvideAiFeedbackOnEssayInputSchema},
  output: {schema: ProvideAiFeedbackOnEssayOutputSchema},
  prompt: `Você é um corretor especialista em redações do ENEM. Analise a redação a seguir e forneça uma pontuação e um feedback detalhado para cada uma das 5 competências. A pontuação de cada competência vai de 0 a 200. A nota geral é a soma das 5 competências.

Competências do ENEM:
- Competência 1: Demonstrar domínio da modalidade escrita formal da língua portuguesa. (Avalie gramática, ortografia, pontuação, etc.)
- Competência 2: Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento para desenvolver o tema, dentro dos limites estruturais do texto dissertativo-argumentativo em prosa. (Avalie a compreensão do tema, a estrutura do texto e o uso de repertório sociocultural.)
- Competência 3: Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista. (Avalie a coerência, a coesão e a argumentação.)
- Competência 4: Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação. (Avalie o uso de conectivos e a coesão textual.)
- Competência 5: Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos. (Avalie a proposta de intervenção, se é completa, detalhada e respeita os direitos humanos.)

Redação:
{{{essay}}}

Forneça uma análise concisa e objetiva para cada competência, apontando os pontos fortes e as áreas de melhoria.`,
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
