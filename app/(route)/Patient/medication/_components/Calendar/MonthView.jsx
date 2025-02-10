import React from "react"

const medicationColors = [
  "bg-pink-400",
  "bg-purple-400",
  "bg-indigo-400",
  "bg-fuchsia-400",
  "bg-violet-400"
]

export function MonthView({ medications, doseLogs, date }) {
  const getDaysInMonth = date => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    return { firstDay, daysInMonth }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(date)
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDay + 1
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null
  })

  return (
    <div className="grid grid-cols-7 gap-4">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
        <div key={day} className="text-center font-medium text-pink-600">
          {day}
        </div>
      ))}

      {days.map((day, i) => (
        <div
          key={i}
          className={`aspect-square border border-pink-100 rounded-lg p-2 ${
            day ? "bg-white hover:bg-pink-50 cursor-pointer" : "bg-gray-50"
          }`}
        >
          {day && (
            <>
              <div className="text-sm text-gray-600">{day}</div>
              <div className="mt-1 space-y-1">
                {medications.map((med, index) => (
                  <div
                    key={med.id}
                    className={`h-1.5 w-1.5 rounded-full ${
                      medicationColors[index % medicationColors.length]
                    } group relative`}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-white border border-pink-100 rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {med.name} - {med.dosage}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
