
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateMotivationalQuote } from "@/ai/flows/generate-motivational-quote";
import { DailySchedule } from "@/components/app/dashboard/daily-schedule";

// Revalidate the page once a day to get a new quote.
export const revalidate = 86400; // 24 hours in seconds

const schedule = {
  "Segunda-feira": [
    { subject: "Matemática", topic: "Álgebra e Funções" },
    { subject: "Linguagens", topic: "Interpretação de Texto" },
  ],
  "Terça-feira": [
    { subject: "Humanas", topic: "História do Brasil" },
    { subject: "Natureza", topic: "Biologia Celular" },
  ],
  "Quarta-feira": [
    { subject: "Redação", topic: "Prática de Argumentação" },
    { subject: "Matemática", topic: "Geometria Plana" },
  ],
  "Quinta-feira": [
    { subject: "Linguagens", topic: "Figuras de Linguagem" },
    { subject: "Humanas", topic: "Geografia Urbana" },
  ],
  "Sexta-feira": [
    { subject: "Natureza", topic: "Química Orgânica" },
    { subject: "Revisão", topic: "Revisar tópicos da semana" },
  ],
  "Sábado": [],
  "Domingo": [],
};

const chartData = Object.entries(schedule).map(([day, tasks]) => ({
  name: day.substring(0, 3),
  Tópicos: tasks.length,
}));

async function getMotivationalQuote() {
  try {
    const result = await generateMotivationalQuote();
    return result;
  } catch (error) {
    console.error("Failed to generate motivational quote:", error);
    return {
      quote: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
      author: "Robert Collier",
    };
  }
}

export default async function DashboardPage() {
  const motivationalQuote = await getMotivationalQuote();
  
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Visão Geral do Dia</h1>
        <p className="text-muted-foreground">Seu resumo diário, progresso e próximos passos.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Plano de Estudos Semanal</CardTitle>
                <CardDescription>Distribuição de tópicos de estudo ao longo da semana.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Tópicos" fill="hsl(var(--primary))" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Lightbulb />
                Motivação do Dia
              </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center items-center text-center">
            <blockquote className="space-y-2">
                <p className="text-lg font-medium">&ldquo;{motivationalQuote.quote}&rdquo;</p>
                <footer className="text-sm text-muted-foreground">- {motivationalQuote.author}</footer>
            </blockquote>
          </CardContent>
          <CardFooter>
            <Link href="/redacao" passHref className="w-full">
              <Button variant="ghost" className="w-full">
                Começar a praticar
                <ArrowRight className="ml-2"/>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

       <DailySchedule schedule={schedule} />

    </div>
  );
}
