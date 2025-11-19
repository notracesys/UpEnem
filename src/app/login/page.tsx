
import { LoginForm } from '@/components/app/login-form';
import { TrendingUp } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="font-body flex flex-col min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="flex items-center gap-2 mb-8 lg:hidden">
        <TrendingUp className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">UpEnem</h1>
      </div>
      <LoginForm />
    </main>
  );
}
