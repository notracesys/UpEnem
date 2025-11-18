import { WritingEditor } from "@/components/app/writing-editor";

const incompleteEssay = `A persistência da violência contra a mulher na sociedade brasileira representa um desafio complexo e multifacetado. Arraigada em uma cultura patriarcal, essa problemática se manifesta de diversas formas, desde a agressão física e psicológica até o feminicídio, e transcende classes sociais, etnias e regiões. Embora a Lei Maria da Penha tenha sido um marco legislativo, a efetiva proteção das vítimas e a desconstrução de padrões comportamentais agressores ainda se mostram insuficientes.

Nesse contexto, a análise dos fatores que perpetuam essa violência é crucial. A normalização de condutas machistas, a dependência econômica e emocional de muitas mulheres em relação aos seus agressores e a morosidade do sistema judiciário criam um ciclo vicioso de difícil rompimento. A educação, por sua vez, emerge como uma ferramenta poderosa, mas seus efeitos na formação de uma mentalidade de respeito e igualdade de gênero são de longo prazo, exigindo ações imediatas que complementem essa frente.

Diante do exposto, a necessidade de medidas concretas para aprimorar a proposta de intervenção se torna evidente...`;

export default function ConclusionPage() {
  return (
    <WritingEditor 
        title="Foco na Conclusão (C5)"
        description="Aprimore sua proposta de intervenção. A partir do texto apresentado, elabore uma conclusão nota máxima."
        initialText={incompleteEssay}
    />
  );
}
