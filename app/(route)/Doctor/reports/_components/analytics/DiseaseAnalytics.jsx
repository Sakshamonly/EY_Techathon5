import React, { useState } from "react"
import { Select } from "../ui/Select"
import { DiseaseDistribution } from "./DiseaseDistribution"
import { VillageDistribution } from "./VillageDistribution"
import { PopularTreatments } from "./PopularTreatments"

const VIEW_OPTIONS = [
  { value: "all", label: "All Diseases" },
  { value: "village", label: "Village Wise" },
  { value: "treatments", label: "Popular Treatments" }
]

export const DiseaseAnalytics = () => {
  const [view, setView] = useState("all")

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Disease Analytics</h2>
        <Select
          options={VIEW_OPTIONS}
          value={view}
          onChange={value => setView(value)}
          className="w-48"
        />
      </div>

      {view === "all" && <DiseaseDistribution />}
      {view === "village" && <VillageDistribution />}
      {view === "treatments" && <PopularTreatments />}
    </div>
  )
}
