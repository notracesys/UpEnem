"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function LoginForm() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleLogin = () => {
    // In a real app, you'd handle authentication here.
    // For this mock, we just navigate to the dashboard.
    router.push('/dashboard');
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline">Acesse sua conta</CardTitle>
        <CardDescription>Insira seus dados para entrar na plataforma.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="seuemail@exemplo.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="********" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" onCheckedChange={(checked) => setAgreed(checked as boolean)} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Li e aceito os <a href="#" className="underline text-primary">Termos e Condições</a>
          </label>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          size="lg" 
          onClick={handleLogin} 
          disabled={!agreed}
        >
          ACESSAR MINHA CONTA
        </Button>
      </CardFooter>
    </Card>
  );
}
