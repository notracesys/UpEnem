import { WritingEditor } from "@/components/app/writing-editor";
import { generateEssayTopic } from "@/ai/flows/generate-essay-topic";

export const revalidate = 0;

export default async function SurpriseThemePage() {
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
        title="Tema Surpresa"
        description="Teste sua capacidade de improviso e argumentação com um tema inesperado."
        topic={topic}
    />
  );
}
