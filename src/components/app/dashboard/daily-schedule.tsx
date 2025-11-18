"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

type Schedule = { [key: string]: { subject: string; topic: string }[] };

type DailyScheduleProps = {
  schedule: Schedule;
};

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

function getTodaySChedule(schedule: Schedule): TodaySchedule {
    const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
    const todayTitleCased = today.charAt(0).toUpperCase() + today.slice(1);
    const dayKey = Object.keys(schedule).find(day => day.startsWith(todayTitleCased)) as keyof typeof schedule | undefined;
    
    if (dayKey) {
        return { day: dayKey, tasks: schedule[dayKey] };
    }
    return { day: todayTitleCased, tasks: [] };
}

export function DailySchedule({ schedule }: DailyScheduleProps) {
  const [todaySchedule, setTodaySchedule] = useState<TodaySchedule | null>(null);

  useEffect(() => {
    setTodaySchedule(getTodaySChedule(schedule));
  }, [schedule]);

  if (!todaySchedule) {
    return (
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Carregando estudos de hoje...</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Aguarde...</p>
        </CardContent>
      </Card>
    );
  }

  const { day, tasks } = todaySchedule;

  return (
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
  );
}
