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

const ageData = [
  { age: "0-18", count: 156 },
  { age: "19-30", count: 245 },
  { age: "31-45", count: 312 },
  { age: "46-60", count: 198 },
  { age: "60+", count: 134 }
]

export const AgeDistribution = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-gray-600">
        The majority of patients fall within the 31-45 age group, followed by
        young adults aged 19-30.
      </p>
    </div>
  )
}
