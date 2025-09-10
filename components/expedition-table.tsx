"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { tr } from "zod/v4/locales";

interface Expedition {
  id: number;
  delivered: boolean;
  retour: boolean;
  receiver_id?: number;
  sender_id?: number;
  created_at: string;
}

interface ExpeditionTableProps {
  title: string;
  expeditions: Expedition[];
  type: "sender" | "receiver";
}

export function ExpeditionTable({
  title,
  expeditions,
  type,
}: ExpeditionTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredExpeditions = expeditions.filter((expedition) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "delivered") return expedition.delivered;
    if (statusFilter === "returned") return expedition.retour;
    if (statusFilter === "pending")
      return !expedition.delivered && !expedition.retour;
    return true;
   
    
  });

  const totalPages = Math.ceil(filteredExpeditions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedExpeditions = filteredExpeditions.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number.parseInt(value));
    setCurrentPage(1);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl font-heading font-bold text-card-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-38">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="delivered">Livré</SelectItem>
                <SelectItem value="returned">Retour</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Afficher:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expedition ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                {type === "sender" ? "Receiver ID" : "Sender ID"}
              </TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExpeditions.map((expedition) => (
              <TableRow key={expedition.id}>
                <TableCell className="font-medium">{expedition.id}</TableCell>
                <TableCell>
                  {expedition.delivered ? (
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      Livré
                    </Badge>
                  ) : expedition.retour ? (
                    <Badge
                      variant="destructive"
                      className="bg-red-100 text-red-800 hover:bg-red-100"
                    >
                      Retour
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                    >
                      En attente
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  {type === "sender"
                    ? expedition.receiver_id
                    : expedition.sender_id}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {new Date(expedition.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Affichage {startIndex + 1} à{" "}
              {Math.min(startIndex + pageSize, filteredExpeditions.length)} sur{" "}
              {filteredExpeditions.length} entrées
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
