import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Feather, Gift, Timer, Target } from "lucide-react";
import Link from "next/link";

const challenges = [
  {
    icon: Feather,
    title: "Prática Livre",
    description: "Escreva sobre qualquer tema, sem amarras. Ideal para aquecer e organizar as ideias.",
    link: "/redacao",
    cta: "Começar a Escrever",
  },
  {
    icon: Gift,
    title: "Tema Surpresa",
    description: "Desafie sua criatividade com um tema aleatório gerado pela nossa IA.",
    link: "/redacao/tema-surpresa",
    cta: "Gerar Tema",
  },
  {
    icon: Timer,
    title: "Simulação ENEM",
    description: "Prepare-se para o grande dia com um tema e cronômetro, simulando as condições reais da prova.",
    link: "/redacao/enem-cronometrado",
    cta: "Iniciar Simulado",
  },
  {
    icon: Target,
    title: "Foco na Conclusão (C5)",
    description: "Receba uma redação incompleta e treine especificamente sua proposta de intervenção.",
    link: "/redacao/conclusao",
    cta: "Praticar Conclusão",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Desafios e Prática</h1>
        <p className="text-muted-foreground">Escolha um modo de prática e aprimore sua escrita com a ajuda da IA.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {challenges.map((challenge) => (
          <Card key={challenge.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <challenge.icon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="font-headline">{challenge.title}</CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-auto">
              <Link href={challenge.link} passHref>
                <Button className="w-full">
                  {challenge.cta}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
