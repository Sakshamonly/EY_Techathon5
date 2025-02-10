"use client"

import React from "react"
import { Alert, AlertTitle, AlertDescription } from "../../../../@/components/ui/alert"
import {
  AlertTriangle,
  Calendar,
  Heart,
  Activity,
  Pill,
  Thermometer,
  Droplet,
  FileText
} from "lucide-react"
import { Header } from "./_components/Header"
import { VitalCard } from "./_components/VitalCard"
import { SymptomTracker } from "./_components/SymptomTracker"
import { MedicationTimeline } from "./_components/MedicationTimeline"
import { HealthMetrics } from "./_components/HealthMetrics"
import { AppointmentScheduler } from "./_components/AppointmentScheduler"
import { useToast } from "./_components/use-toast"

const PatientDashboard = () => {
  const { toast } = useToast()
  const patient = {
    name: "Jane Smith",
    nextAppointment: {
      date: "March 20, 2024",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      type: "Regular Checkup"
    },
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72",
      temperature: "98.6°F",
      oxygenLevel: "98%"
    },
    medications: [
      {
        name: "Metformin",
        nextDose: "2:00 PM",
        instructions: "Take with food",
        schedule: "Twice daily"
      },
      {
        name: "Lisinopril",
        nextDose: "8:00 PM",
        instructions: "Take with water",
        schedule: "Once daily"
      }
    ],
    alerts: [
      {
        type: "medication",
        message: "Refill needed: Metformin (5 days remaining)"
      },
      { type: "appointment", message: "Upcoming appointment on March 20" }
    ],
    healthMetrics: {
      bloodPressure: [
        { date: "2024-03-01", value: 120 },
        { date: "2024-03-07", value: 118 },
        { date: "2024-03-14", value: 122 }
      ],
      bloodSugar: [
        { date: "2024-03-01", value: 95 },
        { date: "2024-03-07", value: 98 },
        { date: "2024-03-14", value: 92 }
      ]
    }
  }

  const handleMedicationTaken = medication => {
    toast({
      title: "Medication Tracked",
      description: `${medication} marked as taken`
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        <Header name={patient.name} />

        {/* Alerts Section */}
        <div className="grid gap-4">
          {patient.alerts.map((alert, index) => (
            <Alert
              key={index}
              variant={alert.type === "medication" ? "destructive" : "default"}
              className="border-l-4 border-blue-500 bg-white"
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-blue-800">
                {alert.type === "medication"
                  ? "Medication Alert"
                  : "Appointment Reminder"}
              </AlertTitle>
              <AlertDescription className="text-blue-600">
                {alert.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Vitals Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <VitalCard
                icon={Heart}
                title="Blood Pressure"
                value={patient.vitals.bloodPressure}
                color="text-blue-500"
                subtitle="Last updated: Today 9:00 AM"
              />
              <VitalCard
                icon={Activity}
                title="Heart Rate"
                value={`${patient.vitals.heartRate} BPM`}
                progress={72}
                color="text-blue-500"
              />
              <VitalCard
                icon={Thermometer}
                title="Temperature"
                value={patient.vitals.temperature}
                color="text-blue-500"
                subtitle="Normal Range"
              />
              <VitalCard
                icon={Droplet}
                title="Oxygen Level"
                value={patient.vitals.oxygenLevel}
                progress={98}
                color="text-blue-500"
              />
            </div>

            {/* Health Metrics Chart */}
            <HealthMetrics data={patient.healthMetrics} />

            {/* Medication Timeline */}
            <MedicationTimeline
              medications={patient.medications}
              onMedicationTaken={handleMedicationTaken}
            />

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              <button className="p-4 bg-blue-500 text-white rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl">
                <FileText className="h-6 w-6" />
                <span className="text-sm font-medium">View Records</span>
              </button>
              <button className="p-4 bg-blue-600 text-white rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                <Calendar className="h-6 w-6" />
                <span className="text-sm font-medium">Schedule Visit</span>
              </button>
              <button className="p-4 bg-blue-700 text-white rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl">
                <Pill className="h-6 w-6" />
                <span className="text-sm font-medium">Refill Meds</span>
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Appointment Scheduler */}
            <AppointmentScheduler nextAppointment={patient.nextAppointment} />

            {/* Symptom Tracker */}
            <SymptomTracker />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
