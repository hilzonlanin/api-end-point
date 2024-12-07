import { NextRequest, NextResponse } from "next/server"

// Sample JSON data (in a real scenario, this could come from a database or external service)
const sampleData = {
  users: [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ],
}

export async function GET(request: NextRequest) {
  // Check for the Authorization header
  const authHeader = request.headers.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]

  // In a real-world scenario, you would verify this token against your service account credentials
  // For this example, we'll use a simple check
  const validToken = process.env.SERVICE_ACCOUNT_TOKEN

  if (token !== validToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  // Set headers for file download
  const headers = new Headers()
  headers.set("Content-Disposition", 'attachment; filename="data.json"')
  headers.set("Content-Type", "application/json")

  // Return the JSON data
  return NextResponse.json(sampleData, { headers })
}
