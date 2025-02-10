import { ArrowUp, ArrowDown, Minus } from "lucide-react"

export function VitalTrend({ trend, value }) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-red-500"
      case "down":
        return "text-green-500"
      default:
        return "text-blue-500"
    }
  }

  const TrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4" />
      case "down":
        return <ArrowDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  return (
    <div className={`flex items-center gap-1 ${getTrendColor()}`}>
      <TrendIcon />
      <span className="text-xs">{value}</span>
    </div>
  )
}
