import React, { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Card } from "./Card"

export function SymptomInput({ onSave }) {
  const [name, setName] = useState("")
  const [severity, setSeverity] = useState(5)
  const [notes, setNotes] = useState("")
  const [category, setCategory] = useState("physical")

  const handleSubmit = e => {
    e.preventDefault()
    onSave({
      name,
      severity,
      notes,
      category,
      timestamp: new Date()
    })
    setName("")
    setSeverity(5)
    setNotes("")
  }

  return (
    <Card
      title="Log New Symptom"
      className="bg-gradient-to-br from-white to-blue-50"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Symptom Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
            required
            placeholder="Enter symptom name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Severity (1-10)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={e => setSeverity(Number(e.target.value))}
              className="flex-grow"
            />
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-medium ${
                severity > 7
                  ? "bg-red-500"
                  : severity > 4
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {severity}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
          >
            <option value="pain">Pain</option>
            <option value="mood">Mood</option>
            <option value="physical">Physical</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
            rows={3}
            placeholder="Add any additional details..."
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Symptom
        </button>
      </form>
    </Card>
  )
}
