import { AppSidebar } from '@/components/app/app-sidebar';
import { AppBottomNav } from '@/components/app/app-bottom-nav';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/app/app-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="p-4 sm:p-6 lg:p-8 pb-24 sm:pb-24">
          {children}
        </div>
      </SidebarInset>
      <AppBottomNav />
    </SidebarProvider>
  );
}
