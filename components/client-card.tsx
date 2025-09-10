import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Client } from "@/lib/types";
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  TriangleAlert,
  Undo2,
} from "lucide-react";
import { Button } from "./ui/button";

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  const sentCount = client.expeditions.as_sender.length;
  const receivedCount = client.expeditions.as_receiver.length;
  const returnedSent = client.expeditions.as_sender.filter(
    (exp) => exp.retour
  ).length;
  const returnedReceived = client.expeditions.as_receiver.filter(
    (exp) => exp.retour
  ).length;
  const deliveredSent = client.expeditions.as_sender.filter(
    (exp) => exp.delivered
  ).length;
  const deliveredReceived = client.expeditions.as_receiver.filter(
    (exp) => exp.delivered
  ).length;

  return (
    <Card className="w-full max-w-md p-6 shadow-sm hover:shadow-lg transition-shadow">
      <CardContent className="p-0 space-y-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 bg-blue-500">
            <AvatarFallback className="bg-blue-500 text-white font-semibold text-lg">
              {client.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              {client.name}
            </h3>
            <p className="text-sm text-muted-foreground">ID: #{client.id}</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Colis envoyés</span>
            <div className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="font-semibold text-green-500">{sentCount}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Colis reçus</span>
            <div className="flex items-center gap-1">
              <ArrowDownLeft className="h-4 w-4 text-blue-500" />
              <span className="font-semibold text-blue-500">
                {receivedCount}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Retour</span>
            <div className="flex items-center gap-1">
              <Undo2 className="h-4 w-4 text-red-500" />
              <span className="font-semibold text-red-500">
                {returnedSent + returnedReceived}
              </span>
            </div>
          </div>
        </div>

        <Link href={`/client/${client.id}`}>
          <Button className="w-full bg-primary hover:bg-primary/90">
            Voir les détails
          </Button>
        </Link>

      </CardContent>
    </Card>

  );
}