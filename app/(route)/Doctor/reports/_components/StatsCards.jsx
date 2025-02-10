import React from "react"
import { Users, MapPin, Stethoscope } from "lucide-react"

const StatsCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  </div>
)

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="Total Patients"
        value="1,234"
        icon={<Users className="h-6 w-6 text-white" />}
        color="bg-blue-500"
      />
      <StatsCard
        title="Active Locations"
        value="8"
        icon={<MapPin className="h-6 w-6 text-white" />}
        color="bg-green-500"
      />
      <StatsCard
        title="Top Disease"
        value="Influenza"
        icon={<Stethoscope className="h-6 w-6 text-white" />}
        color="bg-purple-500"
      />
    </div>
  )
}
