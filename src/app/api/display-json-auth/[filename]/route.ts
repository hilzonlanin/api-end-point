// import { NextRequest, NextResponse } from "next/server"
// import { promises as fs } from "fs"
// import path from "path"

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { filename: string } }
// ) {
//   const filename = params.filename || "data.json"

//   const authHeader = request.headers.get("Authorization")

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   const token = authHeader.split(" ")[1]
//   const validToken = process.env.SERVICE_ACCOUNT_TOKEN

//   if (token !== validToken) {
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 })
//   }

//   try {
//     const dataFilePath = path.join(process.cwd(), "public", "data", filename)
//     const fileContents = await fs.readFile(dataFilePath, "utf8")
//     const data = JSON.parse(fileContents)

//     return NextResponse.json(data)
//   } catch (error) {
//     console.error("Error reading file:", error)
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const myparams = await params
  const filename = myparams.filename || "data.json"

  const authHeader = request.headers.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]
  const validToken = process.env.SERVICE_ACCOUNT_TOKEN

  if (token !== validToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

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
