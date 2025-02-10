import React from "react"
import { Users, Heart, Activity, DollarSign, MapPin } from "lucide-react"
import { StatsCard } from "./StatsCard"

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      <StatsCard
        title="Total Patients"
        value="1,234"
        icon={<Users className="h-6 w-6 text-white" />}
        color="bg-blue-500"
        change={12}
        subtitle="Active patients under care"
      />
      <StatsCard
        title="Successfully Treated"
        value="892"
        icon={<Heart className="h-6 w-6 text-white" />}
        color="bg-green-500"
        change={8}
        subtitle="Completed treatment cases"
      />
      <StatsCard
        title="Active Cases"
        value="342"
        icon={<Activity className="h-6 w-6 text-white" />}
        color="bg-yellow-500"
        change={-3}
        subtitle="Currently under treatment"
      />
      <StatsCard
        title="Monthly Revenue"
        value="$13,232"
        icon={<DollarSign className="h-6 w-6 text-white" />}
        color="bg-purple-500"
        change={15}
        subtitle="Total earnings this month"
      />
      <StatsCard
        title="Active Locations"
        value="8"
        icon={<MapPin className="h-6 w-6 text-white" />}
        color="bg-indigo-500"
        change={5}
        subtitle="Treatment locations"
      />
    </div>
  )
}
