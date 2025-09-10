"use client"

import type { Client } from "@/lib/types"
import { ExpeditionTable } from "@/components/expedition-table"

interface ExpeditionsSectionProps {
  client: Client
}

export function ExpeditionsSection({ client }: ExpeditionsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ExpeditionTable
        title="Expedition"
        expeditions={client.expeditions.as_sender}
        type="sender"
      />
      <ExpeditionTable
        title="Réception"
        expeditions={client.expeditions.as_receiver}
        type="receiver"
      />
    </div>
  )
}