"use client"

import { useMemo } from "react"
import type { Client, DashboardStats } from "@/lib/types"

interface UseDashboardStatsProps {
  clients: Client[]
}

export function useDashboardStats({ clients }: UseDashboardStatsProps): DashboardStats {
  const stats = useMemo((): DashboardStats => {
    const totalParcels = clients.reduce(
      (acc, client) => acc + client.expeditions.as_sender.length + client.expeditions.as_receiver.length,
      0,
    )
    
    const totalDelivered = clients.reduce(
      (acc, client) =>
        acc +
        client.expeditions.as_sender.filter((exp) => exp.delivered).length +
        client.expeditions.as_receiver.filter((exp) => exp.delivered).length,
      0,
    )
    
    const activeClients = clients.length

    const returnedParcels = clients.reduce(
      (acc, client) =>
        acc +
        client.expeditions.as_sender.filter((exp) => exp.retour).length +
        client.expeditions.as_receiver.filter((exp) => exp.retour).length,
      0,
    )
    
    const pendingDeliveries = totalParcels - totalDelivered

    return {
      totalParcels,
      totalDelivered,
      activeClients,
      returnedParcels,
      pendingDeliveries,
    }
  }, [clients])

  return stats
}