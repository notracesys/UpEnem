
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, Lightbulb, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateMotivationalQuote } from "@/ai/flows/generate-motivational-quote";
import { DailySchedule } from "@/components/app/dashboard/daily-schedule";
import { useCollection, useUser, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query }from "firebase/firestore";
import type { StudyTask } from "@/lib/types";
import { useEffect, useState, useMemo } from "react";

const daysOfWeek = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];


export default function DashboardPage() {
  const [motivationalQuote, setMotivationalQuote] = useState<{quote: string, author: string} | null>(null);
  const { user } = useUser();
  const firestore = useFirestore();

  const scheduleQuery = useMemoFirebase(() => 
    user ? query(collection(firestore, 'users', user.uid, 'schedule')) : null, 
    [user, firestore]
  );
  const { data: schedule, isLoading } = useCollection<StudyTask>(scheduleQuery);
  
  useEffect(() => {
    generateMotivationalQuote().then(setMotivationalQuote).catch(err => {
      console.error("Failed to generate motivational quote:", err);
      setMotivationalQuote({
        quote: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
        author: "Robert Collier",
      });
    });
  }, []);

  const chartData = useMemo(() => daysOfWeek.map(day => ({
    name: day.substring(0, 3),
    Tópicos: schedule?.filter(task => task.dayOfWeek === day).length ?? 0,
  })), [schedule]);

  const scheduleMap = useMemo(() => daysOfWeek.reduce((acc, day) => {
    acc[day] = schedule?.filter(task => task.dayOfWeek === day) ?? [];
    return acc;
  }, {} as { [key: string]: StudyTask[] }), [schedule]);

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
              {isLoading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
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
              )}
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
             {motivationalQuote ? (
              <blockquote className="space-y-2">
                  <p className="text-lg font-medium">&ldquo;{motivationalQuote.quote}&rdquo;</p>
                  <footer className="text-sm text-muted-foreground">- {motivationalQuote.author}</footer>
              </blockquote>
            ) : (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            )}
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
      
       <DailySchedule schedule={scheduleMap} isLoading={isLoading} />
    </div>
  );
}
