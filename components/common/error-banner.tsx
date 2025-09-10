"use client"

import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ErrorBannerProps {
  error: string
  title?: string
  description?: string
}

export function ErrorBanner({ 
  error, 
  title = "API Connection Error",
  description = "Showing cached data instead."
}: ErrorBannerProps) {
  return (
    <Card className="bg-destructive/10 border-destructive/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <div>
            <p className="text-sm font-medium text-destructive">{title}</p>
            <p className="text-xs text-destructive/80">
              {error} - {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}