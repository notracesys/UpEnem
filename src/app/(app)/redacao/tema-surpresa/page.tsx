import { WritingEditor } from "@/components/app/writing-editor";
import { generateEssayTopic } from "@/ai/flows/generate-essay-topic";

export const revalidate = 0;

export default async function SurpriseThemePage() {
    const { topic } = await generateEssayTopic();

  return (
    <WritingEditor 
        title="Tema Surpresa"
        description="Teste sua capacidade de improviso e argumentação com um tema inesperado."
        topic={topic}
    />
  );
}
