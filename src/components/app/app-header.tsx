"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserProfile } from "@/components/app/user-profile"
import { PenSquare, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show the back button on the main dashboard page
  if (pathname === '/dashboard') {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="shrink-0"
    >
      <ArrowLeft />
      <span className="sr-only">Voltar</span>
    </Button>
  )
}


export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <BackButton />
      
      <div className="flex items-center gap-2 sm:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <PenSquare className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold font-headline">UpEnem</span>
        </Link>
      </div>

      <div className="flex-grow"></div>
      <UserProfile />
    </header>
  )
}
