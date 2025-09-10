"use client"

import { Package, CheckCircle, Clock, Inbox } from "lucide-react"
import type { ClientStats } from "@/lib/types"
import { StatsCard } from "@/components/stats-card"

interface ClientStatsSectionProps {
  stats: ClientStats
}

export function ClientStatsSection({ stats }: ClientStatsSectionProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatsCard
        title="Expéditions totales"
        value={stats.totalSent}
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
        title="Colis reçus"
        value={stats.totalReceived}
        description="Colis reçus avec succès"
        icon={Inbox}
        iconColor="text-blue-500"
      />
      <StatsCard
        title="En attente"
        value={stats.pendingDeliveries}
        description="en attente de livraison"
        icon={Clock}
        iconColor="text-destructive"
      />
    </div>
  )
}