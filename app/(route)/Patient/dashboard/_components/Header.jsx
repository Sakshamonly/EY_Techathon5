import { Badge } from "../../../../../@/components/ui/badge"
import { Calendar, Bell } from "lucide-react"
import { Button } from "../../../../../@/components/ui/button"

export function Header({ name }) {
  return (
    <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">
          Welcome back, {name}
        </h1>
        <p className="text-blue-600">Here's your health summary</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
          <Bell className="h-4 w-4 mr-2 text-blue-500" />
          <span className="text-blue-900">Notifications</span>
        </Button>
        <Badge
          variant="secondary"
          className="flex gap-1 items-center bg-blue-50 text-blue-700 border-blue-200"
        >
          <Calendar className="h-4 w-4" />
          Today: {new Date().toLocaleDateString()}
        </Badge>
      </div>
    </div>
  )
}
