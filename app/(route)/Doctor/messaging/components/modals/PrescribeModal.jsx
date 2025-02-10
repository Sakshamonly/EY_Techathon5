import React from 'react';
import { X } from 'lucide-react';

export const PrescribeModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Write Prescription</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medication
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter medication name"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosage
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., 500mg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., Twice daily"
            />
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Send Prescription
        </button>
      </div>
    </div>
  </div>
);