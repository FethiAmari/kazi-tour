export interface Client {
  id: number
  name: string
  expeditions: {
    as_sender: Array<{
      id: number
      delivered: boolean
      retour: boolean
      receiver_id: number
      created_at: string
    }>
    as_receiver: Array<{
      id: number
      delivered: boolean
      retour: boolean
      sender_id: number
      created_at: string
    }>
  }
}

export interface ApiResponse {
  clients: Client[]
}

export interface DashboardStats {
  totalParcels: number
  totalDelivered: number
  activeClients: number
  returnedParcels: number
  pendingDeliveries: number
}

export interface ClientStats {
  totalParcels: number
  deliveredSent: number
  receivedParcels: number
  pendingDeliveries: number
}






export interface Expedition {
  id: number
  delivered: boolean
  retour?: boolean
  // Add other expedition properties as needed
}

export interface DashboardStats {
  totalParcels: number
  totalDelivered: number
  activeClients: number
  pendingDeliveries: number
}

// New types for client detail page
export interface ClientStats {
  totalSent: number
  totalDelivered: number
  totalReceived: number
  pendingDeliveries: number
}