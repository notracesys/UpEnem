
"use client";

import { useTheme } from "next-themes";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: "Light", value: "light", icon: Sun },
    { name: "Dark", value: "dark", icon: Moon },
    { name: "System", value: "system", icon: Monitor },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted p-1">
      {themes.map((t) => (
        <Button
          key={t.value}
          variant="ghost"
          size="sm"
          className={cn(
            "h-auto justify-start gap-2 px-3 py-2",
            theme === t.value && "bg-background shadow-sm"
          )}
          onClick={() => setTheme(t.value)}
        >
          <t.icon className="h-4 w-4" />
          {t.name}
        </Button>
      ))}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold font-headline">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da sua conta e preferências.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>Personalize a aparência do aplicativo. Alterne entre o modo claro e escuro.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tema</Label>
            <ThemeSelector />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
