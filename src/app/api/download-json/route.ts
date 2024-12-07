import { NextRequest, NextResponse } from "next/server"
import { verifyServiceAccount } from "@/lib/auth"

// Sample JSON data (in a real scenario, this could come from a database or external service)
const sampleData = {
  users: [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ],
}

export async function GET(request: NextRequest) {
  // Verify the service account
  const isAuthorized = await verifyServiceAccount(request)
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Set headers for file download
  const headers = new Headers()
  headers.set("Content-Disposition", 'attachment; filename="data.json"')
  headers.set("Content-Type", "application/json")

  // Return the JSON data
  return NextResponse.json(sampleData, { headers })
}
