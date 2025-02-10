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
import { motion } from "framer-motion"

const treatmentData = [
  { name: "Antibiotics", count: 245, success: 220, ongoing: 25 },
  { name: "Painkillers", count: 198, success: 180, ongoing: 18 },
  { name: "Antivirals", count: 156, success: 140, ongoing: 16 },
  { name: "Vaccines", count: 134, success: 134, ongoing: 0 },
  { name: "Physical Therapy", count: 87, success: 75, ongoing: 12 },
  { name: "Dietary Plans", count: 92, success: 80, ongoing: 12 }
]

export const PopularTreatments = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={treatmentData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="success"
              fill="#82ca9d"
              stackId="a"
              name="Successful"
            />
            <Bar dataKey="ongoing" fill="#ffc658" stackId="a" name="Ongoing" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {treatmentData.map((treatment, index) => (
          <motion.div
            key={treatment.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-white/10 backdrop-blur-lg"
          >
            <h4 className="font-semibold">{treatment.name}</h4>
            <p className="text-sm text-gray-600">
              Total Cases: {treatment.count}
            </p>
            <p className="text-sm text-green-600">
              Success Rate:{" "}
              {((treatment.success / treatment.count) * 100).toFixed(1)}%
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
