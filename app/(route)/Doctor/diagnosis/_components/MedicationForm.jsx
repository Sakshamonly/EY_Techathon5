import React, { useState } from "react"
import { Check, X } from "lucide-react"

export function MedicationForm({ onSave, onCancel }) {
  const [name, setName] = useState("")
  const [frequency, setFrequency] = useState("")
  const [duration, setDuration] = useState("")

  const frequencies = [
    "Once Daily",
    "Twice Daily",
    "Three Times Daily",
    "Four Times Daily"
  ]
  const durations = ["3 Days", "5 Days", "1 Week", "2 Weeks", "1 Month"]

  const handleSubmit = e => {
    e.preventDefault()
    if (!name || !frequency || !duration) return

    onSave({
      id: crypto.randomUUID(),
      name,
      frequency,
      duration,
      confirmed: true
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl animate-[fadeIn_0.3s_ease-out]"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medicine Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/50 focus:border-transparent transition-colors duration-200"
          placeholder="Enter medicine name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Frequency
        </label>
        <select
          value={frequency}
          onChange={e => setFrequency(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/50 focus:border-transparent transition-colors duration-200"
        >
          <option value="">Select frequency</option>
          {frequencies.map(freq => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duration
        </label>
        <select
          value={duration}
          onChange={e => setDuration(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/50 focus:border-transparent transition-colors duration-200"
        >
          <option value="">Select duration</option>
          {durations.map(dur => (
            <option key={dur} value={dur}>
              {dur}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-3 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2text-gray-600 hover:text-gray-800"
        >
          <X className="w-4 h-4" />
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#10b981] text-white hover:bg-[#10b981]/90 focus:ring-[#10b981]/50"
          disabled={!name || !frequency || !duration}
        >
          <Check className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}
