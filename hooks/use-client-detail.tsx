"use client"

import { useState, useEffect, useCallback } from "react"
import type { Client } from "@/lib/types"
import { fetchClientsData } from "@/lib/api"

interface UseClientDetailReturn {
  client: Client | null
  loading: boolean
  error: string | null
  refreshData: () => Promise<void>
}

export function useClientDetail(clientId: number): UseClientDetailReturn {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadClientData = useCallback(async () => {
    if (!clientId || isNaN(clientId)) {
      setError("Invalid client ID")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await fetchClientsData()
      const foundClient = data.clients.find((c) => c.id === clientId)
      
      if (!foundClient) {
        setError("Client not found")
        setClient(null)
      } else {
        setClient(foundClient)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch client data")
      setClient(null)
    } finally {
      setLoading(false)
    }
  }, [clientId])

  useEffect(() => {
    loadClientData()
  }, [loadClientData])

  return {
    client,
    loading,
    error,
    refreshData: loadClientData,
  }
}