"use client"

import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [error, setError] = useState("")
  const [jsonData, setJsonData] = useState<string | null>(null)
  const [filename, setFilename] = useState("data.json")
  const [subscriptionKey, setSubscriptionKey] = useState(
    "my-secret-subscription-key"
  )
  const [clientId, setClientId] = useState("my-client-id")
  const [clientSecret, setClientSecret] = useState("my-client-secret")
  const [token, setToken] = useState<string | null>(null)

  const handleServiceAccountDownload = async () => {
    try {
      const response = await fetch(`/api/download-json-auth/${filename}`, {
        headers: {
          Authorization: "Bearer my_service_account_token_here",
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
      a.download = filename
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
      const response = await fetch(`/api/display-json-auth/${filename}`, {
        headers: {
          Authorization: "Bearer my_service_account_token_here",
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

  const handlePublicDisplay = async () => {
    try {
      const response = await fetch(`/api/display-json/${filename}`)

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await response.json()
      setJsonData(JSON.stringify(data, null, 2))
      setError("")
    } catch {
      setError("Failed to fetch data.")
      setJsonData(null)
    }
  }

  const handleGenerateToken = async () => {
    console.log(JSON.stringify({ subscriptionKey, clientId, clientSecret }))
    try {
      const response = await fetch("/api/generate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionKey, clientId, clientSecret }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate token")
      }

      const data = await response.json()
      setToken(data.token)
      setError("")
    } catch {
      setError("Failed to generate token. Please check your credentials.")
      setToken(null)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full max-w-4xl px-4 space-y-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Api End Point Test
        </h1>
        <div className="w-full">
          <div className="flex items-center space-x-4">
            <label htmlFor="filename" className="w-24 text-right">
              filename:
            </label>
            <input
              id="filename"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="flex-grow px-4 py-2 border rounded-md mb-4"
            />
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100 rounded-lg">
            <button
              onClick={handlePublicDisplay}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
            >
              Display JSON (Public)
            </button>
            <span className="text-sm text-gray-600 mt-2 sm:mt-0">
              /api/display-json/{filename}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100 rounded-lg">
            <Link
              href={`/api/download-json/${filename}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
            >
              Download JSON (Public)
            </Link>
            <span className="text-sm text-gray-600 mt-2 sm:mt-0">
              /api/download-json/{filename}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100 rounded-lg">
            <button
              onClick={handleServiceAccountDisplay}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
            >
              Display JSON (Service Account)
            </button>
            <span className="text-sm text-gray-600 mt-2 sm:mt-0">
              /api/display-json-auth/{filename}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100 rounded-lg">
            <button
              onClick={handleServiceAccountDownload}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0"
            >
              Download JSON (Service Account)
            </button>
            <span className="text-sm text-gray-600 mt-2 sm:mt-0">
              /api/download-json-auth/{filename}
            </span>
          </div>
        </div>
        <div className="w-full space-y-4 mt-8">
          <h2 className="text-2xl font-bold">Generate Token</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="subscriptionKey" className="w-32 text-right">
                subscriptionKey:
              </label>
              <input
                id="subscriptionKey"
                type="text"
                value={subscriptionKey}
                onChange={(e) => setSubscriptionKey(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="clientId" className="w-32 text-right">
                clientId:
              </label>
              <input
                id="clientId"
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="clientSecret" className="w-32 text-right">
                clientSecret:
              </label>
              <input
                id="clientSecret"
                type="password"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-md"
              />
            </div>
            <button
              onClick={handleGenerateToken}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Generate Token
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100 rounded-lg">
            <span className="font-bold">Generate Token Endpoint:</span>
            <span className="text-sm text-gray-600 mt-2 sm:mt-0">
              POST /api/generate-token
            </span>
          </div>
          {token && (
            <div className="p-4 bg-green-100 rounded-lg">
              <h3 className="font-bold mb-2">Generated Token:</h3>
              <p className="break-all">{token}</p>
            </div>
          )}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {jsonData && (
          <div className="w-full mt-4">
            <h2 className="text-2xl font-bold mb-2">JSON Data:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-left max-h-96">
              {jsonData}
            </pre>
          </div>
        )}
      </main>
    </div>
  )
}
