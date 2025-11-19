

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, FileQuestion, History } from "lucide-react";
import Link from "next/link";

const simulations = [
  {
    icon: ClipboardCheck,
    title: "Testes Completos",
    description: "Teste seus conhecimentos em todas as áreas com testes no modelo do ENEM.",
    link: "#",
    disabled: true,
  },
  {
    icon: FileQuestion,
    title: "Testes por Área",
    description: "Foque em áreas específicas do conhecimento para reforçar seus pontos fracos.",
    link: "#",
    disabled: true,
  },
  {
    icon: History,
    title: "Provas Anteriores",
    description: "Refaça provas de edições passadas do ENEM e outros vestibulares.",
    link: "https://drive.google.com/drive/folders/1H2LpL4LktUJBnuCJh9nBU1-27xIQtZL5?usp=sharing",
    disabled: false,
  },
];

export default function PracticeQuestionsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Prática de Questões</h1>
        <p className="text-muted-foreground">Prepare-se para o dia da prova com nossos testes e questões.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {simulations.map((sim) => (
          <Card key={sim.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <sim.icon className="w-6 h-6" />
                </div>
                <CardTitle className="font-headline">{sim.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{sim.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={sim.disabled} asChild={!sim.disabled}>
                {sim.disabled ? (
                  "Iniciar"
                ) : (
                  <Link href={sim.link} target="_blank" rel="noopener noreferrer">
                    Acessar
                  </Link>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
