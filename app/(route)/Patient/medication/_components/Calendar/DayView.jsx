import React, { useState } from "react"
import { Clock, Check, X } from "lucide-react"
import { ConfirmDialog } from "../Common/ConfirmDialog"
import { toast } from "../utils/toast"

export function DayView({ medications, doseLogs, date, onLogDose }) {
  const timeSlots = ["morning", "afternoon", "evening"]
  const [showSkipConfirm, setShowSkipConfirm] = useState(false)
  const [selectedMed, setSelectedMed] = useState(null)

  const handleTakeDose = med => {
    onLogDose(med.id, "taken")
    toast.success(`${med.name} marked as taken`)
  }

  const handleSkipDose = med => {
    setSelectedMed(med)
    setShowSkipConfirm(true)
  }

  const confirmSkip = () => {
    if (selectedMed) {
      onLogDose(selectedMed.id, "skipped")
      toast.warning("Doctor won't be happy, but dose marked as skipped")
      setShowSkipConfirm(false)
      setSelectedMed(null)
    }
  }

  const isDoseTaken = (medId, timeSlot) => {
    return doseLogs.some(
      log =>
        log.medicationId === medId &&
        log.status === "taken" &&
        new Date(log.timestamp).toDateString() === date.toDateString()
    )
  }

  return (
    <>
      <div className="space-y-4">
        {timeSlots.map(slot => (
          <div key={slot} className="bg-purple-50 rounded-lg p-4">
            <h3 className="flex items-center text-purple-700 font-medium mb-3 capitalize">
              <Clock className="w-4 h-4 mr-2" />
              {slot}
            </h3>
            <div className="space-y-2">
              {medications
                .filter(med => med.timeOfDay.includes(slot))
                .map(med => (
                  <div
                    key={med.id}
                    className="bg-white rounded-md p-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{med.name}</p>
                        <p className="text-sm text-gray-600">{med.dosage}</p>
                      </div>
                      <div className="flex space-x-2">
                        {isDoseTaken(med.id, slot) ? (
                          <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded flex items-center">
                            <Check className="w-4 h-4 mr-1" /> Taken
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleTakeDose(med)}
                              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 flex items-center"
                            >
                              Take
                            </button>
                            <button
                              onClick={() => handleSkipDose(med)}
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center"
                            >
                              <X className="w-4 h-4 mr-1" /> Skip
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={showSkipConfirm}
        onClose={() => setShowSkipConfirm(false)}
        onConfirm={confirmSkip}
        title="Skip Medication?"
        message="Your doctor won't be happy about this. Are you sure you want to skip this dose?"
      />
    </>
  )
}
