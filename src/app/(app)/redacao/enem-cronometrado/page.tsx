import { WritingEditor } from "@/components/app/writing-editor";
import { generateEssayTopic } from "@/ai/flows/generate-essay-topic";

export const revalidate = 0;

export default async function TimedEnemPage() {
    const { topic } = await generateEssayTopic();
  
    return (
    <WritingEditor 
        title="Simulação ENEM Cronometrada"
        description="Encare o desafio do ENEM: um tema surpresa e o tempo correndo no relógio."
        topic={topic}
        showTimer={true}
    />
  );
}
