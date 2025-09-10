"use client"

import { Package, Users, CheckCircle, Undo2 } from "lucide-react"
import type { DashboardStats } from "@/lib/types"
import { StatsCard } from "@/components/stats-card"

interface DashboardStatsProps {
  stats: DashboardStats
}

export function DashboardStatsSection({ stats }: DashboardStatsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatsCard
        title="Expéditions totales"
        value={stats.totalParcels}
        description="Tous les colis envoyés"
        icon={Package}
        iconColor="text-primary"
      />
      <StatsCard
        title="Livré"
        value={stats.totalDelivered}
        description="Livré avec succès"
        icon={CheckCircle}
        iconColor="text-green-500"
      />
      <StatsCard
        title="Retour"
        value={stats.returnedParcels}
        description="Nombre de retours"
        icon={Undo2}
        iconColor="text-destructive"
      />
      <StatsCard
        title="Clients actifs"
        value={stats.activeClients}
        description="Nombre de clients"
        icon={Users}
        iconColor="text-primary"
      />
    </div>
  )
}