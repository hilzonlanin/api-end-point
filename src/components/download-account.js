"use client"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [error, setError] = useState("")

  const handleServiceAccountDownload = async () => {
    try {
      const response = await fetch("/api/download-account", {
        headers: {
          Authorization: "Bearer my_secret_token",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to download")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = "data.json"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      setError("")
    } catch {
      setError("Failed to download. Please check your service account token.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">JSON Download API</h1>
        <div className="flex space-x-4 mb-4">
          <Link
            href="/api/download-simple"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download JSON (Public)
          </Link>
          <button
            onClick={handleServiceAccountDownload}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Download JSON (Service Account)
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </main>
    </div>
  )
}
