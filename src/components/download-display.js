"use client"

import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [error, setError] = useState("")
  const [jsonData, setJsonData] = (useState < string) | (null > null)

  const handleServiceAccountDownload = async () => {
    try {
      const response = await fetch("/api/download-json-auth", {
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
      setJsonData(null)
    } catch {
      setError("Failed to download. Please check your service account token.")
    }
  }

  const handleServiceAccountDisplay = async () => {
    try {
      const response = await fetch("/api/display-json-auth", {
        headers: {
          Authorization: "Bearer my_secret_token",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await response.json()
      setJsonData(JSON.stringify(data, null, 2))
      setError("")
    } catch {
      setError("Failed to fetch data. Please check your service account token.")
      setJsonData(null)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">JSON API Demo</h1>
        <div className="flex space-x-4 mb-4">
          <Link
            href="/api/download-json"
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
          <button
            onClick={handleServiceAccountDisplay}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Display JSON (Service Account)
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {jsonData && (
          <div className="w-full max-w-2xl mt-4">
            <h2 className="text-2xl font-bold mb-2">JSON Data:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-left">
              {jsonData}
            </pre>
          </div>
        )}
      </main>
    </div>
  )
}
