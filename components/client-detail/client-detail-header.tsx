"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Client } from "@/lib/types"

interface ClientDetailHeaderProps {
  client: Client
  onBack: () => void
}

export function ClientDetailHeader({ client, onBack }: ClientDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-heading font-black text-foreground">
            {client.name}
          </h1>
          <p className="text-muted-foreground">Client ID: {client.id}</p>
        </div>
      </div>
    </div>
  )
}