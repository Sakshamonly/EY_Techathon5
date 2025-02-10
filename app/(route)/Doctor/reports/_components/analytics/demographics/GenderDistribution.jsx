import React from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts"

const genderData = [
  { name: "Male", value: 542 },
  { name: "Female", value: 623 },
  { name: "Other", value: 69 }
]

const COLORS = ["#0088FE", "#FF8042", "#00C49F"]

export const GenderDistribution = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={genderData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {genderData.map((entry, index) => (
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
      <p className="mt-4 text-gray-600">
        The patient population shows a slightly higher percentage of female
        patients at 50.5%.
      </p>
    </div>
  )
}
