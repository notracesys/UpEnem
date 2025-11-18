import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Como funciona a correção por IA?",
    answer: "Nossa IA foi treinada com milhares de redações nota mil do ENEM. Ela analisa sua redação com base nas 5 competências, identificando pontos fortes, áreas para melhoria, e sugerindo alterações para aumentar sua nota.",
  },
  {
    question: "Posso usar a plataforma em quantos dispositivos?",
    answer: "Sua conta é pessoal e intransferível, mas você pode acessá-la de qualquer dispositivo com acesso à internet, como seu computador, tablet ou smartphone.",
  },
  {
    question: "Os temas de redação são atualizados?",
    answer: "Sim! Nossa equipe acompanha de perto os principais debates e atualidades para fornecer temas relevantes e com grande potencial de aparecer nos vestibulares.",
  },
  {
    question: "Como o cronograma de estudos é montado?",
    answer: "O cronograma sugerido é um plano de estudos balanceado, cobrindo todas as áreas do conhecimento exigidas no ENEM. Ele serve como um guia, mas você pode e deve adaptá-lo à sua rotina e necessidades.",
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center">
        <h1 className="text-3xl font-bold font-headline">Suporte e Dúvidas</h1>
        <p className="text-muted-foreground mt-2">Encontre respostas para suas perguntas ou entre em contato conosco.</p>
      </header>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-4">Perguntas Frequentes (FAQ)</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="text-center p-8 border-dashed border-2 rounded-lg">
        <h2 className="text-2xl font-bold font-headline mb-2">Não encontrou o que precisava?</h2>
        <p className="text-muted-foreground mb-6">Nossa equipe de suporte está pronta para te ajudar com qualquer outra questão.</p>
        <Button size="lg">Abrir Chamado</Button>
      </section>
    </div>
  );
}
