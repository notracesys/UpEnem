
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth, initiateEmailSignIn } from '@/firebase';
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

function TermsAndConditionsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-sm font-medium leading-none underline cursor-pointer hover:text-primary transition-colors">
          Li e aceito os Termos e Condições
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Termos e Condições de Uso - UpEnem</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[450px] pr-4">
          <div className="text-sm text-muted-foreground space-y-4">
            <p><strong>Última atualização:</strong> [Data]</p>

            <p>Bem-vindo ao UpEnem. Ao se registrar e usar nossa plataforma, você concorda com os seguintes termos e condições. Por favor, leia-os com atenção.</p>
            
            <h3 className="font-bold text-foreground">1. Aceitação dos Termos</h3>
            <p>Ao criar uma conta e utilizar os serviços oferecidos pelo UpEnem ("Plataforma"), você concorda em cumprir e estar vinculado a estes Termos e Condições. Se você não concorda com qualquer parte dos termos, não poderá usar nossos serviços.</p>

            <h3 className="font-bold text-foreground">2. Descrição dos Serviços</h3>
            <p>O UpEnem oferece uma plataforma de estudos para o Exame Nacional do Ensino Médio (ENEM), incluindo: prática de redação com correção por Inteligência Artificial (IA), acesso a materiais de estudo, cronogramas, simulados e geração de temas para redação.</p>

            <h3 className="font-bold text-foreground">3. Conta do Usuário</h3>
            <p>Para acessar os recursos da plataforma, você deve criar uma conta fornecendo um e-mail e uma senha. Você é responsável por manter a confidencialidade de sua conta e senha e por restringir o acesso ao seu computador. Você concorda em aceitar a responsabilidade por todas as atividades que ocorram em sua conta.</p>

            <h3 className="font-bold text-foreground">4. Uso da Plataforma</h3>
            <p>Você concorda em usar a Plataforma apenas para fins legais e de acordo com estes Termos. Você não deve usar a Plataforma:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>De qualquer forma que viole qualquer lei ou regulamentação aplicável.</li>
                <li>Para enviar qualquer material de redação que seja ilegal, ofensivo, difamatório, ou que infrinja os direitos de propriedade intelectual de terceiros.</li>
                <li>Para se passar por qualquer pessoa ou entidade, ou declarar falsamente ou deturpar sua afiliação com uma pessoa ou entidade.</li>
            </ul>

            <h3 className="font-bold text-foreground">5. Correção por Inteligência Artificial</h3>
            <p>A correção de redações por IA é uma ferramenta de suporte ao aprendizado. Embora nossa IA seja treinada para fornecer feedback detalhado com base nas competências do ENEM, a pontuação é uma estimativa. A avaliação não substitui a correção de um avaliador humano e deve ser usada como um guia para melhoria.</p>

            <h3 className="font-bold text-foreground">6. Propriedade Intelectual</h3>
            <p>Todo o conteúdo gerado pela nossa plataforma (como temas de redação e análises) e o conteúdo fornecido por nós (textos, gráficos, logos) são de propriedade do UpEnem e protegidos por leis de direitos autorais. O conteúdo que você produz (suas redações) permanece de sua propriedade, mas você nos concede uma licença para usar, analisar e processar esse conteúdo para fornecer os serviços de correção.</p>

            <h3 className="font-bold text-foreground">7. Isenção de Garantias</h3>
            <p>A Plataforma é fornecida "como está". Não garantimos que o serviço será ininterrupto, seguro ou livre de erros. A precisão e a confiabilidade das correções de IA podem variar.</p>

            <h3 className="font-bold text-foreground">8. Limitação de Responsabilidade</h3>
            <p>Em nenhuma circunstância o UpEnem será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos resultantes do seu acesso ou uso, ou incapacidade de acessar ou usar, a plataforma.</p>

            <h3 className="font-bold text-foreground">9. Modificações nos Termos</h3>
            <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos sobre quaisquer alterações, publicando os novos termos na plataforma. A continuação do uso da plataforma após tais alterações constitui sua aceitação dos novos Termos e Condições.</p>

            <h3 className="font-bold text-foreground">10. Contato</h3>
            <p>Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através da página de Suporte.</p>
        </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}


export function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  
  const handleAuthAction = async () => {
    if (!agreed) {
      toast({
        title: "Termos e Condições",
        description: "Você deve aceitar os termos e condições para continuar.",
        variant: "destructive",
      });
      return;
    }

    try {
      await initiateEmailSignIn(auth, email, password);
      router.push('/dashboard');
    } catch (signInError: any) {
      if (signInError.code === 'auth/invalid-credential' || signInError.code === 'auth/user-not-found') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          router.push('/dashboard');
        } catch (signUpError: any) {
          toast({
            title: "Erro ao Criar Conta",
            description: signUpError.message || "Não foi possível criar sua conta. Verifique os dados e tente novamente.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Erro de Autenticação",
          description: signInError.message || "Ocorreu um erro. Verifique suas credenciais e tente novamente.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline">
          Acesse sua conta
        </CardTitle>
        <CardDescription>
          Insira seu e-mail e senha para entrar na plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="seuemail@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
          <TermsAndConditionsDialog />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button 
          className="w-full" 
          size="lg" 
          onClick={handleAuthAction} 
          disabled={!agreed || !email || !password}
        >
          ACESSAR MINHA CONTA
        </Button>
      </CardFooter>
    </Card>
  );
}
