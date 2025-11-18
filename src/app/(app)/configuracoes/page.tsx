import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da sua conta e preferências.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Em Construção</CardTitle>
          <CardDescription>Esta página ainda está em desenvolvimento. Volte em breve para novidades!</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
