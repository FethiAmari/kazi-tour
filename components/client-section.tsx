"use client";

import type { Client } from "@/lib/types";
import { ClientCard } from "@/components/client-card";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface ClientSectionProps {
  clients: Client[];
}

export function ClientSection({ clients }: ClientSectionProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>La liste des clients</CardTitle>
      </CardHeader>
      <div className="space-y-6 px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </div>
    </Card>
  );
}
