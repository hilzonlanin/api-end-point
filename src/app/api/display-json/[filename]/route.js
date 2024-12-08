import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(request, { params }) {
  const myparams = await params
  const filename = myparams.filename || "data.json"

  try {
    const dataFilePath = path.join(process.cwd(), "public", "data", filename)
    const fileContents = await fs.readFile(dataFilePath, "utf8")
    const data = JSON.parse(fileContents)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error reading file:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
