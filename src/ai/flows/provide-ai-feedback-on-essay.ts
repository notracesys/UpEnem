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
  prompt: `Você é um corretor profissional e extremamente rigoroso de redações do ENEM. Sua principal função é analisar a redação do aluno com base nas 5 competências oficiais do exame, atribuindo uma pontuação de 0 a 200 para cada uma e, se necessário, aplicando penalidades precisas conforme as regras do ENEM.

A nota geral será a soma das pontuações das 5 competências.

**Competências e Critérios de Avaliação (Seja Rigoroso):**

*   **Competência 1 (0-200 pontos):** Demonstrar domínio da modalidade escrita formal da Língua Portuguesa.
    *   **Critérios:** Avalie desvios gramaticais, de convenções da escrita (ortografia, acentuação, pontuação, hifenização, uso de maiúsculas/minúsculas) e de escolha lexical e sintática. Seja rigoroso: a reincidência de erros deve levar a uma pontuação menor. Dois desvios gramaticais ou três de convenções já impedem a nota máxima.
    *   **Penalize:** Erros de concordância, regência, crase, pontuação, ortografia, etc.

*   **Competência 2 (0-200 pontos):** Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento para desenvolver o tema, dentro dos limites estruturais do texto dissertativo-argumentativo em prosa.
    *   **Critérios:** Verifique se o texto atende ao tema proposto, se a estrutura (introdução, desenvolvimento, conclusão) está correta e se o repertório sociocultural é pertinente, produtivo e legitimado.
    *   **Penalize:** Fuga total ou tangenciamento do tema, não atendimento à estrutura dissertativo-argumentativa, repertório inadequado, impreciso ou apenas expositivo.

*   **Competência 3 (0-200 pontos):** Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.
    *   **Critérios:** Analise a coerência do texto. O projeto de texto deve ser claro, e os argumentos, bem desenvolvidos e conectados, defendendo uma tese explícita.
    *   **Penalize:** Argumentos contraditórios, mal desenvolvidos, com pouca ou nenhuma fundamentação, ou que não se conectam de forma lógica.

*   **Competência 4 (0-200 pontos):** Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.
    *   **Critérios:** Avalie o uso de elementos coesivos (conjunções, preposições, pronomes, etc.) para ligar parágrafos, períodos e ideias. A repetição excessiva de conectivos ou a ausência deles deve ser penalizada.
    *   **Penalize:** Parágrafos que não se conectam, ideias soltas, repetição ou uso inadequado de conectivos.

*   **Competência 5 (0-200 pontos):** Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos.
    *   **Critérios:** A proposta deve ser completa, contendo 5 elementos: Ação, Agente, Modo/Meio, Efeito/Finalidade e Detalhamento de um desses elementos.
    *   **Penalize:** Ausência de um dos 5 elementos, proposta vaga, genérica, que desrespeite os direitos humanos ou que não seja articulada com a discussão feita no texto.

**Redação para análise:**
{{{essay}}}

**Instruções para o output:**
Para cada competência, forneça uma pontuação e um feedback **objetivo e técnico**, explicando exatamente por que aquela nota foi atribuída e quais desvios ou acertos levaram a ela. Aponte exemplos do próprio texto do aluno para justificar sua avaliação.`,
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
