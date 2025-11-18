import { AppSidebar } from '@/components/app/app-sidebar';
import { AppBottomNav } from '@/components/app/app-bottom-nav';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8 pb-24 sm:pb-8">
          {children}
        </div>
      </SidebarInset>
      <AppBottomNav />
    </SidebarProvider>
  );
}
