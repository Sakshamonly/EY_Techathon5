import React from "react"
import { ClipboardList, FileText } from "lucide-react"

export function StepBar({ currentStep, onStepChange }) {
  return (
    <div className="flex items-center justify-center mb-8 w-full max-w-2xl mx-auto">
      <button
        onClick={() => onStepChange("diagnosis")}
        className={`flex items-center px-6 py-3 rounded-l-xl border-r ${
          currentStep === "diagnosis"
            ? "bg-[#4f46e5] text-white"
            : "bg-[#ffffff] text-gray-600 hover:bg-gray-50"
        } transition-all duration-200 flex-1`}
      >
        <ClipboardList className="w-5 h-5 mr-2" />
        <span className="font-medium">1. Diagnosis</span>
      </button>
      <button
        onClick={() => onStepChange("prescriptions")}
        className={`flex items-center px-6 py-3 rounded-r-xl ${
          currentStep === "prescriptions"
            ? "bg-[#4f46e5] text-white"
            : "bg-[#ffffff] text-gray-600 hover:bg-gray-50"
        } transition-all duration-200 flex-1`}
      >
        <FileText className="w-5 h-5 mr-2" />
        <span className="font-medium">2. Prescriptions</span>
      </button>
    </div>
  )
}
