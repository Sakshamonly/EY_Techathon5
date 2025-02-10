import React from "react"
import { Edit, Trash2 } from "lucide-react"

export function MedicationItem({ medication, onEdit, onDelete }) {
  if (!medication.confirmed) return null

  return (
    <div className="bg-[#ffffff] rounded-xl shadow-sm border border-gray-100 hover:border-primary/10 transition-colors duration-200 p-4 hover:shadow-md animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-900">{medication.name}</h4>
          <p className="text-sm text-gray-600">
            {medication.frequency} • {medication.duration}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-600 hover:text-[#4f46e5] rounded-lg hover:bg-[#4f46e5]/10 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-600 hover:text-error rounded-lg hover:bg-error/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
