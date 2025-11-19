import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Landmark, FlaskConical, Sigma, Feather } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

const categories: { id: string; name: string; icon: LucideIcon; link: string; }[] = [
  { id: "linguagens", name: "Linguagens e Códigos", icon: FileText, link: "#" },
  { id: "humanas", name: "Ciências Humanas", icon: Landmark, link: "https://drive.google.com/drive/folders/1_57PFjgM4EMhyY6K2kbn_CrQy-BasZjT?usp=sharing" },
  { id: "natureza", name: "Ciências da Natureza", icon: FlaskConical, link: "https://drive.google.com/drive/folders/1IMEU2EHPxmxtcLyRslLw6aqsgHCX6u5-?usp=sharing" },
  { id: "matematica", name: "Matemática", icon: Sigma, link: "#" },
  { id: "redacao", name: "Redação", icon: Feather, link: "#" },
];

const materialTypes = ["Apostilas PDF"];

export default function StudyMaterialsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Materiais de Estudo</h1>
        <p className="text-muted-foreground">Acesse apostilas e materiais de estudo para aprofundar seus conhecimentos.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <Card key={category.id} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                 <div className="p-4 bg-primary/10 text-primary rounded-lg">
                    <Icon className="w-8 h-8" />
                 </div>
                 <div className="flex-1">
                    <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {materialTypes.map(type => (
                    <Badge key={type} variant="secondary">{type}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={category.link} passHref target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full">Ver Materiais</Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
