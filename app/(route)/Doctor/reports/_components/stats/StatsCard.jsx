import React from "react"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { motion } from "framer-motion"

export const StatsCard = ({ title, value, icon, color, change, subtitle }) => {
  const isPositive = change >= 0

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md p-6 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
        <div
          className={`flex items-center ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
          <span className="ml-1">{Math.abs(change)}%</span>
        </div>
      </div>
      <div>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-2xl font-bold mt-2">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
    </motion.div>
  )
}
