
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DURATION_COUNTING = 1200; // ms for the count-up animation
const DURATION_HOLD = 250;     // ms to hold the final name
const DURATION_FADE_OUT = 500; // ms for the final fade-out before redirect

export default function SplashPage() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [animationState, setAnimationState] = useState('counting'); // 'counting', 'revealing'

  useEffect(() => {
    if (animationState === 'counting') {
      const targetScore = 1000;
      const increment = Math.ceil(targetScore / (DURATION_COUNTING / 50));
      
      const timer = setInterval(() => {
        setScore(prevScore => {
          if (prevScore < targetScore) {
            return Math.min(prevScore + increment, targetScore);
          }
          clearInterval(timer);
          // When score reaches 1000, switch to revealing the name
          setTimeout(() => setAnimationState('revealing'), 100);
          return targetScore;
        });
      }, 50);

      return () => clearInterval(timer);
    } else if (animationState === 'revealing') {
      // After the name is revealed and holds, redirect to login
      const redirectTimer = setTimeout(() => {
        router.push('/login');
      }, DURATION_HOLD + DURATION_FADE_OUT);

      return () => clearTimeout(redirectTimer);
    }
  }, [animationState, router]);

  return (
    <main className="font-body">
      <div className="flex h-screen w-full items-center justify-center bg-background overflow-hidden">
        <div className="relative flex items-center justify-center w-64 h-24">
          
          {/* Score Counter */}
          <div className={
              `absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary transition-all duration-300
              ${animationState === 'revealing' ? 'animate-out fade-out-0 zoom-out-50' : 'animate-in fade-in-0'}`
          }>
            {score}
          </div>

          {/* Site Name */}
          <div className={
              `absolute inset-0 flex items-center justify-center transition-all duration-300
              ${animationState === 'revealing' ? 'animate-in fade-in-0 zoom-in-125' : 'opacity-0'}`
          }>
            <h1 className="text-5xl font-bold font-headline text-center">
              UpEnem
            </h1>
          </div>

        </div>
      </div>
    </main>
  );
}
