import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET() {
  try {
    // Use path.join for cross-platform compatibility
    const dataFilePath = path.join(process.cwd(), "public", "data", "data.json")
    const fileContents = await fs.readFile(dataFilePath, "utf8")
    const data = JSON.parse(fileContents)

    // Set headers for file download
    const headers = new Headers()
    headers.set("Content-Disposition", 'attachment; filename="data.json"')
    headers.set("Content-Type", "application/json")

    // Return the JSON data
    return NextResponse.json(data, { headers })
  } catch (error) {
    console.error("Error reading file:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
