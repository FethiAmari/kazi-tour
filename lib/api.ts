import type { ApiResponse } from "./types";

export async function fetchClientsData(): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/clients/expeditions");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch clients data:", err);
    throw err;
  }
}
