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
  console.log("authHeader", authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("authHeader not pass")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]

  // In a real-world scenario, you would verify this token against your service account credentials
  // For this example, we'll use a simple check
  const validToken = process.env.SERVICE_ACCOUNT_TOKEN
  console.log("validToken:", validToken)
  if (token !== validToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  // Return the JSON data without download headers
  return NextResponse.json(sampleData)
}
