import React from 'react';
import { X } from 'lucide-react';

export const UrgentModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-red-600">Urgent Action Required</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Urgency Level
          </label>
          <select className="w-full p-2 border rounded-lg">
            <option>High Priority</option>
            <option>Emergency</option>
            <option>Immediate Action</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows={4}
            placeholder="Describe the urgent situation"
          />
        </div>
        <button
          onClick={onClose}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Send Urgent Alert
        </button>
      </div>
    </div>
  </div>
);