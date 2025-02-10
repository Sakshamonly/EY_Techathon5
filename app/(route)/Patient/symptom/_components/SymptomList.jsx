import React from "react"
import { Clock, AlertCircle } from "lucide-react"
import { Card } from "./Card"
import { formatDate } from "./utils/date"

export function SymptomList({ symptoms }) {
  return (
    <Card title="Recent Symptoms" className="mt-6">
      {symptoms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <AlertCircle className="h-12 w-12 mb-2" />
          <p>No symptoms logged yet</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {symptoms.map(symptom => (
            <li
              key={symptom.id}
              className="py-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{symptom.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{symptom.notes}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(symptom.timestamp)}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      symptom.severity > 7
                        ? "bg-red-100 text-red-800"
                        : symptom.severity > 4
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    Severity: {symptom.severity}
                  </span>
                  <span className="mt-1 text-xs text-gray-500 capitalize">
                    {symptom.category}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
