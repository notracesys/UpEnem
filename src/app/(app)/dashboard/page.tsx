"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

const subjectColors: { [key: string]: string } = {
    'Matemática': 'bg-blue-100 text-blue-800 border-blue-200',
    'Linguagens': 'bg-green-100 text-green-800 border-green-200',
    'Humanas': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Natureza': 'bg-purple-100 text-purple-800 border-purple-200',
    'Redação': 'bg-red-100 text-red-800 border-red-200',
    'Revisão': 'bg-gray-100 text-gray-800 border-gray-200',
}

type TodaySchedule = {
  day: string;
  tasks: { subject: string; topic: string }[];
};

function getTodaySChedule(): TodaySchedule {
    const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
    const todayTitleCased = today.charAt(0).toUpperCase() + today.slice(1);
    const dayKey = Object.keys(schedule).find(day => day.startsWith(todayTitleCased)) as keyof typeof schedule | undefined;
    
    if (dayKey) {
        return { day: dayKey, tasks: schedule[dayKey] };
    }
    return { day: todayTitleCased, tasks: [] };
}


export default function DashboardPage() {
  const [todaySchedule, setTodaySchedule] = useState<TodaySchedule | null>(null);

  useEffect(() => {
    setTodaySchedule(getTodaySChedule());
  }, []);

  if (!todaySchedule) {
    // You can return a loading spinner or a skeleton loader here
    return (
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold font-headline">Visão Geral do Dia</h1>
          <p className="text-muted-foreground">Seu resumo diário, progresso e próximos passos.</p>
        </header>
        <p>Carregando...</p>
      </div>
    );
  }

  const { day, tasks } = todaySchedule;

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
                <FileText />
                Minhas Redações
              </CardTitle>
              <CardDescription>Acompanhe seu progresso e continue praticando.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center items-center text-center space-y-4">
              <div>
                  <p className="text-sm text-muted-foreground">Última nota</p>
                  <p className="text-4xl font-bold text-primary">920</p>
              </div>
              <div>
                  <p className="text-sm text-muted-foreground">Total de redações</p>
                  <p className="text-2xl font-bold">5</p>
              </div>
          </CardContent>
          <CardFooter>
            <Link href="/redacao" passHref className="w-full">
              <Button className="w-full">
                Praticar Agora
                <ArrowRight className="ml-2"/>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Estudos de Hoje: {day}</CardTitle>
          <CardDescription>Foco e determinação! Aqui estão os tópicos para você brilhar hoje.</CardDescription>
        </CardHeader>
        <CardContent>
          {tasks.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task, index) => (
                <div key={index} className={`p-4 rounded-lg border ${subjectColors[task.subject] || 'bg-gray-100'}`}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full">
                            <BookOpen className="w-5 h-5"/>
                        </div>
                        <div>
                            <p className="font-bold">{task.subject}</p>
                            <p className="text-sm">{task.topic}</p>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Você não tem estudos programados para hoje. Aproveite para descansar ou revisar!</p>
               <Link href="/cronograma" passHref>
                <Button variant="outline" className="mt-4">Ver Cronograma Completo</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
