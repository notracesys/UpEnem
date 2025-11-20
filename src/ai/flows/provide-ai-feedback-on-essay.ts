'use server';
/**
 * @fileOverview An AI agent that provides feedback on an essay.
 *
 * - provideAiFeedbackOnEssay - A function that provides feedback on an essay.
 * - ProvideAiFeedbackOnEssayInput - The input type for the provideAiFeedbackOnEssay function.
 * - ProvideAiFeedbackOnEssayOutput - The return type for the provideAifeedbackOnEssay function.
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
    fugaAoTema: z.boolean().describe('Indicates if the essay is completely off-topic.'),
    textoInsuficiente: z.boolean().describe('Indicates if the essay has 7 lines or less.'),
    competencia1: CompetencySchema.describe('Demonstrates mastery of the formal written modality of the Portuguese Language.'),
    competencia2: CompetencySchema.describe('Understands the writing proposal and applies concepts from various areas of knowledge to develop the theme, within the structural limits of the argumentative-dissertative text in prose.'),
    competencia3: CompetencySchema.describe('Selects, relates, organizes, and interprets information, facts, opinions, and arguments in defense of a point of view.'),
    competencia4: CompetencySchema.describe('Demonstrates knowledge of the linguistic mechanisms necessary for the construction of argumentation.'),
    competencia5: CompetencySchema.describe('Elaborates an intervention proposal for the addressed problem, respecting human rights.'),
});

export type ProvideAiFeedbackOnEssayOutput = z.infer<typeof ProvideAiFeedbackOnEssayOutputSchema>;

export async function provideAiFeedbackOnEssay(input: ProvideAiFeedbackOnEssayInput): Promise<ProvideAiF