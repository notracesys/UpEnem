
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PenSquare } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="font-body">
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-75 duration-1000">
          <PenSquare className="h-24 w-24 text-primary" />
          <h1 className="mt-4 text-5xl font-bold font-headline text-center">
            UpEnem
          </h1>
        </div>
      </div>
    </main>
  );
}
