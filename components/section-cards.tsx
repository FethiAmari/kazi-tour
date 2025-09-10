"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Users, CheckCircle, Clock, RefreshCw, AlertCircle } from "lucide-react"
import type { Client, DashboardStats } from "@/lib/types"
import { fetchClientsData } from "@/lib/api"
import { StatsCard } from "@/components/stats-card"
import { ClientCard } from "@/components/client-card"

export function SectionCards() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadClientsData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchClientsData()
      setClients(data.clients)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClientsData()
  }, [])

  const stats: DashboardStats = {
    totalParcels: clients.reduce(
      (acc, client) => acc + client.expeditions.as_sender.length + client.expeditions.as_receiver.length,
      0,
    ),
    totalDelivered: clients.reduce(
      (acc, client) =>
        acc +
        client.expeditions.as_sender.filter((exp) => exp.delivered).length +
        client.expeditions.as_receiver.filter((exp) => exp.delivered).length,
      0,
    ),
    activeClients: clients.filter(
      (client) => client.expeditions.as_sender.length > 0 || client.expeditions.as_receiver.length > 0,
    ).length,
    pendingDeliveries: 0, // Will be calculated below
  }
  stats.pendingDeliveries = stats.totalParcels - stats.totalDelivered

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              <span className="text-lg text-muted-foreground">Loading dashboard data...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
