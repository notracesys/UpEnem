
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Edit, Trash2, Loader2 } from "lucide-react";
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, query } from 'firebase/firestore';
import type { StudyTask } from "@/lib/types";

const daysOfWeek = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

const subjectOptions = [
    { value: "Matemática", label: "Matemática", color: "bg-blue-100 text-blue-800" },
    { value: "Linguagens", label: "Linguagens", color: "bg-green-100 text-green-800" },
    { value: "Humanas", label: "Humanas", color: "bg-yellow-100 text-yellow-800" },
    { value: "Natureza", label: "Natureza", color: "bg-purple-100 text-purple-800" },
    { value: "Redação", label: "Redação", color: "bg-red-100 text-red-800" },
    { value: "Revisão", label: "Revisão", color: "bg-gray-100 text-gray-800" },
];

const subjectColorMap = subjectOptions.reduce((acc, opt) => {
    acc[opt.value] = opt.color;
    return acc;
}, {} as { [key: string]: string });


function StudyTaskForm({ task, onSave, day, onOpenChange }: { task?: StudyTask; onSave: (task: Omit<StudyTask, 'id'>) => void; day?: string, onOpenChange?: (open: boolean) => void }) {
  const [subject, setSubject] = useState(task?.subject || "");
  const [topic, setTopic] = useState(task?.topic || "");
  const [dayOfWeek, setDayOfWeek] = useState(task?.dayOfWeek || day || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject && topic && dayOfWeek) {
      onSave({ subject, topic, dayOfWeek });
      if(onOpenChange) onOpenChange(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="dayOfWeek">Dia da Semana</Label>
        <Select onValueChange={setDayOfWeek} defaultValue={dayOfWeek}>
            <SelectTrigger id="dayOfWeek">
                <SelectValue placeholder="Selecione o dia" />
            </SelectTrigger>
            <SelectContent>
                {daysOfWeek.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Matéria</Label>
         <Select onValueChange={setSubject} defaultValue={subject}>
            <SelectTrigger id="subject">
                <SelectValue placeholder="Selecione a matéria" />
            </SelectTrigger>
            <SelectContent>
                {subjectOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
            </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="topic">Tópico</Label>
        <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Ex: Análise Combinatória" />
      </div>
      <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="ghost">Cancelar</Button>
        </DialogClose>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </form>
  );
}

export default function SchedulePage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const scheduleCollectionRef = useMemoFirebase(() =>
    user ? collection(firestore, 'users', user.uid, 'schedule') : null,
    [user, firestore]
  );
  
  const { data: schedule, isLoading } = useCollection<StudyTask>(scheduleCollectionRef);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddTask = async (task: Omit<StudyTask, 'id'>) => {
    if (!scheduleCollectionRef) return;
    await addDoc(scheduleCollectionRef, task);
  };

  const handleUpdateTask = async (taskId: string, updatedTask: Omit<StudyTask, 'id'>) => {
    if (!user) return;
    const taskDocRef = doc(firestore, 'users', user.uid, 'schedule', taskId);
    await updateDoc(taskDocRef, updatedTask);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user) return;
    const taskDocRef = doc(firestore, 'users', user.uid, 'schedule', taskId);
    await deleteDoc(taskDocRef);
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold font-headline">Cronograma de Estudos</h1>
            <p className="text-muted-foreground">Organize sua semana e personalize seu plano de estudos para maximizar seu aprendizado.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2" />
                    Nova Tarefa
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Nova Tarefa de Estudo</DialogTitle>
                </DialogHeader>
                <StudyTaskForm onSave={handleAddTask} onOpenChange={setIsAddOpen}/>
            </DialogContent>
        </Dialog>
      </header>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {daysOfWeek.map((day) => {
            const tasksForDay = schedule?.filter(t => t.dayOfWeek === day) ?? [];
            return (
                <Card key={day} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg font-headline">{day}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-grow">
                    {tasksForDay.length > 0 ? (
                        tasksForDay.map((task) => (
                        <div key={task.id} className="p-3 rounded-md bg-muted/50 group relative">
                            <Badge className={`${subjectColorMap[task.subject] || 'bg-gray-100 text-gray-800'} mb-1`}>{task.subject}</Badge>
                            <p className="text-sm font-medium">{task.topic}</p>
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-4 w-4" /></Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Editar Tarefa</DialogTitle></DialogHeader>
                                        <StudyTaskForm task={task} onSave={(updated) => handleUpdateTask(task.id, updated)} />
                                    </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-red-100 hover:text-red-700" onClick={() => handleDeleteTask(task.id)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full text-center text-muted-foreground text-sm">
                            <p>Nenhuma tarefa para hoje.</p>
                        </div>
                    )}
                    </CardContent>
                    <CardFooter>
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="w-full text-sm">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar Tarefa
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Adicionar Tarefa para {day}</DialogTitle>
                                </DialogHeader>
                                <StudyTaskForm onSave={handleAddTask} day={day} />
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            );
            })}
        </div>
      )}
    </div>
  );
}

