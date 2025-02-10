import React, { useState } from "react"
import { CalendarHeader } from "./CalendarHeader"
import { DayView } from "./DayView"
import { WeekView } from "./WeekView"
import { MonthView } from "./MonthView"
import { MedicationLegend } from "./MedicationLegend"
import { formatDate } from "../utils/dateUtils"

export function MedicationCalendar({ medications, doseLogs, onLogDose }) {
  const [view, setView] = useState("day")
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    switch (view) {
      case "day":
        newDate.setDate(newDate.getDate() - 1)
        break
      case "week":
        newDate.setDate(newDate.getDate() - 7)
        break
      case "month":
        newDate.setMonth(newDate.getMonth() - 1)
        break
    }
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    switch (view) {
      case "day":
        newDate.setDate(newDate.getDate() + 1)
        break
      case "week":
        newDate.setDate(newDate.getDate() + 7)
        break
      case "month":
        newDate.setMonth(newDate.getMonth() + 1)
        break
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">
            Medication Schedule
          </h2>
          <p className="text-sm text-pink-600 mt-1">
            {formatDate(currentDate)}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              className="px-3 py-1 text-sm border border-pink-200 rounded-md hover:bg-pink-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-3 py-1 text-sm border border-pink-200 rounded-md hover:bg-pink-50"
            >
              Next
            </button>
          </div>
          <CalendarHeader view={view} onViewChange={setView} />
        </div>
      </div>

      <MedicationLegend medications={medications} />

      {view === "day" && (
        <DayView
          medications={medications}
          doseLogs={doseLogs}
          date={currentDate}
          onLogDose={onLogDose}
        />
      )}
      {view === "week" && (
        <WeekView
          medications={medications}
          doseLogs={doseLogs}
          date={currentDate}
          onLogDose={onLogDose}
        />
      )}
      {view === "month" && (
        <MonthView
          medications={medications}
          doseLogs={doseLogs}
          date={currentDate}
        />
      )}
    </div>
  )
}
