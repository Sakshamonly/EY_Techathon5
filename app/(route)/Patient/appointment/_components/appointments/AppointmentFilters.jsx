import React from "react"
import { Search } from "lucide-react"

export function AppointmentFilters({ onSearch, onFilterChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onChange={e => onSearch(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          onChange={e => onFilterChange({ status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select
          className="px-4 py-2 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          onChange={e => onFilterChange({ mode: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="in-person">In-Person</option>
          <option value="telehealth">Telehealth</option>
        </select>
      </div>
    </div>
  )
}
