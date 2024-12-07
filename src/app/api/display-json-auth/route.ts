import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

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

  try {
    // Use path.join for cross-platform compatibility
    const dataFilePath = path.join(process.cwd(), "public", "data", "data.json")
    const fileContents = await fs.readFile(dataFilePath, "utf8")
    const data = JSON.parse(fileContents)

    // Return the JSON data without download headers
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error reading file:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
