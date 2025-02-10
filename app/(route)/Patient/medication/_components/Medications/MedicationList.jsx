import React from "react"
import { Pill, Clock, RefreshCw } from "lucide-react"
import { toast } from "../utils/toast"

export function MedicationList({ medications, onRefillRequest }) {
  const handleRefillRequest = medication => {
    onRefillRequest(medication.id)
    toast.success(`Refill requested for ${medication.name}`)
  }

  return (
    <div className="space-y-4">
      {medications.map(medication => (
        <div key={medication.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Pill className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {medication.name}
                </h3>
                <p className="text-sm text-gray-600">{medication.dosage}</p>
              </div>
            </div>
            <button
              onClick={() => handleRefillRequest(medication)}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Request Refill</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {medication.timeOfDay.join(", ")}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Supply: {medication.supply} days left
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
