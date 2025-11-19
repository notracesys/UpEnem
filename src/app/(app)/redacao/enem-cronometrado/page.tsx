
"use client";

import { useState, useEffect } from "react";
import { WritingEditor } from "@/components/app/writing-editor";
import { generateEssayTopic } from "@/ai/flows/generate-essay-topic";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export default function TimedEnemPage() {
    const [topic, setTopic] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchTopic = async () => {
        setIsLoading(true);
        try {
            const result = await generateEssayTopic();
            setTopic(result.topic);
        } catch (error) {
            console.error("Failed to generate essay topic:", error);
            setTopic("Não foi possível carregar um tema. Por favor, digite um manualmente.");
             toast({
                title: "Erro ao carregar tema",
                description: "Ocorreu um erro ao buscar o tema. Você pode digitar um manualmente.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };
  
    useEffect(() => {
        fetchTopic();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <h1 className="text-2xl font-bold font-headline">Gerando seu tema...</h1>
                <p className="text-muted-foreground">Aguarde um instante, estamos preparando um desafio para você.</p>
            </div>
        );
    }
  
    return (
        <WritingEditor 
            title="Simulação ENEM Cronometrada"
            description="Encare o desafio do ENEM: um tema surpresa e o tempo correndo no relógio."
            topic={topic || ""}
            showTimer={true}
            onRestartWithNewTopic={fetchTopic}
        />
    );
}

