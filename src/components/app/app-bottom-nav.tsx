
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, BookOpen, ClipboardList, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { href: "/dashboard", label: "Início", icon: Home },
  { href: "/redacao", label: "Redação", icon: FileText },
  { href: "/materiais", label: "Materiais", icon: BookOpen },
  { href: "/simulados", label: "Simulados", icon: ClipboardList },
  { href: "/cronograma", label: "Cronograma", icon: Calendar },
];

export function AppBottomNav() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm z-50 md:hidden">
      <nav className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.href} passHref>
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-16 text-muted-foreground transition-colors",
                isActive(item.href) && "text-primary"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
