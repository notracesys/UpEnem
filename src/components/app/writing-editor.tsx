
"use client";

import { useState, useTransition, useEffect } from "react";
import { provideAiFeedbackOnEssay, ProvideAiFeedbackOnEssayOutput } from "@/ai/flows/provide-ai-feedback-on-essay";
import { generateEssayTopic } from "@/ai/flows/generate-essay-topic";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader2, Sparkles, Info, AlertTriangle, Pencil, Eye, CheckCircle, TimerOff, Plus, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type WritingEditorProps = {
  topic?: string;
  initialText?: string;
  showTimer?: boolean;
  title: string;
  description: string;
  onRestartWithNewTopic?: () => Promise<void>;
};

function Timer({ time, setTime }: { time: number; setTime: (time: number) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTime, setNewTime] = useState(Math.floor(time / 60));

  useEffect(() => {
    if (time <= 0 || isEditing) return;
    const interval = setInterval(() => {
      setTime(prevTime => Math.max(0, prevTime - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [time, isEditing, setTime]);

  const handleSave = () => {
    setTime(newTime * 60);
    setIsEditing(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input 
            type="number" 
            value={newTime}
            onChange={(e) => setNewTime(Number(e.target.value))}
            className="w-20 h-8 text-center"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <Button size="sm" onClick={handleSave}>Salvar</Button>
        </div>
      ) : (
        <div 
          className="font-mono text-lg font-semibold bg-muted px-3 py-1 rounded-md flex items-center gap-2 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
          <Pencil className="w-3 h-3 text-muted-foreground"/>
        </div>
      )}
    </div>
  );
}

function FeedbackResult({ feedback }: { feedback: ProvideAiFeedbackOnEssayOutput }) {
    const [isRevealed, setIsRevealed] = useState(false);

    const competencies = [
        { name: "Competência 1", score: feedback.competencia1.score, feedback: feedback.competencia1.feedback, description: "Demonstrar domínio da modalidade escrita formal da Língua Portuguesa." },
        { name: "Competência 2", score: feedback.competencia2.score, feedback: feedback.competencia2.feedback, description: "Compreender a proposta e aplicar conceitos para desenvolver o tema." },
        { name: "Competência 3", score: feedback.competencia3.score, feedback: feedback.competencia3.feedback, description: "Selecionar, organizar e interpretar informações em defesa de um ponto de vista." },
        { name: "Competência 4", score: feedback.competencia4.score, feedback: feedback.competencia4.feedback, description: "Demonstrar conhecimento dos mecanismos linguísticos para a argumentação." },
        { name: "Competência 5", score: feedback.competencia5.score, feedback: feedback.competencia5.feedback, description: "Elaborar proposta de intervenção respeitando os direitos humanos." },
    ];

    const getZeroGradeReason = () => {
        if (feedback.fugaAoTema) {
            return "Fuga Total ao Tema: Sua redação foi zerada por não abordar o tema proposto. Analise a proposta com mais atenção e tente novamente.";
        }
        if (feedback.textoInsuficiente) {
            return "Texto Insuficiente: Sua redação foi zerada por conter 7 linhas ou menos.";
        }
        return null;
    }

    const zeroGradeReason = getZeroGradeReason();
    const isZeroGrade = !!zeroGradeReason;

    return (
        <div className="mt-8 space-y-6 animate-in fade-in-50 duration-500">
            <header className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold font-headline flex items-center justify-center gap-2">
                    <CheckCircle className="text-primary"/>
                    Correção Finalizada
                </h2>
                <p className="text-muted-foreground">Aqui está a análise completa da sua redação.</p>
            </header>

            {isZeroGrade ? (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Redação Zerada</AlertTitle>
                    <AlertDescription>{zeroGradeReason}</AlertDescription>
                </Alert>
            ) : null}

            <Card className="text-center relative overflow-hidden">
                <CardHeader>
                    <CardDescription className="uppercase font-semibold tracking-wider">Nota Geral</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={cn(
                        "text-7xl font-bold text-primary transition-all duration-300",
                        !isRevealed && !isZeroGrade && "blur-lg select-none"
                    )}>
                        {feedback.notaGeral}
                    </div>
                    <p className="text-muted-foreground font-semibold">/ 1000</p>
                </CardContent>
                <CardFooter className="p-4 bg-muted/50 justify-center">
                    {!isRevealed && !isZeroGrade ? (
                        <Button onClick={() => setIsRevealed(true)}>
                            <Eye className="mr-2" />
                            Revelar Nota
                        </Button>
                    ) : (
                         <p className="text-sm text-muted-foreground">Continue praticando para alcançar a nota mil!</p>
                    )}
                </CardFooter>
            </Card>
            
            <div className="space-y-4">
                <h3 className="text-xl font-bold font-headline">Análise por Competência</h3>
                {competencies.map((comp, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader className="bg-muted/30">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-start gap-3">
                                    <Info className="w-4 h-4 mt-1 shrink-0 text-muted-foreground" />
                                    <div className="flex flex-col">
                                        <CardTitle className="text-base font-semibold">{comp.name}</CardTitle>
                                        <CardDescription className="text-xs">{comp.description}</CardDescription>
                                    </div>
                                </div>
                                <span className="text-lg ml-4 font-bold">{comp.score} / 200</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <Progress value={comp.score / 2} className="h-2" />
                            <p className="text-sm text-muted-foreground prose prose-sm max-w-none whitespace-pre-wrap leading-relaxed">{comp.feedback}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function TimesUpDisplay({ onAddTime, onRestart, isRestarting }: { onAddTime: () => void; onRestart: () => void; isRestarting: boolean; }) {
  return (
    <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 z-10 animate-in fade-in-50">
      <TimerOff className="w-20 h-20 text-destructive mb-4" />
      <h2 className="text-3xl font-bold font-headline mb-2">Tempo Esgotado!</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">
        O tempo para a simulação acabou. Não se preocupe, isso faz parte do treino! O que você gostaria de fazer agora?
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" onClick={onAddTime}>
          <Plus className="mr-2" />
          Adicionar mais 15 minutos
        </Button>
        <Button size="lg" variant="outline" onClick={onRestart} disabled={isRestarting}>
            {isRestarting ? <Loader2 className="mr-2 animate-spin" /> : <RefreshCw className="mr-2" />}
            {isRestarting ? 'Gerando...' : 'Reiniciar com novo tema'}
        </Button>
      </div>
    </div>
  );
}


export function WritingEditor({ topic, initialText, showTimer, title, description, onRestartWithNewTopic }: WritingEditorProps) {
  const [essay, setEssay] = useState("");
  const [essayTitle, setEssayTitle] = useState("");
  const [essayTopic, setEssayTopic] = useState("");
  const [feedback, setFeedback] = useState<ProvideAiFeedbackOnEssayOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [time, setTime] = useState(showTimer ? 5400 : -1); // 90 minutes or disabled
  const [isRestarting, setIsRestarting] = useState(false);

  useEffect(() => {
    if (topic) {
        setEssayTopic(topic);
    }
  }, [topic]);

  const timeIsUp = showTimer && time === 0;

  const handleAddTime = () => {
    setTime(prevTime => prevTime + 15 * 60); // Add 15 minutes
  };
  
  const handleRestart = async () => {
    setIsRestarting(true);
    try {
        if (onRestartWithNewTopic) {
            await onRestartWithNewTopic();
        } else {
             const result = await generateEssayTopic();
             setEssayTopic(result.topic);
        }
        setEssay("");
        setEssayTitle("");
        setFeedback(null);
        setTime(5400); // Reset timer to 90 minutes
    } catch (error) {
        toast({
            title: "Erro ao gerar novo tema",
            description: "Não foi possível buscar um novo tema. Por favor, tente novamente.",
            variant: "destructive",
        });
    } finally {
        setIsRestarting(false);
    }
  };

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
      try {
        setFeedback(null);
        const fullEssayText = initialText ? `${initialText}\n\n${essay}` : essay;
        const fullEssay = `Tema: ${essayTopic}\nTítulo: ${essayTitle || 'Sem Título'}\n\n${fullEssayText}`;
        const result = await provideAiFeedbackOnEssay({ essay: fullEssay });
        if (result) {
          setFeedback(result);
        } else {
          toast({
            title: "Erro na Correção",
            description: "Não foi possível gerar o feedback. Verifique sua chave de API e tente novamente.",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        console.error(error);
        if (error.message && (error.message.includes('503') || error.message.includes('overloaded'))) {
          toast({
            title: "Serviço Indisponível",
            description: "A IA está sobrecarregada no momento. Por favor, tente novamente em alguns instantes.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro na Correção",
            description: "Ocorreu um erro inesperado. Verifique a configuração da sua chave de API e tente novamente.",
            variant: "destructive",
          });
        }
      }
    });
  };
  
  return (
    <>
      <div className="space-y-6 relative">
        {timeIsUp && <TimesUpDisplay onAddTime={handleAddTime} onRestart={handleRestart} isRestarting={isRestarting}/>}

        <header className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold font-headline">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            {showTimer && <Timer time={time} setTime={setTime} />}
        </header>

        {topic && !initialText && !topic.includes("Não foi possível carregar") && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Tema Proposto</AlertTitle>
            <AlertDescription>{essayTopic}</AlertDescription>
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
                    disabled={isPending || (!!topic && !topic.includes("Não foi possível carregar")) || timeIsUp}
                    readOnly={!!topic && !topic.includes("Não foi possível carregar")}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="essay-title">Título (Opcional)</Label>
                <Input 
                    id="essay-title"
                    placeholder="Digite o título da redação"
                    value={essayTitle}
                    onChange={(e) => setEssayTitle(e.target.value)} 
                    disabled={isPending || timeIsUp}
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
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          disabled={isPending || timeIsUp}
        />
        <Button onClick={getFeedback} disabled={isPending || timeIsUp} size="lg" className="w-full sm:w-auto">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {isPending ? "Analisando..." : "Corrigir com IA"}
        </Button>
      </div>

      {isPending && (
          <div className="text-center py-8">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Aguarde, a IA está corrigindo sua redação...</p>
          </div>
      )}

      {feedback && !isPending && <FeedbackResult feedback={feedback} />}
    </>
  );
}

    

    