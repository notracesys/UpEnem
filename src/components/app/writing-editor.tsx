"use client";

import { useState, useTransition, useEffect } from "react";
import { provideAiFeedbackOnEssay, ProvideAiFeedbackOnEssayOutput } from "@/ai/flows/provide-ai-feedback-on-essay";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Lightbulb, Loader2, Sparkles, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


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

function FeedbackDialog({ feedback, open, onOpenChange }: { feedback: ProvideAiFeedbackOnEssayOutput | null, open: boolean, onOpenChange: (open: boolean) => void }) {
    if (!feedback) return null;

    const competencies = [
        { name: "Competência 1", score: feedback.competencia1.score, feedback: feedback.competencia1.feedback },
        { name: "Competência 2", score: feedback.competencia2.score, feedback: feedback.competencia2.feedback },
        { name: "Competência 3", score: feedback.competencia3.score, feedback: feedback.competencia3.feedback },
        { name: "Competência 4", score: feedback.competencia4.score, feedback: feedback.competencia4.feedback },
        { name: "Competência 5", score: feedback.competencia5.score, feedback: feedback.competencia5.feedback },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
                        <Sparkles className="text-primary"/>
                        Feedback da IA
                    </DialogTitle>
                    <DialogDescription>Aqui está a análise completa da sua redação.</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                    <div className="md:col-span-1">
                        <Card className="bg-muted/30 text-center sticky top-20">
                            <CardHeader>
                                <CardDescription className="uppercase font-semibold tracking-wider">Nota Geral</CardDescription>
                                <CardTitle className="text-6xl font-bold text-primary">{feedback.notaGeral}</CardTitle>
                                <p className="text-muted-foreground">/ 1000</p>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                         <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                            {competencies.map((comp, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger className="font-semibold">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2">
                                                <Info className="w-4 h-4" />
                                                <span>{comp.name}</span>
                                            </div>
                                            <span>{comp.score} / 200</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2">
                                        <Progress value={comp.score / 2} className="h-2" />
                                        <p className="text-sm text-muted-foreground prose prose-sm max-w-none whitespace-pre-wrap">{comp.feedback}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function WritingEditor({ topic, initialText, showTimer, title, description }: WritingEditorProps) {
  const [essay, setEssay] = useState("");
  const [essayTitle, setEssayTitle] = useState("");
  const [essayTopic, setEssayTopic] = useState("");
  const [feedback, setFeedback] = useState<ProvideAiFeedbackOnEssayOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (topic) {
        setEssayTopic(topic);
    }
  }, [topic]);

  const getFeedback = async () => {
    if (!essay.trim() && !initialText) {
      toast({
        title: "Texto Vazio",
        description: "Por favor, escreva algo antes de pedir a correção.",
        variant: "destructive",
      });
      return;
    }
    if (!essayTopic.trim()) {
        toast({
            title: "Tema Vazio",
            description: "Por favor, defina um tema para a sua redação.",
            variant: "destructive",
        });
        return;
    }
    startTransition(async () => {
      setFeedback(null);
      const fullEssayText = initialText ? `${initialText}\n\n${essay}` : essay;
      const fullEssay = `Tema: ${essayTopic}\nTítulo: ${essayTitle || 'Sem Título'}\n\n${fullEssayText}`;
      const result = await provideAiFeedbackOnEssay({ essay: fullEssay });
      if (result) {
        setFeedback(result);
        setFeedbackModalOpen(true);
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
    <>
      <div className="space-y-6">
        <header className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold font-headline">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            {showTimer && <Timer />}
        </header>

        {topic && !initialText && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Tema Proposto</AlertTitle>
            <AlertDescription>{topic}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="essay-topic">Tema</Label>
                <Input 
                    id="essay-topic"
                    placeholder="Digite o tema da redação"
                    value={essayTopic}
                    onChange={(e) => setEssayTopic(e.target.value)} 
                    disabled={!!topic}
                    readOnly={!!topic}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="essay-title">Título (Opcional)</Label>
                <Input 
                    id="essay-title"
                    placeholder="Digite o título da redação"
                    value={essayTitle}
                    onChange={(e) => setEssayTitle(e.target.value)} 
                />
            </div>
        </div>
        
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
          className="min-h-[50vh] text-base"
          defaultValue={initialText ? `${initialText}\n\n` : ''}
          onChange={(e) => {
            if(initialText) {
                const newText = e.target.value.replace(initialText + '\n\n', '');
                setEssay(newText);
            } else {
                setEssay(e.target.value);
            }
          }}
        />
        <Button onClick={getFeedback} disabled={isPending} size="lg" className="w-full sm:w-auto">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Corrigir com IA
        </Button>
      </div>
      <FeedbackDialog feedback={feedback} open={isFeedbackModalOpen} onOpenChange={setFeedbackModalOpen} />
    </>
  );
}
