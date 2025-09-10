"use client";

import { useParams, useRouter } from "next/navigation";
import { useClientDetail } from "@/hooks/use-client-detail";
import { useClientStats } from "@/hooks/use-client-stats";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorBanner } from "@/components/error-banner";
import { ClientDetailHeader } from "@/components/client-detail/client-detail-header";
import { ClientStatsCards } from "@/components/client-detail/client-stats-cards";
import { ExpeditionsSection } from "@/components/client-detail/expeditions-section";
import { ClientNotFound } from "@/components/client-detail/client-not-found";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = Number.parseInt(params.id as string);

  const { client, loading, error } = useClientDetail(clientId);
  const stats = useClientStats({ client });

  const handleBack = () => {
    router.push("/");
  };

  const handleReturnToDashboard = () => {
    router.push("/");
  };

  if (loading) {
    return <LoadingSpinner message="Loading client details..." />;
  }

  if (error === "Client not found" || !client) {
    return <ClientNotFound onReturnToDashboard={handleReturnToDashboard} />;
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
            <div className="px-4 lg:px-6 py-4">
              {/* Header */}
              <ClientDetailHeader client={client} onBack={handleBack} />
            </div>

            {/* Error Banner */}
            {error && error !== "Client not found" && (
              <ErrorBanner
                error={error}
                title="Client Data Error"
                description="Some data might be outdated."
              />
            )}
            <div className="px-4 lg:px-6 py-4">
              {/* Statistics Cards */}
              <ClientStatsCards stats={stats} />
            </div>

            <div className="px-4 lg:px-6">
              {/* Expeditions Tables */}
              <ExpeditionsSection client={client} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
