import React from "react"

export function CalendarHeader({ view, onViewChange }) {
  return (
    <div className="flex space-x-2">
      {["day", "week", "month"].map(viewType => (
        <button
          key={viewType}
          onClick={() => onViewChange(viewType)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            view === viewType
              ? "bg-purple-500 text-white"
              : "text-purple-600 hover:bg-purple-50"
          }`}
        >
          {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
        </button>
      ))}
    </div>
  )
}
