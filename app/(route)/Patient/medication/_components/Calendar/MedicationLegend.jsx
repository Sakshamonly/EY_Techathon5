import React from "react"

export function MedicationLegend({ medications }) {
  const colors = [
    "bg-pink-400",
    "bg-purple-400",
    "bg-indigo-400",
    "bg-fuchsia-400",
    "bg-violet-400"
  ]

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {medications.map((med, index) => (
        <div key={med.id} className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}
          ></div>
          <span className="text-sm text-gray-600">{med.name}</span>
        </div>
      ))}
    </div>
  )
}
