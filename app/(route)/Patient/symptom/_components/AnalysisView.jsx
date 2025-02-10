import React from "react"
import {
  AlertTriangle,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react"
import { Card } from "./Card"

export function AnalysisView({ analysis }) {
  const getTrendIcon = trend => {
    switch (trend) {
      case "increasing":
        return <ArrowUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <ArrowDown className="h-4 w-4 text-green-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card
        title="Symptom Trends"
        className="bg-gradient-to-br from-white to-blue-50"
      >
        <div className="space-y-3">
          {analysis.trends.map((trend, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-white transition-colors duration-200"
            >
              <div className="flex items-center">
                {getTrendIcon(trend.trend)}
                <span className="ml-2">{trend.category}</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${trend.significance * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {Math.round(trend.significance * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Potential Triggers"
          className="bg-gradient-to-br from-white to-yellow-50"
        >
          <ul className="space-y-2">
            {analysis.triggers.map((trigger, index) => (
              <li
                key={index}
                className="flex items-start p-2 rounded-lg hover:bg-white transition-colors duration-200"
              >
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{trigger}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Recommendations"
          className="bg-gradient-to-br from-white to-purple-50"
        >
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-start p-2 rounded-lg hover:bg-white transition-colors duration-200"
              >
                <Lightbulb className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
