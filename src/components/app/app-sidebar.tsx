"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Home,
  FileText,
  BookOpen,
  ClipboardList,
  Calendar,
  HelpCircle,
  Settings,
  LogOut,
  PenSquare,
} from "lucide-react"
import { useAuth } from "@/firebase"

const menuItems = [
  { href: "/dashboard", label: "Início", icon: Home },
  { href: "/redacao", label: "Redação", icon: FileText },
  { href: "/materiais", label: "Materiais de Estudo", icon: BookOpen },
  { href: "/simulados", label: "Simulados", icon: ClipboardList },
  { href: "/cronograma", label: "Cronograma", icon: Calendar },
  { href: "/suporte", label: "Suporte e Dúvidas", icon: HelpCircle },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const auth = useAuth()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/")
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-2">
          <PenSquare className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-sidebar-foreground">
            Ocorretor.ia
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
             <Link href="/configuracoes" passHref>
                <SidebarMenuButton
                  isActive={isActive("/configuracoes")}
                  tooltip={{ children: "Configurações" }}
                >
                  <Settings />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip={{ children: "Sair" }}>
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
