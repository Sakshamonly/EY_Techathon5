import React, { useState } from "react"
import { Plus, Download } from "lucide-react"
import { MedicationForm } from "./MedicationForm"
import { MedicationItem } from "./MedicationItem"
import { ConfirmationModal } from "./ConfirmationModal"
import { generatePrescriptionPDF, downloadBlob } from "./utils/pdf"

export function PrescriptionPage({ diagnosis }) {
  const [medications, setMedications] = useState([])
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  if (!diagnosis) {
    return (
      <div className="max-w-4xl mx-auto px-4 text-center py-12">
        <p className="text-gray-600">Please complete the diagnosis first.</p>
      </div>
    )
  }

  const handleSaveMedication = medication => {
    if (editingId) {
      setMedications(
        medications.map(med => (med.id === editingId ? medication : med))
      )
      setEditingId(null)
    } else {
      setMedications([...medications, medication])
    }
    setShowAddForm(false)
  }

  const handleEdit = id => {
    setEditingId(id)
    setShowAddForm(true)
  }

  const handleDelete = id => {
    setMedications(medications.filter(med => med.id !== id))
  }

  const handleGeneratePDF = async () => {
    const prescription = {
      diagnosis,
      medications,
      additionalNotes
    }

    const blob = await generatePrescriptionPDF(prescription)
    downloadBlob(blob, "prescription.txt") // In real app: 'prescription.pdf'
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Diagnosis Summary</h3>
        <p className="text-gray-600">
          Patient reported symptoms: {diagnosis.symptoms}
        </p>
        {diagnosis.aiInsights && (
          <p className="text-gray-600 mt-2">
            Diagnosed condition: {diagnosis.aiInsights.potentialConditions[0]}
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-6">Prescription Details</h3>

        <div className="space-y-4">
          {medications.map(med => (
            <MedicationItem
              key={med.id}
              medication={med}
              onEdit={() => handleEdit(med.id)}
              onConfirm={() => {}}
              onDelete={() => handleDelete(med.id)}
            />
          ))}

          {(showAddForm || editingId) && (
            <MedicationForm
              onSave={handleSaveMedication}
              onCancel={() => {
                setShowAddForm(false)
                setEditingId(null)
              }}
            />
          )}

          {!showAddForm && !editingId && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Medicine
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Additional Instructions</h3>
        <textarea
          value={additionalNotes}
          onChange={e => setAdditionalNotes(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Enter additional instructions for the patient..."
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setShowConfirmation(true)}
          disabled={medications.length === 0}
          className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Save Prescription
        </button>
        <button
          onClick={handleGeneratePDF}
          disabled={medications.length === 0}
          className="flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5 mr-2" />
          Generate E-Prescription
        </button>
      </div>

      {showConfirmation && (
        <ConfirmationModal
          prescription={{
            diagnosis,
            medications,
            additionalNotes
          }}
          onConfirm={() => {
            handleGeneratePDF()
            setShowConfirmation(false)
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  )
}
