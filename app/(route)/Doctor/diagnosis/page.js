"use client";

import React, { useState } from "react"
import { StepBar } from "./_components/StepBar"
import  DiagnosisPage from "./_components/DiagnosisPage"
import { PrescriptionPage } from "./_components/PrescriptionPage"

export default function page() {
  const [currentStep, setCurrentStep] = useState("diagnosis")
  const [diagnosis, setDiagnosis] = useState(null)

  const handleDiagnosisSave = newDiagnosis => {
    setDiagnosis(newDiagnosis)
    setCurrentStep("prescriptions")
  }

  return (
    <div className="min-h-screen bg-gray-50">
     
      <main className="py-8">
        <StepBar currentStep={currentStep} onStepChange={setCurrentStep} />
        {currentStep === "diagnosis" ? (
          <DiagnosisPage onSave={handleDiagnosisSave} />
        ) : (
          <PrescriptionPage diagnosis={diagnosis} />
        )}
      </main>
    </div>
  )
}
