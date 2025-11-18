import { LoginForm } from '@/components/app/login-form';
import { PenSquare } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="font-body">
      <div className="flex min-h-screen w-full">
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-foreground text-background p-8">
          <PenSquare className="w-24 h-24 text-primary" />
          <h1 className="mt-4 text-5xl font-bold font-headline text-center">Ocorretor.ia</h1>
          <p className="mt-2 text-xl text-center text-muted-foreground/80">Sua jornada para a redação nota mil começa aqui.</p>
        </div>
        <div className="w-full lg:w-1/2 2xl:w-1/3 flex items-center justify-center bg-background p-4">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
