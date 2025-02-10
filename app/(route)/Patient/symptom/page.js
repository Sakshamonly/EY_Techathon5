"use client"

import React, { useState, useEffect } from "react"
import { Header } from "./_components/Header"
import { SymptomInput } from "./_components/SymptomInput"
import { SymptomList } from "./_components/SymptomList"
import { AnalysisView } from "./_components/AnalysisView"
import { analyzeSymptoms } from "./_components/utils/analysisUtils"

function App() {
  const [symptoms, setSymptoms] = useState([])
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    const newAnalysis = analyzeSymptoms(symptoms)
    if (newAnalysis) {
      setAnalysis(newAnalysis)
    }
  }, [symptoms])

  const handleSaveSymptom = newSymptom => {
    const symptomWithId = {
      ...newSymptom,
      id: crypto.randomUUID()
    }
    setSymptoms(prev => [symptomWithId, ...prev])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SymptomInput onSave={handleSaveSymptom} />
            <SymptomList symptoms={symptoms} />
          </div>

          <div>{analysis && <AnalysisView analysis={analysis} />}</div>
        </div>
      </main>
    </div>
  )
}

export default App
