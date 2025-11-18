import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
};

const subjectColors: { [key: string]: string } = {
    'Matemática': 'bg-blue-100 text-blue-800',
    'Linguagens': 'bg-green-100 text-green-800',
    'Humanas': 'bg-yellow-100 text-yellow-800',
    'Natureza': 'bg-purple-100 text-purple-800',
    'Redação': 'bg-red-100 text-red-800',
    'Revisão': 'bg-gray-100 text-gray-800',
}

export default function SchedulePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Cronograma de Estudos</h1>
        <p className="text-muted-foreground">Um plano de estudos sugerido para organizar sua semana e maximizar seu aprendizado.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(schedule).map(([day, tasks]) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle className="text-lg font-headline">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task, index) => (
                <div key={index} className="p-3 rounded-md bg-muted/50">
                  <Badge className={`${subjectColors[task.subject] || 'bg-gray-100 text-gray-800'} mb-1`}>{task.subject}</Badge>
                  <p className="text-sm font-medium">{task.topic}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
