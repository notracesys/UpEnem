"use client";

import { useState, useTransition, useEffect } from "react";
import { provideAiFeedbackOnEssay } from "@/ai/flows/provide-ai-feedback-on-essay";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type WritingEditorProps = {
  topic?: string;
  initialText?: string;
  showTimer?: boolean;
  title: string;
  description: string;
};

function Timer() {
  const [time, setTime] = useState(5400); // 90 minutes in seconds

  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="font-mono text-lg font-semibold bg-muted px-3 py-1 rounded-md">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}

export function WritingEditor({ topic, initialText, showTimer, title, description }: WritingEditorProps) {
  const [essay, setEssay] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const getFeedback = async () => {
    if (!essay.trim()) {
      toast({
        title: "Texto Vazio",
        description: "Por favor, escreva algo antes de pedir a correção.",
        variant: "destructive",
      });
      return;
    }
    startTransition(async () => {
      setFeedback(null);
      const result = await provideAiFeedbackOnEssay({ essay });
      if (result.feedback) {
        setFeedback(result.feedback);
      } else {
        toast({
          title: "Erro na Correção",
          description: "Não foi possível gerar o feedback. Tente novamente.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <header className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold font-headline">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            {showTimer && <Timer />}
        </header>

        {topic && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Tema Proposto</AlertTitle>
            <AlertDescription>{topic}</AlertDescription>
          </Alert>
        )}

        {initialText && (
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-lg">Texto de Apoio</CardTitle>
                    <CardDescription>Continue a redação a partir do texto abaixo, focando em uma proposta de intervenção completa.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{initialText}</p>
                </CardContent>
            </Card>
        )}

        <Textarea
          placeholder="Comece a escrever sua redação aqui..."
          className="min-h-[500px] text-base"
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
        />
        <Button onClick={getFeedback} disabled={isPending} size="lg" className="w-full sm:w-auto">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Corrigir com IA
        </Button>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="text-primary"/>
              Feedback da IA
            </CardTitle>
            <CardDescription>
              {isPending ? "Analisando sua redação..." : feedback ? "Aqui está a análise da sua redação." : "Clique no botão de correção para receber o feedback."}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {isPending && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {feedback && <div className="prose prose-sm max-w-none whitespace-pre-wrap">{feedback}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
