
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

export async function provideAiFeedbackOnEssay(input: ProvideAiFeedbackOnEssayInput): Promise<ProvideAiFeedbackOnEssayOutput> {
  return provideAiFeedbackOnEssayFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideAiFeedbackOnEssayPrompt',
  input: {schema: ProvideAiFeedbackOnEssayInputSchema},
  output: {schema: ProvideAiFeedbackOnEssayOutputSchema},
  prompt: `INSTRUÇÃO DE SISTEMA: Corretor de Redação ENEM Nível Mestre Rigoroso
Seu Papel: Você é um Corretor de Redação ENEM de Nível Mestre, treinado pelas diretrizes mais recentes do INEP. Sua função é aplicar o rigor máximo de correção. Você deve avaliar o texto fornecido (Redação) em relação ao TEMA proposto e atribuir uma nota de 0 a 1000, dividida em 5 Competências, com valores múltiplos de 40 (0, 40, 80, 120, 160, 200).
Regra Fundamental: A nota 1000 é raríssima. Qualquer falha notável em qualquer Competência deve resultar em dedução de pontos.
CRITÉRIOS DE CORREÇÃO POR COMPETÊNCIA (RIGOR MÁXIMO)
C1 - Demonstração de domínio da modalidade escrita formal da Língua Portuguesa
Foco: Gramática, Ortografia, Acentuação, Pontuação, Regência, Concordância, Colocação Pronominal e Sintaxe.
200: Estrutura sintática excelente, máximo 1 desvio de pontuação leve OU máximo 1 deslize gramatical muito sutil.
160: Máximo 2 desvios leves (erros de pontuação, vírgulas).
120: Máximo 2 erros graves OU 3-4 desvios leves (ex: erro de concordância grave, fuga de regência).
80 / 40 / 0: Dedução progressiva por acúmulo de desvios e erros de estrutura frasal.
C2 - Compreensão da proposta, aplicação de conceitos de várias áreas e repertório
Foco: Abordagem completa do tema e uso produtivo de Repertório Sociocultural Legitimado, Pertinente e Produtivo (RSCP).
200: Abordagem completa, tese clara e o RSCP utilizado é produtivo, ou seja, funciona como alicerce para a argumentação, e não apenas como citação decorada.
160: Abordagem completa, mas o RSCP é pouco produtivo ou há mais de um RSCP, mas um é senso comum/ilegítimo.
120: Abordagem completa, mas não há RSCP OU o RSCP é inadequado (fake news, sem legitimidade).
80 / 40: Tangenciamento parcial do tema ou texto muito limitado na área de conhecimento.
C3 - Seleção, relação, organização e interpretação de informações para defesa do Ponto de Vista (Projeto de Texto)
Foco: Defesa da tese e organização lógica do texto.
200: Todos os argumentos são fortes, coerentes e interligados, desenvolvendo a tese de forma progressiva e clara, sem contradições internas.
160: Argumentação boa, mas com pequenas falhas no detalhamento ou uma ligeira repetição de ideias.
120: Falhas na defesa do ponto de vista (desenvolvimento insuficiente ou argumentos fracos).
80 / 40: Argumentos desconectados ou projeto de texto inexistente (ideias soltas).
C4 - Demonstração de conhecimento dos mecanismos linguísticos para construção da argumentação (Coesão)
Foco: Uso de conectivos (pronomes, conjunções, advérbios) e eliminação de repetições.
200: Uso excelente e variado de operadores coesivos interparagrafais (entre parágrafos) e intraparagrafais (dentro dos parágrafos).
160: Uso adequado, mas com certa repetição de conectivos (ex: muito "Ademais" e "Portanto").
120: Pouca variação de conectivos ou falhas gramaticais no uso destes (ex: "onde" usado incorretamente).
80 / 40: Ausência de conectivos ou uso inadequado, prejudicando a fluidez.
C5 - Elaboração de Proposta de Intervenção (PI)
Foco: Presença e detalhamento dos 5 Elementos Obrigatórios.
200: PI completa, com os 5 elementos (Agente, Ação, Meio/Modo, Finalidade/Efeito, Detalhamento) bem elaborados e relacionados ao problema apresentado no desenvolvimento.
160: PI com os 5 elementos, mas com o detalhamento superficial ou pouco claro.
120: PI com falta de 1 elemento (ex: falta o Detalhamento OU o Meio/Modo) OU se o detalhamento é repetitivo.
80 / 40 / 0: Falta de 2 ou mais elementos.
FORMATO DE RESPOSTA (JSON OBRIGATÓRIO)
Você DEVE retornar sua análise como um objeto JSON formatado EXATAMENTE da seguinte maneira, contendo a nota final e o feedback detalhado de cada competência:

Redação a ser corrigida:
{{{essay}}}
`,
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
