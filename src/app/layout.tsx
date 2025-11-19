import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'UpEnem',
  description: 'Sua plataforma completa para o ENEM.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polyline points='22 7 13.5 15.5 8.5 10.5 2 17' stroke='%232563eb' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' transform='scale(4.16)'></polyline><polyline points='16 7 22 7 22 13' stroke='%232563eb' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' transform='scale(4.16)'></polyline></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
          <Toaster />
      </body>
    </html>
  );
}
