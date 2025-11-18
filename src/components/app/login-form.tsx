
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
import { Loader2 } from 'lucide-react';

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
            <p><strong>Última atualização:</strong> 18/11/2025</p>

            <p>Bem-vindo(a) ao UpEnem, uma plataforma digital especializada em preparação para o Exame Nacional do Ensino Médio (ENEM). Oferecemos apostilas exclusivas, simulados, videoaulas, ferramentas de estudo e um sistema de correção de redações com Inteligência Artificial (IA). Ao acessar ou utilizar o UpEnem, você concorda com estes Termos e Condições.</p>
            
            <h3 className="font-bold text-foreground">1. Aceitação dos Termos</h3>
            <p>Ao criar uma conta ou utilizar qualquer funcionalidade do UpEnem, o usuário declara estar ciente e de acordo com todas as regras estabelecidas neste documento. Caso não concorde com algum ponto, não deverá utilizar a plataforma.</p>

            <h3 className="font-bold text-foreground">2. Cadastro e Responsabilidade do Usuário</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>O usuário deve fornecer informações verdadeiras e atualizadas ao criar sua conta.</li>
                <li>É responsável pela segurança de seu login e senha.</li>
                <li>É proibido compartilhar, vender ou emprestar o acesso da conta a terceiros.</li>
            </ul>

            <h3 className="font-bold text-foreground">3. Serviços Oferecidos pelo UpEnem</h3>
            <p>O UpEnem disponibiliza:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Apostilas digitais e materiais de estudo;</li>
                <li>Simulados, questões e videoaulas;</li>
                <li>Correção de redações por IA, baseada na matriz de competências do ENEM;</li>
                <li>Ferramentas de organização de estudos, como cronogramas e análise de desempenho.</li>
            </ul>
            <p>A plataforma poderá adicionar, alterar ou remover funcionalidades quando necessário.</p>
            
            <h3 className="font-bold text-foreground">4. Uso das Apostilas e Materiais</h3>
            <p>Todo conteúdo do UpEnem é protegido por direitos autorais.</p>
             <ul className="list-disc list-inside space-y-2">
                <li>É proibido copiar, distribuir, revender ou compartilhar documentos, vídeos e outros materiais da plataforma.</li>
                <li>O uso é exclusivamente pessoal.</li>
            </ul>

            <h3 className="font-bold text-foreground">5. Correção de Redações por IA</h3>
             <ul className="list-disc list-inside space-y-2">
                <li>As redações enviadas são avaliadas por Inteligência Artificial e, quando aplicável, por revisores humanos.</li>
                <li>As notas e comentários possuem caráter orientativo, não oficial.</li>
                <li>Os textos podem ser utilizados de forma anonimizada para aprimoramento do sistema.</li>
                <li>O usuário reconhece que o sistema pode apresentar limitações e deve ser utilizado como apoio ao estudo.</li>
            </ul>

            <h3 className="font-bold text-foreground">6. Assinaturas, Pagamentos e Reembolsos</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>Recursos pagos são liberados após confirmação do pagamento.</li>
                <li>A não renovação da assinatura impede o acesso aos conteúdos premium.</li>
                <li>Reembolsos seguem a legislação aplicável e as condições internas do UpEnem.</li>
                <li>Promoções podem ser alteradas sem aviso prévio.</li>
            </ul>

            <h3 className="font-bold text-foreground">7. Condutas Proibidas</h3>
            <p>O usuário não poderá:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Compartilhar ou distribuir conteúdos do UpEnem;</li>
                <li>Reutilizar materiais para fins comerciais;</li>
                <li>Tentar invadir ou manipular sistemas da plataforma;</li>
                <li>Enviar conteúdos ilegais, ofensivos ou inadequados;</li>
                <li>Tentar interferir no funcionamento do sistema de IA.</li>
            </ul>

            <h3 className="font-bold text-foreground">8. Limitação de Responsabilidade</h3>
            <p>O UpEnem não garante:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Aprovação ou desempenho específico no ENEM;</li>
                <li>Precisão total das notas fornecidas pela IA;</li>
                <li>Funcionamento ininterrupto da plataforma;</li>
                <li>Compatibilidade absoluta com todos os dispositivos e redes.</li>
            </ul>
            <p>A plataforma é fornecida “como está”, podendo sofrer melhorias, ajustes e manutenções.</p>

            <h3 className="font-bold text-foreground">9. Alterações dos Termos</h3>
            <p>O UpEnem pode modificar estes Termos a qualquer momento. O uso contínuo após alterações implica concordância com a versão atualizada.</p>

            <h3 className="font-bold text-foreground">10. Cancelamento e Exclusão de Conta</h3>
             <ul className="list-disc list-inside space-y-2">
                <li>O usuário pode solicitar a exclusão da conta ou cancelamento da assinatura a qualquer momento.</li>
                <li>O UpEnem pode suspender contas que violem estes Termos ou prejudiquem o funcionamento da plataforma.</li>
            </ul>
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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Verificando...');
  
  const handleAuthAction = async () => {
    if (!agreed) {
      toast({
        title: "Termos e Condições",
        description: "Você deve aceitar os termos e condições para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setLoadingMessage('Verificando...');

    try {
      await initiateEmailSignIn(auth, email, password);
      setLoadingMessage("Login concluído, aguarde...");
      router.push('/dashboard');
    } catch (signInError: any) {
      if (signInError.code === 'auth/invalid-credential' || signInError.code === 'auth/user-not-found') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          setLoadingMessage("Conta criada! Aguarde...");
          router.push('/dashboard');
        } catch (signUpError: any) {
          toast({
            title: "Erro ao Criar Conta",
            description: signUpError.message || "Não foi possível criar sua conta. Verifique os dados e tente novamente.",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      } else {
        toast({
          title: "Erro de Autenticação",
          description: signInError.message || "Ocorreu um erro. Verifique suas credenciais e tente novamente.",
          variant: "destructive",
        });
        setIsLoading(false);
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
          <Input id="email" type="email" placeholder="seuemail@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} disabled={isLoading} />
          <TermsAndConditionsDialog />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button 
          className="w-full" 
          size="lg" 
          onClick={handleAuthAction} 
          disabled={!agreed || !email || !password || isLoading}
        >
          {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {loadingMessage}
              </>
            ) : "ACESSAR MINHA CONTA"
          }
        </Button>
      </CardFooter>
    </Card>
  );
}
