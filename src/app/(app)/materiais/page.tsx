import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "linguagens", name: "Linguagens e Códigos" },
  { id: "humanas", name: "Ciências Humanas" },
  { id: "natureza", name: "Ciências da Natureza" },
  { id: "matematica", name: "Matemática" },
];

const materialTypes = ["Apostilas PDF", "Vídeo-Aulas", "Mapas Mentais"];

export default function StudyMaterialsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Materiais de Estudo</h1>
        <p className="text-muted-foreground">Acesse nossas apostilas, videoaulas e mapas mentais para aprofundar seus conhecimentos.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map(category => {
          const image = PlaceHolderImages.find(img => img.id === category.id);
          return (
            <Card key={category.id} className="overflow-hidden flex flex-col">
              {image && (
                <div className="relative h-48 w-full">
                  <Image 
                    src={image.imageUrl} 
                    alt={image.description} 
                    fill 
                    className="object-cover" 
                    data-ai-hint={image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {materialTypes.map(type => (
                    <Badge key={type} variant="secondary">{type}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Ver Materiais</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
