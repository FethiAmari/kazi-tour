"use client"

import { useMemo } from "react"
import type { Client } from "@/lib/types"

interface ClientStats {
  totalSent: number
  totalReceived: number
  deliveredSent: number
  deliveredReceived: number
  pendingTotal: number
}

interface UseClientStatsProps {
  client: Client | null
}

export function useClientStats({ client }: UseClientStatsProps): ClientStats {
  const stats = useMemo((): ClientStats => {
    if (!client) {
      return {
        totalSent: 0,
        totalReceived: 0,
        deliveredSent: 0,
        deliveredReceived: 0,
        pendingTotal: 0,
      }
    }

    const totalSent = client.expeditions.as_sender.length
    const totalReceived = client.expeditions.as_receiver.length
    
    const deliveredSent = client.expeditions.as_sender.filter((exp) => exp.delivered).length
    const deliveredReceived = client.expeditions.as_receiver.filter((exp) => exp.delivered).length
    
    const pendingSent = client.expeditions.as_sender.filter(
      (exp) => !exp.delivered && !exp.retour
    ).length
    const pendingReceived = client.expeditions.as_receiver.filter(
      (exp) => !exp.delivered && !exp.retour
    ).length
    
    const pendingTotal = pendingSent + pendingReceived

    return {
      totalSent,
      totalReceived,
      deliveredSent,
      deliveredReceived,
      pendingTotal,
    }
  }, [client])

  return stats
}