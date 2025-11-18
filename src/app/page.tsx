
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PenSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const DURATION_HOLD = 1500; // ms to hold the logo and title
const DURATION_FADE_OUT = 500; // ms for the final fade-out

export default function SplashPage() {
  const router = useRouter();
  const [animationState, setAnimationState] = useState('entering'); // 'entering', 'visible', 'exiting'

  useEffect(() => {
    const sequence = async () => {
      // Hold the visible state
      await new Promise(resolve => setTimeout(resolve, DURATION_HOLD));
      setAnimationState('exiting');
      
      // Wait for exit animation to finish, then redirect
      await new Promise(resolve => setTimeout(resolve, DURATION_FADE_OUT));
      router.push('/login');
    };
    
    sequence();

  }, [router]);

  return (
    <main className="font-body">
      <div className="flex h-screen w-full items-center justify-center bg-background overflow-hidden">
        
        <div className={cn(
            "flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-in-out",
            animationState === 'entering' && 'animate-in fade-in-0 zoom-in-90',
            animationState === 'exiting' && 'animate-out fade-out-0 zoom-out-95'
        )}>
          <div className="flex items-center gap-4">
            <PenSquare className="w-16 h-16 text-primary" />
            <h1 className="text-6xl font-bold font-headline">
              UpEnem
            </h1>
          </div>
          <p className={cn(
              "text-xl text-muted-foreground transition-all duration-500 delay-300",
              animationState === 'entering' ? 'animate-in fade-in-0' : 'opacity-100',
              animationState === 'exiting' ? 'opacity-0' : 'opacity-100'
          )}>
            Sua preparação começa aqui.
          </p>
        </div>

      </div>
    </main>
  );
}
