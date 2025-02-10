import React from "react"

export function ConfirmationModal({ prescription, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-[#ffffff] rounded-xl shadow-sm border border-gray-100 hover:border-[#4f46e5]/10 transition-colors duration-200 max-w-2xl w-full p-6 animate-[slideDown_0.3s_ease-out]">
        <h2 className="text-xl font-semibold mb-4">Confirm Prescription</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700">Diagnosis</h3>
            <p className="text-gray-600">{prescription.diagnosis.symptoms}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Medications</h3>
            <ul className="space-y-2">
              {prescription.medications.map(med => (
                <li key={med.id} className="text-gray-600">
                  {med.name} - {med.frequency} for {med.duration}
                </li>
              ))}
            </ul>
          </div>

          {prescription.additionalNotes && (
            <div>
              <h3 className="font-medium text-gray-700">Additional Notes</h3>
              <p className="text-gray-600">{prescription.additionalNotes}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-[#4f46e5] text-white hover:bg-[#4f46e5]/90 focus:ring-[#4f46e5]/50 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2">
            Confirm & Generate
          </button>
        </div>
      </div>
    </div>
  )
}
