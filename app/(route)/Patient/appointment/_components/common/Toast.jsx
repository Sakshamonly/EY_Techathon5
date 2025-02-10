import React from "react"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function Toast({ message, type }) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle
  }

  const Icon = icons[type]
  const colors = {
    success: "bg-#75D5A5 text-white",
    error: "bg-#FF9B9B text-white",
    warning: "bg-#75D5A5 text-gray-800"
  }

  return (
    <div
      className={`fixed bottom-4 right-4 ${colors[type]} px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-slide-up`}
    >
      <Icon className="w-4 h-4" />
      {message}
    </div>
  )
}
