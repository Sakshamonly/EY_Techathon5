import { Button } from "../../../../../@/components/ui/button"
import { Clock, Bell } from "lucide-react"

export function MedicationReminder({ medication, onSnooze, onTake }) {
  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold text-blue-900">
            Time to take {medication.name}
          </h3>
        </div>
        <Bell className="h-5 w-5 text-blue-500" />
      </div>

      <p className="text-sm text-blue-700 mb-4">{medication.instructions}</p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-blue-200 hover:bg-blue-100"
          onClick={() => onSnooze(medication.id)}
        >
          Snooze 15m
        </Button>
        <Button
          className="flex-1 bg-blue-500 hover:bg-blue-600"
          onClick={() => onTake(medication.id)}
        >
          Take Now
        </Button>
      </div>
    </div>
  )
}
