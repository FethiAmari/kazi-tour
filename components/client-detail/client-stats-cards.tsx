"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, CheckCircle, ArrowDownLeft, Clock,   } from "lucide-react";

interface ClientStats {
  totalSent: number;
  totalReceived: number;
  deliveredSent: number;
  deliveredReceived: number;
  pendingTotal: number;
}

interface ClientStatsCardsProps {
  stats: ClientStats;
}

export function ClientStatsCards({ stats }: ClientStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Expéditions totales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalSent}
          </CardTitle>
          <CardAction>
          <div className="p-2 rounded-full bg-primary/10">
            <Package className="h-5 w-5 text-primary" />
          </div>
        </CardAction>
        </CardHeader>
        
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tous les colis envoyés
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Livré</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.deliveredSent}
          </CardTitle>
          <CardAction>
          <div className="p-2 rounded-full bg-primary/10">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Livré avec succès
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Colis reçus</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.deliveredReceived}
          </CardTitle>
          <CardAction>
          <div className="p-2 rounded-full bg-primary/10">
            <ArrowDownLeft className="h-5 w-5 text-green-500" />
          </div>
        </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Colis reçus avec succès
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>En attente</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.pendingTotal}
          </CardTitle>
           <CardAction>
          <div className="p-2 rounded-full bg-primary/10">
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
        </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            En attente de livraison
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
