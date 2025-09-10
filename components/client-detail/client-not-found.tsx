"use client"

import { Button } from "@/components/ui/button"

interface ClientNotFoundProps {
  onReturnToDashboard: () => void
}

export function ClientNotFound({ onReturnToDashboard }: ClientNotFoundProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Client non trouvé
            </h2>
            <p className="text-muted-foreground mb-4">
              Le client demandé n'a pas pu être trouvé.
            </p>
            <Button onClick={onReturnToDashboard}>
              Retour au tableau de bord
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}