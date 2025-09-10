"use client"

import { RefreshCw } from "lucide-react"

interface LoadingSpinnerProps {
  message?: string
  className?: string
}

export function LoadingSpinner({ 
  message = "Loading...", 
  className = "" 
}: LoadingSpinnerProps) {
  return (
    <div className={`min-h-screen bg-background p-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
            <span className="text-lg text-muted-foreground">{message}</span>
          </div>
        </div>
      </div>
    </div>
  )
}