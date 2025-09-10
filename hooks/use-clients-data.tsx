"use client"

import { useState, useEffect, useCallback } from "react"
import type { Client } from "@/lib/types"
import { fetchClientsData } from "@/lib/api"

interface UseClientsDataReturn {
  clients: Client[]
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  refreshData: () => Promise<void>
}

export function useClientsData(): UseClientsDataReturn {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadClientsData = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    loadClientsData()
  }, [loadClientsData])

  return {
    clients,
    loading,
    error,
    lastUpdated,
    refreshData: loadClientsData,
  }
}