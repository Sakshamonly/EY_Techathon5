import React from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts"
import { motion } from "framer-motion"
import { diseaseStats } from "../data/mockData"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export const DiseaseDistribution = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-start space-x-6"
    >
      <div className="h-[400px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={diseaseStats}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {diseaseStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 p-4 bg-white/10 backdrop-blur-lg rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Disease Distribution Analysis
        </h3>
        <ul className="space-y-3">
          {diseaseStats.map((disease, index) => (
            <motion.li
              key={disease.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              <div
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="font-medium">{disease.name}:</span>
              <span>{disease.value}%</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
