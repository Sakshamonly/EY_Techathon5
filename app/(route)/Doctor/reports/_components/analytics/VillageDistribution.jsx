import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { locations } from "../data/mockData"
import { motion } from "framer-motion"

const villageData = locations.map(location => ({
  name: location.name,
  patients: location.patientsCount,
  topDisease: location.topDisease,
  recovered: Math.floor(location.patientsCount * 0.8),
  active: Math.floor(location.patientsCount * 0.2)
}))

export const VillageDistribution = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={villageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="patients" fill="#8884d8" />
            <Bar dataKey="recovered" fill="#82ca9d" />
            <Bar dataKey="active" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {villageData.map((village, index) => (
          <motion.div
            key={village.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-white/10 backdrop-blur-lg"
          >
            <h4 className="font-semibold text-lg">{village.name}</h4>
            <p className="text-sm text-gray-600">
              Top Disease: {village.topDisease}
            </p>
            <p className="text-sm text-gray-600">
              Total Patients: {village.patients}
            </p>
            <p className="text-sm text-green-600">
              Recovered: {village.recovered}
            </p>
            <p className="text-sm text-yellow-600">Active: {village.active}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
