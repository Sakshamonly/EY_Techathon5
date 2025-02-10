import React, { useState } from "react"
import { Select } from "../ui/Select"
import { motion, AnimatePresence } from "framer-motion"
import { AgeDistribution } from "./demographics/AgeDistribution"
import { GenderDistribution } from "./demographics/GenderDistribution"

const DEMOGRAPHIC_OPTIONS = [
  { value: "overview", label: "Overview" },
  { value: "age", label: "Age Distribution" },
  { value: "gender", label: "Gender Distribution" }
]

export const PatientDemographics = () => {
  const [view, setView] = useState("overview")

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Patient Demographics</h2>
        <Select
          options={DEMOGRAPHIC_OPTIONS}
          value={view}
          onChange={value => setView(value)}
          className="w-48"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {view === "overview" && (
            <p className="text-gray-600">
              Select a demographic category from the dropdown above to view
              detailed patient statistics and trends. Each view provides
              comprehensive insights into your patient population.
            </p>
          )}
          {view === "age" && <AgeDistribution />}
          {view === "gender" && <GenderDistribution />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
