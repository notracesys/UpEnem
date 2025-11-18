"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth, initiateEmailSignIn, initiateEmailSignUp, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useToast } from "@/hooks/use-toast";

type FormVariant = 'login' | 'signup';

export function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [variant, setVariant] = useState<FormVariant>('login');
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
      if (variant === 'login') {
        await initiateEmailSignIn(auth, email, password);
      } else {
        const userCredential = await initiateEmailSignUp(auth, email, password);
        if (userCredential && userCredential.user) {
          const user = userCredential.user;
          const userRef = doc(firestore, 'users', user.uid);
          setDocumentNonBlocking(userRef, {
            id: user.uid,
            email: user.email,
            termsAccepted: true
          }, { merge: true });
        }
      }
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Erro de Autenticação",
        description: error.message || "Ocorreu um erro. Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    }
  };

  const toggleVariant = () => {
    setVariant(prev => (prev === 'login' ? 'signup' : 'login'));
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline">
          {variant === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}
        </CardTitle>
        <CardDescription>
          {variant === 'login' ? 'Insira seus dados para entrar na plataforma.' : 'Preencha seus dados para se cadastrar.'}
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
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Li e aceito os <a href="#" className="underline text-primary">Termos e Condições</a>
          </label>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button 
          className="w-full" 
          size="lg" 
          onClick={handleAuthAction} 
          disabled={!agreed || !email || !password}
        >
          {variant === 'login' ? 'ACESSAR MINHA CONTA' : 'CADASTRAR'}
        </Button>
        <Button variant="link" onClick={toggleVariant}>
          {variant === 'login' ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
        </Button>
      </CardFooter>
    </Card>
  );
}
