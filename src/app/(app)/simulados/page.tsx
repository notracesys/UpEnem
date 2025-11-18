import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, FileQuestion, History } from "lucide-react";

const simulations = [
  {
    icon: ClipboardCheck,
    title: "Simulados Completos",
    description: "Teste seus conhecimentos em todas as áreas com simulados no modelo do ENEM.",
  },
  {
    icon: FileQuestion,
    title: "Testes por Área",
    description: "Foque em áreas específicas do conhecimento para reforçar seus pontos fracos.",
  },
  {
    icon: History,
    title: "Provas Anteriores",
    description: "Refaça provas de edições passadas do ENEM e outros vestibulares.",
  },
];

export default function SimulationsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Simulados</h1>
        <p className="text-muted-foreground">Prepare-se para o dia da prova com nossos simulados e testes.</p>
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
            <CardFooter className="flex gap-2">
              <Button className="w-full">Iniciar Simulado</Button>
              <Button variant="outline" className="w-full">Gabarito</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
