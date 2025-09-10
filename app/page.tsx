"use client";

import { useClientsData } from "@/hooks/use-clients-data";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { DashboardStatsSection } from "@/components/dashboard-stats";
import { ClientSection } from "@/components/client-section";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function Page() {
  const { clients, loading, error, lastUpdated, refreshData } =
    useClientsData();

  const stats = useDashboardStats({ clients });

  if (loading) {
    return <LoadingSpinner message="Chargement des données..." />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Statistics Cards */}
              <DashboardStatsSection stats={stats} />
              <div className="px-4 lg:px-6">
                <ClientSection clients={clients} />
              </div>
              
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
