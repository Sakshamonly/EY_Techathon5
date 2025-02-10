import React from "react"
import { Clock } from "lucide-react"
import { getWeekDays } from "../utils/dateUtils"

export function WeekView({ medications, doseLogs, date, onLogDose }) {
  const weekDays = getWeekDays(date)
  const timeSlots = ["morning", "afternoon", "evening"]

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-8 gap-4 min-w-[800px]">
        <div className="col-span-1"></div>
        {weekDays.map((day, index) => (
          <div key={index} className="text-center">
            <div className="font-medium text-pink-600 mb-2">
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className="text-sm text-gray-600">{day.getDate()}</div>
          </div>
        ))}

        {timeSlots.map(slot => (
          <React.Fragment key={slot}>
            <div className="bg-pink-50 p-2 rounded-lg">
              <span className="flex items-center text-pink-700 font-medium capitalize">
                <Clock className="w-4 h-4 mr-2" />
                {slot}
              </span>
            </div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-2 border border-pink-100"
              >
                {medications
                  .filter(med => med.timeOfDay.includes(slot))
                  .map(med => (
                    <div
                      key={med.id}
                      className="text-xs p-1 mb-1 rounded bg-pink-50 text-pink-700 cursor-pointer hover:bg-pink-100"
                      onClick={() => onLogDose(med.id, "taken")}
                    >
                      {med.name}
                    </div>
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
