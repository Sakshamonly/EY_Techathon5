"use client";

import React, { useState } from "react"
import { Toaster } from "react-hot-toast"
import { MedicationCalendar } from "./_components/Calendar/MedicationCalendar"
import { RefillRequests } from "./_components/Refills/RefillRequests"
import { MedicationList } from "./_components/Medications/MedicationList"
import { initialMedications } from "./_components/data/mockData"
import { generateId } from "./_components/utils/idGenerator"

export function App() {
  const [medications] = useState(initialMedications)
  const [doseLogs, setDoseLogs] = useState([])
  const [refillRequests, setRefillRequests] = useState([])

  const handleLogDose = (medicationId, status, notes) => {
    const newLog = {
      id: generateId(),
      medicationId,
      status,
      timestamp: new Date().toISOString(),
      notes
    }
    setDoseLogs(prev => [...prev, newLog])
  }

  const handleRefillRequest = medicationId => {
    const medication = medications.find(med => med.id === medicationId)
    if (!medication) return

    const newRequest = {
      id: generateId(),
      medicationId,
      status: "pending",
      requestDate: new Date().toISOString(),
      estimatedDelivery: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ).toISOString(),
      pharmacy: medication.pharmacy
    }
    setRefillRequests(prev => [...prev, newRequest])
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <Toaster position="top-right" />
      <header className="bg-gradient-to-r from-purple-100 to-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-purple-900">
            Medication Management
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <MedicationCalendar
              medications={medications}
              doseLogs={doseLogs}
              onLogDose={handleLogDose}
            />
          </div>
          <div className="lg:col-span-4">
            <div className="space-y-8">
              <RefillRequests refillRequests={refillRequests} />
              <MedicationList
                medications={medications}
                onRefillRequest={handleRefillRequest}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
