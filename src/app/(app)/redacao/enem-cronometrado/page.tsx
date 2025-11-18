import { WritingEditor } from "@/components/app/writing-editor";
import { generateEssayTopic } from "@/ai/flows/generate-essay-topic";

export const revalidate = 0;

export default async function TimedEnemPage() {
    let topic = "Não foi possível carregar um tema. Por favor, digite um manualmente.";
    try {
        const result = await generateEssayTopic();
        topic = result.topic;
    } catch (error) {
        console.error("Failed to generate essay topic:", error);
        // Topic will have the fallback value, and the editor will be usable.
    }
  
    return (
    <WritingEditor 
        title="Simulação ENEM Cronometrada"
        description="Encare o desafio do ENEM: um tema surpresa e o tempo correndo no relógio."
        topic={topic}
        showTimer={true}
    />
  );
}
