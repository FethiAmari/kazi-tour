import { NextResponse } from "next/server"
import type { ApiResponse } from "@/lib/types"

export async function GET() {
  try {
    const response = await fetch("https://kazi-tour.xyz/api/clients/expeditions", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch clients data:", error)

    // Return mock data as fallback
    const mockData: ApiResponse = {
      clients: [
        {
          id: 1,
          name: "Kheir eddineHAMOUA",
          expeditions: {
            as_sender: [
              { id: 1, delivered: true, retour: false, receiver_id: 2, created_at: "2020-12-01 13:31:36" },
              { id: 6948, delivered: false, retour: false, receiver_id: 10382, created_at: "2021-02-03 12:26:43" },
              { id: 41951, delivered: false, retour: false, receiver_id: 35334, created_at: "2021-03-31 15:19:35" },
            ],
            as_receiver: [
              { id: 12225, delivered: true, retour: false, sender_id: 3, created_at: "2021-02-15 10:30:00" },
            ],
          },
        },
        {
          id: 2,
          name: "boucettamed",
          expeditions: {
            as_sender: [
              { id: 4322, delivered: false, retour: false, receiver_id: 6646, created_at: "2021-01-27 13:32:41" },
            ],
            as_receiver: [
              { id: 1, delivered: true, retour: false, sender_id: 1, created_at: "2020-12-01 13:31:36" },
              { id: 18728, delivered: false, retour: false, sender_id: 20973, created_at: "2021-02-27 11:24:20" },
            ],
          },
        },
        {
          id: 3,
          name: "cerinebenhaalima",
          expeditions: {
            as_sender: [],
            as_receiver: [
              { id: 20580, delivered: false, retour: false, sender_id: 26991, created_at: "2021-03-02 10:59:30" },
            ],
          },
        },
      ],
    }

    return NextResponse.json(mockData)
  }
}