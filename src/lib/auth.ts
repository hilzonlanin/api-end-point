import { NextRequest } from "next/server"

export async function verifyServiceAccount(
  request: NextRequest
): Promise<boolean> {
  const authHeader = request.headers.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }

  const token = authHeader.split(" ")[1]

  // In a real-world scenario, you would verify this token against your service account credentials
  // For this example, we'll use a simple check
  const validToken = process.env.SERVICE_ACCOUNT_TOKEN

  return token === validToken
}
