"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserProfile } from "@/components/app/user-profile"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex-grow"></div>
      <UserProfile />
    </header>
  )
}
